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
				alert("新增失敗，請稍後再試");
			} else if (res.data === "1") {
				// suc
				alert("新增成功");
				cleanTable();
				loadTable();
			}
		});
	});

	// page2
	loadTable();
});

$('#tag1').click(function() {
	$('#page1').fadeIn();
	$('#page2').hide();
});
$('#tag2').click(function() {
	$('#page1').hide();
	$('#page2').fadeIn();
});

function loadTable() {
	$.ajax({
		url: '/users/',
		method: 'GET',
		contentType: 'application/json'
	}).done(function(res) {
		console.log('ajax msg: '+ res.data);
		console.log(res.content);
		var con = res.content;
		for (var i = 0; i < con.length; i++) {
			if (con[i].content == undefined) {
				$('#numList').append('<tr rel="'+ con[i]._id +'">\
						<td><span class="numText">'+ con[i].num +'</span><input type="text" class="numInput" value="'+ con[i].num +'"></td>\
						<td>not yet</td>\
						<td> </td>\
						<td><span class="mod">修改</span><span class="modCancel">取消</span><span class="modConfirm">確定</span></td>\
						<td class="del">刪除</td>\
					</tr>');
			} else {
				$('#numList').append('<tr rel="'+ con[i]._id +'">\
						<td><span class="numText">'+ con[i].num +'</span><input type="text" class="numInput" value="'+ con[i].num +'"></td>\
						<td>yes</td>\
						<td>'+ con[i].content +'</td>\
						<td><span class="mod">修改</span><span class="modCancel">取消</span><span class="modConfirm">確定</span></td>\
						<td class="del">刪除</td>\
					</tr>');
			}
		}

		// set event to .mod
		$('.mod').click(function() {
			$(this).parent().parent().find('.numText').hide();
			$(this).parent().parent().find('.numInput').fadeIn();
			$(this).parent().parent().find('.numInput').focus();
			$(this).parent().find('.modCancel').fadeIn();
			$(this).parent().find('.modConfirm').fadeIn();
			$(this).parent().find('.mod').hide();
		});
		$('.modCancel').click(function() {
			$(this).parent().find('.mod').fadeIn();
			$(this).parent().find('.modConfirm').hide();
			$(this).parent().parent().find('.numText').fadeIn();
			$(this).parent().parent().find('.numInput').hide();
			$(this).hide();
		});
		$('.modConfirm').click(function() {
			console.log($('.numInput').val());
			console.log($(this).parent().parent().attr('rel'));
			var updateNum = $('.numInput').val();
			var rel = $(this).parent().parent().attr('rel');
			$.ajax({
				data: JSON.stringify({'num': updateNum}),
				url: '/users/'+ rel,
				method: 'PUT',
				contentType: 'application/json'
			}).done(function(res) {
				console.log(res);
				if (res.data === "0") {
					// err
					alert("修改失敗，請稍候再試");
					cleanTable();
					loadTable();
				} else if (res.data === "1") {
					// suc
					cleanTable();
					loadTable();
				}
			});
		});

		// set event to .del
		$('.del').click(function() {
			if (confirm("確定要移除序號"+ $(this).parent().find('.numText').text() +"?")) {
				console.log('yes!');
				var rel = $(this).parent().attr('rel');
				$.ajax({
					url: '/users/'+ rel,
					method: 'DELETE',
					contentType: 'application/json'
				}).done(function(res) {
					console.log(res);
					if (res.data === "0") {
						// err
						alert("刪除失敗，請稍候再試");
						cleanTable();
						loadTable();
					} else if (res.data === "1") {
						// suc
						cleanTable();
						loadTable();
					}
				});
			} else {
				console.log('no!');
			}
		});
	});
}

function cleanTable() {
	$('#numList').empty();
}