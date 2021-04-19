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
        weekday="星期日";
    }else if(ss==1){
        weekday="星期一";
    }else if(ss==2){
        weekday="星期二";
    }else if(ss==3){
        weekday="星期三";
    }else if(ss==4){
        weekday="星期四";
    }else if(ss ==5){
        weekday="星期五";
    }else if(ss==6){
        weekday="星期六";
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

function animate(element, target_right, target_top) {
    //清理定时器
    clearInterval(element.timeId);
    element.timeId = setInterval(function () {
      //获取元素的当前位置
      var current_right = element.offsetLeft;
      var current_top = element.offsetTop;
      //移动的步数
      var step_right = (target_right-current_right)/10;
      var step_top = (target_top-current_top)/10;
      step = step>0?Math.ceil(step):Math.floor(step);
      current += step;
      element.style.right = current + "px";
      element.style.top = current + "px";
      if(current==target) {
        //清理定时器
        clearInterval(element.timeId);
      }
     
    }, 20);
  }

var time_block = document.getElementById('time_block')
time_block.onclick=function(){
    time_block.style.cssText = "float: right; margin-right: 5%; margin-top:5%;"

};
