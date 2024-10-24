'use strict';

/**
 * 
 * @param {HTMLElement} $elemento 
 */

export const Tooltip = function ($elemento) {
    const /** {HTMLElement} */ $tooltip = document.createElement('span');
    $tooltip.classList.add('tooltip', 'texto-body-p');

    $elemento.addEventListener('mouseenter', function () {
        $tooltip.textContent = this.dataset.tooltip;
            
        const {
            top,
            left,
            height,
            width
        } = this.getBoundingClientRect();

        $tooltip.style.top = top + height + 4 + 'px';
        $tooltip.style.left = left + (width / 2) + 'px';
        $tooltip.style.transform = 'translate(-50%, 0)';
        document.body.appendChild($tooltip);
    });

    $elemento.addEventListener('mouseleave', $tooltip.remove.bind($tooltip));
}