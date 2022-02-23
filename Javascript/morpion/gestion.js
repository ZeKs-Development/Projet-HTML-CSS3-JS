/*Variables globales*/
nbJoueur = 2; 
difficulte = 0;

vide = 0;
croix = 1;
rond = 2;
tour = croix;

plateau = [
    [vide, vide, vide],
    [vide, vide, vide],
    [vide, vide, vide]
];

casesVides = [
    'case:0:0', 'case:1:0', 'case:2:0',
    'case:0:1', 'case:1:1', 'case:2:1',
    'case:0:2', 'case:1:2', 'case:2:2'
];

fini = false;
/*//////////////////*/


//Fonctions
function morpion_init() //Initialise les variables globales et les canvas
{   
    //Chaque fois que la fonction est appelee, on reinitialise le jeu en prenant en compte les parametres du joueur

    //le nombre de joueurs
    if (document.getElementById("1joueur").checked)
    {
        nbJoueur = 1;

        //Si il y a un joueur on affiche les paramètres de l'IA
        document.getElementById("ai").style.visibility = "visible"; 
    }
    else
    {
        nbJoueur = 2;

        //Si il y a deux joueurs on n'affiche pas les paramètres de l'IA
        document.getElementById("ai").style.visibility = "hidden";
    }

    //le symbole choisi par le joueur
    if (document.getElementById("croix").checked)
        tour = croix;
    else
        tour = rond;

    //la difficulté
    difficulte = document.getElementById("choixDifficulte").value;


    //Initialisation des tableaux de cases
    plateau = [
        [vide, vide, vide],
        [vide, vide, vide],
        [vide, vide, vide]
    ];

    casesVides = [
        'case:0:0', 'case:1:0', 'case:2:0',
        'case:0:1', 'case:1:1', 'case:2:1',
        'case:0:2', 'case:1:2', 'case:2:2'
    ];


    fini = false;

    var span = document.getElementById("gagnant").textContent = "";

    //On dessine une première fois le plateau de jeu vide
    morpion_dessinerPlateau();

    //Si le joueur veut jouer en deuxieme, l'IA joue une premiere fois
    if (document.getElementById("ordi").checked && nbJoueur == 1)
    {
        if (tour == croix)
        {
            tour = rond; //On change le tour pour donner le symbole demander au joueur
        }
        else 
        {
            tour = croix; //Si le jouer veut la croix on fait jouer l'IA avec le rond et pareil pour l'inverse
        }

        morpion_IA();
    }
}


//Est appelée quand le joueur clique sur un canvas avec comme paramètre une chaîne de caractères contenant l'id du canvas
function morpion_clique(id) 
{
    if (!fini)
    {
        //On récupère le contexte du canvas sur lequel le jour a cliqué
        var context = document.getElementById(id).getContext("2d");

        //id.split(":")[0] vaut "case"
        var i = id.split(":")[1];
        var j = id.split(":")[2];

        if (plateau[i][j] == vide)
        {
            casesVides.splice(casesVides.indexOf(id), 1); //On supprime la case remplie de la liste des cases vides
            plateau[i][j] = tour;
            morpion_verifier(i, j); //On vérifie si le joueur a gagné
            morpion_dessinerSymbole(context); //On dessine

            //Si le joueur joue tout seul et que la partie n'est pas fini, on appelle l'IA qui va jouer à son tour
            if (nbJoueur == 1 && !fini)
                morpion_IA();
        }
    }
}

function morpion_verifier(i, j)
{
    //Ici on vérifie ligne par ligne, colone par colone et dans les deux diagonales s'il y a un alignement de trois mêmes symboles
    if (i == 0)
    {
        if (plateau[1][j] == tour && plateau[2][j] == tour)
            morpion_gagne();

        if (j == 0)
        {
            if (plateau[1][1] == tour && plateau[2][2] == tour)
                morpion_gagne();
        }
        else if (j == 2)
        {
            if (plateau[1][1] == tour && plateau[2][0] == tour)
                morpion_gagne();
        }
    }
    else if (i == 1)
    {
        if (plateau[0][j] == tour && plateau[2][j] == tour)
            morpion_gagne();

        if (j == 1)
        {
            if (plateau[2][0] == tour && plateau[0][2] == tour)
                morpion_gagne();

            if (plateau[0][0] == tour && plateau[2][2] == tour)
                morpion_gagne();
        }
    }
    else
    {
        if (plateau[0][j] == tour && plateau[1][j] == tour)
            morpion_gagne();

        if (j == 0)
        {
            if (plateau[1][1] == tour && plateau[0][2] == tour)
                morpion_gagne();
        }
        else if (j == 2)
        {
            if (plateau[1][1] == tour && plateau[0][0] == tour)
                morpion_gagne();
        }
    }

    if (j == 0)
    {
        if (plateau[i][1] == tour && plateau[i][2] == tour)
            morpion_gagne();
    }
    else if (j == 1)
    {
        if (plateau[i][0] == tour && plateau[i][2] == tour)
            morpion_gagne();
    }
    else
    {
        if (plateau[i][0] == tour && plateau[i][1] == tour)
            morpion_gagne();
    }

    if (fini) //Si un joueur a gagné, on sort de la fonction pour ne pas afficher égalité
        return;

    //On regarde si il n'y a pas égalité
    if (casesVides.length > 0) //Si une case est encore vide, on sort de la fonction pour ne pas afficher égalité
        return; 

    //Si on arrive au bout de la fonction c'est qu'il y a egalite entre les deux joueurs
    document.getElementById("gagnant").textContent = "Egalité pure et simple";
    fini = true;
}


//Si la joueur a gagné on lui fait savoir
function morpion_gagne()
{
    var span = document.getElementById("gagnant");
    if (tour == croix)
        span.textContent = "Le joueur qui joue avec la croix a gagné la partie";
    else 
        span.textContent = "Le joueur qui joue avec le rond a gagné la partie";

    fini = true; //On termine la partie
}