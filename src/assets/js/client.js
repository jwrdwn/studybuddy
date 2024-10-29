'use strict';

import { NavItem } from "./components/NavItem.js";
import { cadernoAtivo } from "./utils.js";
import { Card } from "./components/Card.js";

const /** {HTMLElement} */ $sidebarLista = document.querySelector('[data-lista-sidebar]');
const /** {HTMLElement} */ $tituloPainelNotas = document.querySelector('[data-titulo-painel-notas]');
const /** {HTMLElement} */ $painelNotas = document.querySelector('[data-painel-notas]');

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
        },

        /**
         * @param {string} idCaderno 
         * @param {Object} dadosCaderno 
         */
        update(idCaderno, dadosCaderno) {
            const /** {HTMLElement} */ $cadernoAntigo = document.querySelector(`[data-caderno="${idCaderno}"]`);
            const /** {HTMLElement} */ $novoCaderno = NavItem(dadosCaderno.id, dadosCaderno.nome);

            $tituloPainelNotas.textContent = dadosCaderno.nome;
            $sidebarLista.replaceChild($novoCaderno, $cadernoAntigo);
            cadernoAtivo.call($novoCaderno);
        },

        /**
         * 
         * @param {string} idCaderno 
         */
        deleta(idCaderno) {
            const /** {HTMLElement} */ $cadernoApagado = document.querySelector(`[data-caderno="${idCaderno}"]`);
            const /** {HTMLElement | null} */ $navItemAtivo = $cadernoApagado.nextElementSibling ?? $cadernoApagado.previousElementSibling;

            if($navItemAtivo) {
                $navItemAtivo.click();
            } else {
                $tituloPainelNotas.innerHTML = '';
                // $painelNotas.innerHTML = '';
            }

            $cadernoApagado.remove();
        }
    },

    nota: {
        /**
         * @param {Object} conteudoCaderno 
         */
        cria(conteudoCaderno) {
            const /** {HTMLElement} */ $card = Card(conteudoCaderno);
            $painelNotas.appendChild($card);
        }
    }
}