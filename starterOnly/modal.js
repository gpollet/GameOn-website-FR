function editNav() {
  var x = document.getElementById("myTopnav")
  if (x.className === "topnav") {
    x.className += " responsive"
  } else {
    x.className = "topnav"
  }
}

// DOM Elements
const modalbg = document.querySelector(".bground")
const modalBtn = document.querySelectorAll(".modal-btn")
const formData = document.querySelectorAll(".formData")
const modalCloseButton = document.querySelector(".close")
const modalSubmitButton = document.querySelector(".btn-submit")

// Add event listener to form inputs

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal))

// launch modal form
function launchModal() {
  modalbg.style.display = "block"
}

// Close modal event
modalCloseButton.addEventListener("click", closeModal)

// Close modal form
function closeModal() {
  modalbg.style.display = "none"
}

// Modal Form validation status
let firstNameIsValid
let lastNameIsValid
let emailIsValid
let birthdateIsValid
let tournamentQuantityIsValid
let tournamentLocationIsValid
let TOSAcceptedIsValid

// Checks all inputs and prevents submit if validation fails
function validate() {
  checkFirstName()
  checkLastName()
  checkEmail()
  checkBirthdate()
  checkTournamentQuantity()
  checkTournamentLocation()
  checkTOS()
  if (
    firstNameIsValid !== true ||
    lastNameIsValid !== true ||
    emailIsValid !== true ||
    birthdateIsValid !== true ||
    tournamentQuantityIsValid !== true ||
    tournamentLocationIsValid !== true ||
    TOSAcceptedIsValid !== true
  ) {
    console.log("Validation failed")
    event.preventDefault()
    displayFormErrors()
  }
}

// Check if first name is at least 2 characters long
function checkFirstName() {
  if (document.getElementById("first").value.length >= 2) {
    firstNameIsValid = true
  }
}

// Check if last name is at least 2 characters long
function checkLastName() {
  if (document.getElementById("last").value.length >= 2) {
    lastNameIsValid = true
  }
}

// Check if email is valid
function checkEmail() {
  let inputtedEmail = document.getElementById("email").value
  if (
    /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/.test(
      inputtedEmail
    )
  ) {
    emailIsValid = true
  }
}

// Check if birthdate is filled
// function checkBirthdate() {
//   if (
//     Date.parse(document.getElementById("birthdate").value) !== NaN ||
//     Date.parse(document.getElementById("birthdate").value) !==
//       undefined
//   ) {
//     birthdateIsValid = true
//   }
// }

function checkBirthdate() {
  let inputtedBirthdate = Date.parse(
    document.getElementById("birthdate").value
  )
  if (!isNaN(inputtedBirthdate)) {
    birthdateIsValid = true
  }
}

// Check if tournament quantity is a number - Note : HTML5 already does it, so this is more of a double-check
function checkTournamentQuantity() {
  let inputtedQuantity = parseInt(
    document.getElementById("quantity").value
  )
  if (isNaN(inputtedQuantity) || inputtedQuantity == undefined) {
    tournamentQuantityIsValid = false
  } else {
    tournamentQuantityIsValid = true
  }
}

// Check if a tournament location is selected by looping through the corresponding checkbox-input for checked status
function checkTournamentLocation() {
  let locationRadioButtons =
    document.querySelectorAll(".checkbox-input")
  let i = 0
  while (i < 6) {
    if (locationRadioButtons[i].checked == true) {
      tournamentLocationIsValid = true
    }
    i += 1
  }
}

// Check if term of use is ticked
function checkTOS() {
  if (document.getElementById("checkbox1").checked) {
    TOSAcceptedIsValid = true
  }
}

function displayFormErrors() {
  if (firstNameIsValid !== true) {
    formData[0].setAttribute("data-error-visible", true)
    formData[0].setAttribute(
      "data-error",
      "Veuillez entrer 2 caractères ou plus pour le champ du prénom."
    )
  } else {
    formData[0].removeAttribute("data-error-visible")
    formData[0].removeAttribute("data-error")
  }

  if (lastNameIsValid !== true) {
    formData[1].setAttribute("data-error-visible", true)
    formData[1].setAttribute(
      "data-error",
      "Veuillez entrer 2 caractères ou plus pour le champ du nom."
    )
  } else {
    formData[1].removeAttribute("data-error-visible")
    formData[1].removeAttribute("data-error")
  }
  if (emailIsValid !== true) {
    formData[2].setAttribute("data-error-visible", true)
    formData[2].setAttribute(
      "data-error",
      "Vérifiez que l'email saisi est valide."
    )
  } else {
    formData[2].removeAttribute("data-error-visible")
    formData[2].removeAttribute("data-error")
  }
  if (birthdateIsValid !== true) {
    formData[3].setAttribute("data-error-visible", true)
    formData[3].setAttribute(
      "data-error",
      "Vous devez entrer votre date de naissance."
    )
  } else {
    formData[3].removeAttribute("data-error-visible")
    formData[3].removeAttribute("data-error")
  }
  if (tournamentQuantityIsValid !== true) {
    formData[4].setAttribute("data-error-visible", true)
    formData[4].setAttribute(
      "data-error",
      "Vous devez saisir un nombre."
    )
  } else {
    formData[4].removeAttribute("data-error-visible")
    formData[4].removeAttribute("data-error")
  }
  if (tournamentLocationIsValid !== true) {
    formData[5].setAttribute("data-error-visible", true)
    formData[5].setAttribute(
      "data-error",
      "Vous devez choisir une option."
    )
  } else {
    formData[5].removeAttribute("data-error-visible")
    formData[5].removeAttribute("data-error")
  }
  if (TOSAcceptedIsValid !== true) {
    formData[6].setAttribute("data-error-visible", true)
    formData[6].setAttribute(
      "data-error",
      "Vous devez vérifier que vous acceptez les termes et conditions."
    )
  } else {
    formData[6].removeAttribute("data-error-visible")
    formData[6].removeAttribute("data-error")
  }
}
