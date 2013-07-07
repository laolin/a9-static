var laolin={};
$(function(){
  laolin.fn={};

  /// laolin.fn
  /// =========
  laolin.fn.init=function() {
    laolin.data={};//��һЩ�����ĵط�
    console.log('laolin.fn.init');
    return true;
  };
  
  /// ����underscore��template���ܣ���data��������ģ��tpl�������� to ��
  laolin.fn.template=function(to,tpl,data) {
    $(to).html( _.template($(tpl).html(),data));
  };
  
  /// ajax����url���ص�RESTful����
  /// ����underscore��template���ܣ��� ��������ģ��tpl�������� to ��
  laolin.fn.templateRest=function(to,tpl,url) {
    console.log(1);
    $.getJSON(url,function(data){
      
      laolin.fn.template(to,tpl,data);
    });
  };
  
  
  /// ����һ��url�����URL����js����ִ��֮�����ڿ���ajax
  /// �ο�baidu�Լ���վ�����ajax�ķ�����
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
  
  /// ��̬����һ��css
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
  /// ȡ��URL�е�?��Ĳ���
  /// �ο�http://stackoverflow.com/questions/901115/how-can-i-get-query-string-values
  laolin.fn.getParameterByName=function (name)
  {
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
  laolin.fn.init();
  
});