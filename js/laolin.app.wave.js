
laolin.app.wave={};
(function(){  
  cpage=$("#pages article");
  kid='pageid-'+Date.now();
  cpage.attr('id',kid);
  
  laolin.ui.ajaxPage.init('a[href^="?c=wave"]','href', "#pages article", "#pages");
  
  //登记一下当前页：
  laolin.ui.ajaxPage.pages[window.location.search]=kid;
  laolin.ui.ajaxPage.current=window.location.search;
})();