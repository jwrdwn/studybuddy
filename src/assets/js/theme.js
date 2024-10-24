'use strict';

const mudarTema = function () {
    const /** {string} */ temaAtual = document.documentElement.getAttribute('tema') || 'light';
    const /** {string} */ novoTema = temaAtual === 'light' ? 'dark' : 'light';

    document.documentElement.setAttribute('tema', novoTema);
    localStorage.setItem('theme', novoTema);
}

const /** {string | null} */ temaGuardado = localStorage.getItem('tema');
const /** {Boolean} */ isSistemaTemadark = window.matchMedia('(prefers-color-scheme: dark)').matches;
const /** {string} */ temaInicial = temaGuardado ?? (isSistemaTemadark ? 'dark' : 'light');
document.documentElement.setAttribute('tema', temaInicial);

window.addEventListener('DOMContentLoaded', function () {
    const /** HTMLElement */ $btnTema = this.document.querySelector('[data-tema-btn]');
    if($btnTema) $btnTema.addEventListener('click', mudarTema);
});
