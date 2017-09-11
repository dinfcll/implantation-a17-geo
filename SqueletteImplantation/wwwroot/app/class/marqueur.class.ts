export class Marqueur{
    public id:number;
    public nom:string;
    public latitude:number;
    public longitude:number;
    public desc:string;

    constructor(Id:number,Nom:string,Latitude:number,Longitude:number,Desc:string){
        this.id=Id;
        this.nom=Nom;
        this.latitude=Latitude;
        this.longitude=Longitude;
        this.desc=Desc;
    }
}