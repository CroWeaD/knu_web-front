var markers = []
var overlays = []

var mapContainer = document.getElementById('map'); // 지도를 표시할 div 
var mapOption = { 
    center: new kakao.maps.LatLng(33.450701, 126.570667), // 지도의 중심좌표
    level: 3 // 지도의 확대 레벨
};

// 지도를 표시할 div와  지도 옵션으로  지도를 생성합니다
var map = new kakao.maps.Map(mapContainer, mapOption); 
// 지도 중심좌표 : map.getCenter() 

var imageSrc = './media/location-dot-solid.svg', // 마커이미지의 주소입니다    
    imageSize = new kakao.maps.Size(50, 55), // 마커이미지의 크기입니다
    imageOption = {offset: new kakao.maps.Point(25, 55)}; // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.


    // 장소 검색 객체를 생성합니다
var ps = new kakao.maps.services.Places();  

// 키워드로 장소를 검색합니다
searchPlaces();

// 키워드 검색을 요청하는 함수입니다
function searchPlaces() {

    var keyword = document.getElementById('keyword').value;

    if (!keyword.replace(/^\s+|\s+$/g, '')) {
        alert('키워드를 입력해주세요!');
        return false;
    }

    // 장소검색 객체를 통해 키워드로 장소검색을 요청합니다
    ps.keywordSearch(keyword, placesSearchCB); 

    // 모임 검색 함수를 만들어야 함.
}

// 장소검색이 완료됐을 때 호출되는 콜백함수 입니다
function placesSearchCB(data, status, pagination) {
    if (status === kakao.maps.services.Status.OK) {

        // 정상적으로 검색이 완료됐으면
        // 검색 목록과 마커를 표출합니다
        displayPlaces(data);

        // 페이지 번호를 표출합니다
        displayPagination(pagination);

    } else if (status === kakao.maps.services.Status.ZERO_RESULT) {

        alert('검색 결과가 존재하지 않습니다.');
        return;

    } else if (status === kakao.maps.services.Status.ERROR) {

        alert('검색 결과 중 오류가 발생했습니다.');
        return;

    }
}

// 검색 결과 목록과 마커를 표출하는 함수입니다
function displayPlaces(places) {

    
    var listEl = document.getElementById('placesList'), 
    menuEl = document.getElementById('menu_wrap'),
    fragment = document.createDocumentFragment(), 
    bounds = new kakao.maps.LatLngBounds(), 
    listStr = '';
    
    var searchList = document.getElementById('searchList')
    var sideBar = document.getElementById('sidebar')
    var fragment = document.createDocumentFragment()
    var bounds = new kakao.maps.LatLngBounds()
    var listStr = ''

    // 검색 결과 목록에 추가된 항목들을 제거합니다
    removeAllChildNods(listEl);
    removeAllChildNods(searchList);

    // 지도에 표시되고 있는 마커를 제거합니다
    removeMarker();
    
    for ( var i=0; i<places.length; i++ ) {

        // 마커를 생성하고 지도에 표시합니다
        var placePosition = new kakao.maps.LatLng(places[i].y, places[i].x),
            marker = addMarker(placePosition, i), 
            itemEl = getListItem(i, places[i]); // 검색 결과 항목 Element를 생성합니다

        // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
        // LatLngBounds 객체에 좌표를 추가합니다
        bounds.extend(placePosition);

        // 마커와 검색결과 항목에 mouseover 했을때
        // 해당 장소에 인포윈도우에 장소명을 표시합니다
        // mouseout 했을 때는 인포윈도우를 닫습니다
        (function(marker, title) {
            kakao.maps.event.addListener(marker, 'mouseover', function() {
                displayInfowindow(marker, title);
            });

            kakao.maps.event.addListener(marker, 'mouseout', function() {
                infowindow.close();
            });

            itemEl.onmouseover =  function () {
                displayInfowindow(marker, title);
            };

            itemEl.onmouseout =  function () {
                infowindow.close();
            };
        })(marker, places[i].place_name);

        fragment.appendChild(itemEl);
    }

    // 검색결과 항목들을 검색결과 목록 Element에 추가합니다
    listEl.appendChild(fragment);
    menuEl.scrollTop = 0;

    // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
    map.setBounds(bounds);
}

// 마커를 생성하고 지도 위에 마커를 표시하는 함수입니다
function addMarker(position, idx, title) {
    var imageSrc = 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_number_blue.png', // 마커 이미지 url, 스프라이트 이미지를 씁니다
        imageSize = new kakao.maps.Size(36, 37),  // 마커 이미지의 크기
        imgOptions =  {
            spriteSize : new kakao.maps.Size(36, 691), // 스프라이트 이미지의 크기
            spriteOrigin : new kakao.maps.Point(0, (idx*46)+10), // 스프라이트 이미지 중 사용할 영역의 좌상단 좌표
            offset: new kakao.maps.Point(13, 37) // 마커 좌표에 일치시킬 이미지 내에서의 좌표
        },
        markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imgOptions),
            marker = new kakao.maps.Marker({
            position: position, // 마커의 위치
            image: markerImage 
        });

    marker.setMap(map); // 지도 위에 마커를 표출합니다
    markers.push(marker);  // 배열에 생성된 마커를 추가합니다

    return marker;
}

