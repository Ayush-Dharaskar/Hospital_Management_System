function navigateTo(userType) {
    if (userType === 'patient') {
      window.location.href = 'patient-portal.html';
    } else if (userType === 'doctor') {
      window.location.href = 'doctor-login.html';
    } else if (userType === 'admin') {
      window.location.href = 'admin-login.html';
    }
  }
  
  document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent default form submission
    
    // Get input values
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;
  
    // Dummy validation (replace with actual validation logic)
    if (username === 'doctor' && password === 'password') {
      // Successful login
      window.location.href = 'doctor-dashboard.html';
    } 
    if (username === 'patient' && password === 'password') {
        // Successful login
        window.location.href = 'patient-dashboard.html';
    }
    if (username === 'admin' && password === 'password') {
        // Successful login
        window.location.href = 'admin-dashboard.html';
    }
    else {
      // Invalid credentials
      document.getElementById('errorMessage').textContent = 'Invalid username or password';
    }
  });
  