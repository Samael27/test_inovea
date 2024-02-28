import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { GlobalService } from '../../../services/global.service';
import { Modele } from '../../../models/model';
import { ModelDialogComponent } from '../../model-dialog/model-dialog.component';
import { FrenchDatePipe } from '../../../pipes/french-date.pipe';

@Component({
  selector: 'app-model-details',
  standalone: true,
  imports: [
    CommonModule,
    FrenchDatePipe
  ],
  templateUrl: './model-details.component.html',
  styleUrl: './model-details.component.scss'
})
export class ModelDetailsComponent implements OnInit{

  selectedModel: Modele | null = null;

  constructor(private globalService: GlobalService, private dialog: MatDialog,) { }

  ngOnInit(): void {
    this.globalService.currentModel$.subscribe(model => this.selectedModel = model);
    this.globalService.modelUpdated$.subscribe(updated => {
      if (updated && this.selectedModel) {
        this.refreshModelDetails(this.selectedModel.id);
      }
    });
  }

  refreshModelDetails(modelId: string): void {
    this.globalService.getModelById(modelId).subscribe(
      model => this.selectedModel = model
    );
  }

  getImagePath(modelName: string): string {
    return this.globalService.getImagePath(modelName);
  }

  deleteModel() {
    if (this.selectedModel) {
      this.globalService.deleteModel(this.selectedModel.id).subscribe(() => {
        this.globalService.notifyModelUpdated();
        this.selectedModel = null;
      });
    }
  }

  openEditDialog() {
    this.dialog.open(ModelDialogComponent, {
      width: '600px',
      data: { ...this.selectedModel } 
    });
  }

}
