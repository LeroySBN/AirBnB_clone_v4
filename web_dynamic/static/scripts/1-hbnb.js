// CHECKBOX FUNCTIONALITY

$(document).ready(function() {
    var amenities = [];
  
    // Listen for changes on each input in a checkbox tag
    $('input[type="checkbox"]').on('change', function() {
      var $this = $(this);
      var amenityId = $this.data('id');
    //   var amenityName = $this.data('name');
  
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
  });
