'use strict';

import { Tooltip } from "./Tooltip.js";
import { getTempoRelativo } from "../utils.js";
import { ModalConfirmarExclusao, ModalNotas } from "./Modal.js";
import { database } from "../database.js";
import { client } from "../client.js";

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
            <button class="icon-btn g" aria-label="Excluir nota" data-tooltip="Excluir nota" data-btn-excluir>
                <span class="material-symbols-rounded" aria-hidden="true">delete</span>
                <div class="state-layer"></div>
            </button>
        </div>
        <div class="state-layer"></div>
    `;

    Tooltip($card.querySelector('[data-tooltip]'));

    $card.addEventListener('click', function () {
        const /** {Object} */ modal = ModalNotas(titulo, texto, getTempoRelativo(escritoEm));
        modal.abre();

        modal.envia(function (conteudoNota) {
            const conteudoAtualizado = database.update.nota(id, conteudoNota);

            client.nota.update(id, conteudoAtualizado);

            modal.fecha();
        });
    });

    const /** {HTMLElement} */ $btnExcluir = $card.querySelector('[data-btn-excluir]');
    $btnExcluir.addEventListener('click', function (evento) {
        evento.stopImmediatePropagation();

        const /** {Object} */ modal = ModalConfirmarExclusao(titulo);

        modal.abre();

        modal.envia(function (isConfirmar) {
            if(isConfirmar) {
                const /** {Array} */ notasExistentes = database.deleta.nota(idCaderno, id);

                client.nota.deleta(id, notasExistentes.length);
            }

            modal.fecha();
        });
    });

    return $card;
}