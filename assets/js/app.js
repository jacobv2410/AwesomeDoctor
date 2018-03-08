function initMap(){
    // google map
    var geocoder = new google.maps.Geocoder();
    //var address = "7772 22nd St Westminster CA 92683";

    var address = ["7772 22nd St Westminster CA 92683", "9191 Cerritos Ave Anaheim CA 92804"];

    for(var i = 0; i < address.length; i++){
        geocoder.geocode({'address': address[i]}, displayMap)
    }
}

function displayMap(results, status){
    var coordinatesValue = [];
    if(status == google.maps.GeocoderStatus.OK){
        var latitude = results[0].geometry.location.lat();
        var longtitude = results[0].geometry.location.lng();
        console.log(latitude);
        console.log(longtitude);
        
        coordinatesValue.push(latitude, longtitude);        
    }
    
    drawMap(coordinatesValue);
}

function drawMap(coordinates){
    var options = {
        zoom : 10, // zoom in
        center: {lat: coordinates[0], lng: coordinates[1]}
    }   

    var mapTag = $("#map");    
    var map = new google.maps.Map(mapTag[0], options); 
    
    var marker = new google.maps.Marker({
        position: {lat: coordinates[0], lng: coordinates[1]},
        map: map
    });

    var infoWindow = new google.maps.InfoWindow({
        content: '<h1>Hello</h1>'
    })

    marker.addListener('click', function(){
        infoWindow.open(map, marker)
    })
}

function addmarker(coordinates){
    var marker = new google.maps.Marker({
        position: {lat: coordinates[0], lng: coordinates[1]},
        map: map
    });
}

$(document).ready(function () {
    $('select').material_select();

    
    
    // doctor api
    var doctorApi = "bbc8405334e9bfa31c8a02401fdacfd6";
    var resource_url = 'https://api.betterdoctor.com/2016-03-01/doctors?location=37.773,-122.413,100&skip=2&limit=10&user_key=' + doctorApi;

    $.ajax({
        url : resource_url,
        method : 'GET'
    }).then(function(resp){            
        console.log(resp);

    }).catch(function(err){
        console.error(err);
    })


});