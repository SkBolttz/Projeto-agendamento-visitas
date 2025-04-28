document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('formEmpresa').addEventListener('submit', function (event) {
        event.preventDefault();

        const token = localStorage.getItem('token');

        const dados = {
            nomeFantasia: document.getElementById('nome_fantasia').value,
            razaoSocial: document.getElementById('razao_social').value,
            cnpj: document.getElementById('cnpj').value,
            email: document.getElementById('email').value,
            telefone: document.getElementById('telefone').value,
            endereco:{
                logradouro: document.getElementById('logradouro').value,
                numero: document.getElementById('numero').value,
                complemento: document.getElementById('complemento').value,
                bairro: document.getElementById('bairro').value,
                cidade: document.getElementById('cidade').value,
                estado: document.getElementById('estado').value,
                cep: document.getElementById('cep').value,
                pais: document.getElementById('pais').value,
            }
        };
  
        fetch('http://localhost:8080/empresa/registrar', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify(dados)
        })
        .then(async response => {
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.erro || 'Erro desconhecido');
            }
            return response.text();
        })
        .then(dados => {
            var sucesso = document.querySelector('.sucesso');
            var erroEmpresa = document.querySelector('.erroCadastro');
            erroEmpresa.style.display = 'none';
            sucesso.style.display = 'none';
            document.getElementById('formEmpresa').reset();
            sucesso.style.display = 'block';
        })
        .catch(error => {
            var erroEmpresa = document.querySelector('.erroCadastro');
            erroEmpresa.style.display = 'block';
        });
    });
});
