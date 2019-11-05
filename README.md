# listeDePersonnes

## Consigne : 
Afficher dans un tableau la liste des entrées de la base.
Sur la page visiteur, affiche un un élément au hasard avec un random valide 1 jour.
Un nouvel élément est selectionné le lendemain.
Un élément ne doit pas etre séléctioné si il l'a déja été.

## Structure de la BDD
- nom (varchar)
- prénom (varchar)
- photo (varchar)
- domaine (varchar)
- DoB (datetime)
- ville (varchar)
- genre (string, enum : "h" , "f")
- dateChoisi (datetime)
- choisi: boolean



