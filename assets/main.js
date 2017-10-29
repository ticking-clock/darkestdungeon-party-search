function initTable() {
  $('.table-container').load('./assets/paste.html', function() {
    // Tweak some of the pasted html from https://darkestdungeon.gamepedia.com/Party_Combos
    $(this).find('table').css('width', 'auto');
    $(this).find('table a img').unwrap().each(function(index, img) {
      var $img = $(img);
      var cls = $img.attr('alt').replace(' portrait roster.png', '').toLowerCase();
      $img.attr('alt', cls).attr('src', 'assets/images/' + cls + '.png');
    });
  });
}

function initFilters() {
  $('.filters select').on('change', function() {
    updateRows();
  });
}

function updateRows() {
  var includeClasses = $('.filters select').map(function() {
    var v = $(this).val();
    if (v !== 'Select') return v.toLowerCase();
  }).toArray();
  $('.table-container tr').slice(1).each(function(index, row) {
    var rowClasses = $(row).find('img').map(function() { return $(this).attr('alt'); }).toArray();
    $(row).toggle(includeClasses.every(function(cls) {
      var rowClassIndex = rowClasses.indexOf(cls);
      if (rowClassIndex > -1) rowClasses.splice(rowClassIndex, 1);
      return rowClassIndex > -1;
    }));
  });
  var count = $('.table-container tr:visible').slice(1).length;
  $('.filters .results').text(count + (count === 1 ? ' result' : ' results'));
}

$(function() {
  initTable();
  initFilters();
});
