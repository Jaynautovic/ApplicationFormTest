const birthDate = document.getElementById("birthDatepicker");
const currentCountry = document.getElementById("countrySelect");
const phoneNumber = document.getElementById("phoneNumber");
const postalCode = document.getElementById("postalCodeInput");
const formOfAdress = document.getElementById("formOfAdress");
const selfdefinedFormOfAdress = document.getElementById("selfdefinedFormOfAdress");
const selfdefinedFormOfAdressInput = document.getElementById("chosenAdressInput");


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

/* Setting up German Language for the integrated calendar module */
$.fn.datepicker.dates['de'] = {
    days: ["Sonntag", "Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag"],
    daysShort: ["Son", "Mon", "Die", "Mit", "Don", "Fre", "Sam"],
    daysMin: ["So", "Mo", "Di", "Mi", "Do", "Fr", "Sa"],
    months: ["Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember"],
    monthsShort: ["Jän", "Feb", "Mär", "Apr", "Mai", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Dez"],
    today: "Heute",
    clear: "Löschen",
    format: "yyyy-MM-dd",
    weekStart: 1
    }

/* Enable the above defined calendar with the German Language */
$(document).ready(function(){
    $("#birthDatepicker").datepicker({
        language: "de",
        format: "dd.mm.yyyy",
        autoclose:true,
        todayBtn: true,
        clearBtn: true,
        startDate: "01.01.1900",
        endDate: new Date()
    });   
  })


/* Prevents overwriting the phone number field if there are more than 5 numbers in instanceof, as well as setting the max postal code to 9999 when Austria is selected */
currentCountry.addEventListener('input', function(){
    let value = currentCountry.options[currentCountry.selectedIndex].value;

    if (phoneNumber.value.length < 5) {
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

formOfAdress.addEventListener("change", function (){
    console.log("!!!")
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

console.log("?????")


