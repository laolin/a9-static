
laolin.app.wave={};
(function(){  
  cpage=$("#pages article");
  kid='pageid-'+Date.now();
  cpage.attr('id',kid);
  
  laolin.ui.ajaxPage.init('a[href^="?c=wave"]','href', "#pages article", "#pages");
  
  //�Ǽ�һ�µ�ǰҳ��
  laolin.ui.ajaxPage.pages[window.location.search]=kid;
  laolin.ui.ajaxPage.current=window.location.search;
})();