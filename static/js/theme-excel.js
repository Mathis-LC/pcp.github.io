
(() => {
  const CLE_THEME = "theme-excel";
  const racine = document.documentElement;
  const bouton = document.getElementById("theme-toggle");

  if (!bouton) {
    return;
  }

  // Applique le thème et actualise le bouton
  function appliquerTheme(theme) {
    const sombre = theme === "dark";

    racine.dataset.theme = sombre ? "dark" : "light";

    bouton.textContent = sombre
      ? "☀️"
      : "🌙";

    bouton.setAttribute(
      "aria-label",
      sombre
        ? "Activer le thème clair"
        : "Activer le thème sombre"
    );

    bouton.setAttribute(
      "aria-pressed",
      String(sombre)
    );
  }

  // Restaure le thème enregistré
  let themeEnregistre = null;

  try {
    themeEnregistre = localStorage.getItem(CLE_THEME);
  } catch (erreur) {
    // Le thème fonctionnera aussi si le stockage est indisponible.
  }

  const themeInitial =
    themeEnregistre === "dark" || themeEnregistre === "light"
      ? themeEnregistre
      : "light";

  appliquerTheme(themeInitial);

  // Change de thème au clic
  bouton.addEventListener("click", () => {
    const nouveauTheme =
      racine.dataset.theme === "dark" ? "light" : "dark";

    appliquerTheme(nouveauTheme);

    try {
      localStorage.setItem(CLE_THEME, nouveauTheme);
    } catch (erreur) {
      // Le changement reste fonctionnel sans sauvegarde.
    }
  });
})();