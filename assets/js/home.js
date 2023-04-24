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
    console.log("clicked");
    message($(".notification"));
  });

  $(".form button").on("click", async function (e) {
    e.preventDefault();
    const data = {
      sender: $("#username").val(),
      email: $("#email").val(),
      subject: $("#subject").val(),
      message: $("#message").val(),
      terms: $("#terms").val(),
    };

    // return console.log(data);

    axios
      .post("/contact/message", data)
      .then((result) => {
        console.log(result, "result");
        alert("the message is sent . successfully");
      })
      .catch((err) => {
        console.log(err, "err");
        alert("there is a problem");
      });
  });
});
