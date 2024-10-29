'use strict';

import { database } from "./database.js";

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

/**
 * @param {Object} db 
 * @param {string} idCaderno
 * @returns {Object | undefined} 
 */
const encontrarCaderno = function (db, idCaderno) {
    return db.cadernos.find(caderno => caderno.id === idCaderno);
}

/**
 * @param {Object} db 
 * @param {string} idCaderno
 * @returns {number} 
 */
const encontrarIndiceCaderno = function (db, idCaderno) {
    return db.cadernos.findIndex(item => item.id === idCaderno);
}

/**
 * @param {number} milisegundos 
 * @returns {string}
 */
const getTempoRelativo = function (milisegundos) {
    const /** {Number} */ tempoAtual = new Date().getTime();

    const /** {Number} */ minuto = Math.floor((tempoAtual - milisegundos) / 1000 / 60);
    const /** {Number} */ hora = Math.floor(minuto / 60);
    const /** {Number} */ dia = Math.floor(hora / 24);

    return minuto < 1 ? 'Agora mesmo' : minuto < 60 ? `${minuto} min atrás` : hora < 24 ? `${hora} horas atrás` : `${dia} dias atrás`;  
}

/**
 * 
 * @param {Object} database 
 * @param {string} idNota 
 * @returns {Object | undefined}
 */
const encontrarNota = (database, idNota) => {
    let nota;
    for(const caderno of database.cadernos) {
        nota = caderno.notas.find(nota => nota.id === idNota);
        if(nota) break;
    }
    return nota;
}

export {
    addEventoEmElementos,
    getSaudacao,
    cadernoAtivo,
    tornaElemEditavel,
    geraID,
    encontrarCaderno,
    encontrarIndiceCaderno,
    getTempoRelativo,
    encontrarNota
}