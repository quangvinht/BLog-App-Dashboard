import { Injectable } from '@angular/core';

import { inject } from '@angular/core';
import {
  Firestore,
  collectionData,
  collection,
  addDoc,
  doc,
  updateDoc,
  deleteDoc,
} from '@angular/fire/firestore';
import { Observable, Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class CommnetsService {
  commentsCollection = collection(this.fireStore, 'comments');

  constructor(private fireStore: Firestore, private toastr: ToastrService) {}

  loadComment(): any {
    return collectionData(this.commentsCollection, { idField: 'id' });
  }

  deleteComment(id: string): void {
    const commentDoc = doc(this.fireStore, 'comments', id);
    deleteDoc(commentDoc)
      .then((data) => {
        this.toastr.success('successfully', 'Delete comment');
      })
      .catch((err) => {
        this.toastr.error('Failed', 'Delete comment');
      });
  }
}
