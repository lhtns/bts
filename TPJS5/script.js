// Affichage de la date actuelle
document.getElementById("date-facture").textContent = new Date().toLocaleDateString("fr-FR");

// Ajouter une ligne
document.getElementById("ajouter-ligne").addEventListener("click", function () {
    const modele = document.getElementById("modeleLigne").cloneNode(true);
    modele.removeAttribute("id");
    modele.querySelectorAll("input").forEach(input => input.value = "");
    const lastRow = document.getElementById("lastligne");
    lastRow.parentNode.insertBefore(modele, lastRow);
});

// Remplir automatiquement
document.getElementById("remplir-auto").addEventListener("click", function () {
    const descriptions = ["Produit 1", "Produit 2", "Service 1", "Service 2"];
    document.querySelectorAll(".row:not(.lastrow)").forEach(row => {
        row.querySelector(".desc").value = descriptions[Math.floor(Math.random() * descriptions.length)];
        row.querySelector(".qte").value = Math.floor(Math.random() * 10 + 1);
        row.querySelector(".prix").value = (Math.random() * 100).toFixed(2);
    });
});

// Calculer les totaux
document.getElementById("calculer").addEventListener("click", function () {
    let sousTotal = 0;

    document.querySelectorAll(".row:not(.lastrow)").forEach(row => {
        const qte = parseFloat(row.querySelector(".qte").value) || 0;
        const prix = parseFloat(row.querySelector(".prix").value) || 0;
        const totalLigne = qte * prix;
        row.querySelector(".total").value = totalLigne.toFixed(2);
        sousTotal += totalLigne;
    });

    document.getElementById("sous-total").textContent = sousTotal.toFixed(2);

    const remisePourcentage = parseFloat(document.getElementById("remise").value) || 0;
    const remiseMontant = sousTotal * (remisePourcentage / 100);
    const totalApresRemise = sousTotal - remiseMontant;
    const taxe = totalApresRemise * 0.1; // Taxe à 10%
    const expedition = 5.00; // Coût d'expédition fixe
    const totalFinal = totalApresRemise + taxe + expedition;

    document.getElementById("remise-total").textContent = totalApresRemise.toFixed(2);
    document.getElementById("taxe-total").textContent = taxe.toFixed(2);
    document.getElementById("solde-total").textContent = totalFinal.toFixed(2);
});

// Annuler et réinitialiser tout
document.getElementById("annuler").addEventListener("click", function () {
    const lignes = document.querySelectorAll(".row:not(.lastrow):not(#modeleLigne)");
    lignes.forEach(ligne => ligne.remove());

    const modele = document.getElementById("modeleLigne");
    modele.querySelectorAll("input").forEach(input => {
        input.value = input.classList.contains("total") ? "0.00" : "";
    });

    document.getElementById("sous-total").textContent = "0.00";
    document.getElementById("remise-total").textContent = "0.00";
    document.getElementById("taxe-total").textContent = "0.00";
    document.getElementById("solde-total").textContent = "0.00";
});

// Imprimer la facture
document.getElementById("imprimer").addEventListener("click", function () {
    window.print();
});