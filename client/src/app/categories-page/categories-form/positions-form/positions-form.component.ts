import {AfterViewInit, Component, ElementRef, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {PositionsService} from "../../../shared/services/positions.service";
import {Position} from "../../../shared/interfaces";
import {MaterialInstance, MaterialService} from "../../../shared/classes/material.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-positions-form',
  templateUrl: './positions-form.component.html',
  styleUrls: ['./positions-form.component.scss']
})
export class PositionsFormComponent implements OnInit, AfterViewInit, OnDestroy {

  @Input('categoryId') categoryId!: string
  @ViewChild('modal') modalRef!: ElementRef

  positions: Position[] = []
  loading: boolean = false
  modal!: MaterialInstance
  form: FormGroup = new FormGroup({})

  constructor(
    private positionsService: PositionsService
  ) {
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl(null, Validators.required),
      cost: new FormControl(null, [Validators.required, Validators.min(1)])
    })

    this.loading = true
    this.positionsService.fetch(this.categoryId).subscribe({
      next: (positions: Position[]) => {
        this.positions = positions
        this.loading = false
      }
    })
  }

  ngOnDestroy() {
    this.modal.destroy && this.modal.destroy()
  }

  ngAfterViewInit() {
    this.modal = MaterialService.initModal(this.modalRef)
  }

  onSelectPosition(position: Position){
    this.modal.open && this.modal.open()
  }

  onAddPosition(){
    this.modal.open && this.modal.open()
  }

  onCancel() {
    this.modal.close && this.modal.close()
  }

  onSubmit() {

  }

}
