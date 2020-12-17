(function($) {
  
  // header plugin.
  $.fn.header = function() {
    return this.each(function() {
      var $this = $(this);
      var $document = $(document);
      var button = $this.find('.js-header-button');
      var panel = $this.find('.js-header-panel');
      
      function scroll() {
        if ($document.scrollTop() > 0) {
          $this.addClass('active');
        } else {
          $this.removeClass('active');
        }
      }
      scroll();
      
      // Attach scroll event listener.
      $(window).on('scroll', function(e) {
        scroll();
      });
      
      // Attach click event listener.
      button.on('click', function(e) {
        button.toggleClass('active');
        panel.fadeToggle();
        e.preventDefault();
      });
    });
  }
  
  // io plugin.
  $.fn.io = function() {
    return this.each(function(event) {
      var $this = $(this);
      var delay = $this.attr('data-io-delay');
      if ('IntersectionObserver' in window) {
        var callback = function(entries, observer) {
          var i;
          for (i = 0; i < entries.length; i++) {
            if (entries[i].isIntersecting) {
              if (delay) {
                setTimeout(function() {
                  $this.addClass('active');
                }, delay);
              } else {
                $this.addClass('active');
              }
            }
          }
        }
        var options = {
          //threshold: 0.9
        }
        var observer = new IntersectionObserver(callback, options);
        observer.observe($this[0]);
      }
    });
  };
  
  $(document).ready(function() {
    
    // Initialize header.
    $('.js-header').header();
    
    // Initialize io.
    $('.js-io').io();
    
    // Initialize Rellax.
    var rellax = new Rellax('.rellax', {
      center: true
    });
  });
})(jQuery);