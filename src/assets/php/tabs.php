<?php
add_action('wp_ajax_load_cars', 'load_cars');
add_action('wp_ajax_nopriv_load_cars', 'load_cars');

function load_cars()
{
    $brand = isset($_POST['brand']) ? sanitize_text_field($_POST['brand']) : '';

    $query = new WP_Query([
        'post_type' => 'car',
        'posts_per_page' => 7,

        'tax_query' => [
            [
                'taxonomy' => 'brand',
                'field'    => 'slug',
                'terms'    => $brand
            ]
        ]
    ]);

    if ($query->have_posts()) {

        while ($query->have_posts()) {
            $query->the_post();
            get_template_part(
                'template-parts/car-card'
            );
        }

        wp_reset_postdata();

    } else {
        echo '<p>Автомобили не найдены</p>';
    }

    wp_die();
}