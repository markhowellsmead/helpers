# Menu Block for WordPress

This is an example of a custom block for the WordPress Block Editor (Site Editor), which allows a specific rendering of
a classic menu. The code uses the current logic for registration through a block.json file. The files in the _dist_ folder
are compiled by an NPM process which is introduced globally and is not part of this code base.

## Editor view

The _Block.php_ file ensures that classic menu support is activated and adds a REST API endpoint through which the available
menu positions can be caled from the Block Editor. (Wherein the user selects the menu which should be output.) The _data-store.js_
file connects the REST API endpoint to the block in the editor, which populates the select field.

## Frontend

The output is rendered through the _render.php_ file. (The content of the block is rendered server-side and no content is saved
by the Block Editor. The Block Editor just saves the ID of the selected menu as a block attribute.)

## Example

This version was coded for the Website of [Hotel Aare Thun](https.//www.hotelaarethun.ch/) in winter 2023/2024.

## Author

Mark Howells-Mead <mark@permanenttourist.ch>
