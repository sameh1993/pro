$("document").ready(function () {
  // trigger dropdown nav

  $(".navbar-toggler").click(function () {
    $(this).siblings(".navbar-collapse").toggleClass("show");
  });

  function readURL(input) {
    if (input.files && input.files[0]) {
      var reader = new FileReader();
      reader.onload = function (e) {
        $(input)
          .siblings("img")
          .attr("src", e.target.result)
          .css("display", "block");
      };
      reader.readAsDataURL(input.files[0]);
    }
  }
  $(".parent-img input").change(function () {
    readURL(this);
  });
});
