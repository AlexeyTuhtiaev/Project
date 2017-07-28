//document.onmousemove= showMarkers;

var map;
function init() {

    var place = new google.maps.LatLng(53.903616, 27.555244);
    var directionsService = new google.maps.DirectionsService;
    var directionsDisplay = new google.maps.DirectionsRenderer;
    map = new google.maps.Map(document.getElementById('map-task'), {
        zoom: 6,
        center: place
    });
    directionsDisplay.setMap(map);
    
    calculateAndDisplayRoute(directionsService, directionsDisplay);
}


function calculateAndDisplayRoute(directionsService, directionsDisplay) {

    var waypts = [];

    var waypoints = document.getElementsByName('waypoint');

    for (var i = 0; i < waypoints.length; i++) {
        waypts.push(({
            location: waypoints[i].value,
            stopover: true
        }));
    }

    var travelModeElement = document.getElementById('travelMode');
    var travelMode = travelModeElement.getAttribute('value');

    directionsService.route({
        origin: document.getElementById('origin-input').value,
        destination: document.getElementById('destination-input').value,
        waypoints: waypts,
        optimizeWaypoints: false,
        travelMode: travelMode
    }, function (response, status) {
        if (status === 'OK') {
            directionsDisplay.setDirections(response);
            var route = response.routes[0];
            var summaryPanel = document.getElementById('directions-panel');
            summaryPanel.innerHTML = '';
            // For each route, display summary information.
            for (var i = 0; i < route.legs.length; i++) {
                var routeSegment = i + 1;
                summaryPanel.innerHTML += '<b>Часть пути: ' + routeSegment +
                    '</b><br>';
                summaryPanel.innerHTML += route.legs[i].start_address + ' to ';
                summaryPanel.innerHTML += route.legs[i].end_address + '<br>';
                summaryPanel.innerHTML += route.legs[i].distance.text + '<br><br>';
            }
        } else {
            switch (status) {
                case 'MAX_ROUTE_LENGTH_EXCEEDED': {
                    window.alert('ВАШ МАРШРУТ СЛИШКОМ ДЛИННЫЙ');
                    break;
                }
                default:
                    window.alert('Directions request failed due to ' + status);
            }

        }
    });

    showMarkers();
}

function showMarkers() {
    allMarkers = [];

    //получаю строку запроса
    var query = document.location.href;    // Получение строки запроса.
    var hrefValues = query.split('/');                   // Разделение строки по амперсанду
    var routeId = hrefValues[hrefValues.length - 1];

    // Получаем данные
    var url = Router.action('Route', 'GetMarkers', {id:routeId});
    $.getJSON(url, function (data) {
        // Проходим по всем данным и устанавливаем для них маркеры
        $.each(data, function (i, item) {
            var marker = new google.maps.Marker({
                position: new google.maps.LatLng(item.GeoLat, item.GeoLong),
                map: map,
                title: item.Title,
                animation: google.maps.Animation.DROP,
                //label: 'BSUIR'
            });

            // Берем для этих маркеров  иконки
            marker.setIcon(item.Icon)

            // Для каждого объекта добавляем доп. информацию, выводимую в отдельном окне
            // Appending querystring parameters
            var url = Router.action('Foo', 'Bar', { hello: 'world' }); // eg. /Foo/Bar?hello=world
            var strRouteId=''+routeId;
            var imgUrl = Router.action('Route', 'GetImage', { routeId: strRouteId, markerNumber:i+1});
            var infowindow = new google.maps.InfoWindow({
                content: "<div class='marker-infoWindow '><h5>" + item.Content +
                    "</h5><div class='imgwrapper'><img class='img-responsive' src=" + imgUrl + " alt='No Image \\' /></div></div>"
            });

            // обработчик нажатия на маркер объекта
            google.maps.event.addListener(marker, 'click', function () {
                infowindow.open(map, marker);
            });
            allMarkers.push(marker);
        })
        // Add a marker clusterer to manage the markers.
        markerClusterer = new MarkerClusterer(map, allMarkers,
                { imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m' });
    });
    
}

