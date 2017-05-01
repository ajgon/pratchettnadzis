(function($) {
  $(function () {
    var DATA = [];
    var loadData = function() {
      $.getJSON('data/pratchettnadzis.json', function (data) {
        DATA = data;

        if(window.location.hash) {
          $(window).trigger('hashchange');
        } else {
          populateRandomItem();
        }
        $('.preloader-container, .data-card').toggleClass('hide');
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

      history.replaceState(undefined, undefined, '#' + id.toString());

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

    var getCurrentId = function() {
      return parseInt(window.location.hash.replace(/^#/, ''), 10);
    };

    var getLastId = function() {
      return DATA[0].id;
    }

    $(window).on('hashchange', function() {
      populateItem(getCurrentId());
    });

    $('body').on('click', '.data-shuffle', function(e) {
      e.preventDefault();
      populateRandomItem();
    });

    $('body').on('click', '.data-first', function(e) {
      e.preventDefault();
      populateItem(1);
    });

    $('body').on('click', '.data-previous', function(e) {
      e.preventDefault();
      populateItem(Math.max.apply(Math, [getCurrentId() - 1, 1]));
    });

    $('body').on('click', '.data-next', function(e) {
      e.preventDefault();
      populateItem(Math.min.apply(Math, [getCurrentId() + 1, getLastId()]));
    });

    $('body').on('click', '.data-last', function(e) {
      e.preventDefault();
      populateItem(getLastId());
    });

    loadData();
  });
})(jQuery);
