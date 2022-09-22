import { Component, Inject, Input, OnDestroy, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import {
  MatDialog,
  MatDialogRef,
  MatTableDataSource,
  MAT_DIALOG_DATA,
} from "@angular/material";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { ApiService } from "src/app/service/api.service";
import { EOGOrariDateEntity } from "src/app/entity/GOrariDateEntity.entity";
import { SpecificDateComponent } from "src/app/specific-date/specific-date.component";
import { dateLessThan } from "src/app/validation/date.validation";

@Component({
  selector: "app-add-edit-specific",
  templateUrl: "./add-edit-specific.component.html",
  styleUrls: ["./add-edit-specific.component.css"],
})
export class AddEditSpecificComponent implements OnInit {
  @Input() id: number
  @Input() type: number=2

  displayedColumns: string[] = ["date"];
  orarioEdit: EOGOrariDateEntity = new EOGOrariDateEntity();
  orari:EOGOrariDateEntity
  buForm: FormGroup;
  disable: boolean = false;
  isEdit: boolean = false;
  listdate: EOGOrariDateEntity[] = [];
  error: boolean = false;
  private _unsubscribeAll: Subject<any>;
  dataSource: MatTableDataSource<EOGOrariDateEntity> =
    new MatTableDataSource<EOGOrariDateEntity>();

  listCurrentSpecificDate: EOGOrariDateEntity[]=[]

  constructor(
    private _apiservice: ApiService,
    private formBuilder: FormBuilder,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) data: any,
    private selfDialogRef: MatDialogRef<AddEditSpecificComponent>
  ) {
    this._unsubscribeAll = new Subject();
  }

  ngOnInit() {
    console.log("listCurrentSpecificDate", this.listCurrentSpecificDate);
    this.createForm();
    this.initAllData();
  }

  initAllData() {
    this._apiservice
      .ListGorariDate(this.type, this.id)
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(
        (res: EOGOrariDateEntity[]) => {
          this.listdate = res;

          this.initFormValues();
        },
        (err) => {
          console.log("err", err);
        }
      );
  }

  createForm() {
    this.buForm = this.formBuilder.group({
      date: [""],
      time1: [""],
      time2: [""],
      time3: [""],
      time4: [""],
    },{ validators: [
      dateLessThan('time1', 'time2'),
      dateLessThan('time3', 'time4'),
      dateLessThan('time2', 'time3')
    ]})
  }

  initFormValues() {
    if (this.isEdit) {
      this.buForm.patchValue({
        date: this.orarioEdit.date,
        time1:this.orarioEdit.time1 ? this.getStringInputFromda(new Date(this.orarioEdit.time1)): null,
        time2:this.orarioEdit.time2 ? this.getStringInputFromda(new Date(this.orarioEdit.time2)): null,
        time3:this.orarioEdit.time3 ? this.getStringInputFromda(new Date(this.orarioEdit.time3)): null,
        time4:this.orarioEdit.time4 ? this.getStringInputFromda(new Date(this.orarioEdit.time4)): null,
      });
      //add
    } else {
      this.orarioEdit.type = this.type;
      this.orarioEdit.tabellaid = this.id;
      this.orarioEdit.tabella = "T_Fonti_Int";
    }
  }

  getStringInputFromda(date: Date) {
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let res =
      hours.toString().padStart(2, "0") +
      ":" +
      minutes.toString().padStart(2, "0");
    console.log("getStringInputFromDate", res);
    return res;
  }

  specificDateAlreadyExist() {
    let found = this.listCurrentSpecificDate.find(x =>
      this.checkCurrentDate(x)
    );
    if(found) {
      return true
    }
    else {
      return false
    }
  }

  checkCurrentDate(x: EOGOrariDateEntity) {
    return (new Date(x.date).getDate() == this.orarioEdit.date.getDate() &&
    new Date(x.date).getFullYear() == this.orarioEdit.date.getFullYear() &&
    new Date(x.date).getMonth() == this.orarioEdit.date.getMonth() &&
    x.id != this.orarioEdit.id);
  }

  onCloseClick() {
    this.selfDialogRef.close();
  }

  onSaveClick() {
    this.orarioEdit = { ...this.orarioEdit, ...this.buForm.value, type: this.type, tabellaid: this.id};

    let b = (this.orarioEdit.time1 = this.buForm.get("time1").value);
    let c = (this.orarioEdit.time2 = this.buForm.get("time2").value);
    let f = (this.orarioEdit.time3 = this.buForm.get("time3").value);
    let d = (this.orarioEdit.time4 = this.buForm.get("time4").value);
    let e = (this.orarioEdit.date = this.buForm.get("date").value);

    if(b&&f&&d&&c!==null){
    const myArray = b.split(":");
    const date = new Date();
    let hour = date.setHours(myArray[0]);
    let min = date.setMinutes(myArray[1]);
    let sec = date.setSeconds(0);

    const myArray1 = c.split(":");
    const date1 = new Date();
    let hour1 = date1.setHours(myArray1[0]);
    let min1 = date1.setMinutes(myArray1[1]);
    let sec1 = date1.setSeconds(0);

    const myArray2 = f.split(":");
    const date2 = new Date();
    let hour2 = date2.setHours(myArray2[0]);
    let min2 = date2.setMinutes(myArray2[1]);
    let sec2 = date2.setSeconds(0);

    const myArray3 = d.split(":");
    const date3 = new Date();
    let hour3 = date3.setHours(myArray3[0]);
    let min3 = date3.setMinutes(myArray3[1]);
    let sec3 = date3.setSeconds(0);}

    // if (this.specificDateAlreadyExist()) {
    //   console.log("ALREADY EXISTS");
    //   //SWAL
    //   return;
    // }

    this._apiservice
      .SetOrariDate(this.orarioEdit)
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(
        (res: EOGOrariDateEntity[]) => {
          this.selfDialogRef.close();
        },
        (err) => {
          console.log("err", err);
          this.disable = false;
        }
      );
  }
}
