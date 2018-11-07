function createElement(obj) {
    if(!obj.hasOwnProperty("name")){
        alert("Can't create an element.")
        return;
    }
    
    let element = document.createElement(obj.name);

    if(obj.hasOwnProperty("class")) {
        element.setAttribute("class", obj.class);
    }

    if(obj.hasOwnProperty("src")) {
        element.setAttribute("src", obj.src);
    }

    if(obj.hasOwnProperty("alt")) {
        element.setAttribute("alt", obj.alt);
    }

    if(obj.hasOwnProperty("style_bgColor")) {
        element.style.backgroundColor = obj.style_bgColor;
    }

    if(obj.hasOwnProperty("style_bgImage")) {
        element.style.backgroundImage = obj.style_bgImage;
    }

    if(obj.hasOwnProperty("order")) {
        element.setAttribute("order", obj.order);
    }

    if(obj.hasOwnProperty("value")) {
        element.setAttribute("value", obj.value);
    }

    if(obj.hasOwnProperty("scriptsrc")) {
        element.setAttribute("src", obj.scriptsrc);
    }
    return element;
}

function createHeader(baseConfig, dateFunctions){
    let header = createElement({name:"header", class:"relative"});
    let header_img = createElement({ name: "img", src: "img/index_up.png", class:"img header-image" });
    let logo = createElement({ name: "img", src: "img/logo.png", class:"logo-img absolute" });
    let info_logo = createElement({ name: "img", src: "img/info-logo.png", class:"info-logo absolute" });
    let flag_div = createElement({ name: "div", class: "absolute flag-pos" });
    var img_az = createElement({ name: "img", src: baseConfig.azeFlag, class:"azelang" });
    var img_ru = createElement({ name: "img", src: baseConfig.rusFlag, class:"ruslang" });
    var img_eng = createElement({ name: "img", src: baseConfig.engFlag, class:"englang" });

    //For each of time sections created span elements
    let clock = document.createElement("span");
    let date = document.createElement("span");
    let day = document.createElement("span");
    //Created div for keeping clock, date, day inside
    let date_div = createElement({name:"div", class:"date-div absolute" });
    
    date_div.appendChild(clock);
    date_div.appendChild(date);
    date_div.appendChild(day);
    
    flag_div.appendChild(img_az);
    flag_div.appendChild(img_ru);
    flag_div.appendChild(img_eng);

    img_az.addEventListener('click', function(){
        dateFunctions.show_clock();
        dateFunctions.show_date();
        dateFunctions.show_day();
        var bodyAz = document.getElementsByClassName("bodyText");
        for(let i = 0; i <= bodyAz.length; i++){
            bodyAz[i].innerHTML = baseConfig.bodyProviders[i].text;
        }
    });

    img_ru.addEventListener('click', function () { 
        localStorage.setItem("btn", "Удалить");
        localStorage.setItem("btnNext", "Вперед");
        localStorage.setItem("homeBtn", "Главная Страница");
        let date = new Date();
        let d = date.getDate();
        let monthsRu = ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"];
        document.getElementsByTagName("span")[1].innerHTML = d + " " + monthsRu[date.getMonth()] + "<br>";
        let daysRu = ["Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота", "Воскресенье"];
        document.getElementsByTagName("span")[2].innerHTML = daysRu[date.getDay()-1];
        if(date.getDay() == 0){
            document.getElementsByTagName("span")[2].innerHTML = "Воскресенье";
        };
        var bodyRu = document.getElementsByClassName("bodyText");
        for(let i = 0; i <= bodyRu.length; i++){
            bodyRu[i].innerHTML = baseConfig.bodyProviders[i].ruText;
        };
    });
        
    img_eng.addEventListener('click', function () {
        localStorage.setItem("btn", "Delete");
        localStorage.setItem("btnNext", "Next");
        localStorage.setItem("homeBtn", "Home");
        let date = new Date();
        let d = date.getDate();
        let monthsEng = ["january", "february", "march", "april", "may", "june", "july", "august", "september", "october", "november", "december"];
        document.getElementsByTagName("span")[1].innerHTML = d + " " + monthsEng[date.getMonth()] + "<br>";
        let daysEng = ["monday", "tuesday", "wednesday", "thursday", "friday","saturday", "sunday"];
        document.getElementsByTagName("span")[2].innerHTML = daysEng[date.getDay()-1];
        if(date.getDay() == 0){
            document.getElementsByTagName("span")[2].innerHTML = "sunday";
        }
        var bodyEng = document.getElementsByClassName("bodyText");
        for(let i = 0; i <= bodyEng.length; i++){
            bodyEng[i].innerHTML = baseConfig.bodyProviders[i].engText;
        }
    });
    localStorage.setItem("btn", "Sil");
    localStorage.setItem("btnNext", "İrəli");
    localStorage.setItem("homeBtn", "Ana Səhifə");
    header.appendChild(header_img);
    header.appendChild(logo);
    header.appendChild(info_logo);
    header.appendChild(flag_div);
    header.appendChild(date_div);

    document.body.appendChild(header);

    //Used methods of object dateFunctions located in "config" folder
    dateFunctions.show_clock();
    dateFunctions.show_date();
    dateFunctions.show_day();
}

