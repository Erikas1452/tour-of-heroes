import { Component, Inject, OnInit, Output } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogData, HeroDetailComponent } from '../../hero-detail/hero-detail.component';

@Component({
  selector: 'app-hero-edit-form-dialog',
  templateUrl: './hero-edit-form-dialog.component.html',
  styleUrls: ['./hero-edit-form-dialog.component.scss']
})
export class HeroEditFormDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<HeroDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  public ngOnInit(): void {}

  public Save(event: any){
    this.dialogRef.close(event);
  }

  public onNoClick(): void {
    this.dialogRef.close();
  }
}
