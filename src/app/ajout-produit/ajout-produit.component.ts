import { Component, OnInit } from '@angular/core';
import { Produit } from '../model/produit';
import { ProduitsService } from '../services/produits.service';
import { Categorie } from '../model/categorie';

@Component({
  selector: 'app-ajout-produit',
  templateUrl: './ajout-produit.component.html',
  styleUrls: ['./ajout-produit.component.css']
})
export class AjoutProduitComponent implements OnInit {

  produitsExistant: Produit[] = [];
  nouveauProduit: Produit = new Produit();
  categories: Categorie[] = [];

  constructor(private produitsService: ProduitsService) { }

  ngOnInit(): void {
    this.recupererProduits();
    this.recupererCategories();
  }

  recupererCategories() {
    this.produitsService.getCategories().subscribe({
      next: categories => {
        this.categories = categories;
        console.log('Liste des catégories disponibles :', this.categories);
      },
      error: err => {
        console.error('Erreur lors de la récupération des catégories :', err);
      }
    });
  }
  

  recupererProduits() {
    this.produitsService.getProduits().subscribe({
      next: produits => {
        this.produitsExistant = produits;
        console.log('Liste des produits existants :', this.produitsExistant);
      },
      error: err => {
        console.error('Erreur lors de la récupération des produits existants :', err);
      }
    });
  }
  validerFormulaire() {
    if (this.nouveauProduit.id) {
      alert("Identificateur de produit déjà existant.");
    } else {
      this.ajouterProduit(this.nouveauProduit);
    }
  }
  

  produitExiste(id: number): boolean {
    return this.produitsExistant.some(produit => produit.id === id);
  }

  ajouterProduit(produit: Produit) {
    this.produitsService.addProduit(produit).subscribe({
      next: addedProduit => {
        console.log("Succès de l'ajout du produit :", addedProduit);
        this.nouveauProduit = new Produit();
        this.recupererProduits(); // Mettre à jour la liste des produits existants
      },
      error: err => {
        console.error("Erreur lors de l'ajout du produit :", err);
      }
    });
  }
  
}