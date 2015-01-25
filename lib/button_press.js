(function() {
  if (typeof Plots === "undefined") {
    window.Plots = {};
  }

  $('.btn').on('click', function () {
    $('.active').button('toggle');
    $(this).button('toggle');
    pressedButton = $('.active').prop('id');
  });
}());
