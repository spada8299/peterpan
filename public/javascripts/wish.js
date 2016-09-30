'use strict';
// test msgs
// var messages = ['1', '2', '3', '我我我我我我我我想測試如果打很多字會怎樣', '5', '6', '7'];
// default msgs
var messages = ['想變美！', '想賺很多錢！！', '想環遊世界', '拜託讓我遇到帥哥><', '不想長大QQ', '不想去工作哈哈哈', '希望天天都是晴天'];


$(document).ready(function() {
	$.ajax({
		url: '/users/wish',
		method: 'GET',
		contentType: 'application/json'
	}).done(function(res) {
		// console.log(res);
		if (res.data === '1' && res.content.length > 0) {
			// fill the wish content
			var con = res.content;
			for (var i = con.length - 1; i >= 0; i--) {
				messages[i] = con[i].content;
			}
		} else if (res.data === '0') {
			console.log('wish err');
		}
	});
});

$('#go').click(function() {
	// make sure the num is right
	// if not right, alert
	// if right, go to page4
	if ($('#numInput').val() === '') {
		alert('請輸入序號');
	} else {
		$.ajax({
			data: JSON.stringify({'numCheck': $('#numInput').val().toLowerCase() }),
			url: '/users/numCheck',
			method: 'POST',
			contentType: 'application/json'
		}).done(function(res) {
			// console.log(res);
			if (res.data === '0') {
				// err
				alert('檢查序號失敗，請稍候再試');
			} else if (res.data === '1') {
				// suc
				$('#page3').hide();
				$('#page4').fadeIn();
				$('body').css('background-image', 'url("images/background2.gif")');
				$('footer').css('margin-top', '5%');
				$('footer').css('margin-bottom', '10%');
			} else if (res.data === '2') {
				alert('無此序號');
			} else if (res.data === '3') {
				// alert('此序號已許願過');
				$('#page3').hide();
				$('#page4').fadeIn();
				$('body').css('background-image', 'url("images/background2.gif")');
				$('footer').css('margin-top', '5%');
				$('footer').css('margin-bottom', '10%');
				$('#wishText').hide();
				$('#submit').hide();
				$('#hint').css('margin-top', 0);
				$('#myLight').fadeIn();
				$.ajax({
					url: '/users/wish/'+ $('#numInput').val(),
					method: 'GET',
					contentType: 'application/json'
				}).done(function(resp) {
					// console.log(resp);
					if (resp.data === '0') {
						// err
					} else if (resp.data === '1') {
						$('#myLight').click(function() {
							$('#msgText').text(resp.content[0].content);
							$('#msg').fadeIn();
						});
					}
				});
			}
		});
	}
});

$('#submit').click(function() {
	// console.log($('#wishText').val());
	if (confirm('即將送出您的願望：'+ $('#wishText').val() +'\n注意：單一序號只能許願一次')) {
		// submit
		var pack = {
			'num': $('#numInput').val().toLowerCase(),
			'content': $('#wishText').val()
		}
		$.ajax({
			data: JSON.stringify(pack),
			url: '/users/wish',
			method: 'POST',
			contentType: 'application/json'
		}).done(function(res) {
			// console.log(res);
			if (res.data === '0') {
				// err
				alert('許願失敗，請稍候再試');
			} else if (res.data === '1') {
				// suc
				// start wish animation
				$('#hint').animate({ marginTop: "+=20%" }, 1000);
				$('#wishText').animate({
				    opacity: 0.25,
				    height: "toggle",
				    width: "toggle"
				  }, 1000);
				$('#submit').animate({
					opacity: 0.25,
					height: "toggle",
					width: "toggle"
				}, 1000, function() {
					$('#myLight').fadeIn();
					$('#hint').css('margin-top', 0);
				});
				$('#myLight').click(function() {
					$('#msgText').text($('#wishText').val());
					$('#msg').fadeIn();
				});
			}
		});
	} else {
		// do nothing
	}
});

$('#btnPre').click(function() {
	window.location.href = 'index2.html';
});
$('#btn1').click(function() {
	window.location.href = 'index.html';
});
$('#btn2').click(function() {
	window.location.href = 'index2.html';
});
$('#btn3').click(function() { });

$('.light').click(function() {
	var order = Number($(this).attr('id'));
	$('#msgText').text(messages[order]);
	$('#msg').fadeIn();
});

$('#msg').click(function() {
	$('#msg').fadeOut();
});

