// "use strict"
$(document).ready(function() {
    $(".cmp_header__burger").click(function(event) {
        $(".cmp_header__burger,.cmp_header_list").toggleClass("active");
        $("body").toggleClass("lock")
    });
});

$(document).ready(function() {

	//E-mail Ajax Send
	$("#order_our").submit(function() { //Change
    swal({
    text: "Message was sent. Our team will contact you soon.",
    button: "OK"
    });
		var th = $(this);
		$.ajax({
			type: "POST",
			url: "mail.php", //Change
			data: th.serialize()
		}).done(function() {
      console.log('done');
			setTimeout(function() {
				// Done Functions
				th.trigger("reset");
			}, 1000);
		});
		return false;
	});
});
