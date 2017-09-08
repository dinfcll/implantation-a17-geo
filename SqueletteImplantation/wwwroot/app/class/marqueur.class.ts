export class Marqueur{
    public Id:number;
    public Nom:string;
    public Latitude:number;
    public Longitude:number;
    public Desc:string;

    constructor(Id:number,Nom:string,Latitude:number,Longitude:number,Desc:string){
        this.Id=Id;
        this.Nom=Nom;
        this.Latitude=Latitude;
        this.Longitude=Longitude;
        this.Desc=Desc;
    }
}