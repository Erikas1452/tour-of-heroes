import { Component, OnInit, Inject, ChangeDetectionStrategy} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-description-dialog',
  templateUrl: './description-dialog.component.html',
  styleUrls: ['./description-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DescriptionDialogComponent implements OnInit {

  public description!: string;

  constructor(
    public dialogRef: MatDialogRef<DescriptionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {desc: string}
  ) { }

  public ngOnInit(): void {
    this.description = this.data.desc;
  }

  public closeDialog(): void {
    this.dialogRef.close();
  }
}
