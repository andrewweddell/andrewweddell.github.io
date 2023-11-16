function openNavbar(params) {
  $("body").toggleClass("navbar-open");
}

$(document).on(
  "click",
  ".navbar-open .nav-navbar > .nav-item > .nav-link",
  function () {
    $(this)
      .closest(".nav-item")
      .siblings(".nav-item")
      .find("> .nav:visible")
      .slideUp(333, "linear");
    $(this).next(".nav").slideToggle(333, "linear");
  }
);
