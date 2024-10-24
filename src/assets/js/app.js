'use strict';

import { addEventoEmElementos, getSaudacao } from "./utils.js";
import { Tooltip } from "./components/Tooltip.js";

const /** {HTMLElement} */ $sidebar = document.querySelector('[data-sidebar]');
const /** {Array<HTMLElement>} */ $sidebarTogglers = document.querySelectorAll('[data-sidebar-toggler]');
const /** {HTMLElement} */ $overlay = document.querySelector('[data-sidebar-overlay]');

addEventoEmElementos($sidebarTogglers, 'click', function () {
    $sidebar.classList.toggle('ativa');
    $overlay.classList.toggle('ativa');
});

const /** {HTMLElement} */ $tooltipElems = document.querySelectorAll('[data-tooltip]');
$tooltipElems.forEach($elem => Tooltip($elem));

const /** {HTMLElement} */ $saudacaoElem = document.querySelector('[data-saudacao]');
const /** {number} */ horaAtual = new Date().getHours();
$saudacaoElem.textContent = getSaudacao(horaAtual);

const /** {HTMLElement} */ $dataAtualElem = document.querySelector('[data-data]');
const opcoesData = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
let dataAtual = new Date().toLocaleDateString('pt-BR', opcoesData);
dataAtual = dataAtual.replace(/-feira/g, '').trim();
dataAtual = dataAtual.charAt(0).toUpperCase() + dataAtual.slice(1);
$dataAtualElem.textContent = dataAtual;