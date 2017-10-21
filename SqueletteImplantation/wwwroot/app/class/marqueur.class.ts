export class Marqueur {
    public id:number;
    public nom:string;
    public latitude:number;
    public longitude:number;
    public desc:string;
    public icone:number;
    public trajetlat:string;
    public trajetlng:string;
    public profilId:number;

    constructor( Id : number, Nom : string, Latitude : number, Longitude : number, Desc : string , Icone : number, Trajetlat: string, Trajetlng: string, ProfilId:number ) {
        this.id=Id;
        this.nom=Nom;
        this.latitude=Latitude;
        this.longitude=Longitude;
        this.desc=Desc;
        this.icone=Icone;
        this.trajetlat=Trajetlat;
        this.trajetlng=Trajetlng;
        this.profilId=ProfilId;
    }
}