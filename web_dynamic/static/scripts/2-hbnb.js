$(document).ready(function() {

  // CHECKBOX FUNCTIONALITY
  
  var amenities = [];

  // Listen for changes on each input in a checkbox tag
  $('input[type="checkbox"]').on('change', function() {
    var $this = $(this);
    var amenityId = $this.data('id');
    var amenityName = $this.data('name');

    if ($this.is(':checked')) {
      // Add the data-id attribute to the amenities variable
      amenities.push(amenityId);
    } else {
      // Remove the data-id attribute from the amenities variable
      amenities = amenities.filter(function(id) {
        return id !== amenityId;
      });
    }

    // Update the list of selected inputs in the h4 element
    var amenitiesText = amenities.map(function(id) {
      var name = $('input[data-id="' + id + '"]').data('name');
      return name;
    }).join(', ');

    $('#amenities_selected').text(amenitiesText);
  });

  // API CONNECTIVITY STATUS

  // Send a GET request to the status endpoint
  $.get('http://0.0.0.0:5001/api/v1/status/', function(data) {
    if (data.status === 'OK') {
      // If the status is "OK", add the "available" class to the #api_status div
      $('div#api_status').addClass('available');
    } else {
      // If the status is not "OK", remove the "available" class from the #api_status div
      $('div#api_status').removeClass('available');
    }
  });
});
