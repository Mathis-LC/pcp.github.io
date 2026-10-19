const FICHIER_EXCEL = "./tsti3_v1.xlsx";

const conteneur = document.getElementById("table-container");
const onglets = document.getElementById("sheet-tabs");
const compteurFeuilles = document.getElementById("sheet-count");
const compteur = document.getElementById("row-count");

let classeur = null;
let feuilleActive = "";
let nombreLignes = 0;

// Charge le fichier Excel
async function chargerClasseur() {
  try {
    const reponse = await fetch(FICHIER_EXCEL, {
      cache: "no-store"
    });

    if (!reponse.ok) {
      throw new Error(
        "Fichier Excel introuvable. Vérifiez son emplacement."
      );
    }

    const donnees = await reponse.arrayBuffer();

    classeur = XLSX.read(donnees, {
      type: "array",
      cellDates: true
    });

    if (!classeur.SheetNames.length) {
      throw new Error("Le classeur ne contient aucune feuille.");
    }

    // Affiche le nombre total de feuilles avec le bon accord
    const nombreFeuilles = classeur.SheetNames.length;

    compteurFeuilles.textContent =
      `${nombreFeuilles} feuille${nombreFeuilles > 1 ? "s" : ""}`;

    creerOnglets();

    // Affiche la première feuille
    afficherFeuille(classeur.SheetNames[0]);

  } catch (erreur) {
    conteneur.replaceChildren();

    const message = document.createElement("p");
    message.className = "message error";
    message.textContent = erreur.message;

    conteneur.appendChild(message);

    compteurFeuilles.textContent = "0 feuille";
    compteur.textContent = "0 ligne";
  }
}

// Crée les onglets des feuilles Excel
function creerOnglets() {
  onglets.replaceChildren();

  classeur.SheetNames.forEach((nom) => {
    const bouton = document.createElement("button");

    bouton.type = "button";
    bouton.className = "sheet-tab";
    bouton.textContent = nom;
    bouton.setAttribute("aria-pressed", "false");

    bouton.addEventListener("click", () => {
      afficherFeuille(nom);
    });

    onglets.appendChild(bouton);
  });
}

// Affiche une feuille Excel dans le tableau
function afficherFeuille(nom) {
  feuilleActive = nom;

  // Met à jour l'onglet actif
  onglets.querySelectorAll(".sheet-tab").forEach((bouton) => {
    const actif = bouton.textContent === nom;

    bouton.classList.toggle("active", actif);
    bouton.setAttribute("aria-pressed", String(actif));
  });

  const feuille = classeur.Sheets[nom];

  // Génère le tableau HTML à partir de la feuille Excel
  const html = XLSX.utils.sheet_to_html(feuille, {
    id: "excel-table"
  });

  // Analyse le HTML généré
  const documentTemporaire = new DOMParser().parseFromString(
    html,
    "text/html"
  );

  const tableau = documentTemporaire.querySelector("table");

  if (!tableau) {
    conteneur.textContent =
      "Impossible d'afficher cette feuille.";

    compteur.textContent = "0 ligne";
    return;
  }

  tableau.className = "excel-table";

  conteneur.replaceChildren(
    document.importNode(tableau, true)
  );

  // Calcule le nombre de lignes de données
  nombreLignes = Math.max(
    0,
    conteneur.querySelectorAll("tr").length - 1
  );

  // Affiche le nombre de lignes avec le bon accord
  compteur.textContent =
    `${nombreLignes} ligne${nombreLignes > 1 ? "s" : ""}`;
}

// Lance le chargement du classeur
chargerClasseur();