
laolin.app.wave={};
(function(){  
  cpage=$("#pages article");
  kid='pageid-'+Date.now();
  cpage.attr('id',kid);
  
  laolin.ui.ajaxPage.init( "#pages" );
  
  //�Ǽ�һ�µ�ǰҳ��
  laolin.ui.ajaxPage.pages[window.location.search]=kid;
  laolin.ui.ajaxPage.current=window.location.search;
  
  
  
  laolin.app.wave.loadPage=function(page){
    laolin.ui.ajaxPage.loadingPage=page;
    laolin.ui.ajaxPage.load(page,"#pages article",function(){
      $('.nav li').removeClass('active');
      $('.nav li a[href="'+page+'"]').parent().addClass('active');
    });
    return false;
  };
  
  //1. logo���ĵ����ajax
  $('.navbar-brand').click(function(){ return laolin.app.wave.loadPage('?c=wave'); });
  //2. ��navbar���ĵ����ajax
  $('.navbar').on('click','.nav li a[href^="?c=wave&"]',function(){ return laolin.app.wave.loadPage($(this).attr('href')); });

  
})();