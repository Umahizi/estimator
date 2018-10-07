const template = require("Templates/seriesListTemplate.mustache");
import notifier from 'Utils/notifier.js';

var instance = null;

class SeriesView {
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
        this.onSelected = notifier.createEvent('onSeriesSelected');
        this.selected = null;
    }


    applyTemplate(data)
    {
        instance._removeTemplate();
        instance.html = template({ series: data });
        $("#app").append(instance.html);
        $(".series_item").click(instance._onClick);
    }

    _removeTemplate()
    {
        $('#series_list').remove();
        $('#estimate').remove();
    }

    _onClick(e)
    {
        instance._toggleSelected(e.currentTarget);
        notifier.dispatchEvent(instance.onSelected);
    }

    _toggleSelected(newSelected)
    {
       if(instance.selected!=null) instance.selected.removeClass('selected');
       instance.selected = $(newSelected);

       instance.selected.addClass('selected');
    }
}

export default new SeriesView();