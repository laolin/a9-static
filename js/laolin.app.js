$(function(){
});

laolin.app=laolin.app||{};

laolin.app.fn={};
laolin.app.fn.oldIE=function(){
  laolin.wait.js([laolin.data.staticpath+"/js/forie/html5shiv.js",
    laolin.data.staticpath+"/js/forie/respond.min.js"]);
  laolin.wait.ready(function(){
    if(laolin.data.IE7){
      laolin.ui.showInfo(
        '亲，您的IE版本太低了！（最好要IE9及以上，'+
        'IE8勉强能用。或者换新的Chrome吧。）',99000,'error');
    } else {
      if(!$.cookie('ie8-told'))
        laolin.ui.showInfo('亲，您的IE版本比较低啊(ie8)。',9000,'warning');
      $.cookie('ie8-told',1,{ expires: 365 });
    }
  });
};

laolin.app.fn.getInputValue=function(name,min,max,def){
  vvv=+$('input[name='+name+']').attr('value');
  if(vvv<min||vvv>max){
    vvv=def;
  }
  $('input[name='+name+']').attr('value',vvv);
  return vvv;
}
