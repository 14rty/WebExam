let maketBuddy
let currentCom = 0;
window.onload = function () {
 
    maketBuddy = document.getElementById('companyItem-template').cloneNode(true);

    GetInformationAboutCom();

    addListenerFindBtn();

    pagination()

    document.getElementById('social').addEventListener('change', makeSocialDiscount);
    document.getElementById('xTwo').addEventListener('change', xTwoDiscount);

    let menuButt = document.querySelectorAll('.menuButt');
    menuButt.forEach(function (btn) {
        btn.addEventListener('click', setFunk)
    })
    
    document.getElementById('place').addEventListener('click', getToast);
    document.getElementById('closeToast').addEventListener('click', closeToast);
}

let data
let globSum = 0

function getToast() {
    let order = document.getElementById("myToast");
    order.style.display = 'block';
} 

function closeToast() {
    let order = document.getElementById("myToast");
    order.style.display = 'none';
}

function xTwo(btn) {
    if(btn != undefined ){
        btn.innerHTML = Number(btn.innerHTML)*2
    }
    

}

function dTwo(btn) {
    if(btn != undefined ){
        btn.innerHTML = Number(btn.innerHTML)/2
    }
   
    

}

function xTwoDiscount() {
    let summary = document.getElementById('summary');
    box = document.getElementById('xTwo')
    let pole = document.querySelectorAll('.pole');
    socialka = document.getElementById('social')
    if(box.checked){
        pole.forEach(function (btn) {
            xTwo(btn)
        })  
        if(socialka.checked){
            globSum =  globSum * (100 -currentCom["socialDiscount"]) /100
        }
        globSum = Number(Number(globSum)*1.6)
    }
    else{
        pole.forEach(function (btn) {
            dTwo(btn)
            
        })  
        if(socialka.checked){
            globSum =  globSum / (100 -currentCom["socialDiscount"]) *100
        }
        globSum = Number(Number(globSum) / 1.6)
    }
    summary.innerHTML = globSum;
}

function currentDiscount() {
    disc = 1
    if( document.getElementById('social').checked ){
        disc = ( (100 - currentCom["socialDiscount"]) / 100 )
    }
    return disc;
}

function setFunk(event) {
    let oper = event.target.innerHTML;
    let pole = event.target.closest('.menuButt').querySelector('.pole');
    let price = Number(String(event.target.closest('.card-body').querySelector('.price').innerHTML).slice(0, -2));
    let summary = document.getElementById('summary');
    switch(oper){
        case '+':

                pole.innerHTML = Number(pole.innerHTML) + 1*xTwoChecher();

                summary.innerHTML = Number(summary.innerHTML) + price*currentDiscount() ;
                globSum = summary.innerHTML;
            break
        case '-':
           
                if (pole.innerHTML != 0 && pole.innerHTML != NaN){
                    pole.innerHTML = Number(pole.innerHTML) - 1*xTwoChecher();

                    if(document.getElementById('social').checked){
                        summary.innerHTML = Number(summary.innerHTML) - price*((100 - currentCom["socialDiscount"])/100) ;
                        globSum = summary.innerHTML;
                    }
                    else{
                        summary.innerHTML = Number(summary.innerHTML) - price ;
                        globSum = summary.innerHTML;
                    }
                   
                }
            break
    }
    if (pole.innerHTML == "0"){
        pole.innerHTML = "";
    }
    
}

function xTwoChecher() {
    box = document.getElementById('xTwo')
    if(box.checked){
        return 2
    }
    else{
        return 1
    }
}

function GetInformationAboutCom() {
    let url_add = "http://exam-2022-1-api.std-900.ist.mospolytech.ru/api/restaurants";
    let api_key = "b47b35cf-b327-43d6-9683-88e83dd06714";
    let url = new URL(url_add);
    url.searchParams.append("api_key", api_key);
    let xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.responseType = 'json';
    xhr.onload = function () {
        console.log(this.response);
        getFirstComs(this.response);
        getFilters(this.response);
        data = this.response

    }
    xhr.send();

    
}

function getFilters(restaurants) {
    let AUs = new Set();
    let districts = new Set();
    let types = new Set();

    for (let restaurant of restaurants) {
        AUs.add(restaurant.admArea);
        districts.add(restaurant.district);
        types.add(restaurant.typeObject);
    }

    renderAUs(AUs);
    renderDistricts(districts);
    renderTypes(types);
}

