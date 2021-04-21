function getweather(){
    $.ajax({
        url: "/main_page/weather/",
        traditional: true,
        type: "POST",
        success: function(data){
            var obj = JSON.parse(data);
            //console.log(obj);
            $("#icon").attr("src", "/static/img/weather-icon-S1/bw-256/" + obj.icon + ".png");
            $("#text").html(obj.text);
            $('#temp').html(obj.temp);
            $('#feelsLike').html(obj.feelsLike);
            $('#wind').html(obj.windDir + " L" + obj.windScale);
            $('#humidity').html("Humidity: " + obj.humidity);
        },
        error: function(XMLHttpRequest, textStatus, errorThrown)
        {alert('error')}
    });
};

getweather();
setInterval("getweather()", 1800*1000);

