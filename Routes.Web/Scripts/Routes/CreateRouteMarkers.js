var map;

var allMarkers = [];
var markerCluster;
var markerIcon = 'http://maps.google.com/mapfiles/kml/pal4/icon46.png';

function init() {

    var place = new google.maps.LatLng(53.903616, 27.555244);
    var directionsService = new google.maps.DirectionsService;
    var directionsDisplay = new google.maps.DirectionsRenderer;
    map = new google.maps.Map(document.getElementById('map-task'), {
        zoom: 6,
        center: place
    });
    directionsDisplay.setMap(map);
    map.setOptions({ draggableCursor: 'crosshair' });

    map.addListener('click', function (e) {
        if (this != markerCluster)
            placeMarkerAndPanTo(e.latLng, map);
    });

    map.addListener('mouseover', function () {

    });

    //for choossing marker icon
    var icons = document.getElementsByClassName('marker-icon');
    for (var i = 0; i < icons.length; i++) {
        icons[i].addEventListener('click', function () {
            clearMarkerActive();
            this.classList.add('marker-icon-active');
            markerIcon = this.name;
        });
    }
    function clearMarkerActive() {
        for (var i = 0; i < icons.length; i++)
            icons[i].classList.remove('marker-icon-active');
    }



    allMarkers = [];

    //получаю строку запроса
    var query = document.location.href;    // Получение строки запроса.
    var hrefValues = query.split('/');                   // Разделение строки по амперсанду
    var routeId = hrefValues[hrefValues.length - 1];

    // Получаем данные
    var url = Router.action('Marker', 'GetMarkers', { id: routeId });
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
            var strRouteId = '' + routeId;
            var imgUrl = Router.action('Route', 'GetImage', { routeId: strRouteId, markerNumber: i + 1 });
            var infowindow = new google.maps.InfoWindow({
                content: "<div class='marker-infoWindow '><h5>" + item.Content +
                    "</h5><div class='imgwrapper'><img id='img-in-infoWindow' class='img-responsive' src=" + imgUrl + " alt='No Image \\' /></div></div>"
            });

            // обработчик нажатия на маркер объекта
            google.maps.event.addListener(marker, 'click', function () {
                infowindow.open(map, marker);
            });
            allMarkers.push(marker);
        })
        // Add a marker clusterer to manage the markers.
        //markerClusterer = new MarkerClusterer(map, allMarkers,
        //        { imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m' });
    });


}


var markerCount = 0;
function placeMarkerAndPanTo(latLng, map) {
    var marker = new google.maps.Marker({
        position: latLng,
        map: map,
        icon: markerIcon,
        animation: google.maps.Animation.DROP,
        draggable: true
    });
    map.panTo(latLng);



    //allMarkers.push(marker);

    //markerCluster = new MarkerClusterer(map, allMarkers,
    //            { imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m' });

    addMarkerHtml(marker);
}

function addMarkerHtml(currentMarker) {
    //panel-collapse collapse
    var accordionItem = document.getElementsByClassName('panel-collapse');

    for (var i = 0; i < accordionItem.length; i++) {
        accordionItem[i].setAttribute('class', 'panel-collapse collapse');
    }


    var panelDefault = document.getElementById('accordionScope');

    var panelHeading = document.createElement("div");
    panelHeading.setAttribute('class', 'panel-heading');
    panelHeading.setAttribute('role', 'tab');
    panelHeading.setAttribute('id', 'heading' + markerCount);

    var panelTitle = document.createElement("h4");
    panelTitle.setAttribute('class', 'panel-title');

    var aButton = document.createElement("a");
    aButton.setAttribute('role', 'button');
    aButton.setAttribute('data-toggle', 'collapse');
    aButton.setAttribute('data-parent', '#accordion');
    aButton.setAttribute('href', '#collapse' + markerCount);
    aButton.setAttribute('aria-expanded', 'true');
    aButton.setAttribute('aria-controls', 'collapse' + markerCount);
    aButton.setAttribute('id', 'head' + markerCount);
    var markerNumer = markerCount + 1;
    aButton.innerHTML = markerNumer + '. ';


    panelTitle.appendChild(aButton);
    panelHeading.appendChild(panelTitle);

    panelDefault.appendChild(panelHeading);//addind accordion head


    //accordion body 
    var panelCollapse = document.createElement("div");
    panelCollapse.setAttribute('id', 'collapse' + markerCount);
    panelCollapse.setAttribute('class', 'panel-collapse collapse in');
    panelCollapse.setAttribute('role', 'tabpanel');
    panelCollapse.setAttribute('aria-labelledby', 'heading' + markerCount);

    var panelBody = document.createElement("div");
    panelBody.setAttribute('class', 'panel-body');

    var rowName = document.createElement("div");        //title
    rowName.setAttribute('class', 'row');
    var h5Name = document.createElement("h5");
    h5Name.innerHTML = 'Введите название места:';
    var input = document.createElement("input");
    input.setAttribute('id', 'title' + markerCount);
    input.setAttribute('class', 'controls');
    input.setAttribute('type', 'text');
    input.maxLength = "25";
    input.addEventListener('input', function () {
        aButton.innerHTML = markerNumer + '. ' + input.value;
    });
    rowName.appendChild(h5Name);
    rowName.appendChild(input);

    var rowContent = document.createElement("div");        //Content
    rowContent.setAttribute('class', 'row');
    var h5Content = document.createElement("h5");
    h5Content.innerHTML = 'Введите описание места:';
    var inputContent = document.createElement("input");
    inputContent.setAttribute('id', 'content' + markerCount);
    inputContent.setAttribute('class', 'controls');
    inputContent.setAttribute('type', 'text');
    rowContent.appendChild(h5Content);
    rowContent.appendChild(inputContent);

    var rowLat = document.createElement("div");        //GeoLat
    rowLat.setAttribute('class', 'row');
    var h5Lat = document.createElement("h5");
    h5Lat.innerHTML = 'Lat:';
    var inputLat = document.createElement("input");
    inputLat.setAttribute('id', 'lat' + markerCount);
    inputLat.setAttribute('class', 'controls');
    inputLat.setAttribute('type', 'text');
    inputLat.value = currentMarker.getPosition().lat().toFixed(5);
    inputLat.disabled = true;
    rowLat.appendChild(h5Lat);
    rowLat.appendChild(inputLat);

    var rowLng = document.createElement("div");        //GeoLng
    rowLng.setAttribute('class', 'row');
    var h5Lng = document.createElement("h5");
    h5Lng.innerHTML = 'Lng:';
    var inputLng = document.createElement("input");
    inputLng.setAttribute('id', 'Lng' + markerCount);
    inputLng.setAttribute('class', 'controls');
    inputLng.setAttribute('type', 'text');
    inputLng.value = currentMarker.getPosition().lng().toFixed(5);
    inputLng.disabled = true;
    rowLng.appendChild(h5Lng);
    rowLng.appendChild(inputLng);

    panelBody.appendChild(rowName);
    panelBody.appendChild(rowContent);
    panelBody.appendChild(rowLat);
    panelBody.appendChild(rowLng);

    panelCollapse.appendChild(panelBody);

    panelDefault.appendChild(panelCollapse);//addind accordion body

    markerCount++;

    google.maps.event.addListener(currentMarker, 'dragend', function (evt) {
        inputLat.value = currentMarker.getPosition().lat().toFixed(5);
        inputLng.value = currentMarker.getPosition().lng().toFixed(5);
    });
}