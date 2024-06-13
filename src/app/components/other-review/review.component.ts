import { Component, Input, OnInit } from '@angular/core';
import { UserService } from '../../services/user.services';
import { formatShortDateTime } from '../utils/utils';
import { AuthService } from '../../services/auth.services';
import { ReviewService } from '../../services/review.service';

@Component({
  selector: 'app-other-review',
  templateUrl: './other-review.component.html',
  styleUrl: './other-review.component.scss'
})
export class OtherReviewComponent implements OnInit {
  isAdminUser = false;

  @Input() review!: { 
    id: string,
    username: string,
    userId: string,
    publish_date: string,
    rating: number,
    description: string
  };
  reviewUserImageUrl: string = ''

  constructor(
    private userService: UserService,
    private reviewService: ReviewService,
    private authService: AuthService
  ){}

  ngOnInit(): void {
    this.isAdminUser = this.authService.isAdmin();
    this.userService.getUserPfp(this.review.userId).subscribe({
      next: (response) => {
        console.log(response);
        if (typeof response === 'string') {
          this.reviewUserImageUrl = response;
        } else {
          const reader = new FileReader();
          reader.onload = () => {
            this.reviewUserImageUrl = reader.result as string;
          };
          reader.readAsDataURL(response);
        }
      }
    });
  }

  formatDate(date: string) {
    return formatShortDateTime(date);
  }

  deleteReview() {
    if (this.isAdminOrReviewCreator()) {
      this.reviewService.deleteReview(this.review.id).subscribe({
        next: () => {
          document.defaultView?.location.reload();
        },
        error: (err) => {
          console.error('Error deleting game:', err);
        }
      });
    }
  }

  isAdminOrReviewCreator() {
    return this.isAdminUser || this.review.userId == this.authService.getCurrentUser();
  }
}
