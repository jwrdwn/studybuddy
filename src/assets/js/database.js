'use strict';

import { geraID } from "./utils.js";

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
        }
    }

}