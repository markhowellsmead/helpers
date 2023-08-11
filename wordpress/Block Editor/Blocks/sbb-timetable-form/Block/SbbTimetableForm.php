<?php

namespace SayHello\Theme\Block;

use WP_Block;

/**
 * SBB Timetable Form Block
 * https://company.sbb.ch/de/sbb-als-geschaeftspartner/dienstleistungen/fahrplanintegration.html
 *
 * @author Mark Howells-Mead <mark@sayhello.ch>
 */
class SBBTimetableForm
{
	public function run()
	{
		add_action('init', [$this, 'registerBlocks']);
	}

	public function registerBlocks()
	{
		register_block_type('sht/sbb-timetable-form', [
			'render_callback' => function (array $attributes, string $content, WP_Block $block) {

				$classNameBase = wp_get_block_default_classname($block->name);
				$locale = mb_substr(get_locale(), 0, 2);
				$action = 'https://www.sbb.ch/de/kaufen/pages/fahrplan/fahrplan.xhtml';

				switch ($locale) {
					case 'en':
						$action = 'https://www.sbb.ch/en/buying/pages/fahrplan/fahrplan.xhtml';
						break;
					case 'fr':
						$action = 'https://www.sbb.ch/fr/acheter/pages/fahrplan/fahrplan.xhtml';
						break;
					case 'it':
						$action = 'https://www.sbb.ch/it/acquistare/pages/fahrplan/fahrplan.xhtml';
						break;
				}

				ob_start();
?>
			<div class="<?php echo $classNameBase; ?>">
				<form action="<?php echo $action; ?>" class="<?php echo "{$classNameBase}__form"; ?>">
					<div class="<?php echo "{$classNameBase}__fieldset"; ?>">
						<div class="<?php echo "{$classNameBase}__field {$classNameBase}__field--left"; ?>">
							<label class="<?php echo "{$classNameBase}__label"; ?>"><?php _ex('Von', 'SBB form', 'sht') ?>:</label>
							<input type="text" name="from" placeholder="Ort" required>
						</div>
						<div class="<?php echo "{$classNameBase}__field {$classNameBase}__field--right"; ?>">
							<label class="<?php echo "{$classNameBase}__label"; ?>"><?php _ex('Nach', 'SBB form', 'sht') ?>:</label>
							<select name="to" class="<?php echo "{$classNameBase}__select"; ?>">
								<option value="Niesen Kulm">Niesen Kulm</option>
								<option value="Mülenen">Mülenen</option>
							</select>
						</div>
					</div>
					<div class=" <?php echo "{$classNameBase}__fieldset"; ?>">
						<div class="<?php echo "{$classNameBase}__field {$classNameBase}__field--left"; ?>">
							<label class="<?php echo "{$classNameBase}__label"; ?>"><?php _ex('Datum', 'SBB form', 'sht') ?>:</label>
							<input type="date" name="date" min="<?php echo wp_date('Y-m-d'); ?>" required>
						</div>
						<div class="<?php echo "{$classNameBase}__field {$classNameBase}__field--right"; ?>">
							<label class="<?php echo "{$classNameBase}__label"; ?>"><?php _ex('Zeit', 'SBB form', 'sht') ?>:</label>
							<input type="time" name="time" required>
						</div>
					</div>
					<div class="<?php echo "{$classNameBase}__fieldset"; ?>">
						<div class="<?php echo "{$classNameBase}__field {$classNameBase}__field--full"; ?>">
							<div class="<?php echo "{$classNameBase}__checkboxes"; ?>">
								<div class="<?php echo "{$classNameBase}__checkbox"; ?>">
									<input type="radio" value="false" name="arrival" id="departure" checked>
									<label for="departure"><?php _ex('Abfahrt', 'SBB form', 'sht') ?></label>
								</div>
								<div class="<?php echo "{$classNameBase}__checkbox"; ?>">
									<input type="radio" value="true" name="arrival" id="arrival">
									<label for="arrival"><?php _ex('Ankunft', 'SBB form', 'sht') ?></label>
								</div>
							</div>
						</div>
					</div>
					<div class="<?php echo "{$classNameBase}__fieldset"; ?>">
						<div class="<?php echo "{$classNameBase}__field {$classNameBase}__field--full {$classNameBase}__field--center"; ?>">
							<input type="submit" value="<?php _ex('Verbindung suchen', 'SBB form', 'sht') ?>" class="{$classNameBase}__button">
						</div>
					</div>
				</form>
			</div>
<?php
				$html = ob_get_contents();
				ob_end_clean();
				return $html;
			}
		]);
	}
}
