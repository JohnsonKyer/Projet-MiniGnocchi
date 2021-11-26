import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlaylistsComponent } from './pages/playlists/playlists.component';
import { RegisterComponent } from './register/register.component';
import {DisplayVideosComponent} from "./display-videos/display-videos.component";

const routes: Routes = [
  {
    path: '',
    component:PlaylistsComponent
  },
  {
    path:'register',
    component:RegisterComponent
  },
  {
    path:'video',
    component:DisplayVideosComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
