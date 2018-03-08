<<<<<<< HEAD
function initMap(){
    

    // google map
    var geocoder = new google.maps.Geocoder();
    var address = "48834";


    geocoder.geocode({'address': address}, function(results, status){
        if (status == google.maps.GeocoderStatus.OK) {
            var latitude = results[0].geometry.location.lat();
            var longitude = results[0].geometry.location.lng();
            console.log(latitude);
            console.log(longitude);

            var options = {
                zoom : 8,
                center: {lat: latitude, lng: longitude}
            }

            var map = new google.maps.Map(document.getElementById('map'), options);

          }
    })

    

    


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


=======
$(document).ready(function () {
    $('select').material_select();
>>>>>>> 139c528782cacdf1fa43baf86c792c60e43582ac
});