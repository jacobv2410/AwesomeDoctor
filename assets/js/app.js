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



    var doctorArray = [];
    $.ajax({
        url: resource_url,
        method: 'GET'
    }).then(function(resp) {
        console.log(resp);

        doctorArray = resp.data;
        //console.log(doctorArray);

        for (var i = 0; i < doctorArray.length; i++) {

            var profile = doctorArray[i].profile;
            var firstName = profile.first_name;
            var lastName = profile.last_name;
            var image = profile.image_url;
            var title = profile.title;
            var bio = profile.bio;
            console.log(bio);

            var li = $("<li class='item' data-index='" + i + "'><div class='collapsible-header'>" + firstName + " " + lastName + ", " + title + "</div><div class='collapsible-body body-item'><p></p></div>");
            $("#doctor-rows").append(li);
        }
    }).catch(function(err) {
        console.error(err);
    })


    $(document).on("click", ".item", function() {
        var index = $(this).attr("data-index");
        console.log(index);

        var bio = doctorArray[index].profile.bio;

        //console.log(doctorArray[index].profile.bio);

        var content = $(this).find("p");

        content.text(bio);

        // add google map in here


    });



});