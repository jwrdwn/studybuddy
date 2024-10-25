'use strict';

import { NavItem } from "./components/NavItem.js";
import { cadernoAtivo } from "./utils.js";

const /** {HTMLElement} */ $sidebarLista = document.querySelector('[data-lista-sidebar]');
const /** {HTMLElement} */ $tituloPainelNotas = document.querySelector('[data-titulo-painel-notas]');

/**
 * @namespace
 * @property {Object} caderno
 * @property {Object} nota
 */

export const client = {
    caderno: {
        /**
         * @param {Object} conteudoCaderno
         */
        cria(conteudoCaderno) {
            const /** {HTMLElement} */ $navItem = NavItem(conteudoCaderno.id, conteudoCaderno.nome);
            $sidebarLista.appendChild($navItem);
            cadernoAtivo.call($navItem);
            $tituloPainelNotas.textContent = conteudoCaderno.nome;
        },
        /**
         * @param {Array<Object>} listaDeCadernos
         */
        le(listaDeCadernos) {
            listaDeCadernos.forEach((conteudoCaderno, indice) => {
                const /** {HTMLElement} */ $navItem = NavItem(conteudoCaderno.id, conteudoCaderno.nome);

                if(indice === 0) {
                    cadernoAtivo.call($navItem);
                    $tituloPainelNotas.textContent = conteudoCaderno.nome;
                }

                $sidebarLista.appendChild($navItem);
            });
        }
    }
}