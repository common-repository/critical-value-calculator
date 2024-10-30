<?php
/*
* Plugin Name:  Critical Value Calculator
* Description:  A WordPress plugin to calculate Critical value.
* Author:       Enzipe
* Author URI:   https://www.enzipe.com/
* Version:      1.0.0
* License:      GPL v2 or later
* License URI:  https://www.gnu.org/licenses/gpl-2.0.html
* Text Domain:  critical-value-calculator
*/
if (!defined('ABSPATH')) {
    echo ('Activate plugin first');
    exit;
}

class CRIT_CriticalValueCalculator
{

    public function __construct()
    {

        add_action('wp_enqueue_scripts', array($this, 'crit_load_assets'));

        add_action('wp_enqueue_style', array($this, 'crit_load_assets'));

        add_shortcode('critical-value', array($this, 'crit_load_shortcode'));
    }

    public function crit_load_assets()
    {

        wp_enqueue_style(
            'critical-value',
            plugin_dir_url(__FILE__) . 'assets/css/critical-value-calculator-css.css',
            array(),
            1,
            'all'
        );

        $crit_cal_color = get_option('crit_color_option');
        $crit_custom_cal_css = "
        .main_container button.navigate_btn.active{
            border-left: 3px solid {$crit_cal_color} !important;
        }
        .calculate_btn{
            background-color: {$crit_cal_color} !important;
        }
        .page__title{
            color: {$crit_cal_color} !important;
        }
        .c_value_results>div:hover>*,
        .c_value_results>div:hover {
        background: {$crit_cal_color} !important;
        }
        .main_container .submit__btns__critical input {
            background: {$crit_cal_color} !important;
        }";

        wp_add_inline_style('critical-value', $crit_custom_cal_css);

        wp_enqueue_script(
            'critical-value',
            plugin_dir_url(__FILE__) . 'assets/js/critical-value-calculator-script.js',
            array('jquery'),
            1,
            'all'
        );
    }

    public function crit_load_shortcode()
    {
        require plugin_dir_path(__FILE__) . 'inc/main-form.php';
    }
}

new CRIT_CriticalValueCalculator;
require plugin_dir_path(__FILE__) . 'inc/admin-setting.php';
