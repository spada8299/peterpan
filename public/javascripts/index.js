'use strict';
var pageNow = 1;

$(document).ready(function() {
	var pageNow = Number(getValue('pageNow'));
	// console.log(pageNow);

	if (pageNow === 1 && getValue('pageNow')!= '') {
		$('#btn2').attr('disabled', false);
		$('#btn3').attr('disabled', false);
		$('#btnNext').attr('disabled', false);
		$('#btn2').removeClass('btnNo');
		$('#btn3').removeClass('btnNo');
		$('#btnNext').removeClass('btnNo');	
	} else if (pageNow === 2) {
		$('#btn2').attr('disabled', false);
		$('#btn3').attr('disabled', false);
		$('#btnNext').attr('disabled', false);
		$('#btn2').removeClass('btnNo');
		$('#btn3').removeClass('btnNo');
		$('#btnNext').removeClass('btnNo');
		
		// show page2
		$('#page1').hide();
		$('#page2').fadeIn();
		$('#btnPre').fadeIn();
		$('#btnNext').text('正式許願！');
		$('.btnAct').addClass('btn');
		$('.btnAct').removeClass('btnAct');
		$('#btn2').addClass('btnAct');
		pageNow = 2;
	} else {
		// a new user
		setTimeout(function() {
			$('#btn2').attr('disabled', false);
			$('#btn3').attr('disabled', false);
			$('#btnNext').attr('disabled', false);
			$('#btn2').removeClass('btnNo');
			$('#btn3').removeClass('btnNo');
			$('#btnNext').removeClass('btnNo');
		}, 165000);
	}
});

$('#btnPre').click(function() {
	if (pageNow === 1) {
		// do nothing
	} else if (pageNow === 2) {
		$('#page1').fadeIn();
		$('#page2').hide();
		$('#btnPre').hide();
		$('#btnNext').text('ＮＥＸＴ');
		$('.btnAct').addClass('btn');
		$('.btnAct').removeClass('btnAct');
		$('#btn1').addClass('btnAct');
		pageNow = 1;
	}
});
$('#btn1').click(function() {
	if (pageNow === 1) {
		// do nothing
	} else {
		$('#page1').fadeIn();
		$('#page2').hide();
		$('#btnPre').hide();
		$('#btnNext').text('ＮＥＸＴ');
		$('.btnAct').addClass('btn');
		$('.btnAct').removeClass('btnAct');
		$('#btn1').addClass('btnAct');
		pageNow = 1;
	}
});
$('#btn2').click(function() {
	if (pageNow === 2) {
		// do nothing
	} else {
		$('#page1').hide();
		$('#page2').fadeIn();
		$('#btnPre').fadeIn();
		$('#btnNext').text('正式許願！');
		$('.btnAct').addClass('btn');
		$('.btnAct').removeClass('btnAct');
		$('#btn2').addClass('btnAct');
		pageNow = 2;
	}
});
$('#btn3').click(function() {
	window.location.href = 'wish1.html';
});
$('#btnNext').click(function() {
	if (pageNow === 2) {
		// prepare to page3
		window.location.href = 'wish1.html';
	} else if (pageNow === 1) {
		$('#page1').hide();
		$('#page2').fadeIn();
		$('#btnPre').fadeIn();
		$('#btnNext').text('正式許願！');
		$('.btnAct').addClass('btn');
		$('.btnAct').removeClass('btnAct');
		$('#btn2').addClass('btnAct');
		pageNow = 2;
	}
});

function getValue(varname) {
  var url = window.location.href;
  try {
    var qparts = url.split('?');
    if (qparts.length === 0) {
      return '';
    }
    var query = qparts[1];
    var vars = query.split('&');
    var value = '';
    for (var i = 0; i < vars.length; i++) {
      var parts = vars[i].split('=');
      if (parts[0] == varname) {
        value = parts[1];
        break;
      }
    }
    value = unescape(value);
    value.replace(/\+/g, ' ');
    return value;
  } catch (err) {
    return '';
  }
};