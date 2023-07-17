import { Injectable, inject } from '@angular/core';
import {
  Storage,
  ref,
  deleteObject,
  uploadBytes,
  uploadString,
  uploadBytesResumable,
  percentage,
  getDownloadURL,
} from '@angular/fire/storage';

import { initializeApp } from 'firebase/app';
import { environment } from 'src/environments/environment';
import { Post } from '../models/post';
import {
  Firestore,
  collectionData,
  collection,
  addDoc,
  doc,
  updateDoc,
  deleteDoc,
  getDoc,
} from '@angular/fire/firestore';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

const app = initializeApp(environment.firebaseConfig);
@Injectable({
  providedIn: 'root',
})
export class PostsService {
  constructor(
    private storage: Storage,
    private fireStore: Firestore,
    private toastr: ToastrService,
    private router: Router
  ) {}
  postsCollection = collection(this.fireStore, 'posts');

  savePost(post: Post): void {
    // add post to store:

    addDoc(this.postsCollection, post)
      .then((docRef) => {
        this.toastr.success('successfully', 'Add post');
        this.router.navigate(['/posts']);
      })
      .catch((err) => {
        this.toastr.success('failed', 'Add post');
      });
  }

  createOrEditPost(
    selectedImg: any,
    postData: Post,
    isEditPost: boolean,
    id: string
  ): void {
    const filePath = `postIMG/${Date.now()}`;

    if (!selectedImg.files) return;

    const files: FileList = selectedImg.files;

    for (let i = 0; i < files.length; i++) {
      const file = files.item(i);
      if (file) {
        const storageRef = ref(this.storage, filePath);

        // upload image to cloud storate
        uploadBytesResumable(storageRef, file)
          .then((response) => {
            // get image by return a url
            getDownloadURL(storageRef).then((url) => {
              postData.postImgPath = url;
              if (isEditPost) {
                this.updatePost(postData, id);
              } else {
                this.savePost(postData);
              }
            });
          })
          .catch((error) => {});
      }
    }
  }

  loadPost(): Observable<any> {
    collectionData(this.postsCollection, { idField: 'id' }).subscribe(
      (data) => {
        //console.log(data);
      }
    );
    return collectionData(this.postsCollection, { idField: 'id' });
  }

  async getSinglePost(id: string): Promise<any> {
    const postDocRef = doc(this.fireStore, 'posts', id);
    const postDocSnap = await getDoc(postDocRef);

    return postDocSnap.data();
  }

  updatePost(postData: any, id: string): void {
    const postDoc = doc(this.fireStore, 'posts', id);

    updateDoc(postDoc, postData)
      .then((data) => {
        this.toastr.success('successfully', 'Update post');
        this.router.navigate(['/posts']);
      })
      .catch((err) => {
        this.toastr.error('Failed', 'Update post');
      });
  }

  deletePost(id: string, imgURL: string): void {
    const postDoc = doc(this.fireStore, 'posts', id);
    deleteDoc(postDoc)
      .then((data) => {
        this.deleteImg(imgURL);
        this.toastr.success('successfully', 'Delete category');
      })
      .catch((err) => {
        this.toastr.error('Failed', 'Delete category');
      });
  }

  deleteImg(imgURL: string): void {
    const desertRef = ref(this.storage, imgURL);
    // Delete the file
    deleteObject(desertRef)
      .then(() => {
        // File deleted successfully
      })
      .catch((error) => {
        // Uh-oh, an error occurred!
      });
  }

  markFeatured(id: string, isFeatured: boolean): void {
    const postData = { isFeatured: isFeatured };
    const postDoc = doc(this.fireStore, 'posts', id);
    updateDoc(postDoc, postData).then(() => {
      this.toastr.info('Featured status updated');
    });
  }
}
