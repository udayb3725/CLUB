document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const correctUsername = 'satyam';
    const correctPassword = '9100757278';

    if (username === correctUsername && password === correctPassword) {
        window.location.href = 'shake.html'; // Replace with the filename of your dashboard HTML file
    } else {
        document.getElementById('errorMsg').textContent = 'Invalid username or password';
    }
});
