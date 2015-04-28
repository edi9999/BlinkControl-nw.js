module.exports=function(items,show_color,b_console){
    var request = require('request');
    var key = "aee4332120003510"; //My key entered on ifttt
    var lastTime = new Date(0);

    itemShow = function(item) {
        if (e.name==item.event_name)
            show_color(item.color);
    };

    runRequest=function(){
        var i,b,eventDate;
        request('http://api.thingm.com/blink1/events/'+key, function (error, response, body) {
          if (!error && response.statusCode == 200) {
            b=JSON.parse(body);
            for(i=0;i<b.events.length;i++) {
                e=b.events[i];
                eventDate=new Date(parseInt(1000*e.date));
                if (eventDate>lastTime) {
                    console.log('trigger'+e.name);
                    items.forEach(itemShow);
                }
            }
            lastTime=new Date();
            setTimeout(runRequest,1000);
          }
        });
    };
    runRequest();
};
