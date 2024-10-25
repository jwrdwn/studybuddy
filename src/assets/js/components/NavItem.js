'use strict';

import { Tooltip } from "./Tooltip.js";
import { cadernoAtivo } from "../utils.js";

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
    });

    return $navItem;
}