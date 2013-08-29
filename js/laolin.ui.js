var laolin=laolin||{};

laolin.ui={};
laolin.ui.ajaxPage={};
laolin.ui.ajaxPage.pages={};
  

   
$(function(){

});   
  
  //在页面内弹出一条消息，依赖 noty
  // http://needim.github.io/noty/
  laolin.ui.showInfo=function(text,timeout,type,layout) { 
    if(undefined==timeout)timeout=5000;  
    if(undefined==type)type='information';  
    if(undefined==layout)layout='bottomCenter';
    var n = noty({text:text,timeout:timeout,type:type,layout:layout});
    return n;
  }
  
  
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
  //
  laolin.ui.ajaxPage.load=function(pageName, selector_load,callback){
    if(laolin.ui.ajaxPage.current==pageName)return;
    if(!laolin.ui.ajaxPage.pages[pageName]){
      
      cid='pageid-'+Date.now();
      tempcid=cid+'-temp';
      $('body').append('<div class="hidden" id="'+tempcid+'"/>');
      $("#"+tempcid).load(pageName   ,function(response, status){
        if('error'==status){
          //error
          $("#"+tempcid).remove();
          //setTimeout(function(){laolin.ui.ajaxPage.load(pageName);},500);//try again
        }else{
          $(laolin.ui.ajaxPage.container).append( 
            $(selector_load,$("#"+tempcid)).attr('id',cid)
          );
          $("#"+tempcid).remove();
          laolin.ui.ajaxPage.pages[pageName]=cid;
          laolin.ui.ajaxPage.load(pageName,0,callback);
        }
      });
    }else{
      window.scrollTo(0,0);
      laolin.ui.ajaxPage.current=pageName;
      $(laolin.ui.ajaxPage.container+' >').hide({duration:500,queue:true});
      $('#'+laolin.ui.ajaxPage.pages[pageName]).show({duration:500,queue:true});
      callback&&callback();
    }
  }       
  /**
    laolin.ui.ajaxPage 的初始化函数
    @param container : 给laolin.ui.ajaxPage. 的容器selector
  */  
  laolin.ui.ajaxPage.init=function(container){
    contain=$(container);
    if(contain.length==0){console.log('Err!aP-container');return;}
    cid='cont-'+Date.now();
    laolin.ui.ajaxPage.container='#'+cid;
    contain.attr('id',cid);//由于ajax加载后id可能会重复，所以换ID
  };
  