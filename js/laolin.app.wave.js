
laolin.app.wave={};
(function(){  
  cpage=$("#pages article");
  kid='pageid-'+Date.now();
  cpage.attr('id',kid);
  
  laolin.ui.ajaxPage.init( "#pages" );
  
  //�Ǽ�һ�µ�ǰҳ��
  laolin.ui.ajaxPage.pages[window.location.search]=kid;
  laolin.ui.ajaxPage.current=window.location.search;
  
  
  
  loadPage=function(page){
    laolin.ui.ajaxPage.loadingPage=page;
    $('.nav li').removeClass('active');
    $('.nav li a[href="'+page+'"]').parent().addClass('active');
    laolin.ui.ajaxPage.load(page,"#pages article");
    return false;
  };
  
  //1. logo���ĵ����ajax
  $('.navbar-brand').click(function(){ return loadPage('?c=wave'); });
  //2. ��navbar���ĵ����ajax
  $('.navbar').on('click','.nav li a[href^="?c=wave&"]',function(){ return loadPage($(this).attr('href')); });

  
})();