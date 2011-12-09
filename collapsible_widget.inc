<?php

/**
 * @file
 *
 */

/**
 * Widget that renders facets as a list of clickable links.
 */
class FacetapiCollapsible extends FacetapiWidgetLinks {
  /**
   * Renders the links.
   */
  public function execute() {
    $element = &$this->build[$this->facet['field alias']];

    // Sets each item's theme hook, builds item list.
    $this->setThemeHooks($element);
    $settings = $this->settings->settings;
    $keep_open = isset($settings['keep_open']) ? $settings['keep_open'] : 0;
    $expand_first = isset($settings['expand_first']) ? $settings['expand_first'] : 1;
    $element = array(
      '#theme' => 'item_list',
      '#items' => $this->buildListItems($element),
      '#prefix' => '<div class="facet-collapsible-wrapper" id="facet-collapsible-' . str_replace('_', '-', $this->facet['field alias']) . '">',
      '#suffix' => '</div>',
      '#attributes' => array_merge_recursive($this->build['#attributes'], array('class' => array('facetapi-collapsible'))),
      '#attached' => array(
        'js' => array(
          drupal_get_path('module', 'facetapi_collapsible') .'/facetapi_collapsible.js',
          array('data' =>
            array(
              'facetapi_collapsible' => array(
                $this->facet['field alias'] => array(
                  'keep_open' => $keep_open,
                  'expand_first' => $expand_first))), 'type' => 'setting'),
          ),
        'css' => array(drupal_get_path('module', 'facetapi_collapsible') .'/facetapi_collapsible.css'),
      ),
    );
  }

  /**
   * Adds option to keep facets open.
   */
  function settingsForm(&$form, &$form_state) {
    parent::settingsForm($form, $form_state);
    $settings = $this->settings->settings;
    $form['widget']['widget_settings']['collapsible_links'][$this->id] = array(
      'keep_open' => array(
        '#type' => 'checkbox',
        '#title' => t('Keep open'),
        '#default_value' => isset($settings['keep_open']) ? $settings['keep_open'] : 0,
        '#description' => t('If checked, facets that are already expanded will stay expanded when you click on another facet, otherwise they will close.'),
        '#states' => array(
          'visible' => array(
            'select[name="widget"]' => array('value' => $this->id),
          ),
        ),
      ),
      'expand_first' => array(
        '#type' => 'checkbox',
        '#title' => t('Expand'),
        '#default_value' => isset($settings['expand_first']) ? $settings['expand_first'] : 1,
        '#description' => t('If checked, this facet will automatically expand if it is the first on the page.'),
        '#states' => array(
          'visible' => array(
            'select[name="widget"]' => array('value' => $this->id),
          ),
        ),
      )
    );
  }
}
