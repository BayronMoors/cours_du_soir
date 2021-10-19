// ## **Exercice 2**

// 1) Générer un salaire brut entre 2000 et 3000 euros

// 2) Calculer le salaire net à partir du salaire brut et des frais suivants :

// - Assurance employé : 7% (à décompter avant impôt)
// - Impôts sur le revenu : 40%
// - Si la personne touche moins de 2500 euros brut par mois, elle peut toucher une allocation de 100€ net d'impôt

// 3) Afficher dans un `console.log` les salaires brut et net. Afficher également si la personne a bénéficié d'allocation `La personne a bénéficié d'allocation : oui/non`

const brut = (Math.floor(Math.random()*1000)) + 2000;

const assurance = brut / 1.07;

let net = brut / 1.40;

let allocation: string;

if(net < 2500){
    net += 100;
    allocation = "oui";
}
else{
    allocation = "non";
}


console.log(brut);
console.log(net);
console.log(`La personne a bénéficié d'allocation: ${allocation}`);


