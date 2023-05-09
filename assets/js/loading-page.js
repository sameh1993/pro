$(window).on("load", function () {
  "use strict";
  $(".loading").fadeOut(1200, function () {
    $(this).remove(), $("body").css("overflow", "auto");
  });
});
