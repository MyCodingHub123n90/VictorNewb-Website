// Auth helpers - check if user is logged in
function isLoggedIn() {
    return localStorage.getItem('user_id') && localStorage.getItem('user_email');
}

function getCurrentUser() {
    if (!isLoggedIn()) return null;
    return {
        id: localStorage.getItem('user_id'),
        email: localStorage.getItem('user_email'),
        name: localStorage.getItem('user_name') || 'User'
    };
}

function logout() {
    localStorage.removeItem('user_id');
    localStorage.removeItem('user_email');
    localStorage.removeItem('user_name');
    window.location.href = 'login.html';
}

// Protect dashboard: if not logged in, redirect to login
function ensureLoggedIn() {
    if (!isLoggedIn()) {
        window.location.href = '../login.html';
    }
}
