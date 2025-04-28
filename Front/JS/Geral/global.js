document.addEventListener('DOMContentLoaded', function () {
    const username = localStorage.getItem('nome');

    if (username) {
        document.getElementById('username').textContent = username;
    } else {
        document.getElementById('username').textContent = 'Usuário';
    }
});

function sair() {
    localStorage.removeItem('token');
    localStorage.removeItem('nome');
    window.location.href = '../Login/login.html';
}

function toggleSidebar() {
    const sidebar = document.getElementById("sidebar");
    sidebar.classList.toggle("active");
  }
  