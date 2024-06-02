import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { MenuComponent } from './menu/menu.component';
import { GamePreviewComponent } from './game-preview/game-preview.component';
import { GameDetailsComponent } from './game-details/game-details.component';
import { OtherReviewComponent } from './other-review/review.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { LibraryComponent } from './library/library.component';
import { WishlistComponent } from './wishlist/wishlist.component';
import { MainComponent } from './main/main.component';
import { RatingComponent } from './rating/rating.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ReviewsComponent } from './reviews/reviews.component';
import { MyReviewComponent } from './my-review/my-review.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

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
    MyReviewComponent
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
