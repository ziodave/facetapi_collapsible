(function($){

// This strange little function allows the "expanded" class to be added to or
// removed from the passed in facet based on the passed in condition, which
// corresponds to a configured setting.
var facetCollapseExpanded = function($facet, condition, operation, behavior) {
  var wrapper = $facet.find('.facet-collapsible-wrapper').get(0);
  if (wrapper) {
    var facetId = wrapper.id;
    facetId = facetId.replace('facet-collapsible-', '');
    facetId = facetId.replace(/-/g, '_');
    if (Drupal.settings.facetapi_collapsible[facetId]) {
      // We either need to check that the 'condition' in Drupal.settings DOES
      // hold for the given facet's configuration, or that it DOES NOT hold. The
      // 'operation' boolean tells us which.
      var cond = (Drupal.settings.facetapi_collapsible[facetId][condition] == operation);
      // Only add or remove the class if the condition has been satisfied.
      if (cond) {
        // behavior is either "addClass" or "removeClass"
        $facet[behavior]('expanded');
      }
    }
  }
}

/**
 * Behavior for collapsing faceted search lists.
 */
Drupal.behaviors.facetapiCollapsible = {
  attach : function(context) {
    var i = 0;
    $('.facetapi-collapsible').once(function() {
      var $facet = $(this);
      if ($('.facetapi-active', this).size() > 0) {
        $(this).addClass('expanded active');
      }
      else {
        if (i == 0) {
          // Add the 'expanded' class to the first facet if configured to do so.
          facetCollapseExpanded($facet, 'expand_first', true, 'addClass');
        }

        $('h2', this).each(function() {
          $(this).click(function() {
            $facet.siblings('.facetapi-collapsible:not(.active)').each(function(){
              // Remove the 'expanded' class from all other facets that haven't
              // been configured to stay open.
              facetCollapseExpanded($(this), 'keep_open', false, 'removeClass');
            });
            $facet.toggleClass('expanded');
          });
        });
      }
      i++;
    });
  }
};

})(jQuery);