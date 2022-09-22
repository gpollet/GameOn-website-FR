// 1- Variables
let validationStatus
const firstNameInput = document.getElementById("first")
const lastNameInput = document.getElementById("last")
const emailInput = document.getElementById("email")
const birthdateInput = document.getElementById("birthdate")
const tournamentQuantityInput = document.getElementById("quantity")
const locationRadioButtons = document.querySelectorAll(
  ".locationData .checkbox-input"
)
const locationInput = document.querySelector(
  ".locationData > .checkbox-input"
)
const TOSCheckbox = document.getElementById("checkbox1")
const modalBody = document.querySelector(".modal-body")
const modalForm = document.querySelector(".modal-body > form")
let validationCondition

// DOM Elements
const modalbg = document.querySelector(".bground")
const modalBtn = document.querySelectorAll(".modal-btn")
const formData = document.querySelectorAll(".formData")
const modalCloseButton = document.querySelector(".close")
const modalSubmitButton = document.querySelector(".btn-submit")

function editNav() {
  var x = document.getElementById("myTopnav")
  if (x.className === "topnav") {
    x.className += " responsive"
  } else {
    x.className = "topnav"
  }
}

// Add event listener to form inputs

// 2- Code moteur
// Add an event listener on each form input to display error message where needed
// formData.forEach((entry) => entry.addEventListener("click"), validate())
// formData.forEach((btn) => btn.addEventListener("change", validate))

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal))

// launch modal form
function launchModal() {
  modalbg.style.display = "block"
}

// Submit modal form event
modalSubmitButton.addEventListener("click", validate)

// Close modal event
modalCloseButton.addEventListener("click", closeModal)

// Close modal form, hide all error messages and reset input fields values
function closeModal() {
  for (let formItem of formData) {
    formItem.setAttribute("data-error-visible", false)
  }
  modalbg.style.display = "none"
  let inputFields = document.querySelectorAll(".formData input")
  for (let field of inputFields) {
    field.value = null
  }
  for (let button of locationRadioButtons) {
    button.checked = false
  }
}

// Modal Form validation status
let formEntries = {
  firstName: {
    status: false,
    errorMessage:
      "Veuillez entrer 2 caractères ou plus pour le champ du prénom.",
  },
  lastName: {
    status: false,
    errorMessage:
      "Veuillez entrer 2 caractères ou plus pour le champ du nom.",
  },
  email: {
    status: false,
    errorMessage: "Vérifiez que l'email saisi est valide.",
  },
  birthdate: {
    status: false,
    errorMessage: "Vous devez entrer votre date de naissance.",
  },
  tournamentQuantity: {
    status: false,
    errorMessage: "Vous devez saisir un nombre.",
  },
  tournamentLocation: {
    status: false,
    errorMessage: "Vous devez choisir une option.",
  },
  TOSAccepted: {
    status: false,
    errorMessage:
      "Vous devez vérifier que vous acceptez les termes et conditions.",
  },
}

// Checks all inputs and prevents submit if validation fails
function validate() {
  validationStatus = true
  checkFirstName()
  checkLastName()
  checkEmail()
  checkBirthdate()
  checkTournamentQuantity()
  checkTournamentLocation()
  checkTOS()
  for (let [key, value] of Object.entries(formEntries)) {
    if (!value.status) {
      validationStatus = false
    }
  }
  if (!validationStatus) {
    event.preventDefault()
  } else {
    displayValidation()
  }
}

// Check if first name is at least 2 characters long
function checkFirstName() {
  validationCondition = firstNameInput.value.length >= 2
  displayFormErrors(firstNameInput, "firstName", validationCondition)
}

// Check if last name is at least 2 characters long
function checkLastName() {
  validationCondition = lastNameInput.value.length >= 2
  displayFormErrors(lastNameInput, "lastName", validationCondition)
}

// Check if email is valid
function checkEmail() {
  validationCondition =
    /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/.test(
      emailInput.value
    )
  displayFormErrors(emailInput, "email", validationCondition)
}

// Check if birthdate is filled
function checkBirthdate() {
  validationCondition = !isNaN(Date.parse(birthdateInput.value))
  displayFormErrors(birthdateInput, "birthdate", validationCondition)
}

// Check if tournament quantity is a number - Note : HTML5 already does it, so this is more of a double-check
function checkTournamentQuantity() {
  let inputtedQuantity = parseInt(tournamentQuantityInput.value)
  validationCondition = !isNaN(inputtedQuantity)
  displayFormErrors(
    tournamentQuantityInput,
    "tournamentQuantity",
    validationCondition
  )
}

// Check if a tournament location is selected by looping through the corresponding checkbox-input for checked status
function checkTournamentLocation() {
  validationCondition = false
  locationRadioButtons.forEach((button) => {
    if (button.checked) {
      validationCondition = true
    }
  })
  displayFormErrors(
    locationInput,
    "tournamentLocation",
    validationCondition
  )
}

// Check if term of use is ticked
function checkTOS() {
  validationCondition = TOSCheckbox.checked
  displayFormErrors(TOSCheckbox, "TOSAccepted", validationCondition)
}

// Display error messages for fields that did not pass the validation process
function displayFormErrors(target, targetEntry, validationCondition) {
  listenToInput()
  let errorMessage
  for (let [key, value] of Object.entries(formEntries)) {
    if (key.includes(targetEntry)) {
      value.status = validationCondition
      if (!value.status) {
        errorMessage = value.errorMessage
        target.parentNode.setAttribute("data-error", errorMessage)
      }
    }
    target.parentNode.setAttribute(
      "data-error-visible",
      !validationCondition
    )
  }
}

// Listen to input changes after validation failed to help user to correctly fill the fields
function listenToInput() {
  firstNameInput.addEventListener("input", checkFirstName)
  lastNameInput.addEventListener("input", checkLastName)
  emailInput.addEventListener("input", checkEmail)
  birthdateInput.addEventListener("change", checkBirthdate)
  tournamentQuantityInput.addEventListener(
    "change",
    checkTournamentQuantity
  )
  for (let button of locationRadioButtons) {
    button.addEventListener("change", checkTournamentLocation)
  }
  TOSCheckbox.addEventListener("change", checkTOS)
}

// Display confirmation message on successful validation
function displayValidation() {
  event.preventDefault()
  const confirmationElement = document.createElement("p")
  confirmationElement.textContent = "Merci pour votre inscription !"
  modalForm.style.display = "none"
  modalBody.appendChild(confirmationElement)
  confirmationElement.classList.add("confirmation-text")
}
