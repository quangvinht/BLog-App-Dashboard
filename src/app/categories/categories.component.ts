import { Component, OnInit } from '@angular/core';

import { CategoriesService } from '../services/categories.service';
import { Category } from '../models/category';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css'],
})
export class CategoriesComponent implements OnInit {
  categoriesData: Observable<any[]> | undefined;
  inputValueCategory: string | undefined;
  isEditForm: boolean = false;
  idCategory: string = '';
  constructor(private categoriesService: CategoriesService) {}

  ngOnInit(): void {
    this.categoriesData = this.categoriesService.loadCategory();
  }
  handleEditCategory(category: string, id: string): void {
    this.inputValueCategory = category;
    this.idCategory = id;
    this.isEditForm = true;
  }
  handleDeleteCategory(id: string): void {
    this.categoriesService.deleteCategory(id);
  }

  handleSubmitCategory(formData: any): void {
    console.log(formData.value);

    let categoryData: Category = {
      category: formData.value,
    };

    let subCategoryData: Category = {
      category: 'sub category 31312',
    };

    if (!this.isEditForm) {
      this.categoriesService.addCategory(categoryData, subCategoryData);
      formData.reset();
    } else {
      this.categoriesService.updateCategory(
        this.inputValueCategory,
        this.idCategory
      );
      this.isEditForm = !this.isEditForm;
      formData.reset();
    }
  }
}
