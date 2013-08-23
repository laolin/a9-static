
laolin.app.wave={};
(function(){  
  cpage=$("#pages article");
  kid='pageid-'+Date.now();
  cpage.attr('id',kid);
  
  laolin.ui.ajaxPage.init( "#pages" );
  
  //登记一下当前页：
  laolin.ui.ajaxPage.pages[window.location.search]=kid;
  laolin.ui.ajaxPage.current=window.location.search;
  
  
  
  laolin.app.wave.loadPage=function(page){
    laolin.ui.ajaxPage.loadingPage=page;
    $('.nav li').removeClass('active');
    $('.nav li a[href="'+page+'"]').parent().addClass('active');
    laolin.ui.ajaxPage.load(page,"#pages article");
    return false;
  };
  
  //1. logo处的点击改ajax
  $('.navbar-brand').click(function(){ return laolin.app.wave.loadPage('?c=wave'); });
  //2. 顶navbar处的点击改ajax
  $('.navbar').on('click','.nav li a[href^="?c=wave&"]',function(){ return laolin.app.wave.loadPage($(this).attr('href')); });

  
})();