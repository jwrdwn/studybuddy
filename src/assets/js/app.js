'use strict';

import { addEventoEmElementos, getSaudacao, cadernoAtivo, tornaElemEditavel } from "./utils.js";
import { Tooltip } from "./components/Tooltip.js";
import { database } from "./database.js";
import { client } from "./client.js";
import { ModalNotas } from "./components/Modal.js";

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

const /** {HTMLElement} */ $sidebarLista = document.querySelector('[data-lista-sidebar]');
const /** {HTMLElement} */ $addCadernoBtn = document.querySelector('[data-adicionar-caderno]');

const mostraCampoCaderno = function () {
    const /** {HTMLElement} */ $navItem = document.createElement('div');
    $navItem.classList.add('nav-item');

    $navItem.innerHTML = `
        <span class="texto texto-label-g" data-campos-caderno></span>
        <div class="state-layer"></div>
    `;

    $sidebarLista.appendChild($navItem);
    
    const /** {HTMLElement} */ $campoNavItem = $navItem.querySelector('[data-campos-caderno]');

    cadernoAtivo.call($navItem);

    tornaElemEditavel($campoNavItem);

    $campoNavItem.addEventListener('keydown', criaCaderno);
}

$addCadernoBtn.addEventListener('click', mostraCampoCaderno);

/**
 * @param {KeyboardEvent} evento 
 */

const criaCaderno = function (evento) {
    if(evento.key === 'Enter') {
        const /** {Object} */ conteudoCaderno = database.post.caderno(this.textContent || 'Sem nome');
        this.parentElement.remove();

        client.caderno.cria(conteudoCaderno);
    }
}

const mostraCadernos = function () {
    const /** {Array} */ listaDeCadernos = database.get.caderno();
    client.caderno.le(listaDeCadernos);
}

mostraCadernos();

const /** {Array<HTMLElement>} */ $btnCriarNota = document.querySelectorAll('[data-btn-criar-nota]');

addEventoEmElementos($btnCriarNota, 'click', function () {
    const /** {Object} */ modal = ModalNotas();
    modal.abre();

    modal.envia(notaObj => {
        const /** {string} */ idCadernoAtivo = document.querySelector('[data-caderno].ativa').dataset.caderno;

        const /** {Object} */ conteudoNota = database.post.nota(idCadernoAtivo, notaObj);
        client.nota.cria(conteudoNota);
        modal.fecha();        
    });
});

const mostraNotasExistentes = function () {
    const /** {string | undefined} */ idCadernoAtivo = document.querySelector('[data-caderno].ativa')?.dataset.caderno;

    if(idCadernoAtivo) {
        const /** {Array<Object>} */ listaDeNotas = database.get.nota(idCadernoAtivo);
        
        client.nota.le(listaDeNotas);
    }
}

mostraNotasExistentes();