//loading ring
window.onload = function () {
    document.getElementById('root').style.visibility='hidden';
};

function bodyLoaded() {
    document.getElementById('loader').style.visibility='hidden';
    document.querySelector('root').style.visibility='visible';
}