function objectLength(obj){
    let count = 0;
    for(let f in obj){
        count++;
    }
    return count;
}

function createTopProviders(config){
    let divContainer = createElement({name:"div", class:"top-element-container"});

    let count = objectLength(config);
    let totalItemWidth = (100 / count) - 1.2;
    for(let topItem in config){
        let obj = config[topItem];

        var btn_div = createElement({name:"div", class:"top-img-container", style_bgColor : obj.bgColor, order : obj.order, scriptsrc:obj.scriptsrc});
        let btn_img = createElement({name:"img", src:obj.image, class:"btn-img"});
        let btnDivScript = createElement({name:"script", scriptsrc:obj.scriptsrc});

        btn_div.style.height = "150px";
        btn_div.style.width = totalItemWidth + "%" ;

        //btn_div.innerHTML = obj.name;

        divContainer.append(btn_div);
        btn_div.append(btn_img);

        //for dynamically ordering
        baseConfig.topProviders.sort(function(a,b){
            return a.order - b.order;
        })
        
        //changing location of file and generating script dynamically
        btn_div.addEventListener('click', function () {
            document.location.href = "provider.html";
            localStorage.setItem("src",btnDivScript.getAttribute("src"));
        });
    }
    document.body.append(divContainer);
}

function createBody(obj){
    var bodyContainer = createElement({name:"div", class:"bodyContainer"});
    var secondPage = createElement({name:"div", class:"secondPage"});
    for(let i = 0; i<18; i++){
        let bodyProvider = createElement({name:"div", class:"bodyProvider", style_bgColor:obj[i].bgColor});
        let bodyText = createElement({name:"p", class:"bodyText"});
        bodyText.innerHTML = obj[i].text;
        let bodyIcon = createElement({name:"i", class:obj[i].iconClass});
        bodyContainer.append(bodyProvider);
        bodyProvider.append(bodyIcon);
        bodyProvider.append(bodyText);
        document.body.append(bodyContainer);   

        //append all divs after 9 divs to other page.
        if(i>=9){
            bodyContainer.append(secondPage);
            secondPage.append(bodyProvider);
            }   
        }

        //for adding most important audio in the world.
        var second = document.querySelector(".secondPage div:nth-child(5)");
        second.addEventListener('click', function(){
            var audio = document.getElementById("audio");
            audio.play();
        });

        var utilities = document.querySelector(".bodyContainer div:first-child");
        utilities.addEventListener('click', function(){
            document.location.href = "inside.html";
        });

        var mobile = document.querySelector(".bodyContainer div:nth-child(2)");
        mobile.addEventListener('click', function(){
            document.location.href = "inside.html";
        });

        var internet = document.querySelector(".bodyContainer div:nth-child(6)");
        internet.addEventListener('click', function(){
            document.location.href = "inside.html";
        });
        
    let leftAd = createElement({name:"div", class:"leftAd", style_bgImage:baseConfig.ads[0].bgImage});
    let leftBtn = createElement({name:"div", class:"leftBtn"});
    let leftBtnIcon = createElement({name:"i", class:"btnIcon fas fa-angle-left"});
    let rightAd = createElement({name:"div", class:"rightAd", style_bgImage:baseConfig.ads[1].bgImage});
    let rightBtn = createElement({name:"div", class:"rightBtn"});
    let rightBtnIcon = createElement({name:"i", class:"btnIcon fas fa-angle-right"});

    leftBtn.addEventListener('click', function(){
        bodyContainer.style.transform = "translate(0,0)";
        bodyContainer.style.transition = "1s ease-in-out";
        leftBtn.style.display = "none";
        rightBtn.style.display = "inline-block";
        rightBtn.style.animation = "fadeIn 2s";
    });
    rightBtn.addEventListener('click', function(){
        bodyContainer.style.transform = "translate(-130%,0px)";
        bodyContainer.style.transition = "1s ease-in-out";
        secondPage.style.display = "inline-block";
        leftBtn.style.display = "inline-block";
        rightBtn.style.display = "none";
        leftBtn.style.animation = "fadeIn 2s";
    });
    document.body.append(leftAd);
    leftAd.append(leftBtn);
    leftBtn.append(leftBtnIcon);
    rightBtn.append(rightBtnIcon);
    document.body.append(rightAd);
    rightAd.append(rightBtn);
    
}