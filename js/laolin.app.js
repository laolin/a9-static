$(function(){
      addr=window.location.search;//||'?a=lin&b=index';
      $('.navbar .nav a').click( function(){$(this).parent().addClass('active')}) .
        parent().removeClass('active');//ȫ���
      $('.navbar .nav a[href="'+addr+'"]').parent().addClass('active');//�뵱ǰURL���������
      $('.sidebar-nav .nav a[href="'+addr+'"]').parent().addClass('active');//�뵱ǰURL���������

  laolin.app=laolin.app||{};
});