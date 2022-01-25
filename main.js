window.onload = function () {
    let findButt = document.querySelector('.poisk');
    findButt.addEventListener('click', GetInformationAboutCom); 
    // GetInformationAboutCom()
    let chooseButt = document.querySelector('.chooseButt');
    chooseButt.addEventListener('click', createMenu);
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
        sortComElements(this.response);
    }
    xhr.send();
}

function sortComElements(array) {
    let companyList = document.querySelector('.company-list');
    let counter = 0
    sortByRate(array);
    while (counter < 5){
        // for (let element of array) {
        //     companyList.append(createComBlock(element));
        // }
        counter = counter + 1
        companyList.append(createComBlock(array[counter]))
    }

}

function createComBlock(company) {
    let item = document.getElementById('companyItem-template').cloneNode(true);
    item.querySelector('.company-name').innerHTML = company['name'];
    item.querySelector('.company-type').innerHTML = company['typeObject'];
    item.querySelector('.company-address').innerHTML = company['address'];
    item.querySelector('.company-admArea').innerHTML = company['admArea'];
    item.querySelector('.company-district').innerHTML = company['district'];
    item.querySelector('.company-discount').innerHTML = company['socialDiscount'];
    item.querySelector('.company-rating').innerHTML = "Рейтинг " + company['rate']/20;
    item.setAttribute('id', company['id']);
    item.classList.remove('d-none');
    return item;
}

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
}
function createMenu(event){
    let id = event.target.closest(".list-group-item").id;
    alert(id);
}
let menu = [
    {
        "position" : "Салат Цезарь",
        "description" : "Классический салат",
        "image" : "pics/menuPic1FIxed.jpg"
    },
    {
        "position" : "Панакотта",
        "description" : "Классический десерт",
        "image" : "pics/menuPic2Fixed.jpg"
    },
    {
        "position" : "Паста с сыром",
        "description" : "Как в общаге",
        "image" : "pics/menuPic3FIxed.jpg"
    },
    {
        "position" : "Гренки с чесноком",
        "description" : "Идеальная закуска",
        "image" : "pics/menuPic4FIxed.jpg"
    },
    {
        "position" : "Светлое Пиво",
        "description" : "Освежающий в летний день напиток",
        "image" : "pics/menuPic5FIxed.jpg"
    },
    {
        "position" : "Темное Пиво",
        "description" : "Для того, чтобы проникнуться бесконечно вечным",
        "image" : "pics/menuPic6FIxed.jpg"
    },
    {
        "position" : "Живое Пиво",
        "description" : "Животворящий нектар Богов",
        "image" : "pics/menuPic7FIxed.jpg"
    },
    {
        "position" : "Ореховый микс",
        "description" : "Фисташки, фундук, кешью",
        "image" : "pics/menuPic8FIxed.jpg"
    },
    {
        "position" : "Котлета с пюре",
        "description" : "Как в родной деревне",
        "image" : "pics/menuPic9FIxed.jpg"
    },
    {
        "position" : "Нарезанные огурцы",
        "description" : "Сердито",
        "image" : "pics/menuPic10FIxed.jpg"
    }
]