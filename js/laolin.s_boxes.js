laolin=laolin||{};
laolin.s_boxes={};

laolin.s_boxes.append = function(to,it) {
  a=$('<a class="active-box" href="'+it['href']+'"></a>');
  a.css('background-image','url('+it['img']+")");
  a.css('background-color', it['bg']);
  a.append('<h3>'+it['h3']+'</h3>').
      append('<p>'+it['p']+'</p>');
  li=$('<li/>');
  li.append(a);
  $(to).append(li);
}

laolin.s_boxes.show_boxes = function (to,items,w,callbackMouseIn,callbackMouseOut) {

  if(w==200) {
    w=200;
  } else if(w==150) {
    w=150;
  } else { //100
    w=100;
  }
  box=$('<div class="s_boxes s_boxes-'+w+'" />');
  ul=$('<ul/>');
  for(var i=0,n=items.length;i<n;i++) {
    if(items[i]) {
      laolin.s_boxes.append(ul,items[i]);
    }
  }
  $(to).append(box.append(ul));
  
  $('.active-box').mouseenter( callbackMouseIn||function(e) {$(e.target).addClass('active-yes');} );
  $('.active-box').mouseleave( callbackMouseOut||function(e){$(e.target).removeClass('active-yes');} );
  //$('ul li',box).mouseenter( callbackMouseIn||function(){} );
  //$('ul li',box).mouseleave( callbackMouseOut||function(){} );
}