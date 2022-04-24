<?php if ( ! defined( 'ABSPATH' ) ) {
	die; } // Cannot access directly.
/**
 *
 * Field: background
 *
 * @since 1.0.0
 * @version 1.0.0
 */
if ( ! class_exists( 'SP_PC_Field_background_adv' ) ) {
	class SP_PC_Field_background_adv extends SP_PC_Fields {

		public function __construct( $field, $value = '', $unique = '', $where = '', $parent = '' ) {
			parent::__construct( $field, $value, $unique, $where, $parent );
		}

		public function render() {
			$args = wp_parse_args(
				$this->field,
				array(
					'background_color'              => true,
					'background_image'              => true,
					'background_position'           => true,
					'background_repeat'             => true,
					'background_attachment'         => true,
					'background_size'               => true,
					'background_origin'             => false,
					'background_clip'               => false,
					'background_blend-mode'         => false,
					'background_gradient'           => false,
					'background_gradient_color'     => true,
					'background_gradient_direction' => true,
					'background_image_preview'      => true,
					'preview'                       => true,
					'preview_text'                  => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
					'background_image_library'      => 'image',
					'background_image_placeholder'  => esc_html__( 'No background selected', 'post-carousel' ),
				)
			);

			$default_value = array(
				'background-color'              => '',
				'background-image'              => '',
				'background-position'           => '',
				'background-repeat'             => '',
				'background-attachment'         => '',
				'background-size'               => '',
				'background-origin'             => '',
				'background-clip'               => '',
				'background-blend-mode'         => '',
				'background-gradient-color'     => '',
				'background-gradient-direction' => '',
			);

			$default_value = ( ! empty( $this->field['default'] ) ) ? wp_parse_args( $this->field['default'], $default_value ) : $default_value;

			$this->value = wp_parse_args( $this->value, $default_value );

			echo wp_kses_post( $this->field_before() );

			echo '<div class="spf--blocks">';
			//
			// Background Color.
			if ( ! empty( $args['background_color'] ) ) {

				echo '<div class="spf--block">';
				echo ( ! empty( $args['background_gradient'] ) ) ? '<div class="spf--title">' . esc_html__( 'From', 'post-carousel' ) . '</div>' : '';

				SP_PC::field(
					array(
						'id'      => 'background-color',
						'type'    => 'color',
						'default' => $default_value['background-color'],
					),
					$this->value['background-color'],
					$this->field_name(),
					'field/background'
				);

				echo '</div>';

			}

			//
			// Background Gradient Color.
			if ( ! empty( $args['background_gradient_color'] ) && ! empty( $args['background_gradient'] ) ) {

				echo '<div class="spf--block">';
				echo ( ! empty( $args['background_gradient'] ) ) ? '<div class="spf--title">' . esc_html__( 'To', 'post-carousel' ) . '</div>' : '';

				SP_PC::field(
					array(
						'id'      => 'background-gradient-color',
						'type'    => 'color',
						'default' => $default_value['background-gradient-color'],
					),
					$this->value['background-gradient-color'],
					$this->field_name(),
					'field/background'
				);

				echo '</div>';

			}

			//
			// Background Gradient Direction.
			if ( ! empty( $args['background_gradient_direction'] ) && ! empty( $args['background_gradient'] ) ) {

				echo '<div class="spf--block spf--gradient">';
				echo ( ! empty( $args['background_gradient'] ) ) ? '<div class="spf--title">' . esc_html__( 'Direction', 'post-carousel' ) . '</div>' : '';

				SP_PC::field(
					array(
						'id'      => 'background-gradient-direction',
						'type'    => 'select',
						'options' => array(
							''          => esc_html__( 'Gradient Direction', 'post-carousel' ),
							'to bottom' => esc_html__( '&#8659; top to bottom', 'post-carousel' ),
							'to right'  => esc_html__( '&#8658; left to right', 'post-carousel' ),
							'135deg'    => esc_html__( '&#8664; corner top to right', 'post-carousel' ),
							'-135deg'   => esc_html__( '&#8665; corner top to left', 'post-carousel' ),
						),
					),
					$this->value['background-gradient-direction'],
					$this->field_name(),
					'field/background'
				);

				echo '</div>';

			}

			echo '</div>';
			echo '<div class="clear"></div>';

			//
			// Background Image.
			if ( ! empty( $args['background_image'] ) ) {

				echo '<div class="spf--media">';

				SP_PC::field(
					array(
						'id'          => 'background-image',
						'type'        => 'media',
						'library'     => $args['background_image_library'],
						'preview'     => $args['background_image_preview'],
						'placeholder' => $args['background_image_placeholder'],
					),
					$this->value['background-image'],
					$this->field_name(),
					'field/background'
				);

				echo '</div>';

				echo '<div class="clear"></div>';

			}

			//
			// Background Position.
			if ( ! empty( $args['background_position'] ) ) {
				echo '<div class="spf--block spf--select">';

				SP_PC::field(
					array(
						'id'      => 'background-position',
						'type'    => 'select',
						'options' => array(
							''              => esc_html__( 'Background Position', 'post-carousel' ),
							'left top'      => esc_html__( 'Left Top', 'post-carousel' ),
							'left center'   => esc_html__( 'Left Center', 'post-carousel' ),
							'left bottom'   => esc_html__( 'Left Bottom', 'post-carousel' ),
							'center top'    => esc_html__( 'Center Top', 'post-carousel' ),
							'center center' => esc_html__( 'Center Center', 'post-carousel' ),
							'center bottom' => esc_html__( 'Center Bottom', 'post-carousel' ),
							'right top'     => esc_html__( 'Right Top', 'post-carousel' ),
							'right center'  => esc_html__( 'Right Center', 'post-carousel' ),
							'right bottom'  => esc_html__( 'Right Bottom', 'post-carousel' ),
						),
					),
					$this->value['background-position'],
					$this->field_name(),
					'field/background'
				);

				echo '</div>';

			}

			//
			// Background Repeat.
			if ( ! empty( $args['background_repeat'] ) ) {
				echo '<div class="spf--block spf--select">';

				SP_PC::field(
					array(
						'id'      => 'background-repeat',
						'type'    => 'select',
						'options' => array(
							''          => esc_html__( 'Background Repeat', 'post-carousel' ),
							'repeat'    => esc_html__( 'Repeat', 'post-carousel' ),
							'no-repeat' => esc_html__( 'No Repeat', 'post-carousel' ),
							'repeat-x'  => esc_html__( 'Repeat Horizontally', 'post-carousel' ),
							'repeat-y'  => esc_html__( 'Repeat Vertically', 'post-carousel' ),
						),
					),
					$this->value['background-repeat'],
					$this->field_name(),
					'field/background'
				);

				echo '</div>';

			}

			//
			// Background Attachment.
			if ( ! empty( $args['background_attachment'] ) ) {
				echo '<div class="spf--block spf--select">';

				SP_PC::field(
					array(
						'id'      => 'background-attachment',
						'type'    => 'select',
						'options' => array(
							''       => esc_html__( 'Background Attachment', 'post-carousel' ),
							'scroll' => esc_html__( 'Scroll', 'post-carousel' ),
							'fixed'  => esc_html__( 'Fixed', 'post-carousel' ),
						),
					),
					$this->value['background-attachment'],
					$this->field_name(),
					'field/background'
				);

				echo '</div>';

			}

			//
			// Background Size.
			if ( ! empty( $args['background_size'] ) ) {
				echo '<div class="spf--block spf--select">';

				SP_PC::field(
					array(
						'id'      => 'background-size',
						'type'    => 'select',
						'options' => array(
							''        => esc_html__( 'Background Size', 'post-carousel' ),
							'cover'   => esc_html__( 'Cover', 'post-carousel' ),
							'contain' => esc_html__( 'Contain', 'post-carousel' ),
						),
					),
					$this->value['background-size'],
					$this->field_name(),
					'field/background'
				);

				echo '</div>';

			}

			//
			// Background Origin.
			if ( ! empty( $args['background_origin'] ) ) {
				echo '<div class="spf--block spf--select">';

				SP_PC::field(
					array(
						'id'      => 'background-origin',
						'type'    => 'select',
						'options' => array(
							''            => esc_html__( 'Background Origin', 'post-carousel' ),
							'padding-box' => esc_html__( 'Padding Box', 'post-carousel' ),
							'border-box'  => esc_html__( 'Border Box', 'post-carousel' ),
							'content-box' => esc_html__( 'Content Box', 'post-carousel' ),
						),
					),
					$this->value['background-origin'],
					$this->field_name(),
					'field/background'
				);

				echo '</div>';

			}

			//
			// Background Clip.
			if ( ! empty( $args['background_clip'] ) ) {
				echo '<div class="spf--block spf--select">';

				SP_PC::field(
					array(
						'id'      => 'background-clip',
						'type'    => 'select',
						'options' => array(
							''            => esc_html__( 'Background Clip', 'post-carousel' ),
							'border-box'  => esc_html__( 'Border Box', 'post-carousel' ),
							'padding-box' => esc_html__( 'Padding Box', 'post-carousel' ),
							'content-box' => esc_html__( 'Content Box', 'post-carousel' ),
						),
					),
					$this->value['background-clip'],
					$this->field_name(),
					'field/background'
				);

				echo '</div>';

			}

			//
			// Background Blend Mode.
			if ( ! empty( $args['background_blend_mode'] ) ) {
				echo '<div class="spf--block spf--select">';

				SP_PC::field(
					array(
						'id'      => 'background-blend-mode',
						'type'    => 'select',
						'options' => array(
							''            => esc_html__( 'Background Blend Mode', 'post-carousel' ),
							'normal'      => esc_html__( 'Normal', 'post-carousel' ),
							'multiply'    => esc_html__( 'Multiply', 'post-carousel' ),
							'screen'      => esc_html__( 'Screen', 'post-carousel' ),
							'overlay'     => esc_html__( 'Overlay', 'post-carousel' ),
							'darken'      => esc_html__( 'Darken', 'post-carousel' ),
							'lighten'     => esc_html__( 'Lighten', 'post-carousel' ),
							'color-dodge' => esc_html__( 'Color Dodge', 'post-carousel' ),
							'saturation'  => esc_html__( 'Saturation', 'post-carousel' ),
							'color'       => esc_html__( 'Color', 'post-carousel' ),
							'luminosity'  => esc_html__( 'Luminosity', 'post-carousel' ),
						),
					),
					$this->value['background-blend-mode'],
					$this->field_name(),
					'field/background'
				);

				echo '</div>';

			}

			echo '<div class="clear"></div>';

			//
			// Preview.
			$always_preview = ( 'always' !== $args['preview'] ) ? ' hidden' : '';

			if ( ! empty( $args['preview'] ) ) {
				echo '<div class="spf--block spf--block-preview' . esc_attr( $always_preview ) . '">';
				echo '<div class="spf--preview">' . esc_html( $args['preview_text'] ) . '</div>';
				echo '</div>';
			}
			echo '<div class="clear"></div>';
			echo wp_kses_post( $this->field_after() );

		}

		/**
		 * The field output.
		 *
		 * @return mixedx
		 */
		public function output() {

			$output    = '';
			$bg_image  = array();
			$important = ( ! empty( $this->field['output_important'] ) ) ? '!important' : '';
			$element   = ( is_array( $this->field['output'] ) ) ? join( ',', $this->field['output'] ) : $this->field['output'];

			// Background image and gradient.
			$background_color        = ( ! empty( $this->value['background-color'] ) ) ? $this->value['background-color'] : '';
			$background_gd_color     = ( ! empty( $this->value['background-gradient-color'] ) ) ? $this->value['background-gradient-color'] : '';
			$background_gd_direction = ( ! empty( $this->value['background-gradient-direction'] ) ) ? $this->value['background-gradient-direction'] : '';
			$background_image        = ( ! empty( $this->value['background-image']['url'] ) ) ? $this->value['background-image']['url'] : '';

			if ( $background_color && $background_gd_color ) {
				$gd_direction = ( $background_gd_direction ) ? $background_gd_direction . ',' : '';
				$bg_image[]   = 'linear-gradient(' . $gd_direction . $background_color . ',' . $background_gd_color . ')';
			}

			if ( $background_image ) {
				$bg_image[] = 'url(' . $background_image . ')';
			}

			if ( ! empty( $bg_image ) ) {
				$output .= 'background-image:' . implode( ',', $bg_image ) . $important . ';';
			}

			// Common background properties.
			$properties = array( 'color', 'position', 'repeat', 'attachment', 'size', 'origin', 'clip', 'blend-mode' );

			foreach ( $properties as $property ) {
				$property = 'background-' . $property;
				if ( ! empty( $this->value[ $property ] ) ) {
					$output .= $property . ':' . $this->value[ $property ] . $important . ';';
				}
			}

			if ( $output ) {
				$output = $element . '{' . $output . '}';
			}

			$this->parent->output_css .= $output;

			return $output;

		}

	}
}
