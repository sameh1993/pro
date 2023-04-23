$(function () {
  const serivces = JSON.parse($(".serivces").val());

  console.log(serivces);

  // console.log(serivces);

  setTimeout(() => {
    $(".galeria").addClass("vis");
  }, 1000);

  const body = [
    "Beschallungsanlagen ab 400 Watt Nennleistung",
    "Bühnen-Monitoring",
    "Mischpulte",
    "Abspielgeräte (CD, MD, DAT, Plattenspieler ...)",
    "Aufnahmegeräte für Live-Mitschnitte (MP3, DAT, MD, ...)",
    "Effektgeräte für Mikrofonie und Beschallungsanlagen",
    "Mikrofone (dynamisch und Kondensator) kabelgebunden oder Funk",
    "Mikrofon-Stative und Notenständer, AKG-Kopfhörer",
    "Starkstromverteiler 125 Ampère, 63 Ampère, 32 Ampère sowie Verkabelung",
    "Lichtanlagen ab 2,5 kWh mit PAR/LED und Vielzahl von Farbfiltern",
    "Lichtpulte und Dimmer",
    "Lichteffekte (Standard und LED) und Nebelmaschinen",
    "Stative (mit/ohne Kurbel) bis 4 Meter",
    "Aluminium-Traversen von Microtruss (heavy duty) und Litec (heavy duty)",
    "Digitale Klangerzeuger und Drum-Set",
    "DLP-Beamer mit bis zu 6000 ANSI-Lumen (Public Viewing)",
    "Apple MacBook Pro zusammen mit MOTU Traveler für mobilen Sound, Video und Live-Aufnahmen",
    "u.v.m",
    "Dekorationen",
    "Mobile Tanzfläche",
    "Bühne",
    "Techniker für Beschallung und Licht",
  ];

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
    var titulo = serivces[parent.index()].serivceName;
    var descripcion = serivces[parent.index()].desc;
    $(".galeria").addClass("scale");
    $(this).addClass("activa");
    if (!$(".fullPreview").length) {
      $("body").append(`
        <div class="fullPreview">
          <div class="cerrarModal"></div>
          <div class="wrapper">
            <div class="blur" style="background-image:url('images/serivces/${item}')"></div>
            <p class="titulo">${titulo}</p>
            <img src="images/serivces/${item}">
            <div class="desc"></div>
          </div>
          <div class="controles">
            <div class="control av"></div>
            <div class="control ret"></div>
          </div>
        </div>`);
      for (let item of descripcion) {
        $(".fullPreview .desc").append(printCategory(item));
      }
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
      $(".contenedorImgs .item.activa").removeClass("activa");
      $(".contenedorImgs .item").eq(index).addClass("activa");
      $(".fullPreview")
        .find(".blur")
        .css(
          "background-image",
          "url(images/serivces/" + serivces[index].img + ")"
        );
      $(".fullPreview")
        .find("img")
        .attr("src", `images/serivces/${serivces[index].img}`);
      console.log(serivces[index].serivceName);
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
