import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  actions:Array<any>=
  [
    {titre:"Acceuil",icon:"bi bi-house", route:"/accueil"},
    {titre:"Liste Produits",icon:"bi bi-bag-fill", route:"/produits"},
    {titre:"Ajouter",icon:"bi bi-bag-fill", route:"/ajouterProduit"},
    
  ]
  actionCourante:any;
  setActionCourante(a:any){
    this.actionCourante=a;
  }}
