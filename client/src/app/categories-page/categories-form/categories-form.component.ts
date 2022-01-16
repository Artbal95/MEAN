import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Params, Router} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {CategoriesService} from "../../shared/services/categories.service";
import {Observable, of, switchMap} from "rxjs";
import {MaterialService} from "../../shared/classes/material.service";
import {Category, Message} from "../../shared/interfaces";

@Component({
  selector: 'app-categories-form',
  templateUrl: './categories-form.component.html',
  styleUrls: ['./categories-form.component.scss']
})
export class CategoriesFormComponent implements OnInit {

  @ViewChild('inputFile') inputFileRef!: ElementRef
  isNew: boolean = true
  form: FormGroup = new FormGroup({})
  image!: File
  imagePreview!: ArrayBuffer | string | null | undefined
  category!: Category

  constructor(
    private route: ActivatedRoute,
    private categoriesService: CategoriesService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl(null, Validators.required)
    })

    this.form.disable()

    this.route.params
      .pipe(
        switchMap(
          (params: Params) => {
            if (params['id']) {
              this.isNew = false
              return this.categoriesService.getById(params['id'])
            }
            return of(null)
          }
        )
      )
      .subscribe({
        next: (category: Category | null): void => {
          if (category) {
            this.category = category
            this.form.patchValue({
              name: category.name
            })
            this.imagePreview = category.imageSrc
            MaterialService.updateTextInputs()
          }
          this.form.enable()
        },
        error: (error: any): void => {
          MaterialService.toast(error.error.message)
        }
      })
  }

  triggerClick() {
    this.inputFileRef.nativeElement.click()
  }

  onFileUpload(event: any) {
    const file = event.target.files[0]
    this.image = file

    const reader = new FileReader()
    reader.onload = () => {
      this.imagePreview = reader.result
    }

    reader.readAsDataURL(file)
  }

  onSubmit() {
    let obs$: Observable<Category>
    this.form.disable()
    if (this.isNew) {
      obs$ = this.categoriesService.create(this.form.value.name, this.image)
    } else {
      obs$ = this.categoriesService.update(this.category._id!, this.form.value.name, this.image)
    }
    obs$.subscribe({
      next: (category: Category) => {
        this.category = category
        MaterialService.toast('Changes saved')
        this.form.enable()
      },
      error: (error: any) => {
        MaterialService.toast(error.error.message)
        this.form.enable()
      }
    })
  }

  deleteCategory() {
    const decision = window.confirm(`Are you sure you want to delete the category "${this.category.name}"`)
    if(decision){
      this.categoriesService.delete(this.category._id!)
        .subscribe({
          next: (res: Message) => MaterialService.toast(res.message),
          error: (error: any) => MaterialService.toast(error.error.message),
          complete: () => this.router.navigate(['/categories'])
        })
    }
  }
}
