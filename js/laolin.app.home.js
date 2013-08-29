(function(){
  
  cpage=$("#main-box >");
  kid='pageid-'+Date.now();
  cpage.attr('id',kid);
  laolin.ui.ajaxPage.init("#main-box");
  
  //登记一下当前页：
  laolin.ui.ajaxPage.pages[window.location.search]=kid;
  laolin.ui.ajaxPage.current=window.location.search;
  
  loadPage=function(page){
    laolin.ui.ajaxPage.loadingPage=page;
    laolin.ui.ajaxPage.load(page,"#main-box >",function(){
      $('.nav li').removeClass('active');
      $('.nav li a[href="'+page+'"]').parent().addClass('active');
    });
    return false;
  };
  
  //1. logo处的点击改ajax
  $('.navbar-brand').click(function(){ return loadPage(''); });
  //2. 顶navbar处的点击改ajax
  $('.navbar').on('click','.nav li a[href^="?a=lin&"]',function(){ return loadPage($(this).attr('href')); });
  //3. side navbar处的点击改ajax
  $(laolin.ui.ajaxPage.container).on('click','.nav li a[href^="?a=lin&"]',function(){ return loadPage($(this).attr('href')); });

  
})();  
  laolin.app.home={};
  laolin.app.home.data={};
  
  laolin.app.home.firstPage=function(){
    laolin.ui.showInfo('欢迎光临 LaoLin.com');
    //为了方便，定义一些全局变量，哼哼
    d=window;//laolin.app.home.data;
    d.color_names=["blue","green","red","yellow","orange",
          "pink","purple","lime","magenta","teal",
          "white","black"];
    d.mat_color_indexes=[];
    d.mat_color_init=[];
    d.mat_obj=[];
    d.mat_color_can_edit=false;
    
    initMat();
    cc=getColorsFromCookie();
    if(cc.length==mat_color_init.length) {//数量一样多，就认定cookie的数据可用了
      setColors(cc);
      console.log('cookie colors:'+cc);
    } else {
      saveColorsToCookie();
    }
    
    $(".metbox").click(function () {
      if(!mat_color_can_edit)return;
      i=$(this).attr('mat_id');
      oldColor=getColor(i);
      ln=color_names.length;
      n=(oldColor+1)%ln;
      setColor(i,n);
      saveColorsToCookie();
      return true;
    });

  };//laolin.app.home.firstPage
  
  

  
  function initMat() {
    mat_obj=$(".metbox");
    mat_obj.each(function (index) {
      self1=$(this);
      c_index=0;
      $.each(color_names,function(index,colo) {//IE8不能用forEach,some,...
        if(self1.hasClass("metbox-"+colo)) {
          c_index=index;
          return false;
        }
      });
      mat_color_init[index]=c_index;
      mat_color_indexes[index]=c_index;
      self1.attr('mat_id',index);
    });
    $("body").bind("keyup", function(e) {
      switch(e.which) {
        case 67://C，打开/停止变色功能
          mat_color_can_edit=!mat_color_can_edit;
          laolin.ui.showInfo(mat_color_can_edit
              ?"c:调色开关开启【单击】改变颜色<br/>【i】还原原色调<br/>【r】随机色"
              :'c:调色开关（已关，再按一下c开启）');
          console.log('color edit '+mat_color_can_edit);
          break;
        case 73://I，还原原色调
          if(!mat_color_can_edit)break;
          setColors(mat_color_init);
          saveColorsToCookie();
          break;
        case 82://r，随机色
          if(!mat_color_can_edit)break;
          temp=[];
          $.each(mat_color_indexes,function(k,v){
              temp[k]=Math.floor((Math.random()*color_names.length));
            });
          setColors(temp);
          saveColorsToCookie();
          break;
      };
    });
  };
  
  function saveColorsToCookie() {
    $.cookie('mat_color_indexes',mat_color_indexes.join('_'),{ expires: 365 });
  }
  function getColorsFromCookie() {
    c=$.cookie('mat_color_indexes');
    return c ? c.split('_') : [];
  }
  
  
  function getColor(i){
    return mat_color_indexes[i];
  }
  function setColor(i,c){
    oldColor=mat_color_indexes[i];
    $(mat_obj.get(i)).removeClass("metbox-"+color_names[oldColor]);
    mat_color_indexes[i]=+c;
    $(mat_obj.get(i)).addClass("metbox-"+color_names[c]);
  }
  function setColors(cc) {
    $.each(cc,function(index,colo){
      setColor(index,colo);
    });
  };
  
  
  