function renderAUs(AUs) { //AU - administrative unit
    let selector = document.querySelector("#select");
    for (let AU of AUs) {
        if (AU == null) continue;
        let option = document.createElement("option");
        option.innerHTML = AU;
        selector.appendChild(option);
    }
}
function renderDistricts(districts) {
    let selector = document.querySelector("#selec");
    for (let district of districts) {
        if (district == null) continue;
        let option = document.createElement("option");
        option.innerHTML = district;
        selector.appendChild(option);
    }
}
function renderTypes(types) {
    let selector = document.querySelector("#sele");
    for (let type of types) {
        if (type == null) continue;
        let option = document.createElement("option");
        option.innerHTML = type;
        selector.appendChild(option);
    }
}

function makeSocialDiscount() {
    let checkbox = document.getElementById('social');
    if(globSum != 0){
        if (checkbox.checked == true){
            
            if( currentCom["socialPrivileges"] == true){
                
                globSum = globSum *  (100 -currentCom["socialDiscount"]) / 100
            }
            else{
                
            }
        }
        else{
            if( currentCom["socialPrivileges"] == true){
                globSum = globSum / (100 -currentCom["socialDiscount"]) *100
            }
            else{
                document.getElementById('social').disabled;
            }
        }
    }
    document.getElementById('summary').innerHTML = globSum
}



function getFirstComs(array) {
    let companyList = document.querySelector('.company-list');
    let counter = 0
    sortByRate(array);
    while (counter < 10){
        
        counter = counter + 1
        companyList.append(createComBlock(array[counter]))
    }

}

function createComBlock(company) {
    let item = document.getElementById('companyItem-template').cloneNode(true);
    item.querySelector('.company-name').innerHTML = company['name'];
    item.querySelector('.company-type').innerHTML = company['typeObject'];
    item.querySelector('.company-address').innerHTML = company['address'];

    item.querySelector('.company-rating').innerHTML = "?????????????? " + company['rate']/20;
    item.setAttribute('id', company['id']);
    item.classList.remove('d-none');
    item.querySelector(".chooseButt").addEventListener('click', event => {createMenu(company['id'])} )
    item.classList.add("new");
    return item;

    
}

function createComBlockforFilter(company) {

    let item = maketBuddy.cloneNode(true);
    item.querySelector('.company-name').innerHTML = company['name'];
    item.querySelector('.company-type').innerHTML = company['typeObject'];
    item.querySelector('.company-address').innerHTML = company['address'];

    
    item.querySelector('.company-rating').innerHTML = "?????????????? " + company['rate']/20;
    item.setAttribute('id', company['id']);

    item.classList.remove('d-none');
    
    item.querySelector(".chooseButt").addEventListener('click', event => {createMenu(company['id'])} )
    item.classList.add("new"); //?????????? ?????? ???????????????????????? ???????????????? ?? ?????????????????????????? ????????????????
 
    return item;

    
}

let sortedByRateResponse 
function sortByRate(array) { 
    array.sort()
    array.sort(function (a, b) {
        if (a.rate /20 < b.rate / 20) {
          return 1;
        }
        if (a.rate / 20 > b.rate / 20) {
          return -1;
        }
        return 0;
      });
    sortedByRateResponse = array;
}

function createMenu(id){

    let menu = document.getElementById('gal');
    menu.style.display = 'block';
    appendPositions();
    if(currentCom["socialPrivileges"] == true){
        document.getElementById('social').disabled = false;
    }
    else{
        document.getElementById('social').disabled = true;
    }

    console.log(data);
    data.forEach(element => {
        if (element['id'] == id ){
            currentCom = element;
            document.getElementById('set-1').innerHTML = element['set_1'] + " ??";
            document.getElementById('set-2').innerHTML = element['set_2'] + " ??";
            document.getElementById('set-3').innerHTML = element['set_3'] + " ??";
            document.getElementById('set-4').innerHTML = element['set_4'] + " ??";
            document.getElementById('set-5').innerHTML = element['set_5'] + " ??";
            document.getElementById('set-6').innerHTML = element['set_6'] + " ??";
            document.getElementById('set-7').innerHTML = element['set_7'] + " ??";
            document.getElementById('set-8').innerHTML = element['set_8'] + " ??";
            document.getElementById('set-9').innerHTML = element['set_9'] + " ??";
            document.getElementById('set-10').innerHTML = element['set_10'] + " ??";
            

        } 
    }); 
    
}

function appendPositions() {
    let actualCard = document.querySelectorAll(".menuElem")
    let i = 0;

    actualCard.forEach(function (element) {

        let actualImg = menuInformation[i].image
        let actualName = menuInformation[i].name
        let actualDesc = menuInformation[i].desc

        let img = element.querySelector('.rounded');
        img.src = actualImg

        let menuTitle = element.querySelector('.card-title')
        menuTitle.innerHTML = actualName

        let menuDesc = element.querySelector('.card-desc-boy');
        menuDesc.innerHTML = actualDesc

        i += 1;
    })  
    
}

