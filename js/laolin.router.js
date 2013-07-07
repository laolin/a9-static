/***************************************
 * ����backbone ��router������ajax�ֲ�ˢ�£���������model,view��
 * �÷���
 *    1.  laolin.router.add("appname1",callback1); 
 *        laolin.router.add("appname2",callback1); �����ٸ�
 *
 *    2.  laolin.router.start();
 *
 *  ���ܣ� �ѵ��URL��ַ��Ӧ������JS���� 
 *     ��ҳ����href='#appname2/A/B/C/123'��URL�����JS����callback1(����ֵ="A/B/C/123")
 ***************************************/
var laolin =laolin||{};

$(function(){
  laolin.router=laolin.router||{};
  laolin.router._appRouters={};//��Backbone.Router.extend�õ�routers����
  laolin.router._appFunctions={};//��Backbone.Router.extend�õ���������

  laolin.router.add=function(appName,callback) {
    var funcName='__laolinapp_callback__'+appName; //��ʱ��ô����funcName ��ֻ���ڲ�ʹ��
    var routes={};
    var functions={};
    routes[appName]=funcName;//�� '#appName' URL��ַ��funcName()������ϵ����
    routes[appName+"/*item"]=funcName;//�� '#appName/***' URL��ַҲ��funcName()������ϵ����
    functions[funcName]=callback;
    _.extend(laolin.router._appRouters,routes);
    _.extend(laolin.router._appFunctions,functions);
  };
  laolin.router.start=function(){
    laolin.router._App=Backbone.Router.extend(_.extend(laolin.router._appFunctions,{'routes':laolin.router._appRouters}));
    laolin.router.app = new laolin.router._App();
    Backbone.history.start();
  };
});