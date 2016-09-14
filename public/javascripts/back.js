'use strict';

$(document).ready(function() {
	// page1
	$('.add').click(function() {
		$(this).parent().append('<div class="addRow">\
				<span class="q">序號：</span>\
				<input type="text" name="num" class="num" placeholder="請輸入序號...">\
				<span class="cancel">x</span>\
			</div>');
		$('.cancel').click(function() {
			$(this).parent().remove();
		});
	});

	$('#numSubmit').click(function() {
		var allNum = [];
		$('.num').each(function(index) {
			console.log(index +': '+ $(this).val());
			var thisNum = { 'num': $(this).val() };
			allNum.push(thisNum);
		});
		console.log(allNum);
		console.log(allNum.length);

		$.ajax({
			data: JSON.stringify({'allNum': allNum}),
			url: '/users/',
			method: 'POST',
			contentType: 'application/json'
		}).done(function(res) {
			console.log('ajax msg: '+ res.data);
			if (res.data === "0") {
				// err
				alert("新增失敗，請稍等一會兒後重試一次");
			} else if (res.data === "1") {
				// suc
				alert("新增成功");
			}
		});
	});

	// page2
	$.ajax({
		url: '/users/',
		method: 'GET',
		contentType: 'application/json'
	}).done(function(res) {
		console.log('ajax msg: '+ res.data);
		console.log(res.content);
		var con = res.content;
		for (var i = 0; i < con.length; i++) {
			if (con[i].email == undefined) {
				$('#numList').append('<tr rel="'+ con[i]._id +'">\
						<td>'+ con[i].num +'</td>\
						<td>not yet</td>\
						<td> </td>\
						<td class="mod">修改</td>\
						<td class="del">刪除</td>\
					</tr>');
			}
		}

		// set event to .mod and .del
		$('.mod').click();
		$('.del').click();
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