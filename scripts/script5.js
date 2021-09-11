// "use strict"
$(document).ready(function() {
    $(".cps_header__burger").click(function(event) {
        $(".cps_header__burger,.cps_header_list").toggleClass("active");
        $("body").toggleClass("lock")
    });
});
