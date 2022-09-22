import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material";
import { Observable, of, throwError } from "rxjs";
import { catchError, map } from "rxjs/operators";
import { Context } from "src/Service/DNN/context.service";
import {
  EOGFestivitaEntity,
  GFestivitaEntity,
} from "../entity/GFestivitaEntity.entity";
import {
  EOGOrariDateEntity,
  GOrariDateEntity,
} from "../entity/GOrariDateEntity.entity";
import { EOGOrariEntity } from "../entity/GOrariEntity.entity";


@Injectable({
  providedIn: "root",
})
export class ApiService {
  private api_uri: string;
  private listgorari: string = "GOrari/list";
  private listfestivity = "gfestivita/list";
  private listdate = "goraridate/list";
  private deletedate = "goraridate/delete";
  private setgorari = "gorari/set";
  private setgoraridate = "goraridate/set";
  private setfestivity = "gfestivita/set";
  private deletefestivity = "gfestivita/delete";
  private listSections = "Application/ListTimetableSectionsByType";
  constructor(
    private context: Context,
    private httpClient: HttpClient,
    private snackbar: MatSnackBar
  ) {
    this.api_uri = this.context._properties.routingWebAPI;
  }

  Listgorari(type: number, id: number): Observable<EOGOrariEntity[]> {
    return this.httpClient
      .get(`${this.api_uri}${this.listgorari}?Type=${type}&Id=${id}`)
      .pipe(
        map((data: string) => {

          return JSON.parse(data) as EOGOrariEntity[];
        }),

        catchError((err) => {
          return this.handleError(err);
        })
      );
  }

  ListFestivity(type: number, id: number): Observable<EOGFestivitaEntity[]> {
    return this.httpClient
      .get(`${this.api_uri}${this.listfestivity}?Type=${type}&Id=${id}`)
      .pipe(
        map((data: string) => {

          return JSON.parse(data) as EOGFestivitaEntity[];
        }),

        catchError((err) => {
          return this.handleError(err);
        })
      );
  }

  ListGorariDate(type: number, id: number): Observable<EOGOrariDateEntity[]> {
    return this.httpClient
      .get(`${this.api_uri}${this.listdate}?Type=${type}&Id=${id}`)
      .pipe(
        map((data: string) => {

          return JSON.parse(data) as EOGOrariDateEntity[];
        }),

        catchError((err) => {
          return this.handleError(err);
        })
      );
  }

  ListSections(type: number):Observable<number[]> {
    return this.httpClient
      .get(`${this.api_uri}${this.listSections}?Type=${type}`)
      .pipe(
        map((data: string) => {
          console.log("hello time table", data);
          return JSON.parse(data)
        }),

        catchError((err) => {
          return this.handleError(err);
        })
      );
  }
  Setgorari(entity: EOGOrariEntity): Observable<EOGOrariEntity[]> {
    let params: any;
    params = JSON.stringify(entity);
    return this.httpClient
      .post(`${this.api_uri}${this.setgorari}`, params)

      .pipe(
        map((data: any) => {
          return JSON.parse(data) as EOGOrariEntity;
        }),

        catchError((err) => {
          return this.handleError(err);
        })
      );
  }

  SetOrariDate(entity: EOGOrariDateEntity): Observable<EOGOrariDateEntity[]> {
    let params: any;
    params = JSON.stringify(entity);
    return this.httpClient
      .post(`${this.api_uri}${this.setgoraridate}`, params)

      .pipe(
        map((data: any) => {
          return JSON.parse(data) as EOGOrariDateEntity;
        }),

        catchError((err) => {
          return this.handleError(err);
        })
      );
  }

  SetFestivity(entity: EOGFestivitaEntity): Observable<EOGFestivitaEntity[]> {
    let params: any;
    params = JSON.stringify(entity);
    return this.httpClient
      .post(`${this.api_uri}${this.setfestivity}`, params)

      .pipe(
        map((data: any) => {
          return JSON.parse(data) as EOGFestivitaEntity;
        }),

        catchError((err) => {
          return this.handleError(err);
        })
      );
  }

  DGOrariDate(id: number): Observable<EOGOrariDateEntity> {
    let params: any;
    params = JSON.stringify(id);
    return this.httpClient
      .post(`${this.api_uri}${this.deletedate}`, params)

      .pipe(
        map((data: any) => {
          return JSON.parse(data) as EOGOrariDateEntity;
        }),

        catchError((err) => {
          return this.handleError(err);
        })
      );
  }

  DFestivity(id: number): Observable<EOGFestivitaEntity> {
    let params: any;
    params = JSON.stringify(id);
    return this.httpClient
      .post(`${this.api_uri}${this.deletefestivity}`, params)

      .pipe(
        map((data: any) => {
          return JSON.parse(data);
        }),

        catchError((err) => {
          return this.handleError(err);
        })
      );
  }

  //UTILITY
  private handleError(err) {
    if (err.status !== 404) {
      this.openErrorSnackbar(err);
      return throwError(err);
    } else {
      return of<any>(null);
    }
  }

  private openErrorSnackbar(err) {
    if (err.status !== 404) {
      const errorMessage =
        err && err.message
          ? err.message
          : "Errors have occurred. Please try again later.";
      this.snackbar.open(errorMessage, null, { duration: 6000 });
    }
  }
}
