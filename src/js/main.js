/*jQuery SETTINGS
=============================================*/

jQuery(document).ready(function($) {

  /* Slick slider http://kenwheeler.github.io
  ===========================================*/

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
          icon : '../img/page-map/map-marker.png'
  });
      marker.addListener('click', function() {
          infowindow.open(map, marker);
  });
}
