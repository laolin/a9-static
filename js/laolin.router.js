/***************************************
 * 利用backbone 的router，做非ajax局部刷新（不利用其model,view）
 * 用法：
 *    1.  laolin.router.add("appname1",callback1); 
 *        laolin.router.add("appname2",callback1); 随便多少个
 *
 *    2.  laolin.router.start();
 *
 *  功能： 把点击URL地址对应到运行JS函数 
 *     网页里点击href='#appname2/A/B/C/123'的URL会调用JS函数callback1(参数值="A/B/C/123")
 ***************************************/
var laolin =laolin||{};

$(function(){
  laolin.router=laolin.router||{};
  laolin.router._appRouters={};//给Backbone.Router.extend用的routers属性
  laolin.router._appFunctions={};//给Backbone.Router.extend用的其他属性

  laolin.router.add=function(appName,callback) {
    var funcName='__laolinapp_callback__'+appName; //暂时这么命名funcName ，只是内部使用
    var routes={};
    var functions={};
    routes[appName]=funcName;//把 '#appName' URL地址和funcName()函数联系起来
    routes[appName+"/*item"]=funcName;//把 '#appName/***' URL地址也和funcName()函数联系起来
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