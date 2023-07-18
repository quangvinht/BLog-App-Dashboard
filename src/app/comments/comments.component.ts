import { Component, OnInit } from '@angular/core';
import { Comment } from '../models/comment';
import { CommnetsService } from '../services/commnets.service';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css'],
})
export class CommentsComponent implements OnInit {
  commentData: Array<any> | undefined;
  constructor(private commnetsService: CommnetsService) {}
  ngOnInit(): void {
    this.commnetsService.loadComment().subscribe((comments: Comment[]) => {
      this.commentData = comments;
    });
  }

  handleDeleteComment(id: string) {
    this.commnetsService.deleteComment(id);
  }
}
