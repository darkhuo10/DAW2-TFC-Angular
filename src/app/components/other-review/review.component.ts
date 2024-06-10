import { Component, Input, OnInit } from '@angular/core';
import { UserService } from '../../services/user.services';

@Component({
  selector: 'app-other-review',
  templateUrl: './other-review.component.html',
  styleUrl: './other-review.component.scss'
})
export class OtherReviewComponent implements OnInit {
  @Input() review!: { 
    username: string,
    userId: string,
    publish_date: string,
    rating: number,
    description: string
  };
  reviewUserImageUrl: string = ''

  constructor(
    private userService: UserService
  ){}

  ngOnInit(): void {
    this.userService.getUserPfp(this.review.userId).subscribe({
      next: (response) => {
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
}
