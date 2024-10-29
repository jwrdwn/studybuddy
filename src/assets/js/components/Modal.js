'use strict';

const /** {HTMLElement} */ $overlay = document.createElement('div');
$overlay.classList.add('overlay', 'overlay-modal');

/**
 * 
 * @param {string} [titulo='Sem título']
 * @param {string} [texto='Adicione uma nota...']
 * @param {string} [tempo='']
 * @returns {Object}
 */
const ModalNotas = function (titulo = 'Sem título', texto = 'Adicione uma nota...', tempo = '') {
    const /** {HTMLElement} */ $modal = document.createElement('div');
    $modal.classList.add('modal');

    $modal.innerHTML = `
        <button class="icon-btn g" aria-label="Fechar modal" data-btn-fechar>
            <span class="material-symbols-rounded" aria-hidden="true">close</span>
            <div class="state-layer"></div>
        </button>

        <input type="text" placeholder="Sem título" value="${titulo}" class="titulo-modal texto-titulo-m" data-campo-nota>
        <textarea placeholder="Escreva uma nota!" class="texto-modal texto-body-g scrollbar-customizada" data-campo-nota>${texto}</textarea>

        <div class="rodape">
            <span class="hora texto-label-g">${tempo}</span>
            <button class="btn texto" data-submit>
                <span class="texto-label-g">Salvar</span>
                <div class="state-layer"></div>
            </button>
        </div>        
    `

    const /** {HTMLElement} */ $btnSalvar = $modal.querySelector('[data-submit]');
    $btnSalvar.disabled = true;

    const /** {HTMLElement} */ [$campoTitulo, $campoTexto] = $modal.querySelectorAll('[data-campo-nota]');

    const ativaEnviar = function () {
        $btnSalvar.disabled = !$campoTitulo.value && !$campoTexto.value;
    }

    $campoTexto.addEventListener('keyup', ativaEnviar);
    $campoTitulo.addEventListener('keyup', ativaEnviar);


    const abre = function () {
        document.body.appendChild($modal);
        document.body.appendChild($overlay);
        $campoTitulo.focus();
    }

    const fecha = function () {
        document.body.removeChild($modal);
        document.body.removeChild($overlay);
    }

    const /** {HTMLElement} */ $btnFechar = $modal.querySelector('[data-btn-fechar]');
    $btnFechar.addEventListener('click', fecha);

    /**
     * 
     * @param {Function} callback 
     */
    const envia = function (callback) {
        $btnSalvar.addEventListener('click', function () {
            const /** {Object} */ conteudoNota = {
                titulo: $campoTitulo.value,
                texto: $campoTexto.value
            }

            callback(conteudoNota);
        });
    }

    return { abre, fecha, envia };
}

/**
 * 
 * @param {string} titulo
 * @returns {Object} 
 */
const ModalConfirmarExclusao = function (titulo) {
    const /** {HTMLElement} */ $modal = document.createElement('div');
    $modal.classList.add('modal');

    $modal.innerHTML = `
        <h3 class="titulo-modal texto-titulo-m">
            Tem certeza que quer apagar <strong>"${titulo}"</strong>?
        </h3>

        <div class="rodape">
            <button class="btn texto" data-btn-acao="false">
                <span class="texto-label-g">Cancelar</span>
                <div class="state-layer"></div>
            </button>
            <button class="btn preenchimento" data-btn-acao="true">
                <span class="texto-label-g">Apagar</span>
                <div class="state-layer"></div>
            </button>
        </div>
    `

    const abre = function () {
        document.body.appendChild($modal);
        document.body.appendChild($overlay);
    }

    const fecha = function () {
        document.body.removeChild($modal);
        document.body.removeChild($overlay);
    }

    const /** {Array<HTMLElement>} */ $btnsAcao = $modal.querySelectorAll('[data-btn-acao]');

    /**
     * @param {Function} callback
     */
    const envia = function (callback) {
        $btnsAcao.forEach($btn => $btn.addEventListener('click', function () {
            const /** {Boolean} */ isConfirmar = this.dataset.btnAcao === 'true' ? true : false;

            callback(isConfirmar);
        }));
    }

    return { abre, fecha, envia };
    
}

export { ModalConfirmarExclusao, ModalNotas };