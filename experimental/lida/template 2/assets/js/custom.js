(function ($) {
  "use strict";
  var wind = $(window);

  LoadingPage();
  data_overlay();
  background();
  parallax(wind);
  dsnHeroSection(wind);
  slider_project();
  slick_client(wind);
  slick_next_proj();
  services_tab();
  filter();
  dsn_slider();
  toggleButtonMap();
  mouseCirMove();
  ajaxLoad(false);
  effectBackForward();
  navBar(wind);
  initMap();
  dsnGrid.embedVideo(".play-button");
  gallery();
})(jQuery);

/**
 *
 *  - Create an high quality justified gallery
 *    of image
 *
 */
function gallery() {
  var galleryPortfolio = $("#gallery-portfolio");

  if (galleryPortfolio.length < 1) return;

  galleryPortfolio.justifiedGallery({
    rowHeight: 300,
    margins: 15
  });

  galleryPortfolio.magnificPopup({
    delegate: "a",
    type: "image",
    closeOnContentClick: false,
    closeBtnInside: false,
    gallery: {
      enabled: true
    },
    zoom: {
      enabled: true,
      duration: 300, // don't foget to change the duration also in CSS
      opener: function (element) {
        return element.find("img");
      }
    }
  });
}

/***
 *
 *
 *  - Animate when scrolling
 *
 */
function aosInit() {
  var page_content = $('.page-content >  *:not("footer , .next-up")');
  page_content.attr("data-aos", "fade-up");
  AOS.init({
    duration: 1000
  });
}

/**
 *
 * Function button Up page
 *
 */
function dsnGridProgressCircle() {
  var wind = $(window),
    e = $('[data-dsn-grid="progress-circle"]'),
    color = dsnGrid.removeAttr(e, "data-dsn-grid-stroke");

  var stroke = color === undefined ? "" : 'stroke="' + color + '"';

  e.css({
    position: "fixed",
    right: "-60px",
    bottom: "60px",
    width: "52px",
    height: "52px",
    "z-index": "99999999"
  });
  e.append(
    '<svg class="dsn-progress-circle-up" width="100%" height="100%" ' +
    stroke +
    ' viewBox="0 0 100 100" preserveAspectRatio="xMinYMin meet" fill="none">\n' +
    '        <path class="dsn-progress-path" d="M50,1 a49,49 0 0,1 0,98 a49,49 0 0,1 0,-98" style="transition:  stroke-dashoffset 100ms linear 0s;stroke-dasharray: 307, 307; stroke-dashoffset: 308;"></path>' +
    "    </svg>"
  );

  wind.on("scroll", function () {
    effectProgress();
  });
  effectProgress();

  /**
   * show and hidden right circle
   */
  function effectProgress() {
    var bodyScroll = wind.scrollTop(),
      height = $(document).height() - wind.height();

    if (bodyScroll > 70) {
      TweenMax.to(e, 1, { ease: Back.easeOut.config(4), right: 40 });
      e.find(".dsn-progress-path").css(
        "stroke-dashoffset",
        300 - Math.round((bodyScroll * 300) / height) + "%"
      );
    } else {
      TweenMax.to(e, 1, { ease: Back.easeIn.config(4), right: -60 });
    }
  }

  e.on("click", function () {
    $("body,html").animate({ scrollTop: 0 }, 1600);
  });
}

/**
 *  Function Click Navigation Bar
 */
function navBar(wind) {
  var body = $("body"),
    menu = $(".menu-icon");

  $(".site-header .custom-drop-down > a").on("click", function () {
    return false;
  });

  wind.on("load", function () {
    var ul = $(".site-header nav > ul")[0].outerHTML;
    ul = $(ul);
    ul.attr("class", "nav__list");
    ul.find("li.custom-drop-down").attr("class", "nav__list-dropdown");
    ul.find("li").addClass("nav__list-item");
    var hedaerMobile = $(".header-top .nav .nav__content");
    if (hedaerMobile !== undefined) {
      hedaerMobile.prepend(ul);
    }

    menu.on("click", function () {
      body.toggleClass("nav-active");
    });

    $(".nav__list-item:not(.nav__list-dropdown) ").on("click", function () {
      body.removeClass("nav-active");
    });

    $(".nav__list-dropdown > a").on("click", function (e) {
      e.preventDefault();
      var _that = $(this).parent();
      var dispaly = _that.find("ul").css("display");
      $(".nav__list-dropdown")
        .find("ul")
        .slideUp("slow");
      if (dispaly !== "block") {
        _that.find("ul").slideDown("slow");
      }
    });
  });
  wind.on("scroll", function () {
    var bodyScroll = wind.scrollTop(),
      headerSmall = $(".site-header , .header-top");

    var $ofContent = $(".page-content").offset();
    var $top = 70;
    if ($ofContent !== undefined) {
      $top = $ofContent.top;
    }
    if (bodyScroll > $top) {
      headerSmall.addClass("header-stickytop");
      $(".sections").addClass("body-pt");
    } else {
      headerSmall.removeClass("header-stickytop");
      $("body").css("paddingTop", 0);
    }
  });
}

/**
 *  -   event will be triggered by doing browser action such as
 *  a click on the back or forward button
 */
function effectBackForward() {
  $(window).on("popstate", function (e) {
    $("main.root").load(document.location + " main.root > *", function () {
      refreshScript();
    });
  });
}

/**
 *  - the function that move the cursor of an input element to the end
 *
 * @param $off
 *      $off is true stop event listener
 *
 */
function mouseCirMove($off) {
  var $elemnet = ".global-cursor .custom-cursor";

  if ($off !== undefined && $off === true) {
    cursorEffect();
    return;
  }

  if ($("body").hasClass("dsn-large-mobile")) return;

  dsnGrid.mouseMove($elemnet, {
    onComplete: function (event, element) {
      if (!element.hasClass("effect-cursor")) {
        element.addClass("effect-cursor");
      }
    },
    onUpdate: function (event, x, y, element) {
      if (element.hasClass("effect-cursor")) {
        element.removeClass("effect-cursor");
      }
    }
  });

  cursorEffect();

  function cursorEffect() {
    dsnGrid.elementHover(
      $elemnet,
      "a , .to-prev , .to-next , .fas.fa-angle-right , .fas.fa-angle-left , .hero__down , .link-click , .filter-btn , .icon__fixed , .t-link , .button-next , .toggle , input",
      "custom-cursor-link"
    );
    dsnGrid.elementHover(
      $elemnet,
      ".dsn-video , .projs-item-img-container , .close-filters",
      "hidden"
    );
  }
}

