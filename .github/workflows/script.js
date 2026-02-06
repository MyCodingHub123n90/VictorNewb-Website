const h1 = document.querySelector('h1');
setTimeout(() => {
    h1.innerHTML = 'VictorNewb Systems';
    console.warn('VictorNewb Changes');
}, 1000);
h1.innerHTML = 'VictorNewb';

const button = document.querySelector('button');

button.addEventListener('click', function(){
 window.open('signup.html');
});
