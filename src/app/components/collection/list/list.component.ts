import { Component, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatDividerModule} from '@angular/material/divider';
import { GlobalService } from '../../../services/global.service';
import { Modele } from '../../../models/model';
import { FrenchDatePipe } from '../../../pipes/french-date.pipe';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [
    CommonModule,
    MatDividerModule,
    FrenchDatePipe
],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent implements OnInit{

  @Input() list: Modele[] = [];

  constructor(private globalService: GlobalService) { }

  ngOnInit(): void {
  }

  onModelClick(model: Modele): void {
    this.globalService.changeModel(model);
  }

  getImagePath(modelName: string): string {
    return this.globalService.getImagePath(modelName);
  }
}
