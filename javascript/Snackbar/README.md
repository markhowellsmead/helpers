# Snackbars

*Snackbars* are little confirmation messages which appear as e.g. confirmation or warning messages. They are created, shown, hidden and destroyed by JavaScript. An example is on the nzz.ch website, which appears when you click on the “Merken” button on an [individual article](https://www.nzz.ch/wirtschaft/ralph-hamers-der-transformator-mit-flecken-auf-der-weissen-weste-ld.1541657).

There is no fixed element in the HTML structure of the page until JavaScript creates it.

## Implementation

This description relates to the implementation of a snackbar script to the [Hello Roots WordPress Theme](https://github.com/sayhellogmbh/hello-roots), which my colleagues and I co-develop for our projects at our WordPress agency [Say Hello](https://sayhello.ch/).

The example code handles the integration of Snackbar messaging to a "favourite" function, which is provided by a separate plugin.

* Add the [sht_snackbar.js](https://github.com/markhowellsmead/helpers/blob/master/javascript/Snackbar/sht_snackbar.js) file to the JavaScript structure. This provides the basic functionality and event listeners. It is “vanilla” Javascript - not based on any framework - and is tested back to IE11.
* Ensure that the configuration file *assets/settings.json* contains millisecond definitions for `snackbar_transition` (e.g. 500) and `snackbar_wait` (e.g. 5000).
* Add the necessary translations/strings using the `wp_enqueue_script` hook. An example of this is in this [Snackbar.php](https://github.com/markhowellsmead/helpers/blob/master/javascript/Snackbar/Snackbar.php) file.
* An example of some (SCSS styling for the snackbar is in [this SCSS file](https://github.com/markhowellsmead/helpers/blob/master/javascript/Snackbar/_sht_snackbars.scss).

### Triggering a snackbar

You trigger a snackbar event (e.g. show or hide) using Custom JavaScript Events. The optional `detail` parameter `overwrite` allows you to specify whether or not the existing snackbars should be removed before the new one is added.

(If you need to support IE11, you'll need to add [a polyfill for the CustomEvent object](https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent/CustomEvent#Polyfill).)

    window.dispatchEvent(new CustomEvent('sht_snackbar/show', {
        detail: {
            html: 'Hello world',
            overwrite: true
        }
    }));
