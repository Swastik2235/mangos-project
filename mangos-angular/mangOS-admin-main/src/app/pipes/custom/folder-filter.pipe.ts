import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'folderFilter'
})
export class FolderFilterPipe implements PipeTransform {

  transform(value: any[], input:any): any {
    if (input) {
      return value.filter(val => val.title.toLocaleLowerCase().indexOf(input.toLocaleLowerCase()) >= 0);
    } else {
      return value;
    }
  }

}
