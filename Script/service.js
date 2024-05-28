var markers = []
//var overlays = []
var newMarker = null

// 검색 결과 목록이나 마커를 클릭했을 때 장소명을 표출할 인포윈도우를 생성합니다
var infowindow = new kakao.maps.CustomOverlay({zIndex:3})

var mapContainer = document.getElementById('map'); // 지도를 표시할 div 
var mapOption = { 
    center: new kakao.maps.LatLng(33.450701, 126.570667), // 지도의 중심좌표
    level: 3 // 지도의 확대 레벨
};
// 지도를 표시할 div와  지도 옵션으로  지도를 생성합니다
var map = new kakao.maps.Map(mapContainer, mapOption); 
// 지도 중심좌표 : map.getCenter() 

// 주소-좌표 변환 객체를 생성합니다
var geocoder = new kakao.maps.services.Geocoder();

var address = '대구광역시 북구 대학로 80'

// 주소로 좌표를 검색합니다
geocoder.addressSearch(address, function(result, status) {

    // 정상적으로 검색이 완료됐으면 
     if (status === kakao.maps.services.Status.OK) {

        var coords = new kakao.maps.LatLng(result[0].y, result[0].x);

        // 지도의 중심을 결과값으로 받은 위치로 이동시킵니다
        map.setCenter(coords);
    } 
});  

// 장소 검색 객체를 생성합니다
//var ps = new kakao.maps.services.Places();  

// 키워드로 장소를 검색합니다
//searchPlaces();

// 키워드 검색을 요청하는 함수입니다
function searchPlaces() {

    var keyword = document.getElementById('keyword').value;

    if (!keyword.replace(/^\s+|\s+$/g, '')) {
        alert('키워드를 입력해주세요!');
        return false;
    }

    // 장소검색 객체를 통해 키워드로 장소검색을 요청합니다
    //ps.keywordSearch(keyword, placesSearchCB); 

    // 모임 검색 함수를 만들어야 함.

    // 임시 group data
    data = [
        {
            x : 128.614322336303,
            y : 35.8890974884948,
            title : '그룹 1',
            info : '안녕하세요 첫 번째 그룹입니다.',
            road_address_name : '대구광역시 북구 대학로 80',
            address_name : '',
            link : 'http://127.0.0.1:3000/'
        }
    ]


    placesSearchCB(data, kakao.maps.services.Status.OK)
}

// 장소검색이 완료됐을 때 호출되는 콜백함수 입니다
function placesSearchCB(data, status) {
    if (status === kakao.maps.services.Status.OK) {

        // 정상적으로 검색이 완료됐으면
        // 검색 목록과 마커를 표출합니다
        displayPlaces(data);

        // 페이지 번호를 표출합니다
        //displayPagination(pagination);

    } else if (status === kakao.maps.services.Status.ZERO_RESULT) {

        alert('검색 결과가 존재하지 않습니다.');
        return;

    } else if (status === kakao.maps.services.Status.ERROR) {

        alert('검색 결과 중 오류가 발생했습니다.');
        return;

    }
}

// 검색 결과 목록과 마커를 표출하는 함수입니다
function displayPlaces(groups) {

    var searchList = document.getElementById('searchList')
    var sideBar = document.getElementById('sidebar')
    //var fragment = document.createDocumentFragment()
    var bounds = new kakao.maps.LatLngBounds()

    // 검색 결과 목록에 추가된 항목들을 제거합니다
    removeAllChildNods(searchList);

    // 지도에 표시되고 있는 마커를 제거합니다
    removeMarker();
    
    for (let i = 0; i < groups.length; i++) {

        // 마커를 생성하고 지도에 표시합니다
        var groupPosition = new kakao.maps.LatLng(groups[i].y, groups[i].x),
            marker = addMarker(groupPosition, i), 
            itemEl = getGroup(i, groups[i]); // 검색 결과 항목 Element를 생성합니다

        markers.push(marker);  // 배열에 생성된 마커를 추가합니다

        // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
        // LatLngBounds 객체에 좌표를 추가합니다
        bounds.extend(groupPosition);

        // 마커와 검색결과 항목에 mouseover 했을때
        // 해당 장소에 인포윈도우에 장소명을 표시합니다
        // mouseout 했을 때는 인포윈도우를 닫습니다
        (function(marker, itemEl, group) {
            kakao.maps.event.addListener(marker, 'click', function() {
                displayInfowindow(marker, itemEl, group);
            });

            kakao.maps.event.addListener(marker, 'rightclick', function() {
                infowindow.setMap(null);
            });

            itemEl.onclick =  function () {
                displayInfowindow(marker, itemEl, group);
            };

            itemEl.oncontextmenu = function () {
                infowindow.setMap(null);
                return false
            };
        })(marker, itemEl, groups[i]);

        //fragment.appendChild(itemEl);
        searchList.appendChild(itemEl);
    }

    // 검색결과 항목들을 검색결과 목록 Element에 추가합니다
    //listEl.appendChild(fragment);
    //menuEl.scrollTop = 0;
    sideBar.scrollTop = 0;
    // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
    map.setBounds(bounds);
}

