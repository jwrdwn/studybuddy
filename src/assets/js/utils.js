'use strict';

/**
 * @param {Array<HTMLElement>} $elementos
 * @param {string} tipoEvento
 * @param {Function} callback
 */

const addEventoEmElementos = function($elementos, tipoEvento, callback) { 
    $elementos.forEach($elemento => $elemento.addEventListener(tipoEvento, callback));
}

/**
 * @param {number} horaAtual
 * @returns {string}
 */

const getSaudacao = function (horaAtual) {
    const /** {string} */ saudacao =
        horaAtual < 5 ? 'noite' :
        horaAtual < 12 ? 'dia' :
        horaAtual < 18 ? 'tarde' :
        'noite';

    const prefixo = (saudacao === 'tarde' || saudacao === 'noite' ? 'Boa' : 'Bom');

    return `${prefixo} ${saudacao}!`;
}

let /** {HTMLElement | undefined} */ $ultimoNavItemAtivo;

const cadernoAtivo = function () {
    $ultimoNavItemAtivo?.classList.remove('ativa');
    this.classList.add('ativa');
    $ultimoNavItemAtivo = this;
}

/**
 * @param {HTMLElement} $elemento
 */

const tornaElemEditavel = function ($elemento) {
    $elemento.setAttribute('contenteditable', true);
    $elemento.setAttribute('spellcheck', false);
    $elemento.focus();
}

/**
 * @returns {string}
 */

const geraID = function () {
    return new Date().getTime().toString();
}

export {
    addEventoEmElementos,
    getSaudacao,
    cadernoAtivo,
    tornaElemEditavel,
    geraID
}