import { Injectable } from '@angular/core';
import {
  Firestore,
  collection,
  collectionData,
  deleteDoc,
  doc,
} from '@angular/fire/firestore';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SubsrcibersService {
  constructor(private fireStore: Firestore, private toastr: ToastrService) {}

  loadSub(): Observable<any> {
    const subscribersCollection = collection(this.fireStore, 'subscribers');
    collectionData(subscribersCollection, { idField: 'id' }).subscribe(
      (data) => {
        //console.log(data);
      }
    );
    return collectionData(subscribersCollection, { idField: 'id' });
  }

  deleteSub(id: string): void {
    const subscribersDoc = doc(this.fireStore, 'subscribers', id);

    deleteDoc(subscribersDoc)
      .then((data) => {
        this.toastr.success('successfully', 'Delete subscribers');
      })
      .catch((err) => {
        this.toastr.error('Failed', 'Delete subscribers');
      });
  }
}
