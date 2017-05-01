(function($) {
  $(function () {
    var DATA = [];
    var MISSING = [];

    var loadData = function() {
      $.getJSON('data/pratchettnadzis.json', function (data) {
        var dataIds = data.map(function(item) {
          return item.id;
        });

        DATA = data;
        MISSING = Array.apply(null, { length: DATA[0].id }).map(Number.call, Number).filter(function(num) {
          return(num != 0 && dataIds.indexOf(num) < 0);
        });

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
      var newId = getCurrentId() - 1;

      e.preventDefault();
      if (MISSING.indexOf(newId) >= 0) {
        newId -= 1;
      }

      populateItem(Math.max.apply(Math, [newId, 1]));
    });

    $('body').on('click', '.data-next', function(e) {
      var newId = getCurrentId() + 1;

      e.preventDefault();
      if (MISSING.indexOf(newId) >= 0) {
        newId += 1;
      }

      populateItem(Math.min.apply(Math, [newId, getLastId()]));
    });

    $('body').on('click', '.data-last', function(e) {
      e.preventDefault();
      populateItem(getLastId());
    });

    loadData();
  });
})(jQuery);
