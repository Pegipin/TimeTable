import { DatePipe } from "@angular/common";
import { Component, Input, OnInit } from "@angular/core";
import { MatDialog, MatTableDataSource } from "@angular/material";
import { Subject } from "rxjs";
import Swal from "sweetalert2";
import { takeUntil } from 'rxjs/operators';
import { FestivityDComponent } from "../dialog/festivity-d/festivity-d.component";
import {
  EOGFestivitaEntity,
  GFestivitaEntity,
} from "../entity/GFestivitaEntity.entity";
import { ApiService } from "../service/api.service";

@Component({
  selector: "app-festivity",
  templateUrl: "./festivity.component.html",
  styleUrls: ["./festivity.component.css"],
})
export class FestivityComponent implements OnInit {

  @Input() id: number;
  @Input() type: number;


  displayedColumns: string[] = [
    "day",
    "month",
    "year",
    "description",
    "edit",
    "delete",
  ];

  panelOpenState = false;
  dataSource: MatTableDataSource<EOGFestivitaEntity> =
    new MatTableDataSource<EOGFestivitaEntity>();

  listfestivity: EOGFestivitaEntity[] = [];
  private _unsubscribeAll: Subject<any>;
  alle_1: any;
  period_id: number;
  orarioEdit: EOGFestivitaEntity;


  constructor(public dialog: MatDialog, private _apiservice: ApiService) {
    this._unsubscribeAll = new Subject();
  }

  ngOnInit() {
    this._apiservice
      .ListFestivity(this.type, this.id)
      .subscribe((res: EOGFestivitaEntity[]) => {
        this.dataSource.data = res;

      });
    }

  onDelete(item: EOGFestivitaEntity) {
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
          .DFestivity(item.id)

          .subscribe((item: EOGFestivitaEntity) => {
            this._apiservice
            .ListFestivity(this.type, this.id)
            .subscribe((res: EOGFestivitaEntity[]) => {
              this.dataSource.data = res;
          });
            });
            Swal.fire({
              title: "The product has been Deleted!",
              type: "success",
            });
            this._apiservice
            .ListFestivity(this.type, this.id)
            .subscribe((res: EOGFestivitaEntity[]) => {
              this.dataSource.data = res;
          });
      }
    });
  }

  onClickAdd() {
    const dialogRef = this.dialog.open(FestivityDComponent, {
      width: "40vw",
    });

    dialogRef.componentInstance.isEdit = false;
    dialogRef.componentInstance.type = this.type;
    dialogRef.componentInstance.id = this.id;

      dialogRef.afterClosed().subscribe((res) => {
        this._apiservice
        .ListFestivity(this.type, this.id)
          .subscribe((res: EOGFestivitaEntity[]) => {
            this.dataSource.data = res;
          });
      });

  }

  onClickEdit(element: EOGFestivitaEntity) {
    const dialogRef = this.dialog.open(FestivityDComponent, {
      width: "50vw",
    });

    dialogRef.componentInstance.orarioEdit = { ...element };
    dialogRef.componentInstance.isEdit = true;
    dialogRef.componentInstance.type = this.type;
    dialogRef.componentInstance.id = this.id;

    dialogRef.afterClosed().subscribe((res) => {
      this._apiservice
        .ListFestivity(this.type, this.id)
        .subscribe((res: EOGFestivitaEntity[]) => {
          this.dataSource.data = res;
        });
    });
  }
}

