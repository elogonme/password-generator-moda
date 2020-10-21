// Main Code
criteriaDialog(); // Start criteria dialog function to monitor state of input

var isUppercaseChecked;
var isLowercaseChecked;
var isNumbersChecked;
var isSpecialChecked;
var passwordLength;

// Function for popup Password criteria dialog - bootstrap modal
function criteriaDialog() {
  'use strict';
  window.addEventListener('load', function() {
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    var forms = document.getElementsByClassName('needs-validation');
    
    // Loop over them and prevent submission
    var validation = Array.prototype.filter.call(forms, function(form) {
      form.addEventListener('submit', function(event) {
        isUppercaseChecked = document.getElementById('uppercase').checked;
        isLowercaseChecked = document.getElementById('lowercase').checked;
        isNumbersChecked = document.getElementById('numbers').checked;
        isSpecialChecked = document.getElementById('special').checked;

        var formValidity = (isUppercaseChecked || isLowercaseChecked || isNumbersChecked || isSpecialChecked);
        
       if (!formValidity || !form.checkValidity() ) {
          document.getElementById('error').style.display = 'block';
          event.preventDefault();
          event.stopPropagation();
          
        } else {
          // Prevent default action of submitting form and close modal
          event.preventDefault();
          closeModal();
          document.getElementById('error').style.display = 'none'; // Remove error message
          // form.classList.add('was-validated');
          passwordLength = document.getElementById("password-length").value
          var password = generatePassword(passwordLength, isUppercaseChecked, isLowercaseChecked, isNumbersChecked, isSpecialChecked);
          writePassword(password);
          form.reset(); // Reset form for next input
        };
        
      }, false);
    });
  }, false);
};

// Helper functons
// ----------------------------------------------
// Write password to the password textarea
function writePassword(password) { 
  var passwordText = document.querySelector("#password");
  
  // Assign generated password to be displayed in passwordText area
  passwordText.value = password;
};

function generatePassword(passwordLength, isUppercaseChecked, isLowercaseChecked, isNumbersChecked, isSpecialChecked) {
  
  // Character sets to choose from
  var lowercaseCharSet = 'abcdefghijklmnopqrstuvwxyz';
  var uppercaseCharSet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  var numericCharSet = '0123456789'
  var specialCharSet = ' !"#$%&()*+,-./:;<=>?@[\]^_`{|}~' + "'";
  
  var password = '';
  var charsetToUse ='';

    // uppercase = confirm('Would you like to include Uppercase characters in your password?');
    if (isUppercaseChecked) {
      charsetToUse = uppercaseCharSet; // Include uppercase to choose from
    };

    // Prompt if include lowercase
    // lowercase = confirm('Would you like to include Lowercase characters in your password?');
    if (isLowercaseChecked) {
      charsetToUse += lowercaseCharSet; // Include lowercase to choose from
    };
    
    //Prompt if include numeric
    // numeric = confirm('Would you like to include Numeric characters in your password?');
    if (isNumbersChecked) {
      charsetToUse += numericCharSet; // Include lowercase to choose from
    };

    //Prompt if include special characters
    // special = confirm('Would you like to include Special characters in your password?');
    if (isSpecialChecked) {
      charsetToUse += specialCharSet; // Include lowercase to choose from
    };
  
  // Generate password based on criterias
  // Loop to repeat to generate each character in password
  for (var i = 1; i <= passwordLength; i++) {
    positon = Math.floor(Math.random() * (charsetToUse.length)); // Generate position from 0 to length of password - 1
    password += charsetToUse.charAt(positon); // pick chatacter from charSet and add it to password string
  };
  
  console.log(password + '   Password length: ' + password.length); // For testing to confirm password

  // Return generated password
  return password;
};
// ----------------------------
function closeModal() {
  // get modal
  const modal = document.getElementById('criteriaModal');

  // change state like in hidden modal
  modal.classList.remove('show');
  modal.setAttribute('aria-hidden', 'true');
  modal.setAttribute('style', 'display: none');

  // get modal backdrop
  const modalBackdrops = document.getElementsByClassName('modal-backdrop');

  // remove opened modal backdrop
    document.body.removeChild(modalBackdrops[0]);
}
