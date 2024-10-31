'use strict';

import { geraID, encontrarCaderno, encontrarIndiceCaderno, encontrarNota, encontrarIndiceNota } from "./utils.js";

let /** {Object} */ studybuddyDB = {};

const initDB = function () {
    const /** {JSON | undefined} */ database = localStorage.getItem('studybuddyDB');

    if(database) {
        studybuddyDB = JSON.parse(database);
    } else {
        studybuddyDB.cadernos = [];
        localStorage.setItem('studybuddyDB', JSON.stringify(studybuddyDB));
    }
}

initDB();

const readDatabase = function () {
    studybuddyDB = JSON.parse(localStorage.getItem('studybuddyDB'));
}

const writeDatabase = function () {
    localStorage.setItem('studybuddyDB', JSON.stringify(studybuddyDB));
}

/**
 * @namespace
 * @property {Object} get
 * @property {Object} post
 * @property {Object} update
 * @property {Object} delete
 */

export const database = {

    post: {
        /**
         * @function
         * @param {string} nome
         * @returns {Object} 
         */
        caderno(nome) {
            readDatabase();

            const /** {Object} */ conteudoCaderno = {
                id: geraID(),
                nome,
                notas: []
            }

            studybuddyDB.cadernos.push(conteudoCaderno);

            writeDatabase();

            return conteudoCaderno;
        },

        /**
         * @function
         * @param {string} idCaderno 
         * @param {Object} objeto 
         * @returns {Object}
         */
        nota(idCaderno, objeto) {
            readDatabase();

            const /** {Object} */ caderno = encontrarCaderno(studybuddyDB, idCaderno);

            const /** {Object} */ conteudoNota = {
                id: geraID(),
                idCaderno,
                ... objeto,
                escritoEm: new Date().getTime()
            }
            
            caderno.notas.unshift(conteudoNota);
            writeDatabase();

            return conteudoNota;
        }
    },

    get: {
        /**
         * @function
         * @returns {Array<Object>} 
         */
        caderno() {
            readDatabase();

            return studybuddyDB.cadernos;
        },

        /**
         * @function
         * @param {string} idCaderno 
         * @returns {Array<Object>}
         */
        nota(idCaderno) {
            readDatabase();

            const /** {Object} */ caderno = encontrarCaderno(studybuddyDB, idCaderno);
            return caderno.notas;
        }
    },

    update: {
        /** 
         * @function
         * @param {string} idCaderno
         * @param {string} nome
         * @returns {Object}
         */
        caderno(idCaderno, nome) {
            readDatabase();

            const /** {Object} */ caderno = encontrarCaderno(studybuddyDB, idCaderno);
            caderno.nome = nome;

            writeDatabase();

            return caderno;
        },
        
        /**
         * @function
         * @param {string} idNota 
         * @param {Object} objeto 
         * @returns {Object}
         */
        nota(idNota, objeto) {
            readDatabase();

            const /** {Object} */ notaAntiga = encontrarNota(studybuddyDB, idNota);
            const /** {Object} */ novaNota = Object.assign(notaAntiga, objeto);

            writeDatabase();

            return novaNota;
        }
    },

    deleta: {
        /**
         * @function
         * @param {string} idCaderno
         */
        caderno(idCaderno) {
            readDatabase();

            const /** {Number} */ indiceCaderno = encontrarIndiceCaderno(studybuddyDB, idCaderno);
            studybuddyDB.cadernos.splice(indiceCaderno, 1);            

            writeDatabase();
        },

        /**
         * @function
         * @param {string} idCaderno
         * @param {string} idNota
         * @returns {Array<Object>}
         */
        nota(idCaderno, idNota) {
            readDatabase();

            const /** {Object} */ caderno = encontrarCaderno(studybuddyDB, idCaderno);
            const /** {Number} */ indiceNota = encontrarIndiceNota(caderno, idNota);

            caderno.notas.splice(indiceNota, 1);

            writeDatabase();

            return caderno.notas;
        }
    }

}