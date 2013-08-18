$(function(){
      addr=window.location.search;//||'?a=lin&b=index';
      $('.navbar .nav a').click( function(){$(this).parent().addClass('active')}) .
        parent().removeClass('active');//全变灰
      $('.navbar .nav a[href="'+addr+'"]').parent().addClass('active');//与当前URL相符的亮显
      $('.sidebar-nav .nav a[href="'+addr+'"]').parent().addClass('active');//与当前URL相符的亮显

  laolin.app=laolin.app||{};
  
  laolin.app.fn={};
  laolin.app.fn.oldIE=function(){
    laolin.wait.js(["static/js/forie/html5shiv.js",
      "static/js/forie/respond.min.js"]);
    alert('亲，您的IE版本过低。');
  }  
});