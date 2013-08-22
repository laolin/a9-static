var laolin=laolin||{};

laolin.ui={};
laolin.ui.ajaxPage={};
laolin.ui.ajaxPage.pages={};
  
$(function(){
  
  addr=window.location.search;//
  $('.navbar-brand').click( function(){
    $('.navbar .nav li').removeClass('active');//ȫ���
    $('.sidebar-nav .nav li').removeClass('active')
  });
  $('.navbar .nav a').click( function(){
    $('.navbar .nav li').removeClass('active');//ȫ���
    $('.sidebar-nav .nav li').removeClass('active');
    $(this).parent().addClass('active');
    $('.sidebar-nav .nav a[href="'+$(this).attr('href')+'"]').parent().addClass('active');
  });
  $('.navbar .nav a[href="'+addr+'"]').parent().addClass('active');//�뵱ǰURL���������
  $('.sidebar-nav .nav a[href="'+addr+'"]').parent().addClass('active');//�뵱ǰURL���������


});
      
  
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
  //
  laolin.ui.ajaxPage.load=function(pageName, selector_find){
    if(laolin.ui.ajaxPage.current==pageName)return;
    if(!laolin.ui.ajaxPage.pages[pageName]){
      
      cid='pageid-'+Date.now();
      tempcid=cid+'-temp';
      $('body').append('<div class="hidden" id="'+tempcid+'"/>');
      $("#"+tempcid).load(pageName   ,function(response, status){
        if('error'==status){
          //error
          $("#"+tempcid).remove();
          setTimeout(function(){laolin.ui.ajaxPage.load(pageName);},500);//try again
        }else{
          laolin.ui.ajaxPage.pages[pageName]=cid;
          
          $(laolin.ui.ajaxPage.container).append('<div id="'+cid+'"/>');
          $("#"+cid).html($(selector_find,$("#"+tempcid)).html());
          $("#"+tempcid).remove();
          window.scrollTo(0,0);
          laolin.ui.ajaxPage.current=pageName;
          $(laolin.ui.ajaxPage.container+' >').hide('fast');
          $('#'+laolin.ui.ajaxPage.pages[pageName]).show('fast');
        }
      });
    }else{
      window.scrollTo(0,0);
      laolin.ui.ajaxPage.current=pageName;
      $(laolin.ui.ajaxPage.container+' >').hide('fast');
      $('#'+laolin.ui.ajaxPage.pages[pageName]).show('fast');
    }
  }       
  /**
    laolin.ui.ajaxPage �ĳ�ʼ������
    <div class='navbar'>
      <a href='?c=Controlle&a=Action1&b=para'>txt</a>
      <a href='?c=Controlle&a=Action2&b=para'>txt</a>
    </div>
    @param selector : ������click��selector�����磺 '.navbar  a'
    @param attr:������click��selector������ȷ��ҳ���������������'href'
    
    @param selector_find : ��laolin.ui.ajaxPage.load�õ�
    @param selector_container : ��laolin.ui.ajaxPage.load�õ�
  */  
  laolin.ui.ajaxPage.init=function(selector,attr,selector_find,selector_container){
    if('undefined'===typeof(attr))attr='href';
    contain=$(selector_container);
    if(contain.length==0){console.log('ajaxP init len=0');return;}
    cid='cont-'+Date.now();
    laolin.ui.ajaxPage.container='#'+cid;
    contain.attr('id',cid);//����ajax���غ�id���ܻ��ظ������Ի�ID
    $(selector).click(function(){
      page=$(this).attr(attr);
      //console.log('load page:'+page);
      laolin.ui.ajaxPage.load(page, selector_find);
      return false
    });
  };
  