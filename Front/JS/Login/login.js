document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('loginForm').addEventListener('submit', function (event) {
        event.preventDefault();

        const nome = document.getElementById('nome').value;
        const senha = document.getElementById('senha').value;

        const data = {
            nome: nome,
            senha: senha
        };

        fetch('http://localhost:8080/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(async response => {
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.erro || 'Erro desconhecido');
            }
            return response.text();
        })
        .then(token => {
            localStorage.setItem('token', token);
            localStorage.setItem('nome', nome);
            window.location.href = '../Geral/telaInicial.html';
        })
        .catch(error => {
            const msg = error.message;
            erroLogin(msg);
        });
    });
});

function erroLogin(msg) {

    if(msg === 'Usuário ou senha inválidos!'){
        document.querySelector('.loginErro').style.display = 'block';
    }
}