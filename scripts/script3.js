// "use strict"
$(document).ready(function() {
    $(".gt_header__burger").click(function(event) {
        $(".gt_header__burger,.gt_nav_list").toggleClass("active");
        $("body").toggleClass("lock")
    });
});