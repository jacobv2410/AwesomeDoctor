
 // Initialize Firebase
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
    var name = "";
    var email = "";
    var age = 0;
    var comment = "";
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
    database.ref().orderByChild("dateAdded").limitToLast(1).on("child_added", function(snapshot) {
        // storing the snapshot.val() in a variable for convenience
        var sv = snapshot.val();
        // Console.loging the last user's data
        console.log(sv.name);
        console.log(sv.email);
        console.log(sv.age);
        console.log(sv.comment);
        // Change the HTML to reflect
        $("#specialties-input").text(sv.specialist);
        $("#location-input").text(sv.location);
        $("#distanceAway").text(sv.distance);
        $("#comment-display").text(sv.comment);
        // Handle the errors
    }, function(errorObject) {
        console.log("Errors handled: " + errorObject.code);
    });
    
    // $('button').on('click',function(){
        //     var value = $('form').val()
        //     betterDoctor(value)
        // })
        // function betterDoctor(parameters){
            //     var queryDoctor = 'url string ' + paramters
            //     $.ajax({
                //         url: queryDoctor
                //     }).then(function(resp){
                    //         console.log(resp)
                    //     })
                    // }
                    /*
                    Google map API
                    */
                        $(document).ready(function() {
                            "use strict";
                    
                    function initMap() {
                        // google map
                        
                        var geocoder = new google.maps.Geocoder();
        var address = "7772 22nd St Westminster CA 92683";

        geocoder.geocode({ 'address': address }, getMapOptions)
    }

    function getMapOptions(results, status) {
        var coordinatesValue = [];
        if (status == google.maps.GeocoderStatus.OK) {
            var latitude = results[0].geometry.location.lat();
            var longtitude = results[0].geometry.location.lng();
            console.log(latitude);
            console.log(longtitude);

            coordinatesValue.push(latitude, longtitude);
        }

        var options = {
            zoom: 14, // zoom out
            center: { lat: coordinates[0], lng: coordinates[1] }
        }

        return options;

    }


    /*
    Doctor API !!!
    */
    // doctor api
    var doctorApi = "bbc8405334e9bfa31c8a02401fdacfd6";
    var resource_url = 'https://api.betterdoctor.com/2016-03-01/doctors?location=37.773,-122.413,100&skip=2&limit=10&user_key=' + doctorApi;



    var doctorArray = [];
    $.ajax({
        url: resource_url,
        method: 'GET'
    }).then(function(resp) {
        console.log(resp);

        doctorArray = resp.data;
        console.log(doctorArray);

        for (var i = 0; i < doctorArray.length; i++) {

            var profile = doctorArray[i].profile;
            var firstName = profile.first_name;
            var lastName = profile.last_name;
            var image = profile.image_url;
            var title = profile.title;

            var li = $("<li class='item' data-index='" + i + "'><div class='collapsible-header'>" + firstName + " " + lastName + ", " + title + "</div><div class='collapsible-body body-item'><p></p><div id='map'></div></div>");
            $("#doctor-rows").append(li);
        }
    }).catch(function(err) {
        console.error(err);
    })


    $(document).on("click", ".item", function() {
        var index = $(this).attr("data-index");
        var bio = doctorArray[index].profile.bio;
        var content = $(this).find("p");
        content.text(bio);

        // add google map in here

        // find div map in here
        var mapTag = $(this).find("#map");
        console.log(mapTag);

        var geocoder = new google.maps.Geocoder();
        var address = "7772 22nd St Westminster CA 92683";

        geocoder.geocode({ 'address': address }, function(results, status) {
            var coordinatesValue = [];
            if (status == google.maps.GeocoderStatus.OK) {
                var latitude = results[0].geometry.location.lat();
                var longtitude = results[0].geometry.location.lng();
                // console.log("lat: " + latitude);
                // console.log("long: " + longtitude);

                coordinatesValue.push(latitude, longtitude);
            }

            // map options
            var options = {
                zoom: 10, // zoom in
                center: { lat: coordinatesValue[0], lng: coordinatesValue[1] },
                zoomControl: false, // disable the zoom control
                mapTypeControl: false, // disable map type control to switch between map and satellite
                fullscreenControl: false, // disable full screen control
                streetViewControl: false // disable street view control
            }

            var map = new google.maps.Map(mapTag[0], options);

            // add marker
            var marker = new google.maps.Marker({
                position: { lat: coordinatesValue[0], lng: coordinatesValue[1] },
                map: map
            });
        })



    });



});