const birthDate = document.getElementById("birthDatepicker");
const currentCountry = document.getElementById("countrySelect");
const phoneNumber = document.getElementById("phoneNumber");
const postalCode = document.getElementById("postalCodeInput");
const formOfAdress = document.getElementById("formOfAdress");
const selfdefinedFormOfAdress = document.getElementById("selfdefinedFormOfAdress");
const selfdefinedFormOfAdressInput = document.getElementById("chosenAdressInput");
const fileUploader = document.getElementById("fileUploader");
let maxMediaSize = window.matchMedia("(max-width: 768px)");
const inputHelpText = document.getElementById("inputHelpText");
const cardClass = document.getElementById("cardClass");

// Example starter JavaScript for disabling form submissions if there are invalid fields
(function () {
    'use strict'

    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    var forms = document.querySelectorAll('.needs-validation')

    // Loop over them and prevent submission
    Array.prototype.slice.call(forms)
        .forEach(function (form) {
            form.addEventListener('submit', function (event) {
                if (!form.checkValidity()) {
                    event.preventDefault()
                    event.stopPropagation()
                }

                form.classList.add('was-validated')
            }, false)
        })
})();


/* Prevents overwriting the phone number field if there are more than 5 numbers in instance of, as well as setting the max postal code to 9999 when Austria is selected */
currentCountry.addEventListener('input', function(){
    let value = currentCountry.options[currentCountry.selectedIndex].value;

    if (phoneNumber.value.length <= 5) {
        phoneNumber.value = value
    }

    if(value === "+43"){
        postalCode.setAttribute("min", "1000")
        postalCode.setAttribute("max", "9999")
    } else {
        postalCode.setAttribute("min", "0")
        postalCode.setAttribute("max", "99999999")
    }
})

/* Looks out if the user wants to have a custom form of adress and enables the field to write it */
formOfAdress.addEventListener("change", function (){
    let formOfAdressValue = formOfAdress.value

    if(formOfAdressValue === "Selbstdefiniert") {
        selfdefinedFormOfAdress.classList.remove('visually-hidden')
        selfdefinedFormOfAdressInput.disabled = false
        selfdefinedFormOfAdressInput.required = true

    } else {
        selfdefinedFormOfAdress.classList.add('visually-hidden')
        selfdefinedFormOfAdressInput.disabled = true
        selfdefinedFormOfAdressInput.required = false
        selfdefinedFormOfAdressInput.value = ""
    }
})

/*Adjusts the File Uploader to a Mobile or Stationary View */
function adjustInputToMediaSize(x) {
    if (x.matches) { // If media query matches
        fileUploader.classList.add('form-control')
        fileUploader.classList.remove('file')
        inputHelpText.classList.remove('visually-hidden')
        console.log(cardClass.classList)
    } else {
        cardClass.classList.add('card')
        fileUploader.classList.add('file')
        inputHelpText.classList.add('visually-hidden')
    }
  }

adjustInputToMediaSize(maxMediaSize) // Call listener function at run time
maxMediaSize.addListener(adjustInputToMediaSize) // Attach listener function on state changes

/* Adds the dropdown checkboxmenu for the available jobs */
window.onload = (event) => {
initMultiselect();
};

function initMultiselect() {
    checkboxStatusChange();

    document.addEventListener("click", function(evt) {
        var flyoutElement = document.getElementById('myMultiselect'),
        targetElement = evt.target; // clicked element

        do {
        if (targetElement == flyoutElement) {
            // This is a click inside. Do nothing, just return.
            //console.log('click inside');
            return;
        }

        // Go up the DOM
        targetElement = targetElement.parentNode;
        } while (targetElement);

        // This is a click outside.
        toggleCheckboxArea(true);
        //console.log('click outside');
});
}
function checkboxStatusChange() {
var multiselect = document.getElementById("mySelectLabel");
var multiselectOption = multiselect.getElementsByTagName('option')[0];

var values = [];
var checkboxes = document.getElementById("mySelectOptions");
var checkedCheckboxes = checkboxes.querySelectorAll('input[type=checkbox]:checked');

for (const item of checkedCheckboxes) {
    var checkboxValue = item.getAttribute('value');
    values.push(checkboxValue);
}

var dropdownValue = "Nothing is selected";
if (values.length > 0) {
    dropdownValue = values.join(', ');
}

multiselectOption.innerText = dropdownValue;
}

function toggleCheckboxArea(onlyHide = false) {
var checkboxes = document.getElementById("mySelectOptions");
var displayValue = checkboxes.style.display;

if (displayValue != "block") {
    if (onlyHide == false) {
    checkboxes.style.display = "block";
    }
} else {
    checkboxes.style.display = "none";
}
}