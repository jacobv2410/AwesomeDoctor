// function displayMap(results, status) {

//     if (status == google.maps.GeocoderStatus.OK) {
//         var latitude = results[0].geometry.location.lat();
//         var longtitude = results[0].geometry.location.lng();
//         console.log(latitude);
//         console.log(longtitude);

//         return { latitude, longtitude };
//     }

//     //     drawMap(coordinatesValue);
// }

// function drawMap(coordinates) {
//     var options = {
//         zoom: 10, // zoom in
//         center: { lat: coordinates[0], lng: coordinates[1] }
//     }

//     var mapTag = $("#map");
//     var map = new google.maps.Map(mapTag[0], options);

//     var marker = new google.maps.Marker({
//         position: { lat: coordinates[0], lng: coordinates[1] },
//         map: map
//     });

//     var infoWindow = new google.maps.InfoWindow({
//         content: '<h1>Hello</h1>'
//     })

//     marker.addListener('click', function() {
//         infoWindow.open(map, marker)
//     })
// }

// function addmarker(coordinates) {
//     var marker = new google.maps.Marker({
//         position: coords,
//         map: map,
//     });
// }

$(document).ready(function() {
    "use strict";
    // var map;

    // function initMap() {
    //     var options = {
    //         zoom: 8,
    //         //center:
    //     }
    // }


    // initMap();

    // $('select').material_select();



    // doctor api
    var doctorApi = "bbc8405334e9bfa31c8a02401fdacfd6";
    var resource_url = 'https://api.betterdoctor.com/2016-03-01/doctors?location=37.773,-122.413,100&skip=2&limit=10&user_key=' + doctorApi;

    $.ajax({
        url: resource_url,
        method: 'GET'
    }).then(function(resp) {
        console.log(resp);

        // get all 10 doctor lat and long

        var doctorArray = resp.data;
        //console.log(doctorArray);

        for (var i = 0; i < doctorArray.length; i++) {
            //console.log(doctorArray[i]);
            var profile = doctorArray[i].profile;
            console.log(profile);
            var firstName = profile.first_name;
            //console.log(firstName);
            var lastName = profile.last_name;
            //console.log(lastName);
            var image = profile.image_url;


            // each doctor, create a row
            var row = $("<div class='row' data-index='" + i + "'>");
            //console.log(row);

            // create 3 cols s2, s5 and s5 under row
            //var cols2 = "<div class=''col s2><a href='https://placeholder.com'><img class=''>" // need to test later
            //image_url
            //var cols2 = $("<div class=''col s2><a href='https://placeholder.com'><img class='responsive-img' src='http://via.placeholder.com/200x200'></a>")
            var cols2 = $("<div class=''col s2><a href='https://placeholder.com'><img class='responsive-img' src='" + image + "'></a>")
            row.append(cols2);

            //var cols5


            $("#doctor-rows").append(row);

        }



    }).catch(function(err) {
        console.error(err);
    })


});