/***
 *  effect hide or show Box Info Wrapper
 */
function toggleButtonMap() {
  var toggle = document.getElementById("toggle");
  if (toggle === null || toggle === undefined) {
    return;
  }
  var toggleContainer = document.getElementById("toggle-container");
  var toggleNumber;

  toggle.addEventListener("click", function () {
    toggleNumber = !toggleNumber;
    if (toggleNumber) {
      toggleContainer.style.clipPath = "inset(0 0 0 50%)";
      toggleContainer.style.backgroundColor = "#ff7777";
      $(".location__address-container").css({
        opacity: 0,
        transform: "translate3d(0," + 30 + "px , 0)"
      });
      $(".box-info-wrap").addClass("show-map");
    } else {
      toggleContainer.style.clipPath = "inset(0 50% 0 0)";
      toggleContainer.style.backgroundColor = "dodgerblue";
      $(".location__address-container").css({
        opacity: 1,
        transform: "translate3d(0,0,0)"
      });
      $(".box-info-wrap").removeClass("show-map");
    }
  });
}

/***
 *  Ajax Loader
 * @param $refresh
 */
function ajaxLoad($refresh) {
  var main_root = $("main.root");
  var body = $("body");
  var wind = $(window);
  var projects__headline = $(".projects__headline-enter a");
  var link_menu = $(
    ".site-header a , .next-proj-slider a , .next-up a , .portfolio .gallery > .projs-item a"
  );
  var elemnt_ajax = "";
  var circlehold = $(".circlehold svg path");
  var tl = new TimelineLite();

  if ($refresh === true) {
    projects__headline.off("mousedown");
    projects__headline.off("mouseup");
    link_menu.off("click");
  }
  /***
   *
   * Ajax From Slider
   *
   */
  projects__headline
    .bind("mousedown touchstart", function (e) {
      e.preventDefault();
      if (e.type.toLowerCase() === "mousedown") {
        if (e.which === 3) {
          return;
        }
      }

      var url = $(".holdlink").trigger('click');

      if ($(window).width() < 992) {
        if (url !== undefined) {
          animate_ajax_start(url);
        }
        return;
      }

      tl = new TimelineLite();

      tl.fromTo(
        circlehold,
        3,
        {
          "stroke-dashoffset": "308%"
        },
        {
          "stroke-dashoffset": "0",
          onComplete: function () {
            if (url !== undefined) {
              animate_ajax_start(url);
            }
          }
        }
      );
    })
    .bind("mouseup touchend", function (e) {
      e.preventDefault();
      tl.pause();
      circlehold.css({ "stroke-dashoffset": "308%" });
    });

  /**
   *
   * Ajax from Menu
   *
   */

  link_menu.on("click", function (e) {
    if (!body.hasClass("ajax-menu")) return;
    e.preventDefault();

    var _that = $(this);
    var url = _that.attr("href");

    var par = _that.parent();
    if (par.hasClass("item")) {
      if (!par.hasClass("slick-active")) {
        return;
      }
    }

    if (url.indexOf("#") >= 0) {
      return;
    }

    if (url !== undefined) {
      animate_ajax_start(url);
    }
  });

  function animate_ajax_start(url) {
    elemnt_ajax = $("<div></div>").addClass("class-ajax-loader");
    body.append(elemnt_ajax);
    TweenMax.fromTo(
      main_root,
      1,
      {
        y: 0
      },
      {
        y: -150,
        ease: Expo.easeIn
      }
    );
    TweenMax.to(elemnt_ajax, 1, {
      y: 0,
      ease: Expo.easeIn,
      onComplete: function () {
        main_root.removeClass("dsn-animate");
        Loader(url);
      }
    });
  }

  function animate_ajax_end(elemnts) {
    var mouse = $(".global-cursor .custom-cursor");
    main_root.css({
      opacity: 1,
      transform: ""
    });
    var slider = $("body").find(".ui-nav-light");
    if (slider !== undefined && slider.length > 0) {
      slider.find(".dsn-nav-light").css({
        visibility: "hidden"
      });
      mouse.removeClass("single-cursor");
    } else {
      mouse.addClass("single-cursor");
    }

    TweenMax.to(elemnt_ajax, 1, {
      y: "-100%",
      ease: Expo.easeIn,
      onComplete: function () {
        main_root.addClass("dsn-animate");
        refreshScript();
        TweenMax.fromTo(
          $(".hero-img"),
          0.5,
          {
            y: 70
          },
          {
            y: 0
          }
        );
        elemnt_ajax.remove();
      }
    });

    TweenMax.fromTo(
      slider,
      3,
      {
        autoAlpha: 0
      },
      {
        autoAlpha: 1
      }
    );
  }

  function Loader(url) {
    main_root.load(url + " main.root > *", function (
      responseText,
      textStatus,
      jqXHR
    ) {
      if (textStatus === "error") {
        window.location = url;
        return;
      }

      history.pushState(null, null, url);
      dsnGrid.scrollTop("body", "0");
      setTimeout(function () {
        animate_ajax_end($(responseText));
      }, 500);
    });
  }
}

/**
 *
 *  the main slider project
 *
 */
function dsn_slider() {
  var root_slid = $(".sections-wrapper.dsn-parent-slide"),
    section_slider_next = $(".sections-wrapper.dsn-next"),
    section_slider = root_slid.find(".section-slider"),
    wind_width = $(window).width();

  var footer_slid = root_slid.find(".section-footer");
  var button_next_slid = footer_slid.find(".boxnav-item.to-next");
  var button_prev_slid = footer_slid.find(".boxnav-item.to-prev");
  var tl = new TimelineLite();

  /**
   * init slider
   */
  var objectSlider = {};
  var objectSlider_re = {};

  if (section_slider.length > 0) {
    var index_number = 1;
    section_slider.each(function () {
      var that = $(this),
        content_subtitle = $(this).find(".subtitle"),
        content_name_title = $(this).find(".name-title h1");

      that.attr("data-number", dsnGrid.numberText(index_number));
      index_number++;
      var e_copy = $(this)
        .find(".name-title")
        .clone();

      e_copy.removeAttr("data-overlay").attr("data-id", $(this).data("id"));
      e_copy
        .find("span")
        .css({
          "background-image":
            'url("' + that.find(".cover-bg").data("image-src") + '")'
        });

      if (that.hasClass("dsn-active")) {
        e_copy.addClass("dsn-bg-text");
      }
      var light = root_slid.find(".dsn-nav-light");
      light.append(e_copy);

      objectSlider[e_copy.data("id")] = {
        width: e_copy.width(),
        left: e_copy.offset().left,
        top: e_copy.offset().top
      };
      objectSlider_re[e_copy.offset().left] = e_copy.data("id");
      dsnGrid.convertTextLine(content_subtitle, content_subtitle);
      dsnGrid.convertTextLine(
        content_name_title.find("span"),
        content_name_title
      );
    });
    var light = root_slid.find(".dsn-nav-light");
    light.css("width", light.width() + wind_width * 4);

    section_slider
      .clone()
      .removeClass("dsn-active")
      .append('<div class="dsn-box-shadow"></div>')
      .appendTo(section_slider_next);
    section_slider.removeClass("section-slider-next");
  } else {
    return;
  }

  navLight(root_slid, objectSlider, objectSlider_re);
  root_slid.removeClass("ui-nav-light");
  root_slid.find(".dsn-nav-light").css({
    opacity: "",
    visibility: ""
  });

  /**
   *
   * ========================
   *      mousewheel
   * ========================
   */

  dsnGrid.mouseWheel(
    root_slid,
    function (e) {
      if (!tl.isActive()) {
        tl = new TimelineLite();
        nextSlid(root_slid, tl);
      }
    },
    function (e) {
      if (!tl.isActive()) {
        tl = new TimelineLite();
        prevSlid(root_slid, tl);
      }
    }
  );

  var cureent = 0;
  root_slid
    .bind("mousedown touchstart", function (e) {
      if (e.type.toLowerCase() === "mousedown") {
        cureent = e.pageX;
      } else {
        cureent = e.originalEvent.touches[0].pageX;
      }
    })
    .bind("mouseup touchend", function (e) {
      if ($(window).width() >= 0) {
        return;
      }

      var MoveX = cureent;
      if (e.type.toLowerCase() === "mouseup") {
        MoveX = e.pageX;
      } else {
        MoveX = e.originalEvent.changedTouches[0].pageX;
      }

      if (cureent + 30 < MoveX) {
        if (!tl.isActive()) {
          tl = new TimelineLite();
          nextSlid(root_slid, tl);
        }
      } else if (cureent - 30 > MoveX) {
        if (!tl.isActive()) {
          tl = new TimelineLite();
          prevSlid(root_slid, tl);
        }
      }
    });

  /**
   *
   * ========================
   *      Click Mouse
   * ========================
   *
   * Next Icon , Prev Icon
   */
  button_next_slid.on("click", function () {
    if (!tl.isActive()) {
      tl = new TimelineLite();
      nextSlid(root_slid, tl);
    }
  });
  button_prev_slid.on("click", function () {
    if (!tl.isActive()) {
      tl = new TimelineLite();
      prevSlid(root_slid, tl);
    }
  });
}

/**
 *
 *
 *  move slider right or left
 *
 * @param root_slid
 *  - section of the main slider
 * @param next_slid
 *  - put the next slider
 * @param tl
 *  -  Time line Lite
 * @param target_prev
 *      the next or prev slider
 */
function setMoveSlider(root_slid, next_slid, tl, target_prev) {
  var section_slider_next = $(".sections-wrapper.dsn-next"),
    nextcurr_slid = section_slider_next.find(".section-slider-next"),
    nextSection = showNextSection(
      section_slider_next,
      section_slider_next.find(
        '.section-slider[data-id="' + next_slid.data("id") + '"]'
      )
    ),
    curr_slid = root_slid.find(".dsn-active"),
    left_to = "0%",
    left_from = "110%",
    width_next_from = "100%",
    width_next_to = "25%",
    translatslideX = -300;

  PlayVideo(next_slid, true);

  if (target_prev) {
    translatslideX = translatslideX * -1;
    left_from = "-110%";
  }

  /**
   * animate the subtitle
   */
  tl.staggerFromTo(
    curr_slid.find(".inner .subtitle .dsn-word-wrapper .dsn-chars-wrapper "),
    0.05,
    {
      autoAlpha: 1,
      scaleX: 1,
      skewY: 0,
      rotation: 0,
      y: 0
    },
    {
      autoAlpha: 0,
      scaleX: 1.8,
      y: -25
    },
    0.05
  );

  /**
   * animate title
   */
  tl.staggerFromTo(
    curr_slid.find(".inner .name-title .dsn-word-wrapper .dsn-chars-wrapper "),
    0.1,
    {
      autoAlpha: 1,
      scaleX: 1,
      skewY: 0,
      rotation: 0,
      x: 0
    },
    {
      autoAlpha: 0,
      scaleX: 1.8,
      x: -25
    },
    0.05,
    "-=1"
  );

  var t = next_slid.find(".inner .name-title .dsn-word-wrapper");

  /**
   * set active slid width 100vw ,
   * translate x
   *
   */
  tl
    /**
     * move next slide to out screen
     */
    .fromTo(
      nextcurr_slid,
      0.7,
      { right: 0 },
      { right: "-30%", ease: Power2.easeIn },
      "-=.5"
    )
    .fromTo(
      next_slid,
      1,
      { left: left_from },
      {
        left: left_to,
        onStart: function () {
          root_slid
            .find(".section-slider")
            .removeClass("section-slider-next")
            .css({
              zIndex: 1
            })
            .find(".cover-bg")
            .css({
              zIndex: ""
            });
          next_slid
            .css({
              zIndex: 2
            })
            .find(".cover-bg")
            .css({
              zIndex: 0
            });
          PlayVideo(nextcurr_slid, true);
        },
        onComplete: function () {
          root_slid.find(".section-slider").removeClass("dsn-active");
          next_slid.addClass("dsn-active");
          var number = next_slid.data("number");
          $(".section-footer .number span").text(number);
        }
      }
    )
    .fromTo(
      curr_slid,
      1,
      { x: 0 },
      { x: translatslideX, ease: Power0.easeIn },
      "-=1"
    )
    .staggerFromTo(
      next_slid.find(".inner .subtitle .dsn-word-wrapper .dsn-chars-wrapper"),
      0.05,
      {
        autoAlpha: 0,
        scaleX: 1.8,
        y: -25
      },
      {
        autoAlpha: 1,
        scaleX: 1,
        y: 0
      },
      0.05
    )
    .staggerFromTo(
      t.find(".dsn-chars-wrapper"),
      0.1,
      {
        autoAlpha: 0,
        scaleX: 1.7,
        skewY: 10,
        rotation: 2,
        x: -50
      },
      {
        autoAlpha: 1,
        scaleX: 1,
        skewY: 0,
        rotation: 0,
        x: 0
      },
      0.09,
      "-=1"
    )

    .fromTo(t, 1, { x: 100 }, { x: 0 }, "-=1")

    .fromTo(
      nextSection,
      0.7,
      { right: "-30%", width: width_next_from },
      {
        right: 0,
        width: width_next_to,
        onStart: function () {
          section_slider_next
            .find(".section-slider")
            .removeClass("section-slider-next");
          nextSection.addClass("section-slider-next");
        }
      },
      "-=.7"
    )
    .call(function () {
      root_slid.find(".section-slider").css({ left: "", transform: "" });
      PlayVideo(next_slid, false);
      PlayVideo(nextcurr_slid, false);
    });
}

function PlayVideo($elemnt, $next) {
  var vid = $elemnt.find(".dsn-video");
  var cover = $elemnt.find("div.cover-bg");
  if (vid.length > 0) {
    if ($next === true) {
      vid[0].pause();
      // cover.removeClass('hidden');
    } else {
      vid[0].play();
      // cover.addClass('hidden');
    }
  }
}

/**
 * Next Main Slider
 * @param root_slid
 * @param tl
 */
function nextSlid(root_slid, tl) {
  var next_slid = getSliderNext(root_slid);
  setMoveSlider(root_slid, next_slid, tl, true);
}

/**
 *
 * Prev Main slider
 * @param root_slid
 * @param tl
 */
function prevSlid(root_slid, tl) {
  var prev_slid = getSliderPrev(root_slid);
  setMoveSlider(root_slid, prev_slid, tl);
}

/***
 * Navigation List for Slider
 * @param root_slid
 * @param objectSlider
 * @param objectSlider_re
 */
function navLight(root_slid, objectSlider, objectSlider_re) {
  var holdDown = 0;
  var body = $("body");
  var dsn_nav_light = root_slid.find(".dsn-nav-light");
  var t2 = new TimelineMax();
  var move = false;
  var offset_list = null;
  var change = false;
  var global_cursor = $(".global-cursor .custom-cursor");

  root_slid
    .find(".popover-list-slid")
    .on("mousedown", function (e) {
      if (e.which === 3) {
        root_slid.removeClass("ui-nav-light");
        return;
      }
      change = false;
      TweenMax.to(root_slid.find(".section-slider"), 2, {
        autoAlpha: 0
      });

      var active = root_slid.find(".dsn-active");
      dsn_nav_light.find(".name-title").removeClass("dsn-bg-text");
      var e_a_l = dsn_nav_light.find(
        '.name-title[data-id="' + active.data("id") + '"]'
      );
      offset_list = objectSlider[active.data("id")];
      dsn_nav_light.css({
        transform: "translateX(" + offset_list.left * -1 + "px)"
      });
      e_a_l.addClass("dsn-bg-text");
      root_slid.addClass("ui-nav-light");

      /**
       *
       *
       */
      // $('.popover-list-slid').css({backgroundColor: '#fff'});

      if (global_cursor.length > 0)
        $(".global-cursor .custom-cursor").addClass("ui-light");

      root_slid
        .find(".dsn-nav-light")
        .one(
          "webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend",
          function (event) {
            holdDown = e.pageX;
            move = true;
          }
        );
    })
    .on("mouseup", function (e) {
      /**
       *
       *
       */
      // $('.popover-list-slid').css({backgroundColor: ''});

      TweenMax.to(root_slid.find(".section-slider"), 2, {
        autoAlpha: 1
      });
      root_slid.removeClass("ui-nav-light");
      var holdUp = e.pageX;
      holdDown = 0;

      move = false;
      if (global_cursor.length > 0)
        $(".global-cursor .custom-cursor").removeClass("ui-light");

      if (change) {
        setAnimateTextSlider();
      }
    })
    .on("mousemove", function (e) {
      if (move && offset_list !== null && offset_list !== undefined) {
        var tleft = holdDown - e.pageX + offset_list.left * -1;
        var last_item =
          objectSlider[
          Object.keys(objectSlider)[Object.keys(objectSlider).length - 1]
          ];

        if (tleft <= 0 && last_item.left * -1 <= tleft) {
          for (var property in objectSlider) {
            var cu_s = objectSlider[property];
            if (cu_s.left * -1 + 200 >= tleft) {
              dsn_nav_light.find(".name-title").removeClass("dsn-bg-text");
              dsn_nav_light
                .find('.name-title[data-id="' + property + '"]')
                .addClass("dsn-bg-text");
              setPositionSlider(root_slid, property);
              change = true;
            }
          }
          dsn_nav_light.css({
            transform: "translateX(" + tleft + "px)"
          });
        }
      }
    });
}

/**
 * choose slider from nav light
 * @param root_slid
 * @param data_id
 */
function setPositionSlider(root_slid, data_id) {
  var section_slider_next = $(".sections-wrapper.dsn-next"),
    nextcurr_slid = section_slider_next.find(".section-slider-next"),
    nextSection = showNextSection(
      section_slider_next,
      section_slider_next.find('.section-slider[data-id="' + data_id + '"]')
    ),
    next_slid = root_slid.find('.section-slider[data-id="' + data_id + '"]'),
    curr_slid = root_slid.find(".dsn-active"),
    width_next_to = "calc(25vw + 5%)";

  curr_slid
    .find(".inner .name-title .dsn-word-wrapper .dsn-chars-wrapper")
    .css({
      visibility: "hidden",
      opacity: 0,
      transform: ""
    });
  nextcurr_slid.css({
    right: "30%"
  });
  root_slid
    .find(".section-slider")
    .removeClass("section-slider-next")
    .css({
      zIndex: 1
    })
    .find(".cover-bg")
    .css({
      zIndex: ""
    });
  next_slid
    .css({
      zIndex: 2
    })
    .find(".cover-bg")
    .css({
      zIndex: 0
    });
  // next_slid.css({
  //     width: '100vw'
  // });
  var t = next_slid.find(".inner .name-title .dsn-word-wrapper");
  t.find(".dsn-chars-wrapper").css({
    visibility: "inherit",
    opacity: 1
  });
  curr_slid.css({
    left: "",
    transform: ""
  });
  curr_slid.removeClass("dsn-active");
  next_slid.addClass("dsn-active");
  nextSection.css({
    right: 0,
    width: width_next_to
  });
  section_slider_next
    .find(".section-slider")
    .removeClass("section-slider-next");
  nextSection.addClass("section-slider-next");
}

/**
 * set animate for subtitle , title in slider
 */
function setAnimateTextSlider() {
  var root_slid = $(".sections-wrapper.dsn-parent-slide"),
    section_slider = root_slid.find(".section-slider");
  var tl = new TimelineLite();
  section_slider.each(function () {
    PlayVideo($(this), true);
  });
  if (section_slider.length > 0) {
    var curr_slid = root_slid.find(".dsn-active");
    PlayVideo(curr_slid, false);
    tl.staggerFromTo(
      curr_slid.find(".inner .subtitle .dsn-word-wrapper .dsn-chars-wrapper "),
      0.05,
      {
        autoAlpha: 0,
        scaleX: 1.8,
        y: -25
      },
      {
        autoAlpha: 1,
        scaleX: 1,
        y: 0,
        ease: Expo.easeIn
      },
      0.05
    ).staggerFromTo(
      curr_slid.find(".inner .name-title .dsn-word-wrapper .dsn-chars-wrapper"),
      0.1,
      {
        autoAlpha: 0,
        scaleX: 1.7,
        skewY: 10,
        rotation: 2,
        x: -50,
        ease: Expo.easeIn
      },
      {
        autoAlpha: 1,
        scaleX: 1,
        skewY: 0,
        rotation: 0,
        x: 0,
        ease: Expo.easeIn
      },
      0.09,
      "-=1"
    );

    var number = curr_slid.data("number");
    $(".section-footer .number span").text(number);
  }
}

/**
 *
 *  Get Next Slider
 * @param root_slid
 * @returns {*}
 */
function getSliderNext(root_slid) {
  if (root_slid === undefined || root_slid === null) {
    return false;
  }

  var curr_slid = root_slid.find(".dsn-active");

  if (curr_slid !== undefined) {
    var $next = curr_slid.next();
    if (
      $next.length === 1 &&
      $next.hasClass("section-slider") &&
      $next[0].nodeName === "SECTION"
    ) {
      return $next;
    } else {
      var slid = root_slid.find("section.section-slider");
      if (slid.length > 0) {
        return slid.first();
      }
    }

    return false;
  }
}

function showNextSection(root_slid, next_slid) {
  if (root_slid === undefined || root_slid === null) {
    return false;
  }

  if (next_slid !== undefined) {
    var $next = next_slid.next();
    if (
      $next.length === 1 &&
      $next.hasClass("section-slider") &&
      $next[0].nodeName === "SECTION"
    ) {
      return $next;
    } else {
      var slid = root_slid.find("section.section-slider");
      if (slid.length > 0) {
        return slid.first();
      }
    }

    return false;
  }
}

/**
 * Get Prev Slider
 * @param root_slid
 * @returns {*}
 */
function getSliderPrev(root_slid) {
  if (root_slid === undefined || root_slid === null) {
    return false;
  }

  var curr_slid = root_slid.find(".dsn-active");

  if (curr_slid !== undefined) {
    var $next = curr_slid.prev();
    if (
      $next.length === 1 &&
      $next.hasClass("section-slider") &&
      $next[0].nodeName === "SECTION"
    ) {
      return $next;
    } else {
      var slid = root_slid.find("section.section-slider");
      if (slid.length > 0) {
        return slid.last();
      }
    }

    return false;
  }
}

/***
 *
 * Loading Page
 *
 */
function LoadingPage() {
  var loading_page = $(".loading-page");
  var dsn_progress = loading_page.find(".dsn-progress");
  var progress_number = dsn_progress.find(".progress-number");
  var progress_left = dsn_progress.find(".progress-fill-left");
  var progress_right = dsn_progress.find(".progress-fill-right");
  var loading_text = dsn_progress.find(".loading-text");

  var timer = dsnGrid.pageLoad(0, 100, 300, function (val) {
    progress_number.text(val + "%");
    progress_left.css("width", val / 2 + "%");
    progress_right.css("width", val / 2 + "%");
  });

  $(window).on("load", function () {
    clearInterval(timer);
    TweenMax.to(progress_left, 0.5, {
      width: "50%",
      onUpdate: function ($p) {
        var f = (progress_left.width() / progress_left.parent().width()) * 100;
        progress_number.text(parseInt(f) * 2 + "%");
      },
      onComplete: function () {
        finshedLoad();
      }
    });
    TweenMax.to(progress_right, 0.5, {
      width: "50%"
    });
  });

  function finshedLoad() {
    FilteringISO();
    TweenMax.to(
      [progress_number, progress_right, progress_left, loading_text],
      0.5,
      {
        autoAlpha: 0
      }
    );
    TweenMax.to(loading_page, 2, {
      left: "100%",
      onComplete: function () {
        scrollEvent();
        setAnimateTextSlider();
        $("main.root").addClass("dsn-animate");
        dsnGridProgressCircle();
        loading_page.css({
          display: "none",
          width: "0"
        });
      }
    }).delay(0.5);
  }
}

/***
 *  - technique in computer graphics where background images  ,
 *  move past the camera more slowly than foreground images
 * @param wind
 */
function parallax(wind) {
  var object_element_move = {};
  var dsn_parallax_move = $('[data-dsn-grid="move-section"]');
  var page_content = $(".page-content");
  var filter_btn = page_content.find(".filter-btn");

  dsn_parallax_move.each(function ($index) {
    var _that = $(this);

    dsnGrid.setPositionMoveSection(_that, 70, 200);
    _that.attr("data-dsn-order", $index);
    object_element_move[$index] = _that.offset();
  });

  wind.on("scroll", function () {
    scrollerIt();
  });
  scrollerIt();

  function scrollerIt() {
    /**
     * Move Section
     */
    dsn_parallax_move.each(function () {
      var _that = $(this);
      if ($(window).width() >= 0) {
        _that.css("transform", "");
        return;
      }

      var endTarget =
        object_element_move[_that.data("dsn-order")].top +
        _that.innerHeight() / 2;

      var duration = dsnGrid.getUndefinedVal(_that.data("duration"), 350);
      if (wind.scrollTop() <= endTarget - duration) {
        var move = dsnGrid.getUndefinedVal(_that.data("move"), 7);

        dsnGrid.scrollerIt(wind, _that, {
          duration: -1 * wind.height(),
          action: function ($object) {
            TweenMax.to(_that, 0.3, {
              y: $object.scroll / move,
              ease: Power0.easeOut
            });
          }
        });
      }
    });

    /**
     * parallax Image
     */
    $('[data-dsn-grid="move-up"] ').each(function () {
      var _that = $(this);
      var img = $(this).find(".cover-bg");

      if (img !== undefined) {
        var endTarget = _that.offset().top + _that.innerHeight();

        if (wind.scrollTop() <= endTarget) {
          dsnGrid.scrollerIt(wind, _that, {
            duration: -1 * wind.height(),
            action: function ($object) {
              img.css({
                transform: "translate3d(0px," + $object.scroll / 5 + "px,0px)"
              });
            }
          });
        }
      }
    });

    /**
     * show and hide button filter
     */

    if (filter_btn !== undefined && filter_btn.length > 0) {
      var offsettop_filter = page_content.offset().top;
      var next_up = $("section.next-up");
      if (next_up === undefined || next_up.length < 1) {
        next_up = $("footer");
      }
      var offsettop_footer = next_up.offset().top;

      if (
        wind.scrollTop() >= offsettop_filter - 300 &&
        wind.scrollTop() <= offsettop_footer - next_up.outerHeight()
      ) {
        filter_btn.css({
          transform: "translate3d(0px , 0px , 0px)",
          opacity: 1
        });
      } else {
        filter_btn.css({
          transform: "translate3d(0px , -50% , 0px)",
          opacity: 0
        });
      }
    }
  }

  /**
   *
   *
   * @type {jQuery|HTMLElement}
   *
   * - Mouse Parallax
   */

  var parallax = $('[data-dsn-grid="parallax"]');
  if (parallax.length === 0 || wind.width() < 992) {
    return;
  }
  parallax.each(function () {
    var _that = $(this),
      dsn_grid = dsnGrid.removeAttr(_that, "data-dsn-grid"),
      speed = dsnGrid.removeAttr(_that, "data-dsn-grid-speed"),
      move = dsnGrid.removeAttr(_that, "data-dsn-grid-move");
    dsnGrid.parallaxMoveElemnt(_that, move, speed);
  });

  $(".gallery .projs-item a").each(function () {
    var _that = $(this);
    dsnGrid.parallaxMoveElemnt(
      _that.find(".projs-item-img-container"),
      20,
      0.3,
      _that.find(".projs-item-title"),
      true
    );
    dsnGridRelationImage(_that.find(".projs-item-img-container"), 6, 0.5);
  });
  dsnGridRelationImage($(".hero-img"), 2, 0.5);
}

/**
 * Parallax Image
 * @param wind
 */
function dsnHeroSection(wind) {
  var header = $("header.dsn-header-hero");
  var hero_img = header.find(".hero-img");
  var header_content = header.find(".header-content");
  var content_background = $(".content-background");
  var page_content = $(".page-content");
  var content_block_first = $(".content-block.block-first");

  wind.on("scroll", function () {
    scrollerIt();
    scrollerIt();
  });
  scrollerIt();

  function scrollerIt() {
    var num_background = dsnGrid.scaleIt(wind, content_background, {
      position: false,
      plus: 5500
    });

    if (num_background + 0.91667 > 1) {
      page_content.addClass("bg-white");
      if (wind >= 0) {
        content_block_first.css("width", "100%");
      }
    } else {
      page_content.removeClass("bg-white");
      var windowScrolled = wind.scrollTop(),
        num_hero = dsnGrid.scaleIt(wind, hero_img, {
          position: true
        }),
        num_content = dsnGrid.scaleIt(wind, header_content, {
          position: true,
          plus: 200
        }),
        num_content_scal = dsnGrid.scaleIt(wind, header_content, {
          position: true,
          plus: 1300
        });

      var num_content_block_first = dsnGrid.scaleIt(wind, content_block_first, {
        position: false,
        plus: 2000
      });

      TweenMax.to(hero_img, 0.3, {
        scale: num_hero + 1,
        opacity: 1 - num_hero
      });

      if ($(window).width() >= 0) {
        content_background.css({
          transform:
            "translate3d(0px,0px,0px) scale(" + (num_background + 0.91667) + ")"
        });
        content_block_first.css({
          width: (num_content_block_first + 0.8) * 100 + "%"
        });
      }

      var opacityContent = 1;
      if ($(window).width() >= 0 && !$("body").hasClass("dsn-large-mobile")) {
        opacityContent = 1 - num_content;
      } else {
        header_content.css("transition", "all 400ms ease-out 0s");
        hero_img.css("transition", "all 400ms ease-out 0s");
      }

      TweenMax.to(header_content, 0.3, {
        scale: num_content_scal + 1,
        opacity: opacityContent,
        y: windowScrolled / -2
      });
    }

    /**
     *
     *  Next Up
     *
     */
    if (wind.width() < 992) {
      return;
    }
    var next_up = $("section.next-up"),
      headerSmall = $(".site-header , .header-top");
    if (next_up !== undefined && next_up.length > 0) {
      var offsettop_footer = next_up.offset().top - next_up.height();
      setTimeout(function () {
        if (wind.scrollTop() >= offsettop_footer) {
          if (!next_up.hasClass("dsn-animate")) {
            next_up.addClass("dsn-animate");
            headerSmall.css("background-color", "transparent");
            dsnGrid.scrollTop(".next-up", 1500, 0);
          }
        } else {
          headerSmall.css("background-color", "");
          next_up.removeClass("dsn-animate");
        }
      }, 500);
    }
  }

  /**
   *  animate scrollTop
   */
  animateScroller();

  function animateScroller() {
    var links = $('a[href*="#"]');
    links.on("click", function (e) {
      e.preventDefault();
    });
    $("a.hero__down").on("click", function () {
      dsnGrid.scrollTop(".page-content", 1200, 0);
    });
  }
}

/**
 * Filter Button In The Work Page
 */
function filter() {
  var filters_content = $(".filters-content");
  var filtering = filters_content.find(".filtering");
  var close_filtering = filters_content.find(".close-filters");
  var button_filter = filtering.find("button");
  var tl = new TimelineLite(),
    headerSmall = $(".site-header , .header-top");

  $(".filter-btn").on("click", function () {
    tl.fromTo(
      filters_content,
      0.5,
      {
        force3D: true,
        autoAlpha: 0,
        ease: Power0.easeIn
      },
      {
        autoAlpha: 1
      }
    );
    tl.staggerFromTo(
      button_filter,
      0.3,
      {
        force3D: true,
        autoAlpha: 0,
        y: -20
      },
      {
        autoAlpha: 1,
        y: 0
      },
      0.2
    );
    headerSmall.slideUp();
  });

  close_filtering.on("click", function () {
    if (tl.isActive()) {
      tl.progress(1);
    }
    tl = new TimelineLite();
    tl.to(filters_content, 0.5, {
      autoAlpha: 0
    });
    tl.staggerTo(
      button_filter,
      0.3,
      {
        autoAlpha: 0,
        y: 20
      },
      0.2,
      "-=.3"
    );
    headerSmall.slideDown();
  });

  button_filter.on("click", function () {
    dsnGrid.scrollTop(".page-content", 1000, -200);
    close_filtering.click();
  });
}

/**
 * Slick Slider
 */
function slider_project() {
  var proj_slider_slick = $(".proj-slider-image");

  proj_slider_slick.each(function () {
    var slick = $(this);
    var span = dsnGrid.getUndefinedVal(slick.data("next-text"), "");

    slick.slick({
      speed: 700,
      infinite: true,
      slidesToScroll: 1,
      slidesToShow: 1,
      prevArrow: "",
      cssEase: "cubic-bezier(.9, .03, .41, .49)",
      speed: 700,
      nextArrow:
        '<button class="button-next next-right">\n' +
        '                <svg viewBox="0 0 52 52"  xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">\n' +
        '                    <path d="M3 26.7h39.5v3.5c0 .3.1.5.4.6.2.1.5.1.7-.1l5.9-4.2c.2-.1.3-.3.3-.5s-.1-.4-.3-.5l-5.9-4.2c-.1-.1-.3-.1-.4-.1-.1 0-.2 0-.3.1-.2.1-.4.3-.4.6v3.5H3c-.4 0-.7.3-.7.7 0 .3.3.6.7.6z"></path>\n' +
        "                </svg>\n" +
        "                <span>" +
        span +
        "</span>\n" +
        "            </button>"
    });
  });
}

/**
 *
 * Function Page Load
 *
 */
function FilteringISO() {
  var $gallery = $(".gallery");
  var $filtering = $(".filtering");

  if (
    $gallery === undefined ||
    $gallery.length < 1 ||
    ($filtering === undefined || $filtering.length < 1)
  ) {
    return;
  }

  /* isotope
      -------------------------------------------------------*/
  // $gallery.isotope({});
  $gallery = $gallery.isotope({
    // options
    itemSelector: ".projs-item",
    transitionDuration: "0.5s"
  });

  /* filter items on button click
    -------------------------------------------------------*/
  $filtering.on("click", "button", function () {
    var filterValue = $(this).attr("data-filter");
    $gallery.isotope({
      filter: filterValue
    });
    $(this)
      .addClass("active")
      .siblings()
      .removeClass("active");
  });
}

/**
 * smooth Scroll
 * @param locked
 */
function scrollEvent(locked) {
  var body = $("body"),
    isScroller = body.data("dsn-scroller");

  var wind = $(window);

  if (isScroller === undefined || isScroller !== true) {
    body.addClass("dsn-mobile");
    return;
  }

  scroller(wind);

  if (!body.hasClass("dsn-mobile")) {
    wind.on("resize", function () {
      if (wind.width() >= 0) {
        if (body.hasClass("dsn-mobile")) {
          body.removeClass("dsn-mobile");
        }
      } else {
        body.addClass("dsn-mobile");
      }
    });
  }

  /**
   *  Function init Mouse Scroll Time
   */
  function scroller(wind) {
    if (
      navigator.userAgent.match(/Android/i) ||
      navigator.userAgent.match(/webOS/i) ||
      navigator.userAgent.match(/iPhone/i) ||
      navigator.userAgent.match(/iPad/i) ||
      navigator.userAgent.match(/iPod/i) ||
      navigator.userAgent.match(/BlackBerry/i) ||
      navigator.userAgent.match(/Windows Phone/i) ||
      navigator.userAgent.match(/Edge/i) ||
      navigator.userAgent.match(/MSIE 10/i) ||
      navigator.userAgent.match(/MSIE 9/i) ||
      wind.width() >= 0
    ) {
      body.addClass("dsn-mobile").addClass("dsn-large-mobile");
      return;
    }

    wind.on("keydown", function (e) {
      var keyCode = e.keyCode ? e.keyCode : e.which;
      if ($("body").hasClass("nav-active") || wind.width() >= 0) {
        return;
      }
      if (keyCode === 38) {
        setPositionScroll(1, 0.1, 10);
      } else if (keyCode === 40) {
        setPositionScroll(-1, 0.1, 10);
      } else if (keyCode === 34) {
        setPositionScroll(-1, 0.5, 300);
      } else if (keyCode === 33) {
        setPositionScroll(1, 0.5, 300);
      } else if (keyCode === 36) {
        setPositionScroll(1, 2, wind.scrollTop());
      } else if (keyCode === 35) {
        setPositionScroll(-1, 2, $(document).height());
      }
    });

    //Distance. Use smaller value for shorter scroll and greater value for longer scroll
    wind.on("mousewheel DOMMouseScroll", function (event) {
      if ($("body").hasClass("nav-active") || wind.width() >= 0) {
        return;
      }
      event.preventDefault();
      var delta =
        event.originalEvent.wheelDelta / 120 || -event.originalEvent.detail / 3;
      setPositionScroll(delta, 0.85, 250);
    });

    function setPositionScroll(delta, scrollTime, scrollDistance) {
      var scrollTop = wind.scrollTop();
      var finalScroll = scrollTop - parseInt(delta * scrollDistance);

      TweenLite.to(wind, scrollTime, {
        scrollTo: { y: finalScroll, autoKill: true },
        // ease: Power0.easeInOut,
        autoKill: true,
        overwrite: 10
      });
    }
  }
}

/**
 * Attr data overlay
 */
function data_overlay() {
  $("[data-overlay-color]").each(function () {
    var _that = $(this);
    var _color = dsnGridRemoveAttr(_that, "data-overlay-color");
    _that.addClass("dsn-overlay");
    $("body").append(
      "<style>.dsn-overlay[data-overlay]:before{background: " +
      _color +
      ";}</style>"
    );
  });
}

/**
 *
 * Function set background image from data background
 *
 */
function background() {
  var cover = $(".cover-bg, section , [data-image-src]");
  cover.each(function () {
    var attr = $(this).attr("data-image-src");

    if (typeof attr !== typeof undefined && attr !== false) {
      $(this).css("background-image", "url(" + attr + ")");
    }
  });
}

/**
 *
 * slick Slider Client
 *
 */
function slick_client(wind) {
  var client_curs = $(".client-curs");
  if (client_curs.length > 0) {
    client_curs.slick({
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: true,
      infinite: true,
      nextArrow: '<i class="fas fa-angle-right"></i>',
      prevArrow: '<i class="fas fa-angle-left"></i>',
      cssEase: "cubic-bezier(.9, .03, .41, .49)",
      speed: 700
    });

    if (wind.width() >= 0) {
      dsnGrid.parallaxMoveElemnt(client_curs.find(".fas.fa-angle-right"), 25);
      dsnGrid.parallaxMoveElemnt(client_curs.find(".fas.fa-angle-left"), 25);
    }
  }
}

/**
 * slick Slider next project
 */
function slick_next_proj() {
  var next_project_slid = $(".next-proj-slider");

  next_project_slid.slick({
    arrows: false
  });

  // Manually refresh positioning of slick
  $(".next-proj button.button-next").on("click", function () {
    next_project_slid.slick("slickNext");
  });
}

/**
 *
 * servicestab
 *
 */
function services_tab() {
  $(".services").on("click", ".link-click", function () {
    var myID = $(this).attr("id");

    $(this)
      .addClass("active")
      .siblings()
      .removeClass("active");

    $("#" + myID + "-content")
      .fadeIn()
      .siblings()
      .hide();
  });
}

function initMap() {
  var map_id = document.getElementById("map");
  if (map_id === null) return;
  // Styles a map in night mode.
  try {
    var map = new google.maps.Map(map_id, {
      center: {
        lat: 34.0937458,
        lng: -118.3614978
      },
      zoom: 12,
      styles: [
        {
          featureType: "all",
          elementType: "labels.text.fill",
          stylers: [
            {
              saturation: 36
            },
            {
              color: "#000000"
            },
            {
              lightness: 40
            }
          ]
        },
        {
          featureType: "all",
          elementType: "labels.text.stroke",
          stylers: [
            {
              visibility: "on"
            },
            {
              color: "#000000"
            },
            {
              lightness: 16
            }
          ]
        },
        {
          featureType: "all",
          elementType: "labels.icon",
          stylers: [
            {
              visibility: "off"
            }
          ]
        },
        {
          featureType: "administrative",
          elementType: "geometry.fill",
          stylers: [
            {
              color: "#000000"
            },
            {
              lightness: 20
            }
          ]
        },
        {
          featureType: "administrative",
          elementType: "geometry.stroke",
          stylers: [
            {
              color: "#000000"
            },
            {
              lightness: 17
            },
            {
              weight: 1.2
            }
          ]
        },
        {
          featureType: "landscape",
          elementType: "geometry",
          stylers: [
            {
              color: "#000000"
            },
            {
              lightness: 20
            }
          ]
        },
        {
          featureType: "poi",
          elementType: "geometry",
          stylers: [
            {
              color: "#000000"
            },
            {
              lightness: 21
            }
          ]
        },
        {
          featureType: "road.highway",
          elementType: "geometry.fill",
          stylers: [
            {
              color: "#000000"
            },
            {
              lightness: 17
            }
          ]
        },
        {
          featureType: "road.highway",
          elementType: "geometry.stroke",
          stylers: [
            {
              color: "#000000"
            },
            {
              lightness: 29
            },
            {
              weight: 0.2
            }
          ]
        },
        {
          featureType: "road.arterial",
          elementType: "geometry",
          stylers: [
            {
              color: "#000000"
            },
            {
              lightness: 18
            }
          ]
        },
        {
          featureType: "road.local",
          elementType: "geometry",
          stylers: [
            {
              color: "#000000"
            },
            {
              lightness: 16
            }
          ]
        },
        {
          featureType: "transit",
          elementType: "geometry",
          stylers: [
            {
              color: "#000000"
            },
            {
              lightness: 19
            }
          ]
        },
        {
          featureType: "water",
          elementType: "geometry",
          stylers: [
            {
              color: "#000000"
            },
            {
              lightness: 17
            }
          ]
        }
      ]
    });
    var marker = new google.maps.Marker({
      position: new google.maps.LatLng(34.0937458, -118.3614978),
      animation: google.maps.Animation.BOUNCE,
      icon: "assets/img/map-marker.png",
      title: "ASL",
      map: map
    });
  } catch (e) { }
}

function contactValidator() {
  var contact_form = $("#contact-form");
  if (contact_form < 1) {
    return;
  }
  contact_form.validator();
  // when the form is submitted
  contact_form.on("submit", function (e) {
    // if the validator does not prevent form submit
    if (!e.isDefaultPrevented()) {
      var url = "contact.php";

      // POST values in the background the the script URL
      $.ajax({
        type: "POST",
        url: url,
        data: $(this).serialize(),
        success: function (data) {
          // data = JSON object that contact.php returns

          // we recieve the type of the message: success x danger and apply it to the
          var messageAlert = "alert-" + data.type;
          var messageText = data.message;

          // let's compose Bootstrap alert box HTML
          var alertBox =
            '<div class="alert ' +
            messageAlert +
            ' alert-dismissable"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>' +
            messageText +
            "</div>";

          // If we have messageAlert and messageText
          if (messageAlert && messageText) {
            // inject the alert to .messages div in our form
            contact_form.find(".messages").html(alertBox);
            // empty the form
            contact_form[0].reset();
          }
        }
      });
      return false;
    }
  });
}

/**
 * Function Load Via Ajax
 */
function refreshScript() {
  var wind = $(window);

  dsn_slider();
  setAnimateTextSlider();
  background();
  data_overlay();
  parallax(wind);
  dsnHeroSection(wind);
  FilteringISO();
  slider_project();
  slick_client(wind);
  slick_next_proj();
  services_tab();
  filter();
  toggleButtonMap();
  initMap();
  dsnGrid.embedVideo(".play-button");
  gallery();
  ajaxLoad(true);
  mouseCirMove(true);
  contactValidator();
}
