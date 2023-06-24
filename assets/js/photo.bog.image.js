$(function () {
  const serivces = JSON.parse($(".serivces").val());

  // console.log(serivces);

  setTimeout(() => {
    $(".galeria").addClass("vis");
  }, 1000);

  // const body = [
  //   "Beschallungsanlagen ab 400 Watt Nennleistung",
  //   "Bühnen-Monitoring",
  //   "Mischpulte",
  //   "Abspielgeräte (CD, MD, DAT, Plattenspieler ...)",
  //   "Aufnahmegeräte für Live-Mitschnitte (MP3, DAT, MD, ...)",
  //   "Effektgeräte für Mikrofonie und Beschallungsanlagen",
  //   "Mikrofone (dynamisch und Kondensator) kabelgebunden oder Funk",
  //   "Mikrofon-Stative und Notenständer, AKG-Kopfhörer",
  //   "Starkstromverteiler 125 Ampère, 63 Ampère, 32 Ampère sowie Verkabelung",
  //   "Lichtanlagen ab 2,5 kWh mit PAR/LED und Vielzahl von Farbfiltern",
  //   "Lichtpulte und Dimmer",
  //   "Lichteffekte (Standard und LED) und Nebelmaschinen",
  //   "Stative (mit/ohne Kurbel) bis 4 Meter",
  //   "Aluminium-Traversen von Microtruss (heavy duty) und Litec (heavy duty)",
  //   "Digitale Klangerzeuger und Drum-Set",
  //   "DLP-Beamer mit bis zu 6000 ANSI-Lumen (Public Viewing)",
  //   "Apple MacBook Pro zusammen mit MOTU Traveler für mobilen Sound, Video und Live-Aufnahmen",
  //   "u.v.m",
  //   "Dekorationen",
  //   "Mobile Tanzfläche",
  //   "Bühne",
  //   "Techniker für Beschallung und Licht",
  // ];

  function printCategory(item) {
    const parent = document.createElement("div");
    parent.setAttribute("class", "parent");
    const title = document.createElement("h3");

    const ul = document.createElement("ul");
    for (let it of item.body) {
      const item = document.createElement("li");
      item.append(it);
      ul.append(item);
    }
    title.append(item.title);
    parent.append(title);
    parent.append(ul);
    return parent;
  }

  $(".galeria").on("click", ".contenedorImgs .item .nombre", function () {
    const parent = $(this).parents(".item");
    var item = serivces[parent.index()].img;
    console.log(item, "item");
    var titulo = serivces[parent.index()].serivceName;
    var descripcion = serivces[parent.index()].desc;
    var imgs = serivces[parent.index()].imgs;
    $(".galeria").addClass("scale");
    $(this).addClass("activa");
    if (!$(".fullPreview").length) {
      $("body").append(`
      <div class="fullPreview">
        <div class="cerrarModal"></div>
        <div class="wrapper">
          <div class="blur" style="background-image:url('images/serivces/${imgs[0]}')"></div>
          <p class="titulo">${titulo}</p>
          <div id="serivceSlider" class="carousel slide carousel-fade" data-bs-ride="carousel">
          <div class="carousel-inner">
            <div class="carousel-item active">
              <img src="/assets/images/serivces/${imgs[0]}" class="d-block w-100" alt="...">
            </div>
            <div class="carousel-item">
            <img src="/assets/images/serivces/${imgs[1]}" class="d-block w-100" alt="...">
            </div>
            <div class="carousel-item">
            <img src="/assets/images/serivces/${imgs[2]}" class="d-block w-100" alt="...">
            </div>
          </div>
          <button class="carousel-control-prev" type="button" data-bs-target="#serivceSlider" data-bs-slide="prev">
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Previous</span>
        </button>
        <button class="carousel-control-next" type="button" data-bs-target="#serivceSlider" data-bs-slide="next">
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Next</span>
        </button>
        </div>
          <div class="desc"></div>
        </div>
        <div class="controles">
          <div class="control av"></div>
          <div class="control ret"></div>
        </div>
      </div> 
      `);
      for (let item of descripcion) {
        $(".fullPreview .desc").append(printCategory(item));
      }
      var ourCCarousel = document.getElementById("serivceSlider");
      var carousel = new bootstrap.Carousel(ourCCarousel, {
        interval: 400,
        wrap: false,
      });
      $(".fullPreview").fadeIn().css("display", "flex");
    }
  });
  $("body").on("click", ".fullPreview .cerrarModal", function () {
    $(".contenedorImgs .item.activa").removeClass("activa");
    $(".galeria").removeClass("scale");
    // $(".fullPreview").removeClass("scale");
    $(this)
      .parent()
      .fadeOut(function () {
        $(this).remove();
      });
  });
  $("body").on("click", ".fullPreview .control", function () {
    var activa = $(".contenedorImgs .item.activa");
    var index;
    if ($(this).hasClass("av")) {
      index = activa.next().index();
      if (index < 0) index = 0;
    } else {
      index = activa.prev().index();
      if (index < 0) index = imgs.length - 1;
    }
    $(".fullPreview").addClass("anim");
    setTimeout(() => {
      const imgs = serivces[index].imgs;
      $(".contenedorImgs .item.activa").removeClass("activa");
      $(".contenedorImgs .item").eq(index).addClass("activa");
      $(".fullPreview")
        .find(".blur")
        .css(
          "background-image",
          "url(images/serivces/" + serivces[index].imgs[0] + ")"
        );
      // $(".fullPreview")
      //   .find("img")
      //   .attr("src", `images/serivces/${serivces[index].img}`);
      $(".carousel-inner .carousel-item:first-child").attr(
        "src",
        `images/serivces/${imgs[0]}`
      );
      $(".carousel-inner .carousel-item:nth-child(2)").attr(
        "src",
        `images/serivces/${imgs[1]}`
      );
      $(".carousel-inner .carousel-item:last-child").attr(
        "src",
        `images/serivces/${imgs[2]}`
      );
      if (serivces[index].serivceName) {
        $(".fullPreview").find(".titulo").html(serivces[index].serivceName);
      } else {
        $(".fullPreview h3").css("display", "none");
      }

      $(".fullPreview").find(".desc").html("");
      for (let item of serivces[index].desc) {
        $(".fullPreview").find(".desc").append(printCategory(item));
      }
      $(".fullPreview").removeClass("anim");
    }, 500);
  });
});
