const template = require("Templates/estimate.mustache");
import notifier from 'Utils/notifier.js';

var instance = null;

class EstimateView {
    constructor()
    {
        if(instance === null)
        {
            instance = this;
        }

        return instance;
    }

    applyTemplate(data)
    {
        instance._removeTemplate();
        var html = template({ portfolio_margin: data });
        console.log(data);
        $("#app").append(html);
    }

    _removeTemplate()
    {
        $('#estimate').remove();
    }

}

export default new EstimateView();