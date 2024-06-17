import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { MenuComponent } from './components/menu/menu.component';
import { GamePreviewComponent } from './components/game-preview/game-preview.component';
import { GameDetailsComponent } from './components/game-details/game-details.component';
import { OtherReviewComponent } from './components/other-review/review.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { LibraryComponent } from './components/library/library.component';
import { WishlistComponent } from './components/wishlist/wishlist.component';
import { MainComponent } from './components/main/main.component';
import { RatingComponent } from './components/rating/rating.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { ReviewsComponent } from './components/reviews/reviews.component';
import { MyReviewComponent } from './components/my-review/my-review.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { DownloadFormComponent } from './components/download-form/download-form.component';
import { ImagesComponent } from './components/images/images.component';
import { NewGameComponent } from './components/new-game/new-game.component';
import { UsersListComponent } from './components/users-list/users-list.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    MenuComponent,
    GamePreviewComponent,
    GameDetailsComponent,
    OtherReviewComponent,
    UserProfileComponent,
    LibraryComponent,
    WishlistComponent,
    MainComponent,
    RatingComponent,
    LoginComponent,
    RegisterComponent,
    NotFoundComponent,
    ReviewsComponent,
    MyReviewComponent,
    DownloadFormComponent,
    ImagesComponent,
    NewGameComponent,
    UsersListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
