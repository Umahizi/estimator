const template = require("Templates/productListTemplate.mustache");
import notifier from 'Utils/notifier.js'
// import template from 'Templates/productListTemplate.mustache';
var instance = null;

class ProductView {
    constructor()
    {
        if(instance === null)
        {
            instance = this;
            this.init();
        }

        return instance;
    }

    init(){
        this.onSelected = notifier.createEvent('onSelected');
        this.selected = null;
    }

    applyTemplate(data)
    {
        var html = template({ products: data });
        $("#app").append(html);
        $(".product_item").click(instance._onClick);
    }

    _onClick(e)
    {
        instance._toggleSelected(e.target);
        notifier.dispatchEvent(instance.onSelected);
        
    }

    _toggleSelected(newSelected)
    {
       if(instance.selected!=null) instance.selected.removeClass('selected');
       instance.selected = $(newSelected);
       instance.selected.addClass('selected');
    }
}

export default new ProductView();