# PostColorSelectorPanel

Adds a custom editor panel to Posts in the Gutenberg Editor, which allows the author to
select a colour from the available palette. The functionality in the editor uses index.jsx
and saves the hex value to the database as a custom post meta field. The field is 
registered in the PHP file and is prefixed with an underscore to indicate that it's a private 
field, which will therefore not automatically appear in the custom post meta fields which 
used to appear in the classic editor.

## Requirements

* WordPress 5.4

## Author

mark@sayhello.ch 22.4.2020
