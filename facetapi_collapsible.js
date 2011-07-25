(function($){

/**
 * Behavior for collapsing faceted search lists.
 */
Drupal.behaviors.facetapiCollapsible = {
  attach : function(context) {
    var first = $('.facetapi-collapsible').get(0);
    $(first).parents('.block-facetapi').addClass('expanded');

    $('.facetapi-collapsible').parents('.block-facetapi').once(function() {
      var facet = $(this);
      if ($('.facetapi-active', this).size() > 0) {
        $(this).addClass('expanded active');
      }
      else {
        $('h2', this).each(function() {
          $(this).click(function() {
            facet.siblings('.block-facetapi:not(.active)').each(function(){
              var wrapper = $(this).find('.facet-collapsible-wrapper').get(0);
              if (wrapper && !facet.hasClass('expanded')) {
                var facetId = wrapper.id;
                facetId = facetId.replace('facet-collapsible-', '');
                facetId = facetId.replace(/-/g, '_');
                if (Drupal.settings.facetapi_collapsible[facetId] && !Drupal.settings.facetapi_collapsible[facetId].keep_open) {
                  $(this).removeClass('expanded');
                }
              }
            });
            facet.toggleClass('expanded');
          });
        });
      }
    });
  }
};

})(jQuery);