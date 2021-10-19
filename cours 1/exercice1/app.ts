// ## Exercice 1

// Jean, Pierre, Maxime et Henri aimeraient connaître leur IMC (indice de masse corporel) grâce à la formule IMC = masse/(taille au carré en mètre)
// - Stocker les informations nécessaires
// - Calculer les IMC selon les données suivantes :
//     - Jean pèse 80kg et mesure 1.69m
//     - Henri pèse 79kg et mesure 1.81m
//     - Pierre pèse 62kg et mesure 1.68m
//     - Maxime pèse 100kg et mesure 1.72m
const listOfPeople : {name: string, poid: number, taille: number}[] = [
    {name: "Jean", poid: 80, taille: 1.69},
    {name: "Henri", poid: 79, taille: 1.81},
    {name: "Pierre", poid: 62, taille: 1.68},
    {name: "Maxime", poid: 100, taille: 1.72},
];

const peoples: {name: string, imc: number, ref: string}[] = [];

listOfPeople.forEach(people => {
    let ref: string = "";
    const imc: number = people.poid / Math.pow(people.taille, 2);
    if(imc <= 16.4){
        ref = "maigre";
    }
    else if(imc <= 24.9 ){
        ref = `normale`;
    }
    else if(imc <= 29.9){
        ref = "surpoids";
    }
    else if(imc <= 34.9){
        ref = "obésité modérée";
    }
    else{
        ref = "obésité morbide";
    }
    peoples.push({name: people.name, imc: imc, ref: ref});
})
// - Afficher le BMI ainsi que la corpulence : Jean a un IMC de **20kg/m2**  et a donc une corpulence **normale**
//     - **en dessous de 18,4 kg/m²**, on considère que la personne est maigre,
//     - **entre 18,5 et 24,9 kg/m²**, on considère que la personne a une corpulence "normale",
//     - **entre 25 et 29,9 kg/m²**, on considère que la personne est en surpoids,
//     - **entre 30 à 34,9 kg/m²**, on considère que la personne est en obésité modérée,
//     - **entre 35 et 39,9 kg/m²**, on considère que la personne est en obésité sévère**,**
//     - **au-dessus de 40 kg/m²**, on considère que la personne est en obésité morbide.
// - Afficher l'IMC le plus haut
const result : number = Math.max.apply(peoples.map(o=>o.imc));
console.log(result.toFixed(1));





