$(document).ready(function () {
  $(".parent-items button").click(function (e) {
    $(".parent-items").append(`
    <div class="form-floating">
    <input type="text" class="form-control" name="categoryItems" id="floatingPassword" placeholder="category name">
    <label for="floatingPassword"> category item </label>
  </div>
</div>
      `);
  });
});
