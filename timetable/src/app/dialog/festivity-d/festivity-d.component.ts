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
import { EOGFestivitaEntity } from "src/app/entity/GFestivitaEntity.entity";

@Component({
  selector: "app-festivity-d",
  templateUrl: "./festivity-d.component.html",
  styleUrls: ["./festivity-d.component.css"],
})
export class FestivityDComponent implements OnInit {
  orarioEdit: EOGFestivitaEntity = new EOGFestivitaEntity();
  buForm: FormGroup;
  disable: boolean = false;
  isEdit: boolean = false;
  type: number = 1;
  id: number = 82007;
  giorno: string;
  listFestivity: EOGFestivitaEntity[] = [];
  mese: string;
  anno: string;
  descrizione: string;
  codice: string;

  entity: EOGFestivitaEntity = new EOGFestivitaEntity();
  error: boolean = false;
  private _unsubscribeAll: Subject<any>;
  dataSource: MatTableDataSource<EOGFestivitaEntity> =
    new MatTableDataSource<EOGFestivitaEntity>();
  submitted: boolean = false;
  constructor(
    private _apiservice: ApiService,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) data: any,
    private selfDialogRef: MatDialogRef<FestivityDComponent>
  ) {
    this._unsubscribeAll = new Subject();
  }

  ngOnInit() {
    this.createForm();
    console.log("orarioEdit", this.orarioEdit);
    this.initFormValues();
  }

  createForm() {
    this.buForm = this.formBuilder.group({
      giorno: new FormControl(null, Validators.required),
      mese: new FormControl(null, Validators.required),
      anno: new FormControl(null),
      descrizione: new FormControl(null, Validators.required),
    });
  }

  initFormValues() {
    if(this.isEdit) {
      this.buForm.patchValue({...this.buForm,
        ...this.orarioEdit,
        anno: +this.orarioEdit.anno
      });
    }
  }

  get month() {
    return this.buForm.get("mese");
  }

  get day() {
    return this.buForm.get("giorno");
  }

  get year() {
    return this.buForm.get("anno");
  }

  get description() {
    return this.buForm.get("descrizione");
  }

  get isLeap() {
    let year;
    if (year % 4 === 0) {
      if (year % 100 === 0) {
        if (year % 400 == 0) {
          return true;
        } else {
          return false;
        }
      }
    }
  }

  validateDate() {
    if (
      this.year.value === null &&
      this.month.value === 2 &&
      this.day.value === 29
    ) {
      alert("The year is not Specified, You can't insert 29 February");
      console.log("err");
    } else if (
      this.year.value === !this.isLeap &&
      this.month.value === 9 &&
      this.day.value === 31
    ) {
      alert("This is the Leap Year, you cant insert september 31 st");
      this.disable = false;
    }
  }

  onCloseClick() {
    this.selfDialogRef.close();
  }

  submitForm() {
    if (this.isEdit) {
      this.orarioEdit = { ...this.orarioEdit, ...this.buForm.value
       };
    } else {
      this.orarioEdit.type = this.type;
      this.orarioEdit.tabellaid = this.id;
      this.orarioEdit.nome_tabella = "T_Clienti";
    }

    let b = (this.orarioEdit.giorno = (this.buForm.get("giorno").value as number).toString().padStart(2, "0"));
    let f = (this.orarioEdit.mese = this.buForm.get("mese").value);
    let c = (this.orarioEdit.anno = this.buForm.get("anno").value);
    let d = (this.orarioEdit.descrizione =this.buForm.get("descrizione").value);

    this._apiservice
      .SetFestivity(this.orarioEdit)
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(
        (res: EOGFestivitaEntity[]) => {
          this.selfDialogRef.close();
        },
        (err) => {
          console.log("err", err);
          this.disable = false;
        }
      );
  }


  // submitForm() {
  //   if (!this.buForm.valid) {
  //     return;
  //   }
  //   alert('Form is valid!!!');
  // }

}



