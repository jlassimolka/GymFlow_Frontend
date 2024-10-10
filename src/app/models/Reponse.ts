export interface Reponse<T> {
    if(arg0: boolean): any;
    header: {
      code: number,
      libelle: string
    };
    total: number,
    page : number,
    size: number,
    totalPages: number;
    content: T;
  }
  