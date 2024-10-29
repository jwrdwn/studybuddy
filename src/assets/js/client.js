'use strict';

import { NavItem } from "./components/NavItem.js";
import { cadernoAtivo } from "./utils.js";
import { Card } from "./components/Card.js";

const /** {HTMLElement} */ $sidebarLista = document.querySelector('[data-lista-sidebar]');
const /** {HTMLElement} */ $tituloPainelNotas = document.querySelector('[data-titulo-painel-notas]');
const /** {HTMLElement} */ $painelNotas = document.querySelector('[data-painel-notas]');
const /** {Array<Element>} */ $btnCriarNota = document.querySelectorAll('[data-btn-criar-nota]');
const /** {string} */ templateNotasVazias = `
    <div class="notas-vazias">
        <span class="material-symbols-rounded" aria-hidden="true">note_stack</span>
        <div class="texto-headline-p">Sem notas</div>
    </div>
`;

/**
 * @param {boolean} existeAlgumCaderno 
 */
const desabilitaBtnCriaNota = function (existeAlgumCaderno) {
    $btnCriarNota.forEach($item => {
        $item[existeAlgumCaderno ? 'removeAttribute' : 'setAttribute']('disabled', '');
    });
}

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
            $painelNotas.innerHTML = templateNotasVazias;
            desabilitaBtnCriaNota(true);
        },

        /**
         * @param {Array<Object>} listaDeCadernos
         */
        le(listaDeCadernos) {
            desabilitaBtnCriaNota(listaDeCadernos.length);

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
                $painelNotas.innerHTML = '';
                desabilitaBtnCriaNota(false);
            }

            $cadernoApagado.remove();
        }
    },

    nota: {
        /**
         * @param {Object} conteudoCaderno 
         */
        cria(conteudoCaderno) {
            if(!$painelNotas.querySelector('[data-caderno]'))
                $painelNotas.innerHTML = '';

            const /** {HTMLElement} */ $card = Card(conteudoCaderno);
            $painelNotas.appendChild($card);
        },

        /**
         * @param {Array<Object>} listaDeNotas 
         */
        le(listaDeNotas) {
            if(listaDeNotas.length) {
                $painelNotas.innerHTML = '';

                listaDeNotas.forEach(conteudoNota => {
                    const /** {HTMLElement} */ $card = Card(conteudoNota);
                    $painelNotas.appendChild($card);
                });
            } else {
                $painelNotas.innerHTML = templateNotasVazias;
            }
        },

        /**
         * @param {string} idNota 
         * @param {Object} conteudoNota 
         */
        update(idNota, conteudoNota) {
            const /** {HTMLElement} */ $cardAntigo = document.querySelector(`[data-nota="${idNota}"]`);
            const /** {HTMLElement} */ $cardNovo = Card(conteudoNota);
            $painelNotas.replaceChild($cardNovo, $cardAntigo);
        }
    }
}