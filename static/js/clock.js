function showTime(){
    var date = new Date();//当前时间
    var month = zeroFill(date.getMonth() + 1);//月
    var day = zeroFill(date.getDate());//日
    var hour = zeroFill(date.getHours());//时
    var minute = zeroFill(date.getMinutes());//分
    var second = zeroFill(date.getSeconds());//秒

    var ss = date.getDay();
    var weekday = "/";
    if(ss==0){
        weekday="Sun.";
    }else if(ss==1){
        weekday="Mon.";
    }else if(ss==2){
        weekday="Tue.";
    }else if(ss==3){
        weekday="Wed.";
    }else if(ss==4){
        weekday="Thu.";
    }else if(ss ==5){
        weekday="Fri.";
    }else if(ss==6){
        weekday="Sat.";
    }


    var time = hour + ":" + minute +":" + second;
    var date_ = date.getFullYear() + "/" + month + "/" + day;

    document.getElementById("time").innerText=time;
    document.getElementById("date").innerText=date_;
    document.getElementById("weekday").innerText=weekday;
}

/**
 * 补零
 */
function zeroFill(i){
    if (i >= 0 && i <= 9) {
        return "0" + i;
    } else {
        return i;
    }
}

setInterval("showTime()",1000);
