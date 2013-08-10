var laolin=laolin||{};
$(function(){
  laolin.ui={};
  
  laolin.ui.init=function() {
    console.log('laolin.ui.init');
    return true;
  };
  
  //��ҳ���ڵ���һ����Ϣ������ noty
  // http://needim.github.io/noty/
  laolin.ui.showInfo=function(text,timeout,type,layout) { 
    if(undefined==timeout)timeout=5000;  
    if(undefined==type)type='information';  
    if(undefined==layout)layout='bottomCenter';
    var n = noty({text:text,timeout:timeout,type:type,layout:layout});
    return n;
  }  
  /// ����underscore��template���ܣ���data��������ģ��tpl�������� to ��
  laolin.ui.template=function(to,tpl,data) {
    $(to).html( _.template($(tpl).html(),data));
  };
  
  /// ajax����url���ص�RESTful����
  /// ����underscore��template���ܣ��� ��������ģ��tpl�������� to ��
  laolin.ui.templateRest=function(to,tpl,url) {
    console.log(1);
    $.getJSON(url,function(data){
      
      laolin.ui.template(to,tpl,data);
    });
  };
  
  
  /// ȡ��URL�е�?��Ĳ���
  /// �ο�http://stackoverflow.com/questions/901115/how-can-i-get-query-string-values
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