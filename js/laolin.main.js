var laolin={};
$(function(){
  laolin.fn={};
  laolin.wait={}
  laolin.data={};//放一些变量的地方

  /// laolin.fn
  /// =========
  laolin.fn.init=function() {
    laolin.wait.list={};
    laolin.wait.callback=[];
    console.log('laolin.fn.init');
    return true;
  };
  
  /// 利用underscore的template功能，把data数据套用模板tpl，并放在 to 中
  laolin.fn.template=function(to,tpl,data) {
    $(to).html( _.template($(tpl).html(),data));
  };
  
  /// ajax调用url返回的RESTful数据
  /// 利用underscore的template功能，把 数据套用模板tpl，并放在 to 中
  laolin.fn.templateRest=function(to,tpl,url) {
    console.log(1);
    $.getJSON(url,function(data){
      
      laolin.fn.template(to,tpl,data);
    });
  };
  
  
  /// 调用一个url（这个URL返回js）并执行之，用于跨域ajax
  /// 参考baidu自己各站点跨域ajax的方法的
  laolin.fn.loadJs=function (id,url){
     oScript = document.getElementById(id);
     var head = document.getElementsByTagName("head").item(0);
     if (oScript) {
        head.removeChild(oScript);
     }
     oScript = document.createElement("script");
     oScript.setAttribute("src", url);
     oScript.setAttribute("id",id);
     oScript.setAttribute("type","text/javascript");
     oScript.setAttribute("language","javascript");
     head.appendChild(oScript);
     return oScript;
  }
  
  /// 动态加载一个css
  laolin.fn.loadCss=function (id,url){
    var cssTag = document.getElementById(id);
    var head = document.getElementsByTagName('head').item(0);
    if(cssTag) { 
      head.removeChild(cssTag);
    }
    css = document.createElement('link');
    css.setAttribute('href' ,url);
    css.setAttribute('rel' , 'stylesheet');
    css.setAttribute('type' , 'text/css');
    css.id = id;
    head.appendChild(css);
    return css;
  }
  /// 取得URL中的?后的参数
  /// 参考http://stackoverflow.com/questions/901115/how-can-i-get-query-string-values
  laolin.fn.getParameterByName=function (name) {
    name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
    var regexS = "[\\?&]" + name + "=([^&#]*)";
    var regex = new RegExp(regexS);
    var results = regex.exec(window.location.search);
    if(results == null)
      return "";
    else
      return decodeURIComponent(results[1].replace(/\+/g, " "));
  }
  
  laolin.wait.begin=function(a,callback) {
    laolin.wait.list[a]=callback;
  }
  laolin.wait.end=function(a) {
    callback=laolin.wait.list[a];
    delete laolin.wait.list[a];
    if(callback)callback();//本项完成
    
    //检查是不是所有项目都完成了：
    if(laolin.wait.isReady()) {
      for(f in laolin.wait.callback) {
        laolin.wait.callback[f]();
      }
      laolin.wait.callback=[];
    }
  }
  //加载filename文件
  //callback_or_eventname若是：
  //1,函数：完成后调用之
  //2,未定义：
  //3,其他情况callback_or_eventname转成字符串（作为消息名），触发一条消息
  laolin.wait.js=function(filename,callback_or_eventname) {
    laolin.wait.file('js',filename,callback_or_eventname);
  }
  laolin.wait.css=function(filename,callback_or_eventname) {
    laolin.wait.file('css',filename,callback_or_eventname);
  }
  laolin.wait.file=function(filetype,filename,callback_or_eventname) {
    if("function"==typeof(callback_or_eventname)){
      f=callback_or_eventname;
    } else if("undefined"==typeof(callback_or_eventname)){
      f=undefined;
    } else {
      f=function(){$(document).trigger(''+callback_or_eventname)};
    }
    laolin.wait.begin(filetype+filename,f);
    loader=laolin.fn.loadJs;//默认js
    if('css'==filetype) {
      loader=laolin.fn.loadCss;//css
    }
    loader('',filename).onload=function(){
      laolin.wait.end(filetype+filename);
    };
  }
  laolin.wait.isReady=function() {
    for(somethn in laolin.wait.list ){return false;}
    return true;
  }
  laolin.wait.ready=function(callback) {
    laolin.wait.callback.push(callback);
  }
  
  /// ========
  laolin.fn.init();
  
});