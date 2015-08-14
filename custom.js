
$(window).load(function() {
  $(".alert").hide();  
});

$("#findMyPostcode").click(function(event) {
  
  event.preventDefault();
  var result = 0,
      addressInput = $("#address").val();

  $(".alert").hide();

  $.ajax({
    type: "GET",
    url: "https://maps.googleapis.com/maps/api/geocode/xml?address=" + encodeURIComponent(addressInput) + "&key=AIzaSyCT_fvEBXI1WTxmkRPEg2KkvuIS_FVPpiw",
    dataType: "xml",
    success: processXML,
    error: error
  });

  function error() {
    $("#serverFail").fadeIn();
  }

  function processXML(xml) {
    var lat, lng;

    $(xml).find("address_component").each(function() {

      if ($(this).find("type").text() == "postal_code") {

        $("#success").html("The postcode you need is " + $(this).find('long_name').text()).fadeIn();

        lat = $(xml).find('lat').first().text();
        lng = $(xml).find('lng').first().text();

        result = 1;
      }

    });

    // display map if the postcode was found
    if (result == 1) {
      var $image = $('<img/>').attr('src', "https://maps.googleapis.com/maps/api/staticmap?zoom=13&size=600x300&maptype=roadmap&markers=color:red%7Clabel:C%7C"+lat+","+lng)
      $('#map').html($image).fadeIn(2000);
    }

    if (result == 0) {
      $("#inputFail").fadeIn();
    }
  }
});


