/*Variables globales*/
nbErreurs = 0;
motMystere = "";

couleur = "#a2999e";
/*//////////////////*/


//Fonctions
function pendu_init()
{   
    //dessin de la potence
    var context = document.getElementById("potence").getContext("2d"); //On récupère le contexte du canvas

    context.beginPath();
    context.moveTo(80, 20);
    context.lineTo(320, 20);
    context.moveTo(160, 20);
    context.lineTo(160, 299);
    context.moveTo(20, 299);
    context.lineTo(380, 299);
    context.closePath();
    context.strokeStyle = couleur;
    context.lineWidth = 3;
    context.stroke();

    var context = document.getElementById("mot").getContext("2d"); //On récupère le contexte du canvas

    context.font = "2.5em helvetica";
    context.fillStyle = couleur;
    context.fillText(motMystere, 0, 60);
}

function pendu_erreur()
{   

    nbErreurs += 1;
    var context = document.getElementById("potence").getContext("2d"); //On récupère le contexte du canvas

    switch (nbErreurs)
    {
        case 1:
        context.beginPath(); //Dessin de la corde
        context.moveTo(280, 20);
        context.lineTo(280, 40);
        break;

        case 2:
        context.beginPath(); //Dessin de la tete
        context.arc(280, 60, 20, 0, 2 * Math.PI);
        break;

        case 3:
        context.beginPath(); //Dessin du tronc
        context.moveTo(280, 80);
        context.lineTo(280, 180);
        break;

        case 4:
        context.beginPath(); //Dessin du bras gauche
        context.moveTo(280, 100);
        context.lineTo(260, 140);
        break;

        case 5:
        context.beginPath(); //Dessin du bras droit
        context.moveTo(280, 100);
        context.lineTo(300, 140);
        break;

        case 6:
        context.beginPath(); //Dessin de la jambe gauche
        context.moveTo(280, 180);
        context.lineTo(260, 280);
        break;

        case 7:
        context.beginPath(); //Dessin de la jambe droite
        context.moveTo(280, 180);
        context.lineTo(300, 280);
        break;
    }

    context.strokeStyle = couleur;
    context.lineWidth = 2;
    context.stroke();
}