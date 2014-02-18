(function ($) {

// @todo Array syntax required; 'break' is a predefined token in JavaScript.
Drupal.wysiwyg.plugins['regionalmarks'] = {
  /**
   * Return whether the passed node belongs to this plugin.
   */
  isNode: function(node) {
    return ($(node).is('img.wysiwyg-regionalmarks'));
  },

  /**
   * Execute the button.
   */
  invoke: function(data, settings, instanceId) {
    if (data.format == 'html') {
      // Prevent duplicating a teaser break.
      if ($(data.node).is('img.wysiwyg-regionalmarks')) {
        return;
      }
      var content = this._getPlaceholder(settings);
    }
    else {
      // Prevent duplicating a teaser break.
      // @todo data.content is the selection only; needs access to complete content.
      if (data.content.match(/<!--break-->/)) {
        return;
      }
      var content = '<!--break-->';
    }
    if (typeof content != 'undefined') {
      Drupal.wysiwyg.instances[instanceId].insert(content);
    }
  },

  /**
   * Replace all <!--break--> tags with images.
   */
  attach: function(content, settings, instanceId) {
//     block = content.substr(
//     content = content.replace(/<!--([^>]+)-->/g, this._getPlaceholder(settings));
//     content = content.replace(/<!--onlyin:([^>]+)-->/g, this._getPlaceholder(settings));
    content = content.replace(/<!--(onlyin:[^>]+)-->/g, '<div class="wysiwyg-regionalmarks-start drupal-content" >$1</div>');
    content = content.replace(/<!--(\/onlyin:[^>]+)-->/g, '<div class="wysiwyg-regionalmarks-end drupal-content" >$1</div>');
//     content = this._convertBlock(content, settings,'encode');
//     matches = content.match(/<!--([^>]+)-->/g);
//     content = content.replace(/<!--([^>]+)-->/g,this._convertBlock(matches[0]));
    return content;
  },

  /**
   * Replace images with <!--break--> tags in content upon detaching editor.
   */
  detach: function(content, settings, instanceId) {
//     placeholder_start = '<span class="wysiwyg-htmlcomment drupal-content" >';
//     placeholder_end = '</span>';
//     matches = content.match(/<span class="wysiwyg-htmlcomment drupal-content" >(.+?)<\/span>/g);
//     content = content.replace(/<span class="wysiwyg-htmlcomment drupal-content" >(\/?onlyin:[^>]+)<\/span>/g, '<span class="wysiwyg-htmlcomment drupal-content" >$1<\/span>');
    content = content.replace(/<div class="wysiwyg-regionalmarks-start drupal-content">(onlyin\:[^>]+)<\/div>/g, '<!--$1-->');
    content = content.replace(/<div class="wysiwyg-regionalmarks-end drupal-content">(\/onlyin\:[^>]+)<\/div>/g, '<!--$1-->');
    return content;
//     var $content = $('<div>' + content + '</div>'); // No .outerHTML() in jQuery :(
//     // #404532: document.createComment() required or IE will strip the comment.
//     // #474908: IE 8 breaks when using jQuery methods to replace the elements.
//     // @todo Add a generic implementation for all Drupal plugins for this.
//     $.each($('img.wysiwyg-htmlcomment', $content), function (i, elem) {
//       elem.parentNode.insertBefore(document.createComment('break'), elem);
//       elem.parentNode.removeChild(elem);
//     });
//     return $content.html();
  }


};

})(jQuery);
