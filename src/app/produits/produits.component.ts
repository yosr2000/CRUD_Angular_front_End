import { Component, OnInit } from '@angular/core';
import { Produit } from '../model/produit';
import { NgForm } from '@angular/forms';
import { ProduitsService } from '../services/produits.service';
import { Categorie } from '../model/categorie';
 

@Component({
  selector: 'app-produits',
  templateUrl: './produits.component.html',
  styleUrls: ['./produits.component.css']
})
export class ProduitsComponent implements OnInit {
  categories: Array<Categorie> = [];
  produitCourant = new Produit();
  categorieFiltre: number | undefined;

  editMode: boolean = false; 

  constructor(private produitsService: ProduitsService) {}

  ngOnInit(): void {
    console.log("Initialisation du composant...");
    this.consulterProduits();
    this.consulterCategories();
  }
 
  rechercherParCategorie() {
    if (this.categorieFiltre !== undefined) {
      this.produitsService.getProduitsParCategorie(this.categorieFiltre).subscribe({
        next: (produits: Produit[]) => {
          // Assurez-vous que la variable produits est correctement initialisée
          this.produits = produits;
        },
        error: (err: any) => {
          console.error("Erreur lors de la récupération des produits par catégorie :", err);
        }
      });
    } else {
      // Si aucune catégorie n'est sélectionnée, afficher tous les produits
      this.consulterProduits();
    }
  }
  
  

  mettreAJourProduit(nouveau: Produit, ancien: Produit) {
    ancien.categorie=nouveau.categorie;
    console.log("Tentative de mise à jour. Nouveau produit:", nouveau);
    this.produitsService.updateProduit(nouveau.id, nouveau).subscribe({
      next: updatedProduit => {
        console.log("Succès PUT. Produit mis à jour:", updatedProduit);
        Object.assign(ancien, updatedProduit);
        console.log('Mise à jour du produit : ' + ancien.designation);
      },
      error: err => {
        console.error("Erreur PUT:", err);
      }
    });
  }
  

  
 

  supprimerProduit(produit: Produit) {
    const confirmation: boolean = confirm("Voulez-vous supprimer le produit :" + produit.designation + " ?");

    if (confirmation) {
      console.log("Suppression confirmée...");

      const index: number = this.produits.indexOf(produit);
      console.log("indice du produit à supprimer: " + index);

      if (index !== -1) {
        this.produitsService.deleteProduit(produit.id).subscribe({
          next: () => {
            console.log("Produit supprimé du serveur avec succès.");
          },
          error: err => {
            console.log("Erreur lors de la suppression du produit sur le serveur:", err);
          }
        });

        this.produits.splice(index, 1);
        console.log("Produit supprimé localement avec succès.");
      } else {
        console.log("Indice du produit à supprimer non trouvé.");
      }
    } else {
      console.log("Suppression annulée...");
    }
  }
    
  validerFormulaire(produitForm: any) {
    if (produitForm.value.id !== undefined) {
      console.log("ID non vide...");
      const existingProduct = this.produits.find(p => p.id === produitForm.value.id);

      if (existingProduct) {
        const confirmation = confirm("Produit existant. Confirmez-vous la mise à jour de : " + existingProduct.designation + "?");

        if (confirmation) {
          this.mettreAJourProduit(produitForm.value, existingProduct);
        } else {
          console.log("Mise à jour annulée");
        }
        return;
      }
    }

   // this.ajouterProduit(produitForm.value);
  }

  effacerSaisie(produitForm: NgForm) {
    this.produitCourant = new Produit();
    produitForm.resetForm();
  }

  editerProduit(produit: any) {
    this.produitCourant = produit;
    this.editMode = true;
  }
  
  annulerEdition() {
    this.editMode = false; // Désactive le mode édition
    this.produitCourant = new Produit(); // Réinitialise le produit courant
  }
  produits: Produit[] = []; // Déclarez une variable pour stocker les produits

  consulterProduits() {
    this.produitsService.getProduits().subscribe({
      next: (produits: Produit[]) => {
        this.produits = produits;
      },
      error: (err: any) => {
        console.error("Erreur lors de la récupération des produits :", err);
      }
    });
  }
  
  
  consulterCategories() {
    this.produitsService.getCategories().subscribe({
      next: (categories: Categorie[]) => {
        this.categories = categories;
        console.log("Catégories récupérées avec succès:", categories);
      },
      error: (err: any) => {
        console.error("Erreur lors de la récupération des catégories :", err);
      }
    });
  }
}