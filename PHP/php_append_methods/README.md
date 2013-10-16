Dynamically append new methods to a PHP class at runtime
========================================================

Does what it says on the tin. An understanding of magic functions and OOP in PHP is essential.

Usage
-----
Load additional class functionality on request. Magic function `__call` MUST BE USED.

The function `extend` looks for a file with the name e.g. class.winter.php in the same folder as the calling class. The second file must contain a class called e.g. Winter (i.e. all lowercase but with upper case first letter).

See makeVehicle.php for example usage.

Author
-----
Mark Howells-Mead | mhm.li with thanks to Gen X Design) http://www.gen-x-design.com/archives/dynamically-add-functions-to-php-classes/

Restrictions
------------
All code within this repository is provided as-is under the GPL GNU General Public Licence v3 and may be freely used, adapted and built upon. No guarantee is provided or implied. See http://www.gnu.org/licenses/gpl.html for full terms of the license.

Please submit questions, tips, corrections and general excitement and praise via m@mhm.li. My online presence is linked from http://mhm.li/.