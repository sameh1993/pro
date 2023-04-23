$(document).ready(function () {
  /*
    upload file and preview
*/

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

  document
    .querySelector(".carousel-inner")
    .firstElementChild.classList.add("active");
});
