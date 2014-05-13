var NF = (function () {

    var

    /**
     * Validates HTML elements for accuracy and throws an error if fails.
     * @param  {Array|NodeList} elements  HTML elements to be validated. 
     * @param  {String} message  Error message that is thrown when validation fails. 
     */
    validate = function (elements, message) {
        if (!elements || !elements.length) {
            throw new Error(message || 'Elements must be defined properly.'); 
        } else {

            Array.prototype.forEach.call(elements, function (element, index) {
                if (
                    !(typeof HTMLElement === 'object'
                    ? element instanceof HTMLElement
                    : element && typeof element === 'object' && element !== null && element.nodeType === 1 && typeof element.nodeName === 'string')
                ) {
                    throw new Error(message || 'Element at index ' + index + ' is not a valid HTML element.'); 
                }
            });

        }
    },

    /**
     * Resizes specific elements to fit viewport height.
     * @param  {Array|NodeList} elements  Elements to be resized.
     */
    resize = function (elements) {
        
        var viewportHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);

        validate(elements);

        Array.prototype.forEach.call(elements, function (element, index) {
            element.style.height = viewportHeight + 'px';
        });

        return this;
    },

    /**
     * Applies specific class to elements when they appear on page. 
     * @param  {String} className  Class name to be applied to element
     * @param  {Object} elements   Elements to be transited on appear. 
     */
    appear = function (className, elements) {

        var viewportHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);

        validate(elements);

        document.addEventListener('scroll', handleScroll);

        function handleScroll(event) {

            Array.prototype.forEach.call(elements, function (element, index) {
                // is true when element appears on page
                var appeared = element.getBoundingClientRect().top - viewportHeight < 0; 

                if (appeared && !element.classList.contains(className)) {
                    element.classList.add(className);
                }
            });

        }

        return this;
    };

    return {
        resize: resize,
        appear: appear
    };
    
})();

NF.appear('appeared', document.querySelectorAll('.list-clients li:last-child'));