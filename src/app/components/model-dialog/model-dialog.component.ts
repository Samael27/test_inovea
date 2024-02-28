import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Modele } from '../../models/model';
import { GlobalService } from '../../services/global.service';

@Component({
  selector: 'app-model-dialog',
  standalone: true,
  imports: [
    MatIconModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    ReactiveFormsModule
  ],
  templateUrl: './model-dialog.component.html',
  styleUrl: './model-dialog.component.scss'
})
export class ModelDialogComponent implements OnInit {

  modelForm: FormGroup;
  currentModelId: string = '';

  constructor(
    public dialogRef: MatDialogRef<ModelDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Modele,
    private globalService: GlobalService)
    {
      this.modelForm = new FormGroup({
        name: new FormControl(data?.name || '', Validators.required),
        author: new FormControl(data?.author || '', Validators.required),
        polygons: new FormControl(data?.polygons || '', [Validators.required, Validators.min(1)]),
        modelName : new FormControl(data?.modelName || '', Validators.required),
        description: new FormControl(data?.description || ''),
        date: new FormControl(data?.date || this.formatCurrentDate())
        });
      this.currentModelId = data?.id || '';
    }

  private formatCurrentDate(): string {
    return new Date().toISOString();
  }

  ngOnInit(): void {}

  closeDialog(): void {
    this.modelForm.reset({
      nom: '',
      auteur: '',
      nombreDePolygones: '',
      nomDuFichier: '',
      description: '',
      date: ''
    });
    this.dialogRef.close();
  }

  onSubmit() {
    if (this.modelForm.valid) {
      const operation = this.currentModelId
        ? this.globalService.updateModel(this.currentModelId, this.modelForm.value)
        : this.globalService.createModel(this.modelForm.value);
  
      operation.subscribe({
        next: () => {
          this.globalService.notifyModelUpdated();
          this.closeDialog();
        }
      });
    }
  }
  
}
