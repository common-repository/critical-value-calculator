<?php

if (!function_exists('crit_calculator_settings_page_html')) {
    function crit_calculator_settings_page_html()
    {
?>
        <div class="wrap title_back">
            <h1><?php echo esc_html(get_admin_page_title()); ?></h1>

            <form action="options.php" method="post">
                <?php
                settings_fields('critical-value');
                do_settings_sections('critical-value');
                submit_button('Save Changes');
                ?>
            </form>
        </div>
    <?php
    }
}
/**
 * Add options page
 */
if (!function_exists('crit_options_page')) {
    function crit_options_page()
    {
        // This page will be under "Settings"
        add_menu_page(
            'Critical Value Calculator Settings',
            'Critical Value Calculator',
            'manage_options',
            'critical-value',
            'crit_calculator_settings_page_html',
            'dashicons-calculator',
            20
        );
    }
    add_action('admin_menu', 'crit_options_page');
}

if (!function_exists('crit_settings_init')) {
    function crit_settings_init()
    {

        register_setting(
            'critical-value',
            'crit_color_option'
        );

        add_settings_section(
            'section_color_id',
            'Theme Color',
            'crit_color_section',
            'critical-value'
        );

        add_settings_field(
            'input_color_id',
            'Select color',
            'crit_color_field',
            'critical-value',
            'section_color_id'
        );

        add_settings_field(
            'info_short_code',
            'Short code',
            'crit_info_shortcode',
            'critical-value',
            'section_color_id'
        );
    }
    add_action('admin_init', 'crit_settings_init');
}


if (!function_exists('crit_color_section')) {
    function crit_color_section()
    {
        echo '<p>Change calculator theme color</p>';
    }
}

if (!function_exists('crit_color_field')) {
    function crit_color_field()
    {
        $crit_setting = get_option('crit_color_option');
        // output the field
    ?>
        <input type="color" name="crit_color_option" value="<?php echo isset($crit_setting) ? esc_attr($crit_setting) : ''; ?>">
    <?php
    }
}

if (!function_exists('crit_info_shortcode')) {
    function crit_info_shortcode()
    {
    ?>
        <span>[critical-value]</span>
<?php
    }
}