function getGroup(index, group){

    var el = document.createElement('div')

    var itemStr =  `<img class="aspect:1/1 w:150 r:5 object:cover"
                        src="./media/user.png">
                
                    <div class="p:15 ml:10 width:296">
                        <div style="position: relative; display: flex; align-items: center;">
                            <div class="text:24 font:bold inline-block">${group.title}</div>

                            <a href="${group.link}" class="
                                bg:black/.2
                                bg:white/.15:hover:not(.active) ls:1
                                b:1;solid;white/.05 r:5.5
                                p:5.5 font:14 font:semibold
                                font:gray-40 font:white:is(.active,:hover)
                                " style="position: absolute; right:-10px;" >
                                    EXPLORE
                            </a>
                        </div>

                        <div class="text:14 font:gray-20 lines:3 mt:8 mb:10">
                                ${group.info}</div>
                        <div class="text:12 ls:1 mt:auto">🇰🇷 ${group.road_address_name ? group.road_address_name : group.address_name }</div>
                    </div>`

    el.className = "d:flex b:1;solid;white/.05 p:10 r:10 bg:black/.15"
    el.innerHTML = itemStr

    return el;
}

// 마커를 생성하고 지도 위에 마커를 표시하는 함수입니다
function addMarker(position, idx) {

    var imageSrc = './media/location-dot-solid.svg', // 마커이미지의 주소입니다    
        imageSize = new kakao.maps.Size(50, 55), // 마커이미지의 크기입니다
        imageOption = {offset: new kakao.maps.Point(25, 55)}; // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.

    var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imageOption); 

    var marker = new kakao.maps.Marker({
        position: position, // 마커의 위치
        image: markerImage 
    });

    marker.setMap(map); // 지도 위에 마커를 표출합니다

    return marker;
}

// 지도 위에 표시되고 있는 마커를 모두 제거합니다
function removeMarker() {
    for ( var i = 0; i < markers.length; i++ ) {
        markers[i].setMap(null);
    }   
    markers = [];
}

// 검색결과 목록 또는 마커를 클릭했을 때 호출되는 함수입니다
// 인포윈도우에 장소명을 표시합니다
function displayInfowindow(marker, itemEl, group) {

    var content =   `<div id="wrap" class="abs inset:0 h:fit m:auto font:white rel max-width:500 w:500 p:10 gap:10" style="z-index: 10">
                        <div class="d:flex r:10 bg:black/.3 p:10 b:1;solid;white/.1 bd:blur(30)">
                            <img class="aspect:1/1 w:150 r:5 object:cover"
                            src="./media/user.png">
                    
                            <div class="p:15 ml:10 width:296">
                                <div style="position: relative; display: flex; align-items: center;">
                                    <div class="text:24 font:bold inline-block">${group.title}</div>

                                    <a href="${group.link}" class="
                                        bg:black/.2
                                        bg:white/.15:hover:not(.active) ls:1
                                        b:1;solid;white/.05 r:5.5
                                        p:5.5 font:14 font:semibold
                                        font:gray-15 font:white:is(.active,:hover)
                                        " style="position: absolute; right:-10px;" >
                                            EXPLORE
                                    </a>
                                </div>

                                <div class="text:14 font:gray-5 lines:3 mt:8 mb:10">
                                        ${group.info}</div>
                                <div class="text:12 ls:1 mt:auto">🇰🇷 ${group.road_address_name ? group.road_address_name : group.address_name }</div>
                            </div>
                        </div>
                    </div>`
               
    infowindow.setContent(content);
    infowindow.setPosition(marker.getPosition())
    infowindow.setMap(map);
}

 // 검색결과 목록의 자식 Element를 제거하는 함수입니다
function removeAllChildNods(el) {   
    while (el.hasChildNodes()) {
        el.removeChild (el.lastChild);
    }
}

function getMarkers(){
    
}


// 지도에 클릭 이벤트를 등록합니다
// 지도를 클릭하면 마지막 파라미터로 넘어온 함수를 호출합니다
kakao.maps.event.addListener(map, 'rightclick', function(mouseEvent) {        
    
    // 클릭한 위도, 경도 정보를 가져옵니다 
    //var latlng = mouseEvent.latLng; 
    // 마커 위치를 클릭한 위치로 옮깁니다
    //marker.setPosition(latlng);

    //displayMarker(mouseEvent.latLng);
    if(newMarker != null){
        newMarker.setMap(null);
        newMarker = null
    }

    newMarker = addMarker(mouseEvent.latLng, -1)

    kakao.maps.event.addListener(newMarker, 'rightclick', function() {
        window.open('./createGroup.html', '_self')
        //displayInfowindow(marker, itemEl);
    });
});


/*
// 마커에 마우스오버 이벤트를 등록합니다
daum.maps.event.addListener(marker, 'mouseover', function() {
    map.setCursor('none');

    infowindow.position = marker.getPosition()

    // 마커에 마우스오버 이벤트가 발생하면 인포윈도우를 마커위에 표시합니다
    infowindow.open(map, marker);
});
*/
/*
// 마커에 마우스아웃 이벤트를 등록합니다
daum.maps.event.addListener(marker, 'mouseout', function() {
    // 마커에 마우스아웃 이벤트가 발생하면 인포윈도우를 제거합니다
    infowindow.close();
});
*/

// 지도 확대, 축소 컨트롤에서 확대 버튼을 누르면 호출되어 지도를 확대하는 함수입니다
function zoomIn() {
    map.setLevel(map.getLevel() - 1);
}

// 지도 확대, 축소 컨트롤에서 축소 버튼을 누르면 호출되어 지도를 확대하는 함수입니다
function zoomOut() {
    map.setLevel(map.getLevel() + 1);
}