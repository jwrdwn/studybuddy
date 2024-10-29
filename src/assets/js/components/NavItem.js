'use strict';

import { Tooltip } from "./Tooltip.js";
import { cadernoAtivo, tornaElemEditavel } from "../utils.js";
import { database } from "../database.js";
import { client } from "../client.js";
import { ModalConfirmarExclusao } from "./Modal.js";

const /** {HTMLElement} */ $tituloPainelNotas = document.querySelector('[data-titulo-painel-notas]');

/**
 * 
 * @param {string} id 
 * @param {string} nome
 * @returns {HTMLElement} 
 */

export const NavItem = function (id, nome) {
    const /** {HTMLElement} */ $navItem = document.createElement('div');
    $navItem.classList.add('nav-item');
    $navItem.setAttribute('data-caderno', id);

    $navItem.innerHTML = `
        <span class="texto texto-label-g" data-campos-caderno>${nome}</span>

        <button class="icon-btn p" aria-label="Editar caderno" data-tooltip="Editar caderno" data-btn-editar>
            <span class="material-symbols-rounded" aria-hidden="true">edit</span>

            <div class="state-layer"></div>
        </button>

        <button class="icon-btn p" aria-label="Apagar caderno" data-tooltip="Apagar caderno" data-btn-apagar>
            <span class="material-symbols-rounded" aria-hidden="true">delete</span>

            <div class="state-layer"></div>
        </button>

        <div class="state-layer"></div>
    `;

    const /** {Array<HTMLElement>} */ $tooltipElems = $navItem.querySelectorAll('[data-tooltip]');
    $tooltipElems.forEach($elem => Tooltip($elem));

    $navItem.addEventListener('click', function () {
        $tituloPainelNotas.textContent = nome;
        cadernoAtivo.call(this);

        const /** {Array} */ listaDeNotas = database.get.nota(this.dataset.caderno);
        client.nota.le(listaDeNotas);
    });

    const /** {HTMLElement} */ $navItemBtnEditar = $navItem.querySelector('[data-btn-editar]');
    const /** {HTMLElement} */ $navItemCampo = $navItem.querySelector('[data-campos-caderno]');

    $navItemBtnEditar.addEventListener('click', tornaElemEditavel.bind(null, $navItemCampo));

    $navItemCampo.addEventListener('keydown', function (evento) {
        if(evento.key === 'Enter') {
            this.removeAttribute('contenteditable');

            const atualizaCaderno = database.update.caderno(id, this.textContent);

            client.caderno.update(id, atualizaCaderno);
        }
    });

    const /** {HTMLElement} */ $navItemBtnApagar = $navItem.querySelector('[data-btn-apagar]');
    $navItemBtnApagar.addEventListener('click', function () {
        const /** {Object} */ modal = ModalConfirmarExclusao(nome);

        modal.abre();

        modal.envia(function (isConfirmar) {
            if(isConfirmar) {
                database.deleta.caderno(id);
                client.caderno.deleta(id);
            }
            
            modal.fecha();
        });
    });

    return $navItem;
}