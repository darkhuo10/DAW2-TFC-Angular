import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { MainComponent } from './components/main/main.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { GameDetailsComponent } from './components/game-details/game-details.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { DownloadFormComponent } from './components/download-form/download-form.component';

const routes: Routes = [
  { path: 'home', component: MainComponent },
  { path: 'library', component: MainComponent },
  { path: 'wishlist', component: MainComponent },
  { path: 'user', component: UserProfileComponent },
  { path: 'game/:id', component: GameDetailsComponent },
  { path: 'download/:id', component: DownloadFormComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' }, // Ruta por defecto
  { path: '**', component: NotFoundComponent} // Ruta para cuando haya un 404
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
