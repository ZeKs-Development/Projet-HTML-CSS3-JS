/*Variables globales*/
tailleCanvas = 100;
couleur = "#a2999e";
largeur = 2;
/*//////////////////*/

function morpion_dessinerPlateau()
{
    //dessin du plateau de jeu
    for (var j = 0; j < 3; j++)
    {
        for (var i = 0; i < 3; i++)
        {
            var canvas = document.getElementById("case:" + i + ":" + j); //On récupère le canvas qui a pour id: "case:i:j"
            canvas.width  = tailleCanvas;
            canvas.height = tailleCanvas;
            var context = canvas.getContext("2d");

            context.clearRect(0, 0, 100, 100);

            context.beginPath();
            context.moveTo(0, 0);
            context.lineTo(0, tailleCanvas);
            context.lineTo(tailleCanvas, tailleCanvas);
            context.lineTo(tailleCanvas, 0);
            context.closePath();
            context.strokeStyle = couleur;
            context.lineWidth = largeur;
            context.stroke();
        }
    }
}

function morpion_dessinerSymbole(context)
{
    const PI = Math.PI;

    if (tour == croix)
    {
        //Ici on dessine la croix avec une barre qui va de gauche à droite et l'autre de droite à gauche
        context.beginPath();
        context.moveTo(20, 20);
        context.lineTo(tailleCanvas - 20, tailleCanvas - 20); 
        context.moveTo(tailleCanvas - 20, 20);
        context.lineTo(20, tailleCanvas - 20);
        context.strokeStyle = couleur;
        context.lineWidth = largeur;
        context.stroke();

        context.beginPath();
        context.arc(tailleCanvas / 2, tailleCanvas / 4, 5, 0, 2 * PI);
        context.arc(tailleCanvas / 2, 3 * tailleCanvas / 4, 5, 0, 2 * PI);
        context.arc(tailleCanvas / 2, tailleCanvas / 4, 5, 0, 2 * PI);
        context.arc(tailleCanvas / 2, tailleCanvas / 4, 5, 0, 2 * PI);
        context.fillStyle = couleur;
        context.lineWidth = largeur;
        context.fill();
        tour = rond;
    }
    else
    {
        //Ici on dessine le cercle en le positionnant au milieu du canvas avec un rayon de la moitié de la taille du canvas
        context.strokeStyle = couleur;
        context.lineWidth = largeur;

        context.beginPath();
        context.arc(50, 30, 20, PI/2, 3 * PI/2);
        context.stroke();

        context.beginPath();
        context.arc(50, 50, 40, 3 * PI/2, PI/2);
        context.stroke();

        context.beginPath();
        context.arc(50, 70, 20,  3 * PI/2, PI/2);
        context.stroke();

        context.beginPath();
        context.arc(50, 50, 40,  PI/2, 3 * PI/2);
        context.stroke();

        tour = croix;
    }
}