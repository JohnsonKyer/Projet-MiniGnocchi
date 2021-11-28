import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { PlaylistsComponent } from './pages/playlists/playlists.component';
import { RegisterComponent } from './register/register.component';
import { AuthGuard } from './services/auth.guard';

const routes: Routes = [
  {
    path: '', canActivate:[AuthGuard],
    component:PlaylistsComponent
  },
  {
    path:'register',
    component:RegisterComponent
  },
  {path:'login',
    component:LoginComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
