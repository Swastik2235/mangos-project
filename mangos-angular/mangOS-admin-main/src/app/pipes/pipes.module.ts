import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FolderFilterPipe } from './custom/folder-filter.pipe';



@NgModule({
  declarations: [
    FolderFilterPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [FolderFilterPipe],
  providers: [FolderFilterPipe]
})
export class PipesModule { }
