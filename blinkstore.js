var blinkstore = riot.observable();

blinkstore.baseItems = [
{
    color: '#FFFF00',
    event_name: 'mail'
},
{
    color: '#FF0000',
    event_name: 'tweet'
},
];

blinkstore.save = function(){
    localStorage.setItem('events',JSON.stringify(blinkstore.events));
};

blinkstore.load = function(){
    return JSON.parse(localStorage.getItem('events')) || blinkstore.baseItems;
};

blinkstore.on('change',function(){
    blinkstore.save();
    blinkstore.emit('update',blinkstore.events);
});

blinkstore.on('blink_init',function(){
    blinkstore.events = blinkstore.load();
    blinkstore.trigger('blinkevents_changed',blinkstore.events);
});

blinkstore.on('blink_add',function(){
    blinkstore.events.push({
        color: '#FFFF00',
        event_name: 'mail'
    });
    blinkstore.trigger('blinkevents_changed',blinkstore.events);
    blinkstore.save();
});

blinkstore.on('blink_change_color',function(blink,color){
    show_color(color);
    blink.color=color;
    blinkstore.trigger('blinkstore_changed',blinkstore.events);
    blinkstore.save();
});

blinkstore.on('blink_save_event_name',function(blink,event_name){
    blink.event_name=event_name;
    blinkstore.save();
});
