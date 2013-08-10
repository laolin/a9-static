var laolin=laolin||{};
$(function(){
  laolin.ui={};
  
  laolin.ui.init=function() {
    console.log('laolin.ui.init');
    return true;
  };
  
  //在页面内弹出一条消息，依赖 noty
  // http://needim.github.io/noty/
  laolin.ui.showInfo=function(text,timeout,type,layout) { 
    if(undefined==timeout)timeout=5000;  
    if(undefined==type)type='information';  
    if(undefined==layout)layout='bottomCenter';
    var n = noty({text:text,timeout:timeout,type:type,layout:layout});
    return n;
  }  
  /// 利用underscore的template功能，把data数据套用模板tpl，并放在 to 中
  laolin.ui.template=function(to,tpl,data) {
    $(to).html( _.template($(tpl).html(),data));
  };
  
  /// ajax调用url返回的RESTful数据
  /// 利用underscore的template功能，把 数据套用模板tpl，并放在 to 中
  laolin.ui.templateRest=function(to,tpl,url) {
    console.log(1);
    $.getJSON(url,function(data){
      
      laolin.ui.template(to,tpl,data);
    });
  };
  
  
  /// 取得URL中的?后的参数
  /// 参考http://stackoverflow.com/questions/901115/how-can-i-get-query-string-values
  laolin.ui.getParameterByName=function (name) {
    name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
    var regexS = "[\\?&]" + name + "=([^&#]*)";
    var regex = new RegExp(regexS);
    var results = regex.exec(window.location.search);
    if(results == null)
      return "";
    else
      return decodeURIComponent(results[1].replace(/\+/g, " "));
  }

  
  /// ========
  laolin.ui.init();
  
});