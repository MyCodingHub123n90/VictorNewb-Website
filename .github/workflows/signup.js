const h1 = document.querySelector('h1');
setTimeout(() => {
    h1.innerHTML = 'VictorNewb Systems';
    console.warn('VictorNewb Changes');
}, 1000);
h1.innerHTML = 'VictorNewb';




function _showError(message){
    const el = document.getElementById('errorMsg');
    if(el) el.textContent = message;
}

function validate(){
    const emailEl = document.getElementById('emailValue');
    const pwdEl = document.getElementById('passwordValue');
    const email = (emailEl && emailEl.value || '').trim();
    const password = (pwdEl && pwdEl.value) || '';

    _showError('');

    if(!email){
        _showError('Please enter your email address.');
        emailEl && emailEl.focus();
        return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!emailRegex.test(email)){
        _showError('Please enter a valid email address.');
        emailEl && emailEl.focus();
        return false;
    }

    if(!password){
        _showError('Please enter a password.');
        pwdEl && pwdEl.focus();
        return false;
    }

    if(password.length < 6){
        _showError('Password must be at least 6 characters long.');
        pwdEl && pwdEl.focus();
        return false;
    }

    // For demo purposes only: store credentials in localStorage (not secure)
    localStorage.setItem('email', email);
    localStorage.setItem('password', password);

    // Show success and redirect to login
    _showError('');
    alert('Account created! Please sign in with your credentials.');
    window.location.href = 'login.html';
    return false;
}