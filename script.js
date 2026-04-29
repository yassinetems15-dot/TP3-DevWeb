// 1. FORMULAIRE
const form = document.getElementById("inscriptionForm");
const message = document.getElementById("message");
const resultSection = document.getElementById("resultat");
const resultContent = document.getElementById("resultContent");

form.addEventListener("submit", function (event) {
  event.preventDefault();

  const nom = document.getElementById("nom").value.trim();
  const prenom = document.getElementById("prenom").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();
  const dateNaissance = document.getElementById("date_naissance").value;
  const filiere = document.getElementById("filiere").value;

  const genreChecked = document.querySelector('input[name="genre"]:checked');
  const modulesChecked = document.querySelectorAll(
    'input[name="modules"]:checked',
  );

  if (
    nom === "" ||
    prenom === "" ||
    email === "" ||
    password === "" ||
    dateNaissance === "" ||
    filiere === "" ||
    !genreChecked ||
    modulesChecked.length === 0
  ) {
    message.textContent = "Erreur : veuillez remplir tous les champs.";
    message.style.color = "red";
    resultSection.style.display = "none";
    return;
  }

  const modules = [];
  modulesChecked.forEach(function (module) {
    modules.push(module.value);
  });

  message.textContent = "Succès : formulaire envoyé avec succès.";
  message.style.color = "green";

  resultContent.innerHTML = `
    <p><strong>Nom :</strong> ${nom}</p>
    <p><strong>Prénom :</strong> ${prenom}</p>
    <p><strong>Email :</strong> ${email}</p>
    <p><strong>Date de naissance :</strong> ${dateNaissance}</p>
    <p><strong>Filière :</strong> ${filiere}</p>
    <p><strong>Genre :</strong> ${genreChecked.value}</p>
    <p><strong>Modules :</strong> ${modules.join(", ")}</p>
  `;

  resultSection.style.display = "block";
});

// 2. AJOUT DYNAMIQUE DES MODULES
const moduleInput = document.getElementById("moduleInput");
const addModuleBtn = document.getElementById("addModuleBtn");
const modulesList = document.getElementById("modulesList");

addModuleBtn.addEventListener("click", function () {
  const moduleName = moduleInput.value.trim();

  if (moduleName === "") {
    alert("Veuillez entrer le nom du module.");
    return;
  }

  const newItem = document.createElement("li");
  newItem.textContent = moduleName;
  modulesList.appendChild(newItem);

  moduleInput.value = "";
});

// 3. SUPPRESSION DES MODULES
modulesList.addEventListener("click", function (event) {
  if (event.target.tagName === "LI") {
    event.target.remove();
  }
});

// 4. MODE SOMBRE
const darkModeBtn = document.getElementById("darkModeBtn");

darkModeBtn.addEventListener("click", function () {
  document.body.classList.toggle("dark-mode");
});

// 5. CHARGEMENT DES UTILISATEURS AVEC FETCH
const loadUsersBtn = document.getElementById("loadUsersBtn");
const usersList = document.getElementById("usersList");
const userEmail = document.getElementById("userEmail");

loadUsersBtn.addEventListener("click", function () {
  fetch("https://jsonplaceholder.typicode.com/users")
    .then(function (response) {
      return response.json();
    })
    .then(function (users) {
      usersList.innerHTML = "";

      users.forEach(function (user) {
        const li = document.createElement("li");
        li.textContent = user.name;
        li.setAttribute("data-email", user.email);
        usersList.appendChild(li);
      });
    })
    .catch(function () {
      usersList.innerHTML =
        "<li>Erreur lors du chargement des utilisateurs.</li>";
    });
});

// 6. BONUS : AFFICHER EMAIL UTILISATEUR
usersList.addEventListener("click", function (event) {
  if (event.target.tagName === "LI") {
    const email = event.target.getAttribute("data-email");
    userEmail.textContent = "Email : " + email;
  }
});
