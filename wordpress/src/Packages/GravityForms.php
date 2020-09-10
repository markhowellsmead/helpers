<?php

namespace MarkHowellsMead\Theme\Packages;

/**
 * Examples of various functionality for Gravity Forms
 *
 * @author Mark Howells-Mead <mark@sayhello.ch>
 * @version 1.0
 */
class GravityForms
{
	public function run()
	{
		add_action('gform_enqueue_scripts_1', [$this, 'dequeueGravityFormsCSS'], 11);
		add_filter('gform_ajax_spinner_url', [$this, 'replaceGravityFormsSpinner']);
		add_filter('gform_countries', [$this, 'countries'], 10, 0);

        add_action('gform_field_standard_settings', [$this, 'customFieldAttributes'], 10, 2);
        add_action('gform_editor_js', [$this, 'editorScript']);
		add_filter('gform_tooltips', [$this, 'addTooltips']);
	}
	
	/**
	 * Provide a custom list of available countries in a dropdown
	 * This example uses the shipping countries from WooCommerce.
	 *
	 * @return array	An array of countries for selection.
	 */
	public function countries()
	{
		$countries = [];
		foreach (array_values(WC()->countries->get_shipping_countries()) as $country) {
			$countries[] = $country;
		}

		return $countries;
	}

	public function dequeueGravityFormsCSS()
	{
		wp_dequeue_style('gforms_reset_css');
		wp_dequeue_style('gforms_datepicker_css');
		wp_dequeue_style('gforms_formsmain_css');
		wp_dequeue_style('gforms_ready_class_css');
		wp_dequeue_style('gforms_browsers_css');
	}

	/**
	 * Replaces ajax spinner of gravity forms
	 *
	 * @return void
	 */
	public function replaceGravityFormsSpinner()
	{
		return  'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';
	}

    public function customFieldAttributes($position, $form_id)
	{
		if ($position == 1550) {
			?>
			<li class="is_course_id_setting field_setting">
				<label for="field_admin_label" class="section_label">
					<?php esc_html_e('Flugbasis - Kurs-ID', 'sha'); ?>
					<?php gform_tooltip('form_field_is_course_id') ?>
				</label>
				<input type="checkbox" id="field_is_course_id" onclick="SetFieldProperty('isCourseID', this.checked);" /> <?php esc_html_e('Dieses Formularfeld beinhaltet die Kurs-ID', 'sha'); ?>
			</li>
			<li class="is_user_id_setting field_setting">
				<label for="field_admin_label" class="section_label">
					<?php esc_html_e('Flugbasis - Benutzer-ID', 'sha'); ?>
					<?php gform_tooltip('form_field_is_user_id') ?>
				</label>
				<input type="checkbox" id="field_is_user_id" onclick="SetFieldProperty('isUserID', this.checked);" /> <?php esc_html_e('Dieses Formularfeld beinhaltet die Benutzer-ID', 'sha'); ?>
			</li>
			<li class="is_user_first_name_setting field_setting">
				<label for="field_admin_label" class="section_label">
					<?php esc_html_e('Flugbasis - Benutzer erstellen', 'sha'); ?>
					<?php gform_tooltip('form_field_is_user_first_name') ?>
				</label>
				<input type="checkbox" id="field_is_user_first_name" onclick="SetFieldProperty('isUserFirstName', this.checked);" /> <?php esc_html_e('Formularfeld mit Vorname des neuen Benutzers', 'sha'); ?><br>
				<input type="checkbox" id="field_is_user_last_name" onclick="SetFieldProperty('isUserLastName', this.checked);" /> <?php esc_html_e('Formularfeld mit Nachname des neuen Benutzers', 'sha'); ?><br>
				<input type="checkbox" id="field_is_user_address" onclick="SetFieldProperty('isUserAddress', this.checked);" /> <?php esc_html_e('Formularfeld mit der Adresszeile des neuen Benutzers', 'sha'); ?><br>
				<input type="checkbox" id="field_is_user_postcode" onclick="SetFieldProperty('isUserPostcode', this.checked);" /> <?php esc_html_e('Formularfeld mit der Postleitzahl des neuen Benutzers', 'sha'); ?><br>
				<input type="checkbox" id="field_is_user_town" onclick="SetFieldProperty('isUserTown', this.checked);" /> <?php esc_html_e('Formularfeld mit dem Ortsnamen des neuen Benutzers', 'sha'); ?><br>
				<input type="checkbox" id="field_is_user_country" onclick="SetFieldProperty('isUserCountry', this.checked);" /> <?php esc_html_e('Formularfeld mit dem Land des neuen Benutzers', 'sha'); ?><br>
			</li>
			<li class="is_user_phone_setting field_setting">
				<label for="field_admin_label" class="section_label">
					<?php esc_html_e('Flugbasis - Benutzer erstellen', 'sha'); ?>
					<?php gform_tooltip('form_field_is_user_phone') ?>
				</label>
				<input type="checkbox" id="field_is_user_phone" onclick="SetFieldProperty('isUserPhone', this.checked);" /> <?php esc_html_e('Formularfeld mit der Telefonnummer des neuen Benutzers', 'sha'); ?><br>
			</li>

			<?php
		}
	}

    public function editorScript()
	{
		?>
		<script>
			fieldSettings.text += ', .is_course_id_setting, .is_user_id_setting, .is_user_first_name_setting';
			fieldSettings.phone += ', .is_user_phone_setting';
			jQuery(document).on('gform_load_field_settings', function(event, field, form){
				jQuery('#field_is_course_id').attr('checked', field.isCourseID == true);
				jQuery('#field_is_user_id').attr('checked', field.isUserID == true);
				jQuery('#field_is_user_first_name').attr('checked', field.isUserFirstName == true);
				jQuery('#field_is_user_last_name').attr('checked', field.isUserLastName == true);
				jQuery('#field_is_user_address').attr('checked', field.isUserAddress == true);
				jQuery('#field_is_user_postcode').attr('checked', field.isUserPostcode == true);
				jQuery('#field_is_user_town').attr('checked', field.isUserTown == true);
				jQuery('#field_is_user_country').attr('checked', field.isUserCountry == true);
				jQuery('#field_is_user_phone').attr('checked', field.isUserPhone == true);
			});
		</script>
		<?php
	}
	
	public function addTooltips($tooltips)
	{
		$tooltips['form_field_is_user_id'] = sprintf(
			'<h6>%1$s</h6>%2$s',
			_x('Benutzer-ID', 'Field tooltip title', 'sht'),
			_x('Wählen Sie diese Option aus, falls das Feld die Benutzer-ID beinhaltet.', 'Field tooltip title', 'sht')
		);
		return $tooltips;
	}
}
