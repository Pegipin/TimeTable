export class GOrariEntity {
  public tabella: string;
  public codice: string;
  public codice_breve: string;
  public period_id: number
  public dalle_1: Date;
  public alle_1: Date;
  public dalle_2: Date;
  public alle_2: Date;
  public id: number
}
export class EOGOrariEntity extends GOrariEntity {
  public type: number
  public stl_timetable_id: number
  public stl_id: number;
  public tabellaid: number;
}
