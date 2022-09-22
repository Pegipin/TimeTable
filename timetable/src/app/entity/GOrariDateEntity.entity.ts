export class GOrariDateEntity {
  public id: number
  public tabella: string;
  public tabellaid: number;
  public date: Date;
  public time1: Date;
  public time2: Date;
  public time3: Date;
  public time4: Date;
  public insertdate: Date;
  public insertusername: string;
  public insertuserid: number;
  public updatedate: Date;
  public updateusername: string;
  public updateuserid: number;
  public deletedate: Date;
  public deleteusername: string;
  public deleteuserid: number;
}
export class EOGOrariDateEntity extends GOrariDateEntity {
  public type: number
  public stl_goraridate_id: number
  public stl_id: number
  public tabellaid: number;
}
