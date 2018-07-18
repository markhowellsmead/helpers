View_CalendarMonth
==================

PHP-Class to build and generate an HTML table view of a selected month.
Week starts on Monday and ends on Sunday. Weekend days (Saturday and
Sunday) receive a different CSS class name, as does the current date.

Usage
-----

    require_once('class.View_CalendarMonth.php');
    $calendar  = new View_CalendarMonth(10,2013);
    echo $calendar->viewData;

Demo
----

http://stuff.mhm.li/View_CalendarMonth/

Author
------
Mark Howells-Mead | mhm.li

Restrictions
------------
All code within this repository is provided as-is under the GPL GNU General Public Licence v3 and may be freely used, adapted and built upon. No guarantee is provided or implied. See http://www.gnu.org/licenses/gpl.html for full terms of the license.

Please submit questions, tips, corrections and general excitement and praise via m@mhm.li. My online presence is linked from http://permanenttourist.ch/.