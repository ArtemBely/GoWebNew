// "use strict"
$(document).ready(function() {
    $(".au_header__burger").click(function(event) {
        $(".au_header__burger,.au_header_list").toggleClass("active");
        $("body").toggleClass("lock")
    });
});
