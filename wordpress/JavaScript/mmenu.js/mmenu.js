// Mobile menu plugin
// mmenujs.com/docs/custom-build.html

//  Core
import Mmenu from 'mmenu-js/dist/core/oncanvas/mmenu.oncanvas';

//  Core add-ons
import offcanvas from 'mmenu-js/dist/core/offcanvas/mmenu.offcanvas';
import screenReader from 'mmenu-js/dist/core/screenreader/mmenu.screenreader';
import scrollBugFix from 'mmenu-js/dist/core/scrollbugfix/mmenu.scrollbugfix';

Mmenu.addons = {
    offcanvas,
    screenReader,
    scrollBugFix,
};

document.addEventListener('DOMContentLoaded', () => {
    new Mmenu(
        '#mobile-menu',
        {},
        {
            classNames: {
                selected: 'c-menu__entry--current',
            },
            offCanvas: {
                page: {
                    selector: '.c-pagewrapper',
                },
            },
        }
    );
});
