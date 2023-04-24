import { sendApi, showMsg } from "/help-font/message.js";

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

  $(".navbar-brand").click(function () {
    $(".success p").html("welcome sameh").parent(".success").addClass("show");

    setTimeout(() => {
      $(".success").removeClass("show");
    }, 1300);
  });

  $(".form button").on("click", async function (e) {
    e.preventDefault();
    console.log("sameh");

    const data = {
      sender: $("#username").val(),
      email: $("#email").val(),
      subject: $("#subject").val(),
      message: $("#message").val(),
      terms: $("#terms").val(),
    };

    $(".success").addClass("show");

    // return console.log(data);
    const lang = $(".lang").val();

    axios
      .post("/contactus/message", data)
      .then((result) => {
        console.log("success form", result);
        $(".success p")
          .html("the message is sent . succcessfully")
          .parent(".success")
          .addClass("show");

        setTimeout(function () {
          $(".success").removeClass("show");
        }, 1800);
      })
      .catch((err) => {
        console.log("err from", err);
        $(".danger p")
          .html("there is a problem")
          .parent(".danger")
          .addClass("show");

        setTimeout(function () {
          $(".danger").removeClass("show");
        }, 1800);
      });
  });
});
