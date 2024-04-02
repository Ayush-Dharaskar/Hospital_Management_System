
var page='Patient';

//Array to store generated numbers
let generatedNumbers = [];
var randd;
// Function to generate a random integer between min and max (inclusive)
function generateRandomInteger(min, max) {
  // Check if all possible numbers are generated
  if (generatedNumbers.length === (max - min + 1)) {
    console.log("All possible numbers are generated.");
    return null; // Return null to indicate no available numbers left
  }

  let randomNum;
  do {
    randomNum = Math.floor(Math.random() * (max - min + 1)) + min;
  } while (generatedNumbers.includes(randomNum));

  // Store the generated number
  generatedNumbers.push(randomNum);
  randd=randomNum;
  
  return randomNum;
}

// Example usage:
const minRange = 10000;
const maxRange = 99999;

// Generate a random number
const randomNumber = generateRandomInteger(minRange, maxRange);
randd=randomNumber;

if (randomNumber !== null) {
  console.log("Generated random number:", randomNumber);
  console.log("Generated numbers:", generatedNumbers);
} else {
  console.log("No available numbers left.");
}


document.addEventListener("DOMContentLoaded", function() {
  var navigationMenu = document.getElementById("navbar");
  var links = navigationMenu.getElementsByTagName("a");
  
  // Get the current URL
  var currentUrl = window.location.href;
  var activeLinkName = ''; // Variable to store the name of the active link
  
  // Loop through each link
  for (var i = 0; i < links.length; i++) {
    var link = links[i];
    var linkUrl = link.href;
    
    // Check if the current URL contains the link URL
    if (currentUrl.includes(linkUrl)) {
      // Add the 'active' class to the link
      link.classList.add("active");
      // Store the name of the active link
      page = link.textContent.trim();
    }
  }
  
  // Use activeLinkName variable as needed
  console.log("Active link:", activeLinkName);
});
var but = document.getElementById('newpa');
if(but!=null){
  but.onclick = async function(event) {
    event.preventDefault(); 
    var formData = {
            firstName: document.getElementById("first-name").value,
            lastName: document.getElementById("last-name").value,
            email: document.getElementById("email").value,
            mobileNumber: document.getElementById("mobile-number").value,
            gender: document.getElementById("gender").value,
            dob: document.getElementById("dob").value,
            bloodGroup: document.getElementById("blood-group").value
          };
          console.log(formData);
          
        const response = await fetch('http://localhost:5005/newpatient', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ formData,randd })
    });
  }
}
// NEW PATIENT FORM
// document.getElementById("newpa").addEventListener("submit", async function(event) {
//   // Get the form and submit button
//   const form = document.getElementById('patientForm');
//     // Prevent the default form submission behavior
//     form.getElementById('newpa').addEventListener('click', async function(event) {
//       event.preventDefault();

//     // Extract form data
//     var formData = {
//       firstName: document.getElementById("first-name").value,
//       lastName: document.getElementById("last-name").value,
//       email: document.getElementById("email").value,
//       mobileNumber: document.getElementById("mobile-number").value,
//       gender: document.getElementById("gender").value,
//       dob: document.getElementById("dob").value,
//       bloodGroup: document.getElementById("blood-group").value
//     };
    
//     console.log(formData);
//     });
//     // const response = await fetch('http://localhost:5000/newpatient', {
//     //   method: 'POST',
//     //   headers: {
//     //     'Content-Type': 'application/json'
//     //   },
//     //   body: JSON.stringify({ formData,randd })
//     // });
//     // vardata = await response.json();
//     // formData=vardata.patient.formatted_dob;
//     // Print the extracted data to the console
// });
// function navigateTo(userType) {
//   page = userType;
//     if (userType === 'patient') {
//       page='patient';
//       window.location.href = 'patient-portal.html';
//     } else if (userType === 'doctor') {
//       page='doctor';
//       window.location.href = 'doctor-login.html';
//     } else if (userType === 'admin') {
//       page='admin';
//       window.location.href = 'admin-login.html';
//     }
//   }
  
// var logbutton = document.getElementById('newpa');
// if(logbutton!=null){
//   but.onclick = function() {
    
//   }
// }

  document.getElementById('loginForm').addEventListener('submit', async function(event) {
    event.preventDefault(); // Prevent default form submission
    
    // Get input values
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;
    
    var formData;
  
    try{
      if(page==='Patient'){
        const response = await fetch('http://localhost:5005/loginp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username: username })
      });
      vardata = await response.json();
      formData=vardata.patient.formatted_dob;
      }
      else if(page==='Doctor'){
        const response = await fetch('http://localhost:5005/logind', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username: username })
      });
      vardata = await response.json();
      formData=vardata.doctor.pass;
      }
    }
    catch(error){
      console.error('Error:', error);
    }
    console.log(formData);
    console.log(page);
    // Send a POST request to the server
    // fetch('http://localhost:5000/login', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json'
    //   },
    //   body: JSON.stringify(username)
    // })
    // .then(response => response.json())
    // .then(data => {
    //   if (data.success) {
    //     // Successful login, redirect based on user type
    //     formData = data;
    //   } else {
    //     // Invalid credentials, display error message
    //     document.getElementById('errorMessage').textContent = data.message;
    //   }
    // })
    // .catch(error => {
    //   console.error('Error:', error);
    // });
    // Dummy validation (replace with actual validation logic)
    if (page==='Patient' && password === formData) {
      // Successful login
      const username = encodeURIComponent(document.getElementById('username').value); // Assuming username is retrieved from an element with id 'username'
window.location.href = `patient-dashboard.html?patientId=${username}`;

  }
    else if (page === 'Doctor' && password === formData) {
      // Successful login
      window.location.href = 'doctor-dashboard.html';
    } 
    
    else if (page === 'Admin' && password === 'admin123' && username==='admin') {
        // Successful login
        window.location.href = 'admin-dashboard.html';
    }
    else {
      // Invalid credentials
      document.getElementById('errorMessage').textContent = 'Invalid username or password';
    }
  });
  