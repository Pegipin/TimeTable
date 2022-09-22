import { DatePipe } from "@angular/common";
import { Component, Input, OnInit } from "@angular/core";
import { resetComponentState } from "@angular/core/src/render3/state";
import { MatDialog, MatTableDataSource } from "@angular/material";
import { Subject } from "rxjs";
import Swal from "sweetalert2";
import { AddEditSpecificComponent } from "../dialog/add-edit-specific/add-edit-specific.component";
import { AddEditComponent } from "../dialog/add-edit/add-edit.component";

import { GFestivitaEntity } from "../entity/GFestivitaEntity.entity";
import {
  EOGOrariDateEntity,
  GOrariDateEntity,
} from "../entity/GOrariDateEntity.entity";
import { EOGOrariEntity, GOrariEntity } from "../entity/GOrariEntity.entity";
import { ApiService } from "../service/api.service";

@Component({
  selector: "app-specific-date",
  templateUrl: "./specific-date.component.html",
  styleUrls: ["./specific-date.component.css"],
})
export class SpecificDateComponent implements OnInit {

  @Input() type: number;
  @Input() id: number;
  displayedColumns: string[] = [
    "date",
    "firstperiod",
    "secondperiod",
    "edi",
    "delete",
  ];

  panelOpenState = false;
  dataSource: MatTableDataSource<EOGOrariDateEntity> =
    new MatTableDataSource<EOGOrariDateEntity>();
  listdate: GOrariDateEntity[] = [];

  private _unsubscribeAll: Subject<any>;

  period_id: number;
  updateuserid: number;
  orarioEdit: EOGOrariDateEntity;

  constructor(public dialog: MatDialog, private _apiservice: ApiService) {
    this._unsubscribeAll = new Subject();
  }

  ngOnInit() {
    this._apiservice
      .ListGorariDate(this.type, this.id)
      .subscribe((res: EOGOrariDateEntity[]) => {
        this.dataSource.data = res;
      });
    }

  onDelete(item: EOGOrariDateEntity) {
    Swal.fire({
      title: "Elimina Product ",
      text: "Stai per eliminare ",
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, eliminalo",
      cancelButtonText: "No, annulla eliminazione",
    }).then((result) => {
      if (result.value) {
        this._apiservice
          .DGOrariDate(item.id)

          .subscribe((item: EOGOrariDateEntity) => {
            this._apiservice
            .ListGorariDate(this.type, this.id)
            .subscribe((res: EOGOrariDateEntity[]) => {
              this.dataSource.data = res;
          });
        });
            Swal.fire({
              title: "The product has been Deleted!",
              type: "success",
            });
            this._apiservice
            .ListGorariDate(this.type, this.id)
            .subscribe((res: EOGOrariDateEntity[]) => {
              this.dataSource.data = res;
          });
      }
    });
  }

  onClickAdd() {
    const dialogRef = this.dialog.open(AddEditSpecificComponent, {
      width: "40vw",
    });

    dialogRef.componentInstance.isEdit = false;
    dialogRef.componentInstance.type = this.type;
    dialogRef.componentInstance.id = this.id;
    dialogRef.componentInstance.listCurrentSpecificDate = this.dataSource.data;

      dialogRef.afterClosed().subscribe((res) => {
        this._apiservice
          .ListGorariDate(this.type, this.id)
          .subscribe((res: EOGOrariDateEntity[]) => {
            this.dataSource.data = res;
          });
      });
    }

  onClickEdit(element: EOGOrariDateEntity) {
    const dialogRef = this.dialog.open(AddEditSpecificComponent, {
      width: "50vw",
    });

    dialogRef.componentInstance.orarioEdit = { ...element };
    dialogRef.componentInstance.isEdit = true;
    dialogRef.componentInstance.type = this.type;
    dialogRef.componentInstance.listCurrentSpecificDate = this.dataSource.data;
    dialogRef.componentInstance.id = this.id;

    dialogRef.afterClosed().subscribe((res) => {
      this._apiservice
        .ListGorariDate(this.type, this.id)
        .subscribe((res: EOGOrariDateEntity[]) => {
          this.dataSource.data = res;
        });
    });
  }
}