// 지도 위에 표시되고 있는 마커를 모두 제거합니다
function removeMarker() {
    for ( var i = 0; i < markers.length; i++ ) {
        markers[i].setMap(null);
    }   
    markers = [];
}

 // 검색결과 목록의 자식 Element를 제거하는 함수입니다
function removeAllChildNods(el) {   
    while (el.hasChildNodes()) {
        el.removeChild (el.lastChild);
    }
}

// 커스텀 오버레이에 표시할 컨텐츠 입니다
// 커스텀 오버레이는 아래와 같이 사용자가 자유롭게 컨텐츠를 구성하고 이벤트를 제어할 수 있기 때문에
// 별도의 이벤트 메소드를 제공하지 않습니다 
var content =   `<div id="wrap" class="abs inset:0 h:fit m:auto font:white rel d:flex flex:col max-width:500 w:500 p:10 gap:10" style="z-index: 10">
                    <div class="d:flex p:10 r:10 bg:black/.3 p:10 b:1;solid;white/.1 bd:blur(30)">
                        <img class="aspect:1/1 w:150 r:5 object:cover"
                                src="./media/user.png">
                        
                        <div class="p:15 ml:10">
                            <div style="position: relative; display: flex; align-items: center;">
                                <div class="text:24 font:bold inline-block">Group</div>

                                <!-- button -->
                                <button class="
                                    bg:black/.2
                                    bg:white/.15:hover:not(.active) ls:1
                                    b:1;solid;white/.05 r:5.5
                                    p:5.5 font:14 font:semibold
                                    font:gray-10 font:white:is(.active,:hover)
                                " style="position: absolute; right:-10px;" >
                                    EXPLORE
                                </button>
                            </div>

                            <div class="text:14 font:gray-10 lines:3 mt:8 mb:10" style="
                            white-space: normal;">
                                Group information. When it starts, what it does.
                            </div>
                            <div class="text:12 ls:1 mt:auto">🇰🇷 Location</div>
                        </div>
                    </div>
                </div>`

function getMarkers(){
    open('post', '/meetings/find/')
}

function makeOverlay(latlng){

    var overlay= new kakao.maps.CustomOverlay({
        content: content,
        map: null,
        position: latlng    
    });

    overlays.push(overlay)

    return overlay
}

function displayMarker(latlng){
    // 마커 이미지를 생성합니다    
    var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imageOption); 
        
    // 마커를 생성합니다
    var marker = new kakao.maps.Marker({
        map: map, // 마커를 표시할 지도
        position: latlng, // 마커를 표시할 위치
        //title : markers[i].title, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
        image : markerImage, // 마커 이미지 
    });

    // 마커 위에 커스텀오버레이를 표시합니다
    // 마커를 중심으로 커스텀 오버레이를 표시하기위해 CSS를 이용해 위치를 설정했습니다
    var customOverlay = makeOverlay(latlng)
 
    // 마커에 mouseover 이벤트와 mouseout 이벤트를 등록합니다
    // 이벤트 리스너로는 클로저를 만들어 등록합니다 
    // for문에서 클로저를 만들어 주지 않으면 마지막 마커에만 이벤트가 등록됩니다
    kakao.maps.event.addListener(marker, 'rightclick', function() {
        map.setCursor('none');
    
        customOverlay.setMap(null);
    });

    kakao.maps.event.addListener(marker, 'click', function() {
        map.setCursor('none');
    
        customOverlay.setMap(map);
    });

    markers.push(marker)

    marker.setMap(map);
}


// 지도에 클릭 이벤트를 등록합니다
// 지도를 클릭하면 마지막 파라미터로 넘어온 함수를 호출합니다
kakao.maps.event.addListener(map, 'rightclick', function(mouseEvent) {        
    
    // 클릭한 위도, 경도 정보를 가져옵니다 
    //var latlng = mouseEvent.latLng; 
    // 마커 위치를 클릭한 위치로 옮깁니다
    //marker.setPosition(latlng);

    displayMarker(mouseEvent.latLng);
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

/*
// 커스텀 오버레이를 닫기 위해 호출되는 함수입니다 
function closeOverlay() {
    for(let i = 0; i < overlays.length; i++){
        for(let j = 0; j < markers.length; j++){
            if(overlays[i].getPosition() === markers[j].getPosition()){
                overlays[i].setMap(null);
                overlays.splice(i, 1)
            }
        }
    }     
}*/

// 지도 확대, 축소 컨트롤에서 확대 버튼을 누르면 호출되어 지도를 확대하는 함수입니다
function zoomIn() {
    map.setLevel(map.getLevel() - 1);
}

// 지도 확대, 축소 컨트롤에서 축소 버튼을 누르면 호출되어 지도를 확대하는 함수입니다
function zoomOut() {
    map.setLevel(map.getLevel() + 1);
}
