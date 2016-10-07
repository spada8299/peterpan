'use strict';
var pageNow = window.location.pathname;

$(document).ready(function() {
	console.log(pageNow);
});

$('#btnPre').click(function() {
	if (pageNow === '/index2.html') {
		window.location.href = 'index.html';
	}
});
$('#btn1').click(function() {
	if (pageNow != '/index.html' || pageNow != '/') {
		window.location.href = 'index.html';
	}
});
$('#btn2').click(function() {
	// if (pageNow != '/index2.html') {
	// 	window.location.href = 'index2.html';
	// }
  window.location.href = 'wish1.html';
});
$('#btn3').click(function() {
	window.location.href = 'wish1.html';
});
$('#btnNext').click(function() {
	// if (pageNow === '/index2.html') {
	// 	// prepare to page3
	// 	window.location.href = 'wish1.html';
	// } else if (pageNow === '/index.html' || pageNow === '/') {
	// 	window.location.href = 'index2.html';
	// }
  window.location.href = 'wish1.html';
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