import { DatePipe } from "@angular/common";
import { Component, Input, OnInit } from "@angular/core";
import { MatDialog, MatTableDataSource } from "@angular/material";
import { Subject } from "rxjs";
import Swal from "sweetalert2";
import { GFestivitaEntity } from "../entity/GFestivitaEntity.entity";
import {
  EOGOrariDateEntity,
  GOrariDateEntity,
} from "../entity/GOrariDateEntity.entity";
import { EOGOrariEntity, GOrariEntity } from "../entity/GOrariEntity.entity";
import { ApiService } from "../service/api.service";
import { takeUntil } from "rxjs/operators";
import { AddEditComponent } from "../dialog/add-edit/add-edit.component";
@Component({
  selector: "app-opening-time",
  templateUrl: "./opening-time.component.html",
  styleUrls: ["./opening-time.component.css"],
})
export class OpeningTimeComponent implements OnInit {
  @Input() type: number;
  @Input() id: number;

  displayedColumns: string[] = ["day", "firstperiod", "secondperiod", "edit"];

  panelOpenState = false;
  dataSource: MatTableDataSource<GOrariEntity> =
    new MatTableDataSource<GOrariEntity>();
  listgorari: GOrariEntity[] = [];
  listdate: GOrariDateEntity[] = [];
  listfestivity: GFestivitaEntity[] = [];
  private _unsubscribeAll: Subject<any>;
  alle_1: any;
  period_id: number;
  buItem: GOrariEntity;
  isEdit: boolean;

  constructor(public dialog: MatDialog, private _apiservice: ApiService) {
    this._unsubscribeAll = new Subject();
  }

  ngOnInit() {
    this._apiservice
      .Listgorari(this.type, this.id)
      .subscribe((res: EOGOrariEntity[]) => {
        this.dataSource.data = res;
        console.log("opening", res);
      });
  }

  getDayInWeek(day: number) {
    let dayString = "";

    switch (day) {
      case 1:
        dayString = "Monday";
        break;
      case 2:
        dayString = "Tuesday";
        break;
      case 3:
        dayString = "Wednesday";
        break;
      case 4:
        dayString = "Thursday";
        break;
      case 5:
        dayString = "Friday";
        break;

      case 6:
        dayString = "Saturday";
        break;

      case 7:
        dayString = "Sunday";
        break;

      case 8:
        dayString = "Holidays";
        break;
    }

    return dayString;
  }

  onClickEdit(element: EOGOrariEntity) {
    const dialogRef = this.dialog.open(AddEditComponent, {
      width: "50vw",
      data: {
        d: this.getDayInWeek(element.period_id),
      },
    });

    dialogRef.componentInstance.orarioEdit = { ...element };
    dialogRef.componentInstance.isEdit = true;
     dialogRef.componentInstance.type = this.type;
    dialogRef.componentInstance.id= this.id;
    console.log('thisId',this.id)

    dialogRef.afterClosed().subscribe((res) => {
      this._apiservice
        .Listgorari(this.type, this.id)
        .subscribe((res: GOrariEntity[]) => {
          this.dataSource.data = res;
        });
    });
  }
}
