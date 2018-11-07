let obj = baseConfig.topProviders;

function createBody(e){
    let container = createElement({name: "div", class:"container"});
    let providerPicDiv = createElement({name: "div", class:"providerPicDiv"});
    let providerPic = createElement({name: "img", src:obj[0].image, class:"providerPic"});
    let providerInput = createElement({name: "input", class:"providerInput", value:" "});
    var providerDeleteButton = createElement({name: "button", class:"providerDeleteButton", value:"delete"});
    let home = createElement({name:"div", class:"home"});
    let homeIcon = createElement({name:"i", class:"fas fa-home"});
    let zeroButton = createElement({name:"button", class:"zeroButton", value:"0"});
    zeroButton.innerHTML = "0"; 
    zeroButton.addEventListener("click", function(){
        providerInput.value += zeroButton.value;
    });
    
    providerDeleteButton.innerHTML = localStorage.getItem("btn");
    home.innerHTML = localStorage.getItem("homeBtn");

    home.addEventListener('click', function(){
        document.location.href = "index.html";
    });

    providerDeleteButton.addEventListener("click", function(){
        providerInput.value = providerInput.value.slice(0,-1);
    });
    let buttonsContainer = createElement({name:"div", class:"buttonsContainer"})
    let row = createElement({name:"div", class:"row"});
    for(let i = 1; i<=9; i++){
        let buttons = createElement({name:"button", class:"btns", value:i});
        buttons.innerHTML = i;
        buttonsContainer.append(row); 
        row.append(buttons);
        buttons.addEventListener("click", function(){
            providerInput.value += buttons.value;
            if(providerInput.value.length == 11){
                var cont = createElement({name: "button", class:"continueButton", value:"continue"});
                cont.innerHTML = localStorage.getItem("btnNext");
                container.append(cont);
            }
        });
        //break after each 3 buttons
        let linebreak = createElement({name:"br"}); 
        if(i % 3 == 0){ 
            row.append(linebreak);
        };
    }
    providerPicDiv.append(providerPic);
    container.append(buttonsContainer);
    container.append(providerPicDiv);
    container.append(providerInput);
    container.append(providerDeleteButton);
    buttonsContainer.append(zeroButton);
    buttonsContainer.append(home);
    home.append(homeIcon);
    container.append(buttonsContainer);
    document.body.append(container);
}

createBody(baseConfig);