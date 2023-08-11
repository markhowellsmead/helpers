/*
 * Add/remove the 'c-flipcard' class when hovering (when
 * there is a mouse) or when touching (on mobile).
 *
 * All links on the element should be disabled with
 * pointer-events: none; and only set back to
 * pointer-events: all; when the is--flipped class
 * has been applied, so that the initial touch on
 * mobile doesn't cause the link to be activated.
 *
 * Clicking outside the c-flipcard element removes all
 * instances of the .is--flipped class.
 *
 * This version mark@sayhello.ch March 2022
 */

import settings from '../../../../assets/settings.json';

document.querySelectorAll('.c-flipcard').forEach(card => {
    card.addEventListener('touchstart', event => {
        event.target.closest('.c-flipcard').dataset.is_touching = true;
    });

    card.addEventListener('touchend', event => {
        let target_card = event.target.closest('.c-flipcard');

        document.querySelectorAll('.c-flipcard').forEach(card => {
            if (card !== target_card) {
                card.classList.remove('is--flipped');
            }
        });

        // Minor delay, otherwise the link inside becomes
        // active instantaneously and there's no two-step-effect
        setTimeout(() => {
            target_card.classList.add('is--flipped');
        }, settings.easing_speed * 1.1);

        event.target.closest('.c-flipcard').dataset.is_touching = false;
    });

    card.addEventListener('mouseover', event => {
        if (!event.target.closest('.c-flipcard').dataset.is_touching) {
            event.target.closest('.c-flipcard').classList.add('is--flipped');
        }
    });

    card.addEventListener('mouseout', event => {
        if (!event.target.closest('.c-flipcard').dataset.is_touching) {
            event.target.closest('.c-flipcard').classList.remove('is--flipped');
        }
    });
});

document.documentElement.addEventListener('click', event => {
    if (!event.target.closest('.c-flipcard')) {
        document.querySelectorAll('.c-flipcard').forEach(card => {
            card.classList.remove('is--flipped');
        });
    }
});