let menuInformation = [
    {
        'name': '?????????? "????????????"',
        'desc': '???????????????????????? ??????????',
        'image': 'pics/menuPic1Fixed.jpg'
    },
    {
        'name': '??????????????????',
        'desc': '???????????????????????? ????????????',
        'image': 'pics/menuPic2Fixed.jpg'
    },
    {
        'name': '?????????? ?? ??????????',
        'desc': '?????? ?? ????????????',
        'image': 'pics/menuPic3Fixed.jpg'
    },
    {
        'name': '???????????? ?? ????????????????',
        'desc': '?????????????????? ??????????????',
        'image': 'pics/menuPic4FIxed.jpg'
    },
    {
        'name': '?????????????? ????????',
        'desc': '???????????????????? ?? ???????????? ???????? ??????????????',
        'image': 'pics/menuPic5FIxed.jpg'
    },
    {
        'name': '???????????? ????????',
        'desc': '?????? ????????, ?????????? ???????????????????????? ???????????????????? ????????????',
        'image': 'pics/menuPic6FIxed.jpg'
    },
    {
        'name': '?????????? ????????',
        'desc': '???????????????????????? ???????????????????????? ???????????? ',
        'image': 'pics/menuPic7FIxed.jpg'
    },
    {
        'name': '???????????????? ????????',
        'desc': '????????????????, ????????????, ??????????',
        'image': 'pics/menuPic8FIxed.jpg'
    },
    {
        'name': '?????????????? ?? ????????',
        'desc': '?????? ?? ???????????? ??????????????',
        'image': 'pics/menuPic9FIxed.jpg'
    },
    {
        'name': '?????????????? ???? ??????????????',
        'desc': '??????????????',
        'image': 'pics/menuPic10Fixed.jpg'
    },
]

function addListenerFindBtn() {

    const divs = document.querySelectorAll('.poisk');
    divs.forEach(el => el.addEventListener('click', event => {
        var filter1 = document.getElementById("select");
        var area = filter1.options[filter1.selectedIndex].text;

        var filter2 = document.getElementById("selec");
        var district = filter2.options[filter2.selectedIndex].text;

        var filter3 = document.getElementById("sele");
        var type = filter3.options[filter3.selectedIndex].text;

        var filter4 = document.getElementById("sel");
        var discount = filter4.options[filter4.selectedIndex].text;

        sortArray(sortedByRateResponse, district, area, type, discount)
    }));
}

function getCurFilters(){
    var filter1 = document.getElementById("select");
    var area = filter1.options[filter1.selectedIndex].text;

    var filter2 = document.getElementById("selec");
    var district = filter2.options[filter2.selectedIndex].text;

    var filter3 = document.getElementById("sele");
    var type = filter3.options[filter3.selectedIndex].text;

    var filter4 = document.getElementById("sel");
    var discount = filter4.options[filter4.selectedIndex].text;

    let mas = [district, area, type, discount]
    return mas
}

let paginationStart = 0
let paginationMax = 4
let paginationMin = 0
let current = 0
let currentElementsByFilters = 0
let previousPag

function pagination() {
    let pag1 = document.querySelector('.pag-butt-1');
    let pag2 = document.querySelector('.pag-butt-2');
    let pag3 = document.querySelector('.pag-butt-3');
    let pag4 = document.querySelector('.pag-butt-4');
    let pagPrevious = document.querySelector('.pag-butt-back');
    let pageNext = document.querySelector('.pag-butt-next');

    pagPrevious.addEventListener('click', event => {
        clickPreviousPag(current, getPrevPag())

    })
    pageNext.addEventListener('click', event => {
        clickNextPag(current, getNextPag())

    })

    pag1.addEventListener('click', event => {
        updatePaginationStart(paginationMin + 1)
        setVisualClickPag(pag1, previousPag)
        previousPag = pag1
        sortArray((current - 1) * 10, sortedByRateResponse, getCurFilters()[0], getCurFilters()[1], getCurFilters()[2], getCurFilters()[3])

    })
    pag2.addEventListener('click', event => {
        updatePaginationStart(paginationMin + 2)
        setVisualClickPag(pag2, previousPag)
        previousPag = pag2
        sortArray((current - 1) * 10, sortedByRateResponse, getCurFilters()[0], getCurFilters()[1], getCurFilters()[2], getCurFilters()[3])

    })
    pag3.addEventListener('click', event => {
        updatePaginationStart(paginationMin + 3)
        setVisualClickPag(pag3, previousPag)
        previousPag = pag3
        sortArray((current - 1) * 10, sortedByRateResponse, getCurFilters()[0], getCurFilters()[1], getCurFilters()[2], getCurFilters()[3])

    })
    pag4.addEventListener('click', event => {
        updatePaginationStart(paginationMin + 4)
        setVisualClickPag(pag4, previousPag)
        previousPag = pag4
        sortArray((current - 1) * 10, sortedByRateResponse, getCurFilters()[0], getCurFilters()[1], getCurFilters()[2], getCurFilters()[3])

    })
}

function clickPreviousPag(cur, pag) {
  
    if (cur - 1 > 0) {
        if (cur - 1 <= paginationMin) {
            paginationMin -= 4
            paginationMax -= 4
            let pag1 = document.querySelector('.pag-butt-1');
            let pag2 = document.querySelector('.pag-butt-2');
            let pag3 = document.querySelector('.pag-butt-3');
            let pag4 = document.querySelector('.pag-butt-4');
            pag1.innerHTML = Number(pag1.innerHTML) - 4
            pag2.innerHTML = Number(pag2.innerHTML) - 4
            pag3.innerHTML = Number(pag3.innerHTML) - 4
            pag4.innerHTML = Number(pag4.innerHTML) - 4
        }
        pag.click()
    }
}

function df() {

}

function setVisualClickPag(curPag, prevPag) {

    if (prevPag != undefined){ 
        prevPag.style.backgroundColor = "white"
        prevPag.style.color = "black"
        curPag.style.backgroundColor = "#dc3545"}
        curPag.style.color = "white"


}

function clickNextPag(cur, pag) {

    if (Number(cur) >= Number(paginationMax)) {
        paginationMax += 4
        paginationMin += 4
        let pag1 = document.querySelector('.pag-butt-1');
        let pag2 = document.querySelector('.pag-butt-2');
        let pag3 = document.querySelector('.pag-butt-3');
        let pag4 = document.querySelector('.pag-butt-4');
        pag1.innerHTML = Number(pag1.innerHTML) + 4
        pag2.innerHTML = Number(pag2.innerHTML) + 4
        pag3.innerHTML = Number(pag3.innerHTML) + 4
        pag4.innerHTML = Number(pag4.innerHTML) + 4
    }
    pag.click()
}

function getPrevPag(cur) {

    let pag1 = document.querySelector('.pag-butt-1');
    let pag2 = document.querySelector('.pag-butt-2');
    let pag3 = document.querySelector('.pag-butt-3');
    let pag4 = document.querySelector('.pag-butt-4');
    if ((current - 2) % 4 == 0) return pag1
    if ((current - 2) % 4 == 1) return pag2
    if ((current - 2) % 4 == 2) return pag3
    if ((current - 2) % 4 == 3) return pag4
    return null

}

function getNextPag(cur) {

    let pag1 = document.querySelector('.pag-butt-1');
    let pag2 = document.querySelector('.pag-butt-2');
    let pag3 = document.querySelector('.pag-butt-3');
    let pag4 = document.querySelector('.pag-butt-4');
    if ((current) % 4 == 0) return pag1
    if ((current) % 4 == 1) return pag2
    if ((current) % 4 == 2) return pag3
    if ((current) % 4 == 3) return pag4
    return null

}

function updatePaginationStart(add) {

    current = add

    if (current < 0) {
        current = 0
    }
}

function sortArray(nonActiveCounter, array, district, area, type, discount) {

    let companyList = document.querySelector('.company-list');

    let activeCounter = 0// ?????? ?????????????? ?????????????????? ?????????????? ?????????????? ?????????????????????????? ????????????????????

    let counter = 0// ?????????? ???????????????? ?? ??????????????
    companyList.innerHTML = "";

    while (counter < array.length - 2) {
        counter = counter + 1
        let current = array[counter + 1]
        let point = 0

        if (district == "???? ??????????????") {
            point = point + 1
        } else {
            if (current['district'] == district) {
                point = point + 1
            }
        }
        if (area == "???? ??????????????") {
            point = point + 1
        } else {
            if (current['admArea'] == area) {
                point = point + 1
            }
        }
        if (type == "???? ??????????????") {
            point = point + 1
        } else {
            if (current['typeObject'] == type) {
                point = point + 1
            }
        }
        if (discount == "???? ??????????????") {
            point = point + 1
        } else {
            if (current['socialDiscount'] > 0) {
                point = point + 1
            }
        }
        if (point == 4) {
            if (nonActiveCounter == 0 && activeCounter < 10) {
                activeCounter = activeCounter + 1
                companyList.append(createComBlockforFilter(array[counter + 1]))
            } else {
                nonActiveCounter = nonActiveCounter - 1
            }
        }

    }
    currentElementsByFilters = activeCounter
}


