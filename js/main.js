(function($) {
  
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
  
  var downingVentures = {};
  
  downingVentures.topAppBar = function() {
    var $document = $(document);
    var topAppBar = $('#top-app-bar');
    
    function scroll() {
      if ($document.scrollTop() > 0) {
        topAppBar.addClass('active');
      } else {
        topAppBar.removeClass('active');
      }
    }
    scroll();
    
    // Attach scroll event listener.
    $(window).on('scroll', function(e) {
      scroll();
    });
  };
  
  downingVentures.menuButton = function() {
    var menuButton = $('#menu-button');
    var drawer = $('#drawer');
    
    // Attach click event listener.
    menuButton.on('click', function(e) {
      menuButton.toggleClass('active');
      drawer.fadeToggle();
      e.preventDefault();
    });
  };
  
  $(document).ready(function() {
    
    // Initialize topAppBar.
    downingVentures.topAppBar();
    
    // Initialize menuButton.
    downingVentures.menuButton();
    
    // Initialize io.
    $('.js-io').io();
    
    // Initialize Rellax.
    var rellax = new Rellax('.rellax', {
      center: true
    });
    
    // Initialize owlCarousel.
    $('.js-carousel').owlCarousel({
      dots: true,
      items: 2,
      loop: true,
      margin: 20,
      nav: false,
      responsive: {
        768: {
            items: 4,
        }
      }
    });
    $('.js-carousel-2').owlCarousel({
      dots: false,
      items: 1,
      loop: true,
      margin: 20,
      nav: true,
      responsive: {
        768: {
            items: 3
        }
      }
    });
  });
})(jQuery);