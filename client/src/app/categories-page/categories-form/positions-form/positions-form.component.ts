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
  positionId!: string | null | undefined
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
      cost: new FormControl(1, [Validators.required, Validators.min(1)])
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
    this.positionId = position._id
    this.form.patchValue({
      name: position.name,
      cost: position.cost
    })
    this.modal.open && this.modal.open()
    MaterialService.updateTextInputs()
  }

  onAddPosition(){
    this.positionId = null
    this.form.reset({
      name: null,
      cost: 1
    })
    this.modal.open && this.modal.open()
    MaterialService.updateTextInputs()
  }

  onCancel() {
    this.modal.close && this.modal.close()
  }

  onDeletePosition(event: Event, position: Position){
    event.stopPropagation()
    const decision = window.confirm(`Are you sure you want to delete the position ${position.name}`)

    if(decision){
      this.positionsService.delete(position).subscribe({
        next: (res) => {
          const idx = this.positions.findIndex(p => p._id === position._id)
          this.positions.splice(idx, 1)
          MaterialService.toast(res.message)
        },
        error: error => MaterialService.toast(error.error.message)
      })
    }
  }

  onSubmit() {
    this.form.disable()

    const newPosition: Position = {
      name: this.form.value.name,
      cost: this.form.value.cost,
      category: this.categoryId
    }

    const complete = () => {
      this.modal.close && this.modal.close()
      this.form.reset({name: "", cost: 1})
      this.form.enable()
    }

    if(this.positionId){
      newPosition._id = this.positionId
      this.positionsService.update(newPosition).subscribe({
        next: (position: Position) => {
          const idx = this.positions.findIndex(p => p._id === position._id)
          this.positions[idx] = position
          MaterialService.toast('Position Was Updated')
          this.positions.push(position)
        },
        error: error => {
          this.form.enable()
          MaterialService.toast(error.error.message)
        },
        complete
      })
    }else{
      this.positionsService.create(newPosition).subscribe({
        next: (position: Position) => {
          MaterialService.toast('Position Was Created')
          this.positions.push(position)
        },
        error: error => {
          this.form.enable()
          MaterialService.toast(error.error.message)
        },
        complete
      })
    }


  }

}
