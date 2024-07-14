import { Component, Inject, OnInit } from '@angular/core';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef,
} from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from './../_services/api/api.service';

@Component({
  selector: 'app-calender',
  templateUrl: './calender.component.html',
  styleUrls: ['./calender.component.css'],
})
export class CalenderComponent implements OnInit {
  title = 'calendar';
  height = '500px';
  selected: Date = new Date(new Date().setHours(0, 0, 0));
  timeList = [
    '1 am',
    '2 am',
    '3 am',
    '4 am',
    '5 am',
    '6 am',
    '7 am',
    '8 am',
    '9 am',
    '10 am',
    '11 am',
    '12 pm',
    '1 pm',
    '2 pm',
    '3 pm',
    '4 pm',
    '5 pm',
    '6 pm',
    '7 pm',
    '8 pm',
    '9 pm',
    '10 pm',
    '11 pm',
    '',
  ];
  selectedSlot: Date = new Date(new Date().setHours(0, 0, 0));
  descriptionRecord: any = {};
  quote = '';
  loading = false;

  constructor(private dialog: MatDialog, private apiService: ApiService) {}

  ngOnInit() {
    this.height = window.innerHeight - 48 + 'px';
    this.runRandomQuoteApi();
    this.descriptionRecord = JSON.parse(
      localStorage.getItem('descriptionRecord') || '{}'
    );
  }

  openDialog(index: number): void {
    this.selectedSlot = new Date(this.selected.setHours(index, 0, 0));
    const dialogRef = this.dialog.open(AddDescriptionDialogComponent, {
      data: { time: this.selectedSlot },
      width: '400px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        const timeindex = this.selected.toDateString();
        if (timeindex in this.descriptionRecord) {
          this.descriptionRecord[timeindex] = {
            ...this.descriptionRecord[timeindex],
            [index]: result,
          };
        } else {
          this.descriptionRecord[timeindex] = {
            [index]: result,
          };
        }
        localStorage.setItem(
          'descriptionRecord',
          JSON.stringify(this.descriptionRecord)
        );
      }
    });
  }

  deleteSlot(index: number, e: any) {
    if (e) e.stopPropagation();
    const timeindex = this.selected.toDateString();
    if (
      timeindex in this.descriptionRecord &&
      index in this.descriptionRecord[timeindex]
    ) {
      delete this.descriptionRecord[timeindex][index];
      localStorage.setItem(
        'descriptionRecord',
        JSON.stringify(this.descriptionRecord)
      );
    }
  }

  drop(event: any) {
    if (event.previousIndex >= 0 && event.currentIndex >= 0) {
      const timeindex = this.selected.toDateString();
      if (
        timeindex in this.descriptionRecord &&
        event.previousIndex in this.descriptionRecord[timeindex]
      ) {
        const item = this.descriptionRecord[timeindex][event.previousIndex];
        if (
          !(
            timeindex in this.descriptionRecord &&
            event.currentIndex in this.descriptionRecord[timeindex]
          )
        ) {
          this.descriptionRecord[timeindex][event.currentIndex] = item;
          delete this.descriptionRecord[timeindex][event.previousIndex];
          localStorage.setItem(
            'descriptionRecord',
            JSON.stringify(this.descriptionRecord)
          );
        }
      }
    }
  }

  editSlot(index: number, e: any) {
    if (e) e.stopPropagation();
    const timeindex = this.selected.toDateString();
    if (
      timeindex in this.descriptionRecord &&
      index in this.descriptionRecord[timeindex]
    ) {
      const item = this.descriptionRecord[timeindex][index];
      this.selectedSlot = new Date(this.selected.setHours(index, 0, 0));
      const dialogRef = this.dialog.open(AddDescriptionDialogComponent, {
        data: { time: this.selectedSlot, item },
        width: '400px',
      });

      dialogRef.afterClosed().subscribe((result) => {
        if (result) {
          const timeindex = this.selected.toDateString();
          if (timeindex in this.descriptionRecord) {
            this.descriptionRecord[timeindex] = {
              ...this.descriptionRecord[timeindex],
              [index]: result,
            };
          } else {
            this.descriptionRecord[timeindex] = {
              [index]: result,
            };
          }
          localStorage.setItem(
            'descriptionRecord',
            JSON.stringify(this.descriptionRecord)
          );
        }
      });
    }
  }

  runRandomQuoteApi() {
    this.loading = true;
    this.apiService.getRandomQuote().subscribe({
      next: (response) => {
        this.quote = response?.content || '';
      },
      error: (error) => {
        console.error(error);
        this.loading = false;
      },
      complete: () => {
        this.loading = false;
      },
    });
  }
}

@Component({
  selector: 'app-dialog',
  templateUrl: 'addDescriptionDialog.html',
})
export class AddDescriptionDialogComponent {
  addDescForm = new FormGroup({
    description: new FormControl('', [
      Validators.required,
      Validators.pattern('^(.|s)*[a-zA-Z]+(.|s)*$'),
    ]),
  });
  error = '';

  constructor(
    public dialogRef: MatDialogRef<AddDescriptionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.addDescForm.patchValue({
      description: data?.item || '',
    });
  }

  onAdd(): void {
    if (this.addDescForm.get('description')?.value?.trim()) {
      this.dialogRef.close(this.addDescForm.get('description')?.value);
    }
  }
}
