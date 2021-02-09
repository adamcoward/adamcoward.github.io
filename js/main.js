(function($) {
  
  // io plugin.
  $.fn.io = function() {
    if ('IntersectionObserver' in window) {
      var callback = function(entries, observer) {
        var i;
        for (i = 0; i < entries.length; i++) {
          if (entries[i].isIntersecting) {
            var $this = $(entries[i].target);
            var delay = $this.attr('data-delay');
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
      this.each(function() {
        observer.observe(this);
      });
    }
    return this;
  };
  
  // pagination plugin.
  $.fn.pagination = function() {
    return this.each(function(e) {
      var $this = $(this);
      var lock = false;
      var page = $this.attr('data-pagination-page');
      var url = $this.attr('data-pagination-url');
      var content = $this.find('.js-pagination-content');
      var container = $this.find('.js-pagination-container');
      var button = $this.find('.js-pagination-button');
      
      // Attach click event listener.
      button.on('click', function(e) {
        if (!lock) {
          lock = true;
          button.addClass('disabled');
          $.getJSON(url + '?p=' + page, function(data) {
            content.append(data['result']);
            if (data['status'] == 'END') {
              container.fadeOut();
            } else {
              page ++;
            }
            lock = false;
            button.removeClass('disabled');
          });
        }
        e.preventDefault();
      });
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
    
    // Cookie consent.
    $('.cookie-consent__container').addClass('is-stuck is-at-bottom');
    var button = document.querySelector("#cookieConsent button[data-cookie-string]");
    button.addEventListener("click", function (event) {
        document.cookie = button.dataset.cookieString;
        $('#cookieConsent').fadeOut();
    }, false);
    
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
    
    // Initialize pagination.
    $('.js-pagination').pagination();
  });
})(jQuery);