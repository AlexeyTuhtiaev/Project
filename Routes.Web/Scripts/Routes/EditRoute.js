var map;
function init() {
    //get route's waypoints
    //получаю строку запроса
    var query = document.location.href;                  // Получение строки запроса.
    var hrefValues = query.split('=');                   // Разделение строки по амперсанду
    var routeId = hrefValues[hrefValues.length - 1];

    var url = Router.action('Route', 'GetWayPoints', { routeId: routeId });
    $.getJSON(url, function (data) {
        // Проходим по всем данным и формируем input
        $.each(data, function (i, item) {
            addExistingWaypoint(item, i);
        })
    });

    setTimeout(executeMap, 3500);
}


function executeMap() {
    var place = new google.maps.LatLng(53.903616, 27.555244);
    var directionsService = new google.maps.DirectionsService;
    var directionsDisplay = new google.maps.DirectionsRenderer;
    map = new google.maps.Map(document.getElementById('map-task'), {
        zoom: 6,
        center: place
    });
    directionsDisplay.setMap(map);

    document.getElementById('btnShowRoute').addEventListener('click', function () {
        calculateAndDisplayRoute(directionsService, directionsDisplay);
    });
    document.getElementById('btnAddWaypoints').addEventListener('click', function () {
        $("#submit").hide();
        addWaypoint();
    });

    document.getElementById('OriginPoint').addEventListener('input', function () {
        $("#submit").hide();
    });

    var radioTravelType = document.getElementsByName('TravelType');
    for (var i = 0; i < radioTravelType.length; i++) {

        radioTravelType[i].addEventListener('change', function () {
            $("#submit").hide();
        });
    }



    $("#submit").hide();

    new AutocompleteDirectionsHandler(map);

    calculateAndDisplayRoute(directionsService, directionsDisplay);
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

    k = wayPointsScope.childElementCount;

    var newWayPoint = document.createElement("div");

    var input = document.createElement("input");
    input.setAttribute('id', 'WayPoints' + k);
    input.setAttribute('name', 'WayPoints' + '[' + k + '].Point');
    input.setAttribute('class', 'controls WayPoints');
    input.setAttribute('type', 'text');
    input.setAttribute('placeholder', 'Введите промежуточную точку');
    newWayPoint.appendChild(input);

    var inputNumbering = document.createElement("input");
    inputNumbering.setAttribute('id', 'Numbering');
    inputNumbering.setAttribute('name', 'WayPoints' + '[' + k + '].Numbering');
    inputNumbering.setAttribute('type', 'hidden');
    inputNumbering.setAttribute('value', k);
    newWayPoint.appendChild(inputNumbering);

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


function addExistingWaypoint(waypoint, i) {

    var wayPointsScope = document.getElementById('wayPointsScope');
    var newWayPoint = document.createElement("div");

    var input = document.createElement("input");
    input.setAttribute('id', 'WayPoints' + i);
    input.setAttribute('name', 'WayPoints' + '[' + i + '].Point');
    input.setAttribute('class', 'controls WayPoints');
    input.setAttribute('type', 'text');
    input.setAttribute('placeholder', 'Введите промежуточную точку');
    input.value = waypoint.Point;
    newWayPoint.appendChild(input);

    var inputNumbering = document.createElement("input");
    inputNumbering.setAttribute('id', 'Numbering');
    inputNumbering.setAttribute('name', 'WayPoints' + '[' + k + '].Numbering');
    inputNumbering.setAttribute('type', 'hidden');
    inputNumbering.setAttribute('value', k);
    inputNumbering.setAttribute('class', 'Numbering');
    newWayPoint.appendChild(inputNumbering);

    var btnDelete = document.createElement('button');
    btnDelete.setAttribute('class', 'btn btn-danger btn-xs pull-right');
    btnDelete.setAttribute('id', 'btnDelete' + i);
    btnDelete.innerHTML = 'Удалить промежуточную точку';
    newWayPoint.appendChild(btnDelete);

    wayPointsScope.appendChild(newWayPoint);

    document.getElementById('btnDelete' + i).addEventListener('click', function () {
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


    setNames();

    $('#submit').hide();
}

function setNames() {
    var wayPointsScope = document.getElementById('wayPointsScope');
    var ch = wayPointsScope.children;

    var wayPoints = document.getElementsByClassName('WayPoints');
    var numbering = document.getElementsByClassName('Numbering');

    for (var i = 0; i < ch.length; i++) {
        wayPoints[i].setAttribute('id', 'WayPoints' + i);
        wayPoints[i].setAttribute('name', 'WayPoints' + '[' + i + '].Point');

        numbering[i].setAttribute('name', 'WayPoints' + '[' + i + '].Numbering');
        numbering[i].setAttribute('value', i);
    }
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
            $('#submit').show();
        } else {
            $("#submit").hide();
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

