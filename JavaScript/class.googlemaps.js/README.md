Google Map generation class
===========================

18.9.2013 | m@mhm.li | http://mhm.li/

This code is provided as-is under the GPL GNU General Public Licence v3 and may be freely used, adapted and built upon.

http://www.gnu.org/licenses/gpl.html

No guarantee is provided or implied. Test your code!


Simplify generation of Google Maps on a web page
------------------------------------------------

The existing default usage via Google's own implementation is great, but this version adds an improved
overlay function, the option to add MarkerLabel functionality by setting an option to true, and much
easier addition of custom map styles.

*Labels are displayed with the markers. Label content is displayed directly in the map.
*Markercontent is displayed in the overlay when a marker is clicked.

The expanded JavaScript file is unnecessarily heavy and heavily commented. Use class.googlemaps.min.js in your project.

See class.googlemaps.html for a demo of how to use this script with a couple of simple options.