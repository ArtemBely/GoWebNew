// "use strict"
$(document).ready(function() {
    $(".cmp_header__burger").click(function(event) {
        $(".cmp_header__burger,.cmp_header_list").toggleClass("active");
        $("body").toggleClass("lock")
    });
});
