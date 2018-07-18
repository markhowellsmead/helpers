# PHP namespacing with non-class-based functions

# Description
The code in this folder shows that by defining a namespace in the top of a PHP file, 
all functions within that file will be subordinated to the namespace. (Not just 
class-based functions.) Calling *index.php* in the browser will provoke an error message, 
as the called function `inline_message` is within the namespace `` and can therefore 
not be called directly.)

##Author
Mark Howells-Mead | www.markweb.ch | Since 26.4.2017
