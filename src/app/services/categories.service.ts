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
export class CategoriesService {
  constructor(private fireStore: Firestore, private toastr: ToastrService) {}

  addCategory(category: object, subCategory: object): void {
    const categoriesCollection = collection(this.fireStore, 'categories');
    // add data for categories
    addDoc(categoriesCollection, category)
      .then((docRef) => {
        this.toastr.success('successfully', 'Add category');
        // const subCategorySubCollection = collection(
        //   this.fireStore,
        //   `${docRef.path}/sub-categories`
        // );
        // // add data for sub-categories
        // addDoc(subCategorySubCollection, subCategory)
        //   .then((docRef) => {})
        //   .catch((err) => {
        //     console.log(err);
        //   });
      })
      .catch((err) => {
        console.log(err);
        this.toastr.error('Failed', 'Add category');
      });
  }

  loadCategory(): Observable<any> {
    const categoriesCollection = collection(this.fireStore, 'categories');
    collectionData(categoriesCollection, { idField: 'id' }).subscribe(
      (data) => {
        //console.log(data);
      }
    );
    return collectionData(categoriesCollection, { idField: 'id' });
  }

  updateCategory(category: string | undefined, id: string): void {
    const categoryDoc = doc(this.fireStore, 'categories', id);
    const updateData = {
      category: { category: category },
    };
    updateDoc(categoryDoc, updateData)
      .then((data) => {
        this.toastr.success('successfully', 'Update category');
      })
      .catch((err) => {
        this.toastr.error('Failed', 'Update category');
      });
  }

  deleteCategory(id: string): void {
    const categoryDoc = doc(this.fireStore, 'categories', id);
    deleteDoc(categoryDoc)
      .then((data) => {
        this.toastr.success('successfully', 'Delete category');
      })
      .catch((err) => {
        this.toastr.error('Failed', 'Delete category');
      });
  }
}
