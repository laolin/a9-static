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
  
  /// ========
  laolin.ui.init();
  
});