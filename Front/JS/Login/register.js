document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('registerForm').addEventListener('submit', function (event) {
        event.preventDefault();

        const data = {
            nome: document.getElementById('nome').value,
            cpf: document.getElementById('cpf').value,
            email: document.getElementById('email').value,
            senha: document.getElementById('senha').value,
            telefone: document.getElementById('telefone').value,
            data_nascimento: document.getElementById('data_nascimento').value,
            turno: document.getElementById('turno').value,
            role: document.getElementById('role').value
        };

        fetch('http://localhost:8080/auth/registrar', {
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
        
            document.querySelector('.nomeUsuarioErro').style.display = 'none';
            document.querySelector('.cpfUsuarioErro').style.display = 'none';
            document.querySelector('.emailUsuarioErro').style.display = 'none';
            document.querySelector('.telefoneUsuarioErro').style.display = 'none';
            document.querySelector('.senhaErro').style.display = 'none';
        
            if (msg.includes('Nome')) {
                document.querySelector('.nomeUsuarioErro').style.display = 'block';
            }
            if (msg.includes('CPF')) {
                document.querySelector('.cpfUsuarioErro').style.display = 'block';
            }
            if (msg.includes('Email')) {
                document.querySelector('.emailUsuarioErro').style.display = 'block';
            }
            if (msg.includes('Telefone')) {
                document.querySelector('.telefoneUsuarioErro').style.display = 'block';
            }
            if (msg.includes('Senha')) {
                document.querySelector('.senhaErro').style.display = 'block';
            }
        });
    });        
});
