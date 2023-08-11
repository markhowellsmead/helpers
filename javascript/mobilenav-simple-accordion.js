/**
 * Simple mobile navigation accordion, based on a standard,
 * two-level nested WordPress menu output. This handles
 * menus where there is no toggle icon displayed with
 * which one can open the submenus manually.
 *
 * The menu output must contain the regular sub-menu class
 * names, as well as a custom class containing the depth-0
 * identifier (on top-level elements). This class name is
 * applied by the Hello Roots theme by default.
 *
 * First click on the top-level entry checks to see whether
 * there is a direct submenu. If not, the link is followed.
 *
 * If there is a direct submenu, then all other direct submenus
 * will be closed and the child of the clicked link's parent
 * will be shown. Clicking the same parent link again will
 * allow the visitor to go to that page.
 *
 * This version mark@sayhello.ch 17.3.2022
 */

if (!document.querySelector(':scope')) {
	console.error('Mobile nav script: :scope not supported in this browser');
} else {
	// Without dot!!!
	const class_prefix = 'wp-block-shb-nav-menu',
		navselector = '.c-mobilenav';

	const mobilenav = document.querySelector(navselector);

	if (!mobilenav) {
		console.warn(`Mobile nav script: no element matching ${navselector}`);
	}

	if (!!mobilenav) {
		const mobilenav_entries = mobilenav.querySelectorAll(
			`.${class_prefix}--mobile.${class_prefix}__entry--depth-0`
		);

		if (!!mobilenav_entries.length) {
			const submenus = mobilenav.querySelectorAll('.sub-menu');

			// Close all submenus
			const closeAll = () => {
				submenus.forEach((submenu) => {
					submenu.style.display = 'none';
					submenu.style.border = 'none';
				});
			};

			// Handles click event on
			const clickHandler = (event) => {
				const submenu =
					event.target.parentNode.querySelector(':scope > .sub-menu');

				if (submenu.style.display !== 'block') {
					closeAll();
					submenu.style.display = 'block';
					event.preventDefault();
				}
			};

			mobilenav_entries.forEach((entry) => {
				const submenu = entry.querySelectorAll(':scope > .sub-menu');
				if (!!submenu.length) {
					entry
						.querySelector(`:scope > .${class_prefix}__entrylink`)
						.addEventListener('click', clickHandler);
				}
			});
		}
	}
}
