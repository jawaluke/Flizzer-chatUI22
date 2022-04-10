import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DialogComponent } from './videoCallComponent/dialog/dialog.component';
import { VideoHomeComponent } from './videoCallComponent/video-home/video-home.component';

//const routes: Routes = [];

const routes: Routes = [{  
  path: 'video',  
  component: VideoHomeComponent
  }
]; 

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
