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

  var accept = false;
  // toggele checking
  $(".form-check p").click(function () {
    accept = !accept;
    $(this).toggleClass("fas fa-check-square");
    console.log("accept", accept);
  });

  $(".form button").on("click", async function (e) {
    e.preventDefault();

    const data = {
      sender: $("#username").val(),
      email: $("#email").val(),
      subject: $("#subject").val(),
      message: $("#message").val(),
      terms: accept,
    };

    // return console.log(data);
    const lang = $(".lang").val();
    const div = $(".error");

    if (data.terms == true) {
      axios
        .post("/contactus/message", data)
        .then((result) => {
          if (result.data.formError.length > 0) {
            for (let it of result.data.formError) {
              const p = document.createElement("p");
              p.setAttribute("class", "alert alert-danger text-center");
              p.innerHTML = `${it.param}  -  ${it.msg}`;
              div.append(p);
            }
          } else {
            $(".success p")
              .html("the message is sent . succcessfully")
              .parent(".success")
              .addClass("show");

            setTimeout(function () {
              $(".success").removeClass("show");
            }, 1800);
          }
          console.log("success form", result);
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
    } else {
      div.append(
        "<p class='text-center alert alert-danger'> you must be accept for terms and conditions </p>"
      );
    }
  });
});
