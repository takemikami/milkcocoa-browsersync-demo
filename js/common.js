    $(function() {

// milkcocoaの初期化
var milkcocoa = new MilkCocoa("https://io-ei0ug6wkl.mlkcca.com");
var ds = milkcocoa.dataStore("message");

// message受信
ds.on("push", function(e) {
  if(e.value.type == 'url') {
    $('#urlview_iframe').attr('src', e.value.content);
  } else if(e.value.type == 'scroll') {
    $('body,html', $('#urlview_iframe').contents()).animate({scrollTop: e.value.content }, 'fast');
  }
});

// message送信(url)
$("#urlview1").click(function(){
    ds.push({ type: "url", content: 'http://takemikami.com/milkcocoa-browsersync-demo/neko/', date: new Date() }, function (e) {});
});
$("#urlview2").click(function(){
    ds.push({ type: "url", content: 'http://takemikami.com/milkcocoa-browsersync-demo/neko/introduce/', date: new Date() }, function (e) {});
});
$("#urlview3").click(function(){
    ds.push({ type: "url", content: 'http://takemikami.com/milkcocoa-browsersync-demo/neko/flow/', date: new Date() }, function (e) {});
});
$("#urlview4").click(function(){
    ds.push({ type: "url", content: 'http://takemikami.com/milkcocoa-browsersync-demo/neko/aboutShop/', date: new Date() }, function (e) {});
});
$("#urlview5").click(function(){
    ds.push({ type: "url", content: 'http://takemikami.com/milkcocoa-browsersync-demo/neko/inquiry/', date: new Date() }, function (e) {});
});

// message送信(scroll)
$('#scrollsync').click(function () {
  scrolly = $('#urlview_iframe').contents().scrollTop();
  ds.push({
      type: "scroll",
      content: scrolly,
      date: new Date()
  }, function (e) {});
});

chatpart.start({
    host : "https://io-ei0ug6wkl.mlkcca.com",
    datastore  : "chat"
});

	});
