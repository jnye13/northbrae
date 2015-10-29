//= require jquery
//= require jquery_ujs
//= require bootstrap
//= require cbpAnimatedHeader
//= require classie
//= require froogaloop2.min
//= require jquery.easing.min
//= require jquery.fittext
//= require jquery.flexslider-min
//= require wow.min
//= require creative
//= require_self

$(function() {
     // The slider being synced must be initialized first
     if($('body').hasClass('index')){

	     // Vimeo API nonsense
	      var player1 = document.getElementById('player_1');
	      $f(player1).addEvent('ready', ready);

	      var player2 = document.getElementById('player_2');
	      $f(player2).addEvent('ready', ready);

	      var player3 = document.getElementById('player_3');
	      $f(player3).addEvent('ready', ready);

	      var player4 = document.getElementById('player_4');
	      $f(player4).addEvent('ready', ready);
	     
	      function addEvent(element, eventName, callback) {
	        if (element.addEventListener) {
	          element.addEventListener(eventName, callback, false)
	        } else {
	          element.attachEvent(eventName, callback, false);
	        }
	      }
	     
	      function ready(player_id) {
	        var froogaloop = $f(player_id);
	        froogaloop.addEvent('play', function(data) {
	          $('.flexslider').flexslider("pause");
	        });
	        froogaloop.addEvent('pause', function(data) {
	          $('.flexslider').flexslider("play");
	        });
	      }

	    $('.flexslider').flexslider({
	          animation: "slide",
	          useCSS: false,
	          animationLoop: false,
	          smoothHeight: true,
	          controlNav: "thumbnails",
	          directionNav: false,
	          slideshow: false,
	          before: function(slider){
	            $f(player1).api('pause');
	            $f(player2).api('pause');
	            $f(player3).api('pause');
	            $f(player4).api('pause');
	          }
	    });
	}
                   
});