$(function () {
  const serivces = JSON.parse($(".serivces").val());
  console.log(serivces);

  $.each(serivces, function (i, serivce) {
    $(".galeria .contenedorImgs").append(`
      <div class="imagen">
      <div class="position-relative w-100">
        <div class="position-absolute left-0 top-0 delete text-whites">
          <a href="/serivce/delete/${serivce._id}" class="fas fa-trash-alt"></a>
        </div>

        <div class=slider></div>
        <p class="nombre"> ${serivce.serivceName} </p>
      </div>
    </div>
     `);
  });

  setTimeout(() => {
    $(".galeria").addClass("vis");
  }, 1000);

  // $(".galeria").on("click", ".nombre", function () {
  //   console.log("smsm");
  //   // $(".galeria .nombre").click(function () {
  //   var imagen = serivces[$(this).index()].img;
  //   var titulo = serivces[$(this).index()].serivceName;
  //   var description = serivces[$(this).index()].desc;
  //   const desc = document.createElement("div");
  //   desc.setAttribute("class", "desciption");

  //   if (typeof description == "object") {
  //     for (let item of description) {
  //       const category = document.createElement("div");
  //       category.setAttribute("class", "category");
  //       category.append(`<h3 class="title"> ${item.title} </h3>`);
  //       const ul = document.createElement("ul");
  //       ul.setAttribute("class", "list-unstyled");
  //       // return console.log(item);
  //       for (let it of item.body) {
  //         const li = document.createElement("li");
  //         li.append(it);
  //         ul.appendChild(li);
  //       }
  //       console.log(ul);
  //       desc.appendChild(category);
  //     }
  //   }
  //   $(".galeria").addClass("scale");
  //   $(this).addClass("activa");
  //   if (!$(".fullPreview").length) {
  //     console.log();
  //     $("body").append(`
  //       <div class="fullPreview">
  //         <div class="cerrarModal"></div>
  //         <div class="wrapper">
  //           <div class="blur" style="background-image:url(images/serivces/${imagen})"></div>
  //           <p class="titulo">${titulo}</p>
  //           <img src="/images/serivces/${imagen}">
  //           <p class="desc"></p>
  //           <div class="controles">
  //           <div class="control av"></div>
  //           <div class="control ret"></div>
  //         </div>
  //         </div>

  //       </div>`);

  //     $(".fullPreview .desc").append(ul);
  //     $("body").css({ overflow: "hidden" });
  //     $(".fullPreview").fadeIn().css("display", "flex");
  //   }
  // });
  // $("body").on("click", ".fullPreview .cerrarModal", function () {
  // $("body").on("click", ".fullPreview .cerrarModal", function () {
  //   console.log("moha");
  //   $(".contenedorImgs .imagen.activa").removeClass("activa");
  //   $(".galeria").removeClass("scale");
  //   $(this)
  //     .parent()
  //     .fadeOut(function () {
  //       $(this).remove();
  //     });
  // });
  // $("body").on("click", ".fullPreview .control", function () {
  //   var activa = $(".contenedorImgs .imagen.activa");
  //   var index;
  //   if ($(this).hasClass("av")) {
  //     index = activa.next().index();
  //     if (index < 0) index = 0;
  //   } else {
  //     index = activa.prev().index();
  //     if (index < 0) index = imgs.length - 1;
  //   }
  //   $(".fullPreview").addClass("anim");
  //   setTimeout(() => {
  //     $(".contenedorImgs .imagen.activa").removeClass("activa");
  //     $(".contenedorImgs .imagen").eq(index).addClass("activa");
  //     $(".fullPreview")
  //       .find(".blur")
  //       .css("background-image", "url(" + imgs[index].url + ")");
  //     $(".fullPreview").find("img").attr("src", imgs[index].url);
  //     $(".fullPreview").find(".titulo").text(imgs[index].titulo);
  //     $(".fullPreview").find(".desc").text(imgs[index].descripcion);
  //     $(".fullPreview").removeClass("anim");
  //   }, 500);
  // });
});
