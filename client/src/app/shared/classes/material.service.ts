declare var M: any

export class MaterialService {
  static toast(message: string): void{
    M.toast({html: message, classes: 'card-panel teal lighten-2 z-depth-5  rounded'})
  }
}
