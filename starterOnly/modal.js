// 1- Variables

// DOM Elements
const modalbg = document.querySelector(".bground")
const firstNameInput = document.getElementById("first")
const lastNameInput = document.getElementById("last")
const emailInput = document.getElementById("email")
const birthdateInput = document.getElementById("birthdate")
const tournamentQuantityInput = document.getElementById("quantity")

// locationData class added to the location radio buttons since .checkbox-input applies to all input checkboxes and radio buttons of the form.
const locationRadioButtons = document.querySelectorAll(
  ".locationData .checkbox-input"
)
const locationInput = document.querySelector(
  ".locationData > .checkbox-input"
)
const TOSCheckbox = document.getElementById("checkbox1")

// Modal Form validation status and errorMessage to display for each input field if its validation fails
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

// 2- Code moteur

// Add an event listener to the mobile navigation icon
document
  .querySelector(".main-navbar")
  .addEventListener("click", editNav)

// launch modal event
document
  .querySelectorAll(".modal-btn")
  .forEach((btn) => btn.addEventListener("click", launchModal))

// Submit modal form event
document
  .querySelector(".btn-submit")
  .addEventListener("click", validate)

// Close modal event
document.querySelector(".close").addEventListener("click", closeModal)

// Listen to input changes after validation failed to help user correctly fill the fields
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

// 3- Fonctions

// launch modal form
function launchModal() {
  modalbg.style.display = "block"
}

// Open the navigation menu on mobile
function editNav() {
  const mobileNavigationIcon = document.querySelector(".icon")
  let topNavigation = document.getElementById("myTopnav")
  if (topNavigation.className === "topnav") {
    topNavigation.className += " responsive"
    mobileNavigationIcon.style.color = "white"
  } else {
    topNavigation.className = "topnav"
    mobileNavigationIcon.removeAttribute("style")
  }
  return false
}

// Close modal form
function closeModal() {
  modalbg.style.display = "none"
}

// Checks all inputs and prevents submit if validation fails
function validate(event) {
  let validationStatus = true
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
    displayConfirmationMessage(event)
  }
}

// Check if first name is at least 2 characters long
function checkFirstName() {
  displayFormErrors(
    firstNameInput,
    "firstName",
    firstNameInput.value.length >= 2
  )
}

// Check if last name is at least 2 characters long
function checkLastName() {
  displayFormErrors(
    lastNameInput,
    "lastName",
    lastNameInput.value.length >= 2
  )
}

// Check if email is valid
function checkEmail() {
  displayFormErrors(
    emailInput,
    "email",
    /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/.test(
      emailInput.value
    )
  )
}

// Check if birthdate is filled
function checkBirthdate() {
  displayFormErrors(
    birthdateInput,
    "birthdate",
    !isNaN(Date.parse(birthdateInput.value))
  )
}

// Check if tournament quantity is a number - Note : HTML5 already does it, so this is more of a double-check
function checkTournamentQuantity() {
  displayFormErrors(
    tournamentQuantityInput,
    "tournamentQuantity",
    !isNaN(parseInt(tournamentQuantityInput.value >= 0))
  )
}

// Check if a tournament location is selected by looping through the corresponding checkbox-input for checked status
function checkTournamentLocation() {
  let validationCondition = false
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
  displayFormErrors(TOSCheckbox, "TOSAccepted", TOSCheckbox.checked)
}

// Display error messages for fields that did not pass the validation process
function displayFormErrors(target, targetEntry, validationCondition) {
  listenToInput()
  for (let [key, value] of Object.entries(formEntries)) {
    // Finds the field and update its (boolean) validation status in object formEntries
    if (key.includes(targetEntry)) {
      value.status = validationCondition
      if (!value.status) {
        target.parentNode.setAttribute(
          "data-error",
          value.errorMessage
        )
      }
    }
    target.parentNode.setAttribute(
      "data-error-visible",
      !validationCondition
    )
  }
}

// Display confirmation message on successful validation
function displayConfirmationMessage(event) {
  const modalForm = document.querySelector(".modal-body > form")
  let modalBodyInitialHeight = modalForm.scrollHeight
  event.preventDefault()
  modalForm.remove()
  const confirmationBlock = document.createElement("div")
  document.querySelector(".modal-body").appendChild(confirmationBlock)
  confirmationBlock.setAttribute(
    "style",
    `height: ${modalBodyInitialHeight}px; display: flex;flex-direction: column;justify-content: space-between;align-items: center;`
  )
  const confirmationElement = document.createElement("p")
  confirmationElement.textContent = "Merci pour votre inscription"
  confirmationElement.setAttribute(
    "style",
    "margin-top: 60%; font-size: 35px; text-align: center;"
  )
  const closeConfirmation = document.createElement("button")
  closeConfirmation.textContent = "Fermer"
  closeConfirmation.classList.add("btn-submit")
  closeConfirmation.classList.add("button")
  closeConfirmation.addEventListener("click", closeModal)
  confirmationBlock.appendChild(confirmationElement)
  confirmationBlock.appendChild(closeConfirmation)
}
