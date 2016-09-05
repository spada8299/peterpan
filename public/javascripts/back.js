'use strict';

$(document).ready(function() {
	$('.add').click(function() {
		$(this).parent().append('<div class="addRow">\
				<span class="q">序號：</span>\
				<input type="text" name="num" placeholder="請輸入序號...">\
				<span class="cancel">x</span>\
			</div>');
		$('.cancel').click(function() {
			$(this).parent().remove();
		});
	});
});

$('#tag1').click(function() {
	$('#page1').fadeIn();
	$('#page2').hide();
});
$('#tag2').click(function() {
	$('#page1').hide();
	$('#page2').fadeIn();
});