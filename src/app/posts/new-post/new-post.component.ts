import { Observable } from 'rxjs';
import { CategoriesService } from '../../services/categories.service';
import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Post } from 'src/app/models/post';
import '../../categories/categories.component.css';
import { PostsService } from 'src/app/services/posts.service';
import { Storage, ref, uploadBytesResumable } from '@angular/fire/storage';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.css'],
})
export class NewPostComponent implements OnInit {
  permalink: string = '';
  imgSrcPost: any = './assets/place-holder-img.jpg';
  selectedImg: any;
  categories: Observable<any[]> | undefined;
  postForm: any;
  editPostData: any;
  isEditPost: boolean = false;
  idPost: string = '';

  constructor(
    private categoriesService: CategoriesService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private postsService: PostsService
  ) {
    this.route.queryParams.subscribe((params) => {
      this.idPost = params['id'];
      if (params['id']) {
        this.isEditPost = true;
      } else {
        this.isEditPost = false;
      }

      if (this.idPost) {
        this.postsService.getSinglePost(params['id']).then((post) => {
          this.editPostData = post;

          this.postForm = this.fb.group({
            title: [
              this.editPostData?.title,
              [Validators.required, Validators.minLength(10)],
            ],

            permalink: [
              { value: this.editPostData?.permalink, disabled: true },
              Validators.required,
            ],
            excerpt: [
              this.editPostData?.excerpt,
              [Validators.required, Validators.minLength(50)],
            ],
            category: [
              `${this.editPostData?.category?.categoryId}-${this.editPostData?.category?.category}`,
              Validators.required,
            ],
            postImg: ['', Validators.required],
            content: [this.editPostData?.content, Validators.required],
          });
          this.imgSrcPost = post.postImgPath;
          this.permalink = post.permalink;
        });
      } else {
        this.postForm = this.fb.group({
          title: ['', [Validators.required, Validators.minLength(10)]],

          permalink: [{ value: '', disabled: true }, Validators.required],
          excerpt: ['', [Validators.required, Validators.minLength(50)]],
          category: [``, Validators.required],
          postImg: ['', Validators.required],
          content: ['', Validators.required],
        });
      }
    });
  }

  ngOnInit(): void {
    this.categories = this.categoriesService.loadCategory();
  }

  get fc() {
    return this.postForm.controls;
  }

  handleTitleChanged($event: any): void {
    this.permalink = $event.target.value.replace(/\s/g, '-');
  }
  handleShowPreview($event: any): void {
    const file = $event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      this.imgSrcPost = e.target?.result;
    };
    reader.readAsDataURL(file);
    this.selectedImg = $event.target;
  }

  handleSubmit(): void {
    let categorySplitted = this.postForm.value.category.split('-');

    const postData: Post = {
      title: this.postForm.value.title,
      permalink: this.permalink,
      content: this.postForm.value.content,
      excerpt: this.postForm.value.excerpt,
      category: {
        categoryId: categorySplitted[0],
        category: categorySplitted[1],
      },
      postImgPath: '',
      views: 0,
      isFeatured: false,
      status: 'new',
      createdAt: new Date(),
    };

    this.postsService.createOrEditPost(
      this.selectedImg,
      postData,
      this.isEditPost,
      this.idPost
    );
    this.postForm.reset();
    this.imgSrcPost = './assets/place-holder-img.jpg';
  }
}
