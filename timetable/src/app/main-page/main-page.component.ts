import { Component, OnInit } from "@angular/core";
import { MatDialog, MatTableDataSource } from "@angular/material";
import { find } from "rxjs/operators";
import { ApiService } from "../service/api.service";


@Component({
  selector: "app-main-page",
  templateUrl: "./main-page.component.html",
  styleUrls: ["./main-page.component.css"],
})
export class MainPageComponent implements OnInit {
 id:number;
type:number;
listsections: number[] = [];

constructor(public dialog: MatDialog, private _apiservice: ApiService) {
}
  ngOnInit()  {
    // this.id = this.route.snapshot.paramMap.get('id');
    this.id = parseInt(
      window.location.href.toLowerCase().split("&id=")[1].trim(),
      10
    );


    this.type = parseInt(
      window.location.href.toLowerCase().split("?type=")[1].split("&")[0].trim(),
      10
    );


    this._apiservice
    .ListSections(this.type)
    .subscribe((res: number[]) => {
      this.listsections = res;

    });
  }

findSection(sectionId:number){

  const found = this.listsections.find(
    (f) => f === sectionId
  );
  return found
    ? true : false;
}
}
