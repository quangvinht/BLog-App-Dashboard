import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Post } from 'src/app/models/post';
import { PostsService } from 'src/app/services/posts.service';

@Component({
  selector: 'app-all-post',
  templateUrl: './all-post.component.html',
  styleUrls: ['./all-post.component.css'],
})
export class AllPostComponent implements OnInit {
  postsData: Observable<any> | undefined;

  constructor(private postsService: PostsService) {}

  ngOnInit(): void {
    this.postsData = this.postsService.loadPost();
  }

  handleDeletePost(post: any) {
    this.postsService.deletePost(post.id, post.postImgPath);
  }

  handleMarkFeatured( id: string, isFeatured: boolean): void {
    this.postsService.markFeatured( id, isFeatured);
  }
}
