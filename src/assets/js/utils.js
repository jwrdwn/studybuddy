'use strict';

/**
 * @param {Array<HTMLElement>} $elementos;
 * @param {string} tipoEvento;
 * @param {Function} callback; 
 */

const addEventoEmElementos = function($elementos, tipoEvento, callback) { 
    $elementos.forEach($elemento => $elemento.addEventListener(tipoEvento, callback));
}

/**
 * @param {number} horaAtual;
 * @returns {string} tipoEvento;
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

export {
    addEventoEmElementos,
    getSaudacao
}