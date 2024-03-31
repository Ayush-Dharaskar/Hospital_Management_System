
var page='patient';

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
  
  document.getElementById('loginForm').addEventListener('submit', async function(event) {
    event.preventDefault(); // Prevent default form submission
    
    // Get input values
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;
    
    var formData;
  
    try{
      if(page==='Patient'){
        const response = await fetch('http://localhost:5000/loginp', {
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
        const response = await fetch('http://localhost:5000/logind', {
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
      window.location.href = 'patient-dashboard.html';
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
  