function trocarTema() {

    const body = document.body;

    if (localStorage.getItem('tema') == 'claro') {
        body.classList.remove('tema-escuro');
        body.classList.add('tema-claro');
    } else {
        body.classList.remove('tema-claro');
        body.classList.add('tema-escuro');
    }
}

function alternarTema() {
    const body = document.body;
    const temaAtual = localStorage.getItem('tema');

    if (temaAtual === 'escuro') {
        body.classList.remove('tema-escuro');
        body.classList.add('tema-claro');
        localStorage.setItem('tema', 'claro');
    } else {
        body.classList.remove('tema-claro');
        body.classList.add('tema-escuro');
        localStorage.setItem('tema', 'escuro');
    }
}

window.onload = () => {
    const temaSalvo = localStorage.getItem('tema') || 'claro';
    document.body.classList.add(`tema-${temaSalvo}`);
}