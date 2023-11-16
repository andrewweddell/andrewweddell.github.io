$(document).ready(function () {
  let input = $(".input-material input");
  input.each(function () {
    $(this).on("change", function () {
      if ($(this).val()) {
        $(this).siblings("label").addClass("focused");
      } else {
        $(this).siblings("label").removeClass("focused");
      }
    });
  });
});
