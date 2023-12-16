import { Categorie } from "./categorie";

export class Produit {
    id:number | undefined;
    code:string | undefined;
    designation: string | undefined;
    prix:number | undefined
    categorie: Categorie | undefined ; // Assurez-vous que 'categorie' est de type 'Categorie'

    }