import { Component, Inject, OnDestroy, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import {
  MatDialogRef,
  MatTableDataSource,
  MAT_DIALOG_DATA,
} from "@angular/material";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { ApiService } from "src/app/service/api.service";
import {
  EOGOrariEntity,
  GOrariEntity,
} from "src/app/entity/GOrariEntity.entity";
import { EOGOrariDateEntity } from "src/app/entity/GOrariDateEntity.entity";
import { dateLessThan } from "src/app/validation/date.validation";

@Component({
  selector: "app-add-edit",
  templateUrl: "./add-edit.component.html",
  styleUrls: ["./add-edit.component.css"],
})
export class AddEditComponent implements OnInit {
  orarioEdit: EOGOrariEntity;
  buForm: FormGroup;
  disable: boolean = false;
  isEdit: boolean = false;
  type: number;
  id: number;
  tabellaid: number;

  listgorari: GOrariEntity[] = [];
  listg: EOGOrariEntity[] = [];

  entity: EOGOrariEntity = new EOGOrariEntity();
  error: boolean = false;
  private _unsubscribeAll: Subject<any>;
  dataSource: MatTableDataSource<EOGOrariEntity> =
    new MatTableDataSource<EOGOrariEntity>();
  listCurrentOpeningTime: EOGOrariEntity[] = [];
  constructor(
    private _apiservice: ApiService,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private selfDialogRef: MatDialogRef<AddEditComponent>
  ) {
    this._unsubscribeAll = new Subject();
  }

  ngOnInit() {
    this.createForm();
    this.initAllData();
  }

  initAllData() {
    this._apiservice
      .Listgorari(this.type, this.id)
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(
        (res: EOGOrariEntity[]) => {
          this.listg = res;

          this.initFormValues();
        },
        (err) => {
          console.log("err", err);
        }
      );
  }

  createForm() {
    this.buForm = this.formBuilder.group(
      {
        dalle_1: [""],
        alle_1: [""],
        dalle_2: [""],
        alle_2: [""],
      },
      {
        validators: [
          dateLessThan("dalle_1", "alle_1"),
          dateLessThan("dalle_2", "alle_2"),
          dateLessThan("alle_1", "dalle_2"),
        ],
      }
    );
  }

  initFormValues() {
    if (this.isEdit) {
      this.buForm.patchValue({
        dalle_1: this.orarioEdit.dalle_1
          ? this.getStringInputFromda(new Date(this.orarioEdit.dalle_1)): null,
          // : new Date().setHours(0,0,0,0),
        alle_1: this.orarioEdit.alle_1
          ? this.getStringInputFromda(new Date(this.orarioEdit.alle_1))
          : null,
        dalle_2: this.orarioEdit.dalle_2
          ? this.getStringInputFromda(new Date(this.orarioEdit.dalle_2))
          : null,
        alle_2: this.orarioEdit.alle_2
          ? this.getStringInputFromda(new Date(this.orarioEdit.alle_2))
          :null,

        // dalle_1: this.getStringInputFromda(new Date(this.orarioEdit.dalle_1)),

        // alle_1: this.getStringInputFromda(new Date(this.orarioEdit.alle_1)),

        // dalle_2: this.getStringInputFromda(new Date(this.orarioEdit.dalle_2)),

        // alle_2: this.getStringInputFromda(new Date(this.orarioEdit.alle_2)),
      });
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

  onCloseClick() {
    this.selfDialogRef.close();
  }

  onSaveClick() {
    this.orarioEdit = {
      ...this.orarioEdit,...this.buForm.value,type: this.type,tabellaid: this.id,
    };

    let f = (this.orarioEdit.alle_1 = this.buForm.get("alle_1").value);
    let b = (this.orarioEdit.dalle_1 = this.buForm.get("dalle_1").value);
    let c = (this.orarioEdit.dalle_2 = this.buForm.get("dalle_2").value);
    let d = (this.orarioEdit.alle_2 = this.buForm.get("alle_2").value);

    if(d&&f&&b&&c!==null){
      const myArray = b.split(":");
    const date = new Date();
    let hour = date.setHours(myArray[0]);
    let min = date.setMinutes(myArray[1]);
    let sec = date.setSeconds(0);

    const myArray1 = f.split(":");
    const date1 = new Date();
    let hour1 = date1.setHours(myArray1[0]);
    let min1 = date1.setMinutes(myArray1[1]);
    let sec1 = date1.setSeconds(0);

    const myArray2 = c.split(":");
    const date2 = new Date();
    let hour2 = date2.setHours(myArray2[0]);
    let min2 = date2.setMinutes(myArray2[1]);
    let sec2 = date2.setSeconds(0);

    const myArray3 = d.split(":");
    const date3 = new Date();
    let hour3 = date3.setHours(myArray3[0]);
    let min3 = date3.setMinutes(myArray3[1]);
    let sec3 = date3.setSeconds(0);}

    this._apiservice
      .Setgorari(this.orarioEdit)
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(
        (res: EOGOrariEntity[]) => {
          this.selfDialogRef.close();
        },
        (err) => {
          console.log("err", err);
          this.disable = false;
        }
      );
  }
}
