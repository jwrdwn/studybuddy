'use strict';

import { Tooltip } from "./Tooltip.js";
import { getTempoRelativo } from "../utils.js";

/**
 * @param {Object} conteudoNota 
 * @returns {HTMLElement}
 */
export const Card = function (conteudoNota) {
    const {id, titulo, texto, escritoEm, idCaderno} = conteudoNota;

    const /** {HTMLElement} */ $card = document.createElement('div');
    $card.classList.add('nota');
    $card.setAttribute('data-nota', id);

    $card.innerHTML = `
        <h3 class="titulo-nota texto-titulo-m">${titulo}</h3>
        <p class="texto-nota texto-body-g">${texto}</p>
        <div class="wrapper">
            <span class="hora-nota texto-label-g">${getTempoRelativo(escritoEm)}</span>
            <button class="icon-btn g" aria-label="Excluir nota" data-tooltip="Excluir nota">
                <span class="material-symbols-rounded" aria-hidden="true">delete</span>
                <div class="state-layer"></div>
            </button>
        </div>
        <div class="state-layer"></div>
    `

    Tooltip($card.querySelector('[data-tooltip]'));

    return $card;
}