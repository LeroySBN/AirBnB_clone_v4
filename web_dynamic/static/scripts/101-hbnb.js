$(document).ready(function() {

  // CHECKBOX FUNCTIONALITY
  
  var amenities = [];
  var states = [];
  var cities = [];

  // Listen for changes on each amenity input in a checkbox tag
  $('.amenity_check').on('change', function() {
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

  // Listen for changes on each city input in a checkbox tag
  $('.city_check').on('change', function() {
    var $this = $(this);
    var cityId = $this.data('id');
    var cityName = $this.data('name');

    if ($this.is(':checked')) {
      // Add the data-id attribute to the amenities variable
      cities.push(cityId);
    } else {
      // Remove the data-id attribute from the cities variable
      cities = cities.filter(function(id) {
        return id !== cityId;
      });
    }
    // Update the list of selected inputs in the h4 element
    var locationText = cities.map(function(id) {
      var name = $('input[data-id="' + id + '"]').data('name');
      return name;
    }).join(', ');
    
    $('#locations_selected').text(locationText);
  });

  // Listen for changes on each state input in a checkbox tag
  $('.state_check').on('change', function() {
    var $this = $(this);
    var stateId = $this.data('id');
    var stateName = $this.data('name');

    if ($this.is(':checked')) {
      // Add the data-id attribute to the amenities variable
      states.push(stateId);
    } else {
      // Remove the data-id attribute from the cities variable
      states = states.filter(function(id) {
        return id !== stateId;
      });
    }
    // Update the list of selected inputs in the h4 element
    var locationText = states.map(function(id) {
      var name = $('input[data-id="' + id + '"]').data('name');
      return name;
    }).join(', ');
    
    $('#locations_selected').text(locationText);
  });



  // // Function to handle checkbox changes and update selected locations
  // function updateSelectedLocations($input, locations) {
  //   var id = $input.data('id');
  //   var name = $input.data('name');

  //   if ($input.is(':checked')) {
  //     // Add the data-id attribute to the locations variable
  //     locations.push(id);
  //   } else {
  //     // Remove the data-id attribute from the locations variable
  //     locations = locations.filter(function(locationId) {
  //       return locationId !== id;
  //     });
  //   }

  //   // Update the list of selected inputs in the h4 element
  //   var locationText = locations.map(function(locationId) {
  //     var name = $('input[data-id="' + locationId + '"]').data('name');
  //     return name;
  //   }).join(', ');

  //   $('#locations_selected').text(locationText);
  // }

  // // Listen for changes on each city input in a checkbox tag
  // $('.city_check').on('change', function() {
  //   var $this = $(this);
  //   updateSelectedLocations($this, cities);
  // });

  // // Listen for changes on each state input in a checkbox tag
  // $('.state_check').on('change', function() {
  //   var $this = $(this);
  //   updateSelectedLocations($this, states);
  // });

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


  // FETCH PLACES FROM API
  // Send a POST request to the places_search endpoint with an empty dictionary in the body
  $.ajax({
    type: 'POST',
    url: 'http://0.0.0.0:5001/api/v1/places_search/',
    headers: { 'Content-Type': 'application/json' },
    data: '{}',
    success: function(data) {
      // Loop through the places in the response data
      var renderedPlaces = '';
      $.each(data, function(index, place) {
        var renderedPlace = `
          <article>
            <div class="title_box">
              <h2>${place.name}</h2>
              <div class="price_by_night">$${place.price_by_night}</div>
            </div>
            <div class="information">
              <div class="max_guest">${place.max_guest} Guest${place.max_guest != 1 ? 's' : ''}</div>
              <div class="number_rooms">${place.number_rooms} Bedroom${place.number_rooms != 1 ? 's' : ''}</div>
              <div class="number_bathrooms">${place.number_bathrooms} Bathroom${place.number_bathrooms != 1 ? 's' : ''}</div>
            </div>
            <div class="user">
              <b>Owner:</b> 
            </div>
            <div class="description">
              ${place.description}
            </div>
            <div class=reviews>
                <div>
                  <h2>Reviews</h2>
                  <span>show</span>
                </div>
                <ul data-id=${place.id} class="place_reviews">
                </ul>
            </div>
          </article>
        `;
        renderedPlaces += renderedPlace;
      });
      // Insert the rendered jinja template into the HTML
      $('.places').append(renderedPlaces);
    }
  });

  // SEARCH FUNCTIONALITY
  $(':button').on('click', function(){
    let amenitys = {'amenities': amenities, 'cities': cities, 'states': states};
    $.ajax({
      type: 'POST',
      url: 'http://0.0.0.0:5001/api/v1/places_search/',
      data: JSON.stringify(amenitys),
      contentType: 'application/json',
      dataType: 'json',
      success: function (data) {
        $('.places article').remove();
        var renderedPlaces = '';
      $.each(data, function(index, place) {
        var renderedPlace = `
          <article>
            <div class="title_box">
              <h2>${place.name}</h2>
              <div class="price_by_night">$${place.price_by_night}</div>
            </div>
            <div class="information">
              <div class="max_guest">${place.max_guest} Guest${place.max_guest != 1 ? 's' : ''}</div>
              <div class="number_rooms">${place.number_rooms} Bedroom${place.number_rooms != 1 ? 's' : ''}</div>
              <div class="number_bathrooms">${place.number_bathrooms} Bathroom${place.number_bathrooms != 1 ? 's' : ''}</div>
            </div>
            <div class="user">
              <b>Owner:</b> 
            </div>
            <div class="description">
              ${place.description}
            </div>
            <div class=reviews>
                <div>
                  <h2>Reviews</h2>
                  <span>show</span>
                </div>
                <ul data-id="${place.id}" class="place_reviews">
                </ul>
            </div>
          </article>
        `;
        renderedPlaces += renderedPlace;
      });
      // Insert the rendered jinja template into the HTML
      $('.places').append(renderedPlaces);
      }
    });
  });


  // Click event handler for the span element
  $('span').on('click', function() {
    var $span = $(this);

    if ($span.text() === 'hide') {
      // If the span text is "hide", remove all Review elements from the DOM
      $span.closest('.place_reviews').remove();
    } else {
      // Fetch, parse, and display text from the API
      placeId = $span.closest('.place_reviews').data('id');
      fetchData();
    }
    // Change the span text to "hide"
    $span.text('hide');
  });


  // REVIEW FUNCTIONALITY
  // Function to fetch, parse, and display text from the API
  function fetchData() {
    $.ajax({
      type: 'POST',
      url: 'http://0.0.0.0:5001/api/v1/places/${placeId}/reviews',
      headers: { 'Content-Type': 'application/json' },
      data: '{}',
      success: function(data) {
        // Loop through the places in the response data
        var renderedReviews = '';
        $.each(data, function(index, review) {
          var renderedReviews = `
            <li>
              <h3>From Kamie Nean the 6th September 2017</h3>
              <p>${review.text}</p>
            </li>
          `;
          renderedReviews += renderedReviews;
        });
        // Insert the rendered jinja template into the HTML
        $('.place.reviews').append(renderedReviews);
      }
    });
  }

});
