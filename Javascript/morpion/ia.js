function morpion_IA()
{
    if (difficulte == 0)
    {
        var index = Math.floor(Math.random() * Math.floor(casesVides.length)); //On prend l'index d'une case parmi les cases vides
        
        var caseJouee = casesVides[index];

        casesVides.splice(index, 1); //On supprime la case remplie de la liste des cases vides

        //caseJouee.split(":")[0] vaut "case"
        var i = caseJouee.split(":")[1];
        var j = caseJouee.split(":")[2];

        plateau[i][j] = tour;
        morpion_verifier(i, j); //On vérifie si le joueur a gagné
        morpion_dessinerSymbole(document.getElementById(caseJouee).getContext("2d")); //On dessine
    }
    else if (difficulte == 1)
    {
        var meilleurCase = casesVides[Math.floor(Math.random() * Math.floor(casesVides.length))]; //L'ordinateur commence sur une case aléatoire
        var scoreMeilleurCase = 0;

        for (var cases of casesVides)
        {
            //cases.split(":")[0] vaut "case"
            var i = cases.split(":")[1];
            var j = cases.split(":")[2];

            var scoreCase = morpion_regarderCasesVoisines(i, j, tour);

            if (scoreCase > scoreMeilleurCase) //On regarde si la case est la meilleur
            { 
                meilleurCase = cases;
                scoreMeilleurCase = scoreCase;

                if (scoreMeilleurCase == 100) //Si la meilleur case permet de gagne, on sort de la boucle for
                    break;
            }

            if (tour == croix) //Ces deux conditions permettent de verifier si le joueur adverse peut gagne
            {
                if (morpion_regarderCasesVoisines(i, j, rond) == 100)
                {
                    meilleurCase = cases; //Si c'est le cas on recupere la case
                    scoreMeilleurCase = 75; //On donne a la case le score de 75 pour qu'elle est plus de valeur que les cases 50
                }
            }
            else
            {
                if (morpion_regarderCasesVoisines(i, j, croix) == 100)
                {
                    meilleurCase = cases; //Si c'est le cas on recupere la case
                    scoreMeilleurCase = 75; //On donne a la case le score de 75 pour qu'elle est plus de valeur que les cases 50
                }
            }
        }

        //meilleurCase.split(":")[0] vaut "case"
        var i = meilleurCase.split(":")[1];
        var j = meilleurCase.split(":")[2];

        casesVides.splice(casesVides.indexOf(meilleurCase), 1); //On supprime la case remplie de la liste des cases vides
        plateau[i][j] = tour;
        morpion_verifier(i, j); //On vérifie si le joueur a gagné
        morpion_dessinerSymbole(document.getElementById(meilleurCase).getContext("2d")); //On dessine
    }
}

function morpion_regarderCasesVoisines(i, j, signe)
{
    var scoreCase = 0; //Variable attribuant un score à la case

    if (i == 0) //Verification des lignes
    {
        if (plateau[1][j] == signe)
            scoreCase = 50;

        if (plateau[2][j] == signe)
            scoreCase = 50;

        if (plateau[1][j] == signe && plateau[2][j] == signe)
            return 100; //Case gagnante

        if (j == 0) //Verification des diagonales
        {
            if (plateau[1][1] == signe)
                scoreCase = 50;

            if (plateau[2][2] == signe)
                scoreCase = 50;

            if (plateau[1][1] == signe && plateau[2][2] == signe)
                return 100; //Case gagnante

        }
                    
        else if (j == 2) //Verification des diagonales
        {
            if (plateau[1][1] == signe)
                scoreCase = 50;

            if (plateau[2][0] == signe)
                scoreCase = 50;

            if (plateau[1][1] == signe && plateau[2][0] == signe)
                return 100; //Case gagnante
        }
    }
    else if (i == 1) //Verification des lignes
    {
        if (plateau[0][j] == signe)
            scoreCase = 50;

        if (plateau[2][j] == signe)
            scoreCase = 50;

        if (plateau[0][j] == signe && plateau[2][j] == signe)
            scoreCase = 100; //Case gagnante

        if (j == 1) //Verification des diagonales
        {
            if (plateau[2][0] == signe)
                scoreCase = 50;

            if (plateau[0][2] == signe)
                scoreCase = 50;

            if (plateau[2][0] == signe && plateau[0][2] == signe)
                scoreCase = 100; //Case gagnante

            if (plateau[0][0] == signe)
                scoreCase = 50;

            if (plateau[2][2] == signe)
                scoreCase = 50;

            if (plateau[0][0] == signe && plateau[2][2] == signe)
                scoreCase = 100; //Case gagnante
        }   
    }
    else //Verification des lignes
    {
        if (plateau[0][j] == signe)
            scoreCase = 50;

        if (plateau[1][j] == signe)
            scoreCase = 50;

        if (plateau[0][j] == signe && plateau[1][j] == signe)
            return 100; //Case gagnante

        if (j == 0) //Verification des diagonales
        {
            if (plateau[1][1] == signe)
                scoreCase = 50;

            if (plateau[0][2] == signe)
                scoreCase = 50;

            if (plateau[1][1] == signe && plateau[0][2] == signe)
                return 100; //Case gagnante
        }
        else if (j == 2) //Verification des diagonales
        {
            if (plateau[1][1] == signe)
                scoreCase = 50;

            if (plateau[0][0] == signe)
                scoreCase = 50;

            if (plateau[1][1] == signe && plateau[0][0] == signe)
                return 100; //Case gagnante
        }
    }

    if (j == 0) //Verification des colones
    {
        if (plateau[i][1] == signe)
            scoreCase = 50;

        if (plateau[i][2] == signe)
            scoreCase = 50;

        if (plateau[i][1] == signe && plateau[i][2] == signe)
            return 100; //Case gagnante
    }
    else if (j == 1) //Verification des colones
    {
        if (plateau[i][0] == signe)
            scoreCase = 50;

        if (plateau[i][2] == signe)
            scoreCase = 50;

        if (plateau[i][0] == signe && plateau[i][2] == signe)
            return 100; //Case gagnante
    }
    else //Verification des colones
    {
        if (plateau[i][0] == signe)
            scoreCase = 50;

        if (plateau[i][1] == signe)
            scoreCase = 50;

        if (plateau[i][0] == signe && plateau[i][1] == signe)
            return 100; //Case gagnante
    }
    return scoreCase;
}