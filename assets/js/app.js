// initializing firebase
$(document).ready(function() {

    // // Initialize Firebase
 var config = {
    apiKey: "AIzaSyCZFgxlm7OYDtYudao20tc-24xjNhnPUa8",
    authDomain: "awesomedoctor-907ea.firebaseapp.com",
    databaseURL: "https://awesomedoctor-907ea.firebaseio.com",
    projectId: "awesomedoctor-907ea",
    storageBucket: "awesomedoctor-907ea.appspot.com",
    messagingSenderId: "563734361620"
  };
  firebase.initializeApp(config);

  // Create a variable to reference the database.
  var database = firebase.database();
  // Initial Values
  var specialist = "";
  var location = "";
  var distanceFromYou = 0;
  
  // Capture Button Click
  $("#searchBtn").on("click", function(event) {
    event.preventDefault();
    // Grabbed values from text boxes
    specialist = $("#specialties-input").val().trim();
    location = $("#location-input").val().trim();
    distanceFromYou = $("#distanceAway").val().trim();
    
    // Code for handling the push
    database.ref().push({
      specialist: specialist,
      location: location,
      distance: distanceFromYou,
      
      dateAdded: firebase.database.ServerValue.TIMESTAMP
    });
  });
  // Firebase watcher + initial loader + order/limit HINT: .on("child_added"
  database.ref().orderByChild("date").limitToLast(1).on("child_added", function(snapshot) {
    // storing the snapshot.val() in a variable for convenience
    var sv = snapshot.val();
    // Console.loging the last user's data
    console.log(sv.specialist);
    console.log(sv.location);
    console.log(sv.distance);
   
    // Change the HTML to reflect
    $("#specialties-input").text(sv.specialist);
    $("#location-input").text(sv.location);
    $("#distanceAway").text(sv.distance);
    $
    // Handle the errors
  }, function(errorObject) {
    console.log("Errors handled: " + errorObject.code);
  });
    


    // result page
    $('select').material_select();

    var specialty = '';
    var location = '';
    var radius = 0;



    var doctorArray = [];
    $('#search').on('click', function () {

        // $("#specialty").val("");
        // $("#location").val("");
        // $("#radius").val("");
        $('#doctorData').empty()



        specialty = $('#specialty').val().trim();
        location = $('#location').val().trim();
        radius = $('#radius').val().trim();
        betterDoctor(specialty, location, radius)
        console.log(specialty)
        console.log(location)
        console.log(radius)
    })


    function betterDoctor(specialty, location, radius) {
        // doctor api
        var doctorApi = "bbc8405334e9bfa31c8a02401fdacfd6";
        var resource_url = 'https://api.betterdoctor.com/2016-03-01/doctors?query=' + specialty + '&location=' + location + ',' + radius + '&skip=2&limit=10&user_key=' + doctorApi;
        // var resource_url = 'https://api.betterdoctor.com/2016-03-01/doctors?specialty_uid=' + specialty + '&location=' + location + '%2C' + radius + '&skip=0&limit=10&user_key=' + doctorApi;

        $.ajax({
            url: resource_url,
            method: 'GET'
        }).then(function (resp) {
            console.log(resp);
            doctorArray = resp.data;

            for (var i = 0; i < doctorArray.length; i++) {
                var firstName = doctorArray[i].profile.first_name
                var lastName = doctorArray[i].profile.last_name
                var title = doctorArray[i].profile.title
                var image = doctorArray[i].profile.image_url

                // this is an array
                var specialties = convertArrayObjectToString(doctorArray[i].specialties);

                //var li = $("<li class='item' data-index='" + i + "'data-lat='" + lat + "' data-lon='" + lon + "' data-bio='" + bio + "'><div class='collapsible-header'>" + firstName + " " + lastName + ", " + title + "</div><div class='collapsible-body body-item'><div class='row'><img src='" + image + "'><p></p></div><div id='map'></div></div>");
                //var li = $("<li class='item' data-index='" + i + "'data-lat='" + lat + "' data-lon='" + lon + "' data-bio='" + bio + "'><div class='collapsible-header'>" + firstName + " " + lastName + ", " + title + "</div><div class='collapsible-body body-item'><div class='row'><div class='col md-3 sm-12'><img src='" + image + "'></div><p></p></div><div id='map'></div></div>");
                var li = $("<li class='item' data-index='" + i + "'><div class='collapsible-header title-header'>" + firstName + " " + lastName + ", " + title + " - Specialities: " + specialties + "</div><div class='collapsible-body body-item'><div class='row'><div class='col m2 s12'><img class='responsive-img avatar' src='" + image + "'></div><div class='col m10 s12 bio'></div></div><div id='map'></div></div>");





                $("#doctorData").append(li);


            }

            // $("#firstEntry").append(firstName, lastName)
        }).catch(function (err) {
            console.error(err);
        })
    };
    $(document).on("click", ".item", function () {
        var index = $(this).attr("data-index");
        var bio = doctorArray[index].profile.bio;
        var content = $(this).find(".bio");
        // content.css("color", "red");

        content.text(bio);

        // add google map in here

        // find div map in here
        var mapTag = $(this).find("#map");
        console.log(mapTag);

        // var latitude = parseFloat($(this).attr("data-lat"));
        // console.log(latitude)
        // var long = parseFloat($(this).attr("data-lon"));
        // console.log(long)

        var latitude = doctorArray[index].practices[0].visit_address.lat;
        console.log(latitude)
        var longtitude = doctorArray[index].practices[0].visit_address.lon;
        console.log(longtitude)

        // map options
        var options = {
            zoom: 10, // zoom in
            center: { lat: latitude, lng: longtitude },
            zoomControl: false, // disable the zoom control
            mapTypeControl: false, // disable map type control to switch between map and satellite
            fullscreenControl: false, // disable full screen control
            streetViewControl: false // disable street view control
        }

        var map = new google.maps.Map(mapTag[0], options);

        var marker = new google.maps.Marker({
            position: { lat: latitude, lng: longtitude },
            map: map
        });


    });

    function convertArrayObjectToString(obj) {
        // debugger;
        var value = []
        for (var i = 0; i < obj.length; i++) {
            value.push(obj[i].name);
        }

        return value.join(', ');
    }

});