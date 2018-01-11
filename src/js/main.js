/*jQuery SETTINGS
=============================================*/

jQuery(document).ready(function($) {

  /* Slick slider http://kenwheeler.github.io
  ===========================================*/
  $(function() {

    $('#js-slides').slick({
      dots: true,
      infinite: true,
      fade: true,
      cssEase: 'linear',
      slidesToShow: 1,
      adaptiveHeight: true,
      autoplay: true,
      autoplaySpeed: 3000,
      arrows: false
    })

  });

  /*Page-popup
  ============================================*/

  $(function() {

    $('.js-popup-btn').on('click', function(event) {
      event.preventDefault();

      var currentModal = $(this).attr('href');

      $(currentModal).fadeIn();
      $('body').append('<div class="overlay" id="js-overlay"></div>').addClass('open-popup');

    });

    $('.js-popup-close').on('click', function(event) {
      event.preventDefault();
      $('.js-popup').fadeOut();
      $('body').removeClass('open-popup');
      $('#js-overlay').remove();
    });

    $('body').on('click', '#js-overlay', function(event) {
        $('.js-popup').fadeOut();
        $('body').removeClass('open-popup');
        $('#js-overlay').remove();
    });

  });


});


/*JavaScript SETTINGS
===========================================*/


/*GOOGLE MAPS https://developers.google.com/maps/documentation/javascript/?hl=ru
=================================================================================*/
function initMap() {
      var myLatLng = {lat: 59.9387942, lng: 30.3208946};
      var map = new google.maps.Map(document.getElementById('page-map'), {
      center: myLatLng,
      zoom: 16,
      mapTypeControl : false,
      streetViewControl: false


  });

      var contentString = '<p class="text-description">NЁRDS DESIGN STUDIO</p>'
      + '<p class="text-description">191186, Санкт-Петербург, <br>  ул. Б. Конюшенная, д. 19/8 </p>'




      var infowindow = new google.maps.InfoWindow({
          content: contentString
  });

      var marker = new google.maps.Marker({
          map: map,
          position: myLatLng,
          title: 'NЁRDS DESIGN STUDIO',
          icon : 'page-map/map-marker.png'
  });
      marker.addListener('click', function() {
          infowindow.open(map, marker);
  });
}

/*WOW.js https://github.com/matthieua/WOW
============================================================*/
new WOW().init();

