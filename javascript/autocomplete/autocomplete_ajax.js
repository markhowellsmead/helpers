function getmatches(string, callback) {
	$.ajax({
		url: 'https://permanenttourist.ch/wp-json/wp/v2/posts?search=' + string,
		type: 'GET',
		cache: false,
		data: {
			'per_page': 20
		},
		dataType: 'json',
		success: function(response) {
			callback(response, string);
		}
	});
}

function autocomplete(input_field, value_field) {

	/*the autocomplete function takes two arguments,
	the text field element and an array of possible autocompleted values:*/
	var currentFocus;

	/*execute a function when someone writes in the text field:*/
	input_field.addEventListener('input', function(e) {

		var input_field = this;

		getmatches(input_field.value, function(posts, search_term) {
			var result_entry, field_value = search_term;

			/*close any already open lists of autocompleted values*/
			closeAllLists();

			if (!field_value) {
				return false;
			}
			currentFocus = -1;

			/*create a DIV element that will contain the items (values):*/
			var result_container = document.createElement('DIV');
			result_container.setAttribute('id', input_field.id + 'autocompletelist');
			result_container.setAttribute('class', 'autocomplete-items');

			/*append the DIV element as a child of the autocomplete container:*/
			input_field.parentNode.appendChild(result_container);

			/*for each item in the array...*/
			for (var iterator = 0; iterator < posts.length; iterator++) {

				/*check if the item starts with the same letters as the text field value:*/
				/*if (posts[iterator].substr(0, field_value.length).toUpperCase() == field_value.toUpperCase()) {*/

				/*check if the item contains the input string*/
//				if (posts[iterator].toUpperCase().indexOf(field_value.toUpperCase()) > -1) {

					/*create a DIV element for each matching element:*/
					var result_entry = document.createElement('DIV');

					/*make the matching letters bold:*/
					//result_entry.innerHTML = '<strong>' + posts[iterator].substr(0, field_value.length) + '</strong>';

					result_entry.innerHTML = posts[iterator].title.rendered.substr(0, field_value.length);
					result_entry.innerHTML += posts[iterator].title.rendered.substr(field_value.length);

					/*insert a input field that will hold the current array item's value:*/
					result_entry.innerHTML += '<input class="post_title" type="hidden" value="' + posts[iterator].title.rendered + '">';
					result_entry.innerHTML += '<input class="post_id" type="hidden" value="' + posts[iterator].id + '">';

					/*execute a function when someone clicks on the item value (DIV element):*/
					result_entry.addEventListener('click', function(e) {

						/*insert the value for the autocomplete text field:*/
						input_field.value = $('input.post_title').val();
						value_field.value = $('input.post_id').val();

						/*close the list of autocompleted values,
						(or any other open lists of autocompleted values:*/
						closeAllLists();
					});

					result_container.appendChild(result_entry);
				//}
			}
		});
	});

	/*execute a function presses a key on the keyboard:*/
	input_field.addEventListener('keydown', function(event) {
		var result_container = document.getElementById(this.id + 'autocompletelist');
		if (result_container) {
			result_container = result_container.getElementsByTagName('div');
		}
		if (event.keyCode == 40) {
			/*If the arrow DOWN key is pressed,
			increase the currentFocus variable:*/
			currentFocus++;
			/*and and make the current item more visible:*/
			addActive(result_container);
		} else if (event.keyCode == 38) { //up
			/*If the arrow UP key is pressed,
			decrease the currentFocus variable:*/
			currentFocus--;
			/*and and make the current item more visible:*/
			addActive(result_container);
		} else if (event.keyCode == 13) {
			/*If the ENTER key is pressed, prevent the form from being submitted,*/
			event.preventDefault();
			if (currentFocus > -1) {
				/*and simulate a click on the 'active' item:*/
				if (result_container) {
					result_container[currentFocus].click();
				}
			}
		}
	});

	function addActive(result_container) {
		/*a function to classify an item as 'active':*/
		if (!result_container) {
			return false;
		}
		/*start by removing the 'active' class on all items:*/
		removeActive(result_container);
		if (currentFocus >= result_container.length) currentFocus = 0;
		if (currentFocus < 0) currentFocus = (result_container.length - 1);
		/*add class 'autocomplete-active':*/
		result_container[currentFocus].classList.add('autocomplete-active');
	}

	function removeActive(result_container) {
		/*a function to remove the 'active' class from all autocomplete items:*/
		for (var iterator = 0; iterator < result_container.length; iterator++) {
			result_container[iterator].classList.remove('autocomplete-active');
		}
	}

	function closeAllLists(elmnt) {
		/*close all autocomplete lists in the document,
		except the one passed as an argument:*/
		var items = document.getElementsByClassName('autocomplete-items');
		for (var iterator = 0; iterator < items.length; iterator++) {
			if (elmnt != items[iterator] && elmnt != input_field) {
				items[iterator].parentNode.removeChild(items[iterator]);
			}
		}
	}

	/*execute a function when someone clicks in the document:*/
	document.addEventListener('click', function(e) {
		closeAllLists(e.target);
	});
}
