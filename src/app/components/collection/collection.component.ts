import { MatInputModule } from '@angular/material/input';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { MatIconModule } from '@angular/material/icon';
import { ListComponent } from './list/list.component';
import { ModelDetailsComponent } from './model-details/model-details.component';
import { MatDialog } from '@angular/material/dialog';
import { ModelDialogComponent } from '../model-dialog/model-dialog.component';
import { GlobalService } from '../../services/global.service';
import { Modele } from '../../models/model';

@Component({
  selector: 'app-collection',
  standalone: true,
  imports: [
    CommonModule,
    MatToolbarModule,
    ListComponent,
    ModelDetailsComponent,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatAutocompleteModule],
  templateUrl: './collection.component.html',
  styleUrl: './collection.component.scss'
})
export class CollectionComponent implements OnInit {

  modelName = new FormControl('');
  allModels: Modele[] = [];
  filteredModels: Modele[] = [];

  constructor(private globalService: GlobalService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.loadModels();

    this.globalService.modelUpdated$.subscribe(updated => {
      if (updated) {
        this.loadModels();
      }
    });
  }

  loadModels(): void {
    this.globalService.getList().subscribe(models => {
      this.allModels = models;
      this.filteredModels = models;

      this.modelName.valueChanges.subscribe(value => {
        this.filterModels(value ?? '');
      });
    });
  }

  filterModels(value: string): void {
    if (!value) {
      this.filteredModels = this.allModels;
    } else {
      const filterValue = value.toLowerCase();
      this.filteredModels = this.allModels
        .filter(model => model.name.toLowerCase().includes(filterValue));
    }
  }

  openModelDialog(): void {
    this.dialog.open(ModelDialogComponent, {
      width: '600px'
    });
  }

}

