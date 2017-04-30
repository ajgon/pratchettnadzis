(function($) {
  $(function () {
    var DATA = [];
    var loadData = function() {
      $.getJSON('data/pratchettnadzis.json', function (data) {
        DATA = data;
        window.DATA = data;

        if(window.location.hash) {
          $(window).trigger('hashchange');
        } else {
          populateRandomItem();
        }
        $('.preloader-wrapper, .data-card').toggleClass('hide');
      });
    };

    var populateItem = function(id) {
      var item = DATA.reduce(function(prev, curr) {
        return(curr.id == id ? curr : prev);
      });

      if(item.id != id) {
        populateRandomItem();
        return;
      }

      window.location.hash = id.toString();

      for(key in item) {
        if (item.hasOwnProperty(key)) {
          if (key == 'link') {
            $('.data-link').attr('href', item[key]);
          } else {
            $('.data-' + key).html(item[key].toString().replace(/\n/g, '<br>'));
          }
        }
      }
    };

    var populateRandomItem = function() {
      populateItem(DATA[Math.floor(Math.random() * DATA.length)].id);
    };

    $(window).on('hashchange', function() {
      var id = parseInt(window.location.hash.replace(/^#/, ''), 10);
      populateItem(id);
    });
    $('body').on('click', '.data-shuffle', function(e) {
      e.preventDefault();
      populateRandomItem();
    });

    loadData();
  });
})(jQuery);
