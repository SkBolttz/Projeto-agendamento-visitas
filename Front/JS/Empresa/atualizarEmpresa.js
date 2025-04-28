document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('formAlterarEmpresa').addEventListener('submit', function (event) {
        event.preventDefault();

        const token = localStorage.getItem('token');

        const dados = {
            razaoSocial: razaoSocial
        };

        const novoNome = document.getElementById('novoRazaoSocial').value;
        const nomeFantasia = document.getElementById('nomeFantasia').value;
        const email = document.getElementById('email').value;
        const telefone = document.getElementById('telefone').value;

        const endereco = {};

        const novoLogradouro = document.getElementById('logradouro').value;
        const novoNumero = document.getElementById('numero').value;
        const novoComplemento = document.getElementById('complemento').value;
        const novoBairro = document.getElementById('bairro').value;
        const novaCidade = document.getElementById('cidade').value;
        const novoEstado = document.getElementById('estado').value;
        const novoCep = document.getElementById('cep').value;
        const novoPais = document.getElementById('pais').value;

        if (novoLogradouro) endereco.logradouro = novoLogradouro;
        if (novoNumero) endereco.numero = novoNumero;
        if (novoComplemento) endereco.complemento = novoComplemento;
        if (novoBairro) endereco.bairro = novoBairro;
        if (novaCidade) endereco.cidade = novaCidade;
        if (novoEstado) endereco.estado = novoEstado;
        if (novoCep) endereco.cep = novoCep;
        if (novoPais) endereco.pais = novoPais;

        if (Object.keys(endereco).length > 0) {
            dados.endereco = endereco;
        }

        if (novoNome) dados.novaRazaoSocial = novoNome;
        if (nomeFantasia) dados.nomeFantasia = nomeFantasia;
        if (email) dados.email = email;
        if (telefone) dados.telefone = telefone;

        fetch('http://localhost:8080/empresa/alterar', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify(dados)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao atualizar empresa');
            }
            var erro = document.getElementById('erroAlterar');
            var sucesso = document.getElementById('sucesso');

            erro.style.display = 'none';
            sucesso.style.display = 'block';
        })
        .catch(error => {
            var erro = document.getElementById('erroAlterar');
            var sucesso = document.getElementById('sucesso');

            sucesso.style.display = 'none';
            erro.style.display = 'block';
        });
    });
});
