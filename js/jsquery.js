let $ = JsQuery;

function JsQuery(selector) {

    let param = null;
    let element = null;

    this.select = function (selector) {

        param = selector.substring(1);

        if (selector[0] === ".") {
            element = document.getElementsByClassName(param);
        }
        else
            if (selector[0] === "#") {
                element = document.getElementById(param);
            }

        return new internalElement(element);
    };
    
    this.append = function (elem) {
        element.appendChild(elem);
    };
    function internalElement(element) {

        this.element = element;

        this.append = function (tag) {
            this.element[0].appendChild(tag);
        };
    }

    return this.select(selector);  
}