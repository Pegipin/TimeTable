export class GFestivitaEntity {
  public id: number;
  public nome_tabella: string;
  public codice: string;
  public codice_breve: string;
  public giorno: string;
  public mese: string;
  public anno: string;
  public descrizione: string;
}
export class EOGFestivitaEntity extends GFestivitaEntity {
  public type: number;
  public stl_festivity_id: number
  public stl_id: number;
public tabellaid: number;
}

