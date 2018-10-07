var instance = null;

class Notifier {
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
        this.events = [];
    }

    createEvent(evName)
    {
        var event = new Event(evName);
        instance.events.push(evName);
        return event;
    }

    addListener(event,callback)
    {
        // console.log(event.type,instance.events.indexOf(event.type)===-1);
        if(instance.events.indexOf(event.type)===-1)return;
        document.addEventListener(event.type,callback);
    }

    addOnce(event,callback)
    {
        // console.log(event,instance.events.indexOf(event.type)===-1);
        if(instance.events.indexOf(event.type)===-1)return;
        document.addEventListener(event.type,function()
        {
            // document.removeEventListener(event.type);
            callback();
        });
    }

    // removeListener(event){
    //     document.removeEventListener(event.type);
    // }

    dispatchEvent(event)
    {
        if(instance.events.indexOf(event.type)===-1)return;
        document.dispatchEvent(event);
    }
}

export default new Notifier();