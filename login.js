// Simulated JSON data for user credentials
const users = [
    { email: "user@gmail.com", password: "123456" },
    { email: "admin@example.com", password: "123456" }
];

document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const email = document.getElementById('email').value;
    console.log("email");
    const password = document.getElementById('password').value;
    console.log("password");
    
    const user = users.find(user => user.email === email && user.password === password);
    
    if (user) {
        // Authentication successful
        alert('Login successful!');
        window.location.href = "./dashboard/dashboard.html";

    } else {
        // Authentication failed
        alert('Invalid email or password. Please try again.');
    }
});
