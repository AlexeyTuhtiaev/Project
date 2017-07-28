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

    //google.maps.event.addListener(map, 'click', function (event) {
    //    addStartEndManually(event.latLng, map);
    //});    

    document.getElementById('btnShowRoute').addEventListener('click', function () {
        calculateAndDisplayRoute(directionsService, directionsDisplay);
    });
    document.getElementById('btnAddWaypoints').addEventListener('click', function () {
        addWaypoint();
    });

    document.getElementById('OriginPoint').focus();

    new AutocompleteDirectionsHandler(map);
}

function AutocompleteDirectionsHandler(map) {
    this.map = map;
    this.originPlaceId = null;
    this.destinationPlaceId = null;
    this.travelMode = 'WALKING';
    var originInput = document.getElementById('OriginPoint');
    var destinationInput = document.getElementById('destination-input');
    var modeSelector = document.getElementById('mode-selector');
    this.directionsService = new google.maps.DirectionsService;
    this.directionsDisplay = new google.maps.DirectionsRenderer;
    this.directionsDisplay.setMap(map);

    var originAutocomplete = new google.maps.places.Autocomplete(
        originInput, { placeIdOnly: true });
    var destinationAutocomplete = new google.maps.places.Autocomplete(
        destinationInput, { placeIdOnly: true });
}

function AutocompleteWaypointHandler(map) {
    this.map = map;
    this.waypointPlaceId = null;

    var waypointInput = document.getElementById('WayPoints' + k);

    this.directionsService = new google.maps.DirectionsService;
    this.directionsDisplay = new google.maps.DirectionsRenderer;
    this.directionsDisplay.setMap(map);

    var waypointAutocomplete = new google.maps.places.Autocomplete(
        waypointInput, { placeIdOnly: true });
}

var k = 0;
function addWaypoint() {

    var wayPointsScope = document.getElementById('wayPointsScope');
    var newWayPoint = document.createElement("div");

    var input = document.createElement("input");
    input.setAttribute('id', 'WayPoints' + k);
    input.setAttribute('name', 'WayPoints' + '[' + k + '].Point');
    input.setAttribute('class', 'controls WayPoints');
    input.setAttribute('type', 'text');
    input.setAttribute('placeholder', 'Введите промежуточную точку');
    newWayPoint.appendChild(input);

    var btnDelete = document.createElement('button');
    btnDelete.setAttribute('class', 'btn btn-danger btn-xs pull-right');
    btnDelete.setAttribute('id', 'btnDelete' + k);
    btnDelete.innerHTML = 'Удалить промежуточную точку';
    newWayPoint.appendChild(btnDelete);

    wayPointsScope.appendChild(newWayPoint);

    document.getElementById('btnDelete' + k).addEventListener('click', function () {
        deleteWaypoint(this);
    });

    new AutocompleteWaypointHandler(map);

    k++;
}


function deleteWaypoint(e) {

    var deletedbtn = document.getElementById(e.id);
    var parent = deletedbtn.parentElement;

    var wayPointsScope = document.getElementById('wayPointsScope');
    wayPointsScope.removeChild(parent);
}

AutocompleteDirectionsHandler.prototype.setupPlaceChangedListener = function (autocomplete, mode) {
    var me = this;
    autocomplete.bindTo('bounds', this.map);
    autocomplete.addListener('place_changed', function () {
        var place = autocomplete.getPlace();
        if (!place.place_id) {
            window.alert("Please select an option from the dropdown list.");
            return;
        }
        if (mode === 'ORIG') {
            me.originPlaceId = place.place_id;
        } else {
            me.destinationPlaceId = place.place_id;
        }
        me.route();
    });
};


function calculateAndDisplayRoute(directionsService, directionsDisplay) {

    var waypts = [];
    var waypoints = document.getElementsByClassName('WayPoints');

    for (var i = 0; i < waypoints.length; i++) {
        waypts.push(({
            location: waypoints[i].value,
            stopover: true
        }));
    }

    var travelType = document.getElementsByName('TravelType');
    var type;
    for (var i = 0; i < travelType.length; i++) {
        if (travelType[i].checked) {
            type = travelType[i].value;
            break;
        }
    }

    var origin = document.getElementById('OriginPoint').value;
    var destination = document.getElementById('destination-input').value;
    //var c = google.maps.Place(document.getElementById('origin-input').value);
    //var f = document.getElementById('destination-input').value;

    directionsService.route({
        origin: document.getElementById('OriginPoint').value,
        destination: document.getElementById('destination-input').value,
        waypoints: waypts,
        optimizeWaypoints: false,
        travelMode: type
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
}

