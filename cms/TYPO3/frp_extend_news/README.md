TYPO3: extending the News extension with one custom field
===========================================================

Basis extension to show how to add a single field (in this case `VARCHAR(255)`) to the Extbase News extension.
Install this extension and the table tx_news_domain_model_news will be extended and the field will be visible in the backend.

This extension does not include an output module but the new value should be available in 
your Fluid template as `{newsItem.newField}` (within an individual article).

Hat tip: http://keinerweiss.de/525-die-extbase-extension-news-um-ein-feld-erweitern.html

Author
-----
Mark Howells-Mead | mhm.li

Restrictions
------------
All code within this repository is provided as-is under the GPL GNU General Public Licence v3 and may be freely used, adapted and built upon. No guarantee is provided or implied. See http://www.gnu.org/licenses/gpl.html for full terms of the license.

Please submit questions, tips, corrections and general excitement and praise via m@mhm.li. My online presence is linked from http://permanenttourist.ch/.