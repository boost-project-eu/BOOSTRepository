function closeAutorisationWindow (){
  var cnt = 20;
  var mywindow = null;
  var timeout = function(){
      var btn = document.getElementById("oauthPersonalizeButton");
      var wrapper = document.getElementById("oauthPersonalize");
      if(wrapper && wrapper.offsetParent !== null && btn && btn.onclick){
          var win = null;
          var openWindow = window.open;
          mywindow = window;
          window.open = function(){return win = openWindow.apply(window,arguments);};
          btn.onclick.call(btn);
          if(win){
              win.onload = function(){
                  win.document.getElementsByTagName("form")[0].submit();
                  setTimeout(function(){
                      window.location.reload();
                      if(win){
                          win.close();
                      }
                  },1000);
              };
          }
      } else {
          if(cnt > 0){
              cnt -= 1;
              setTimeout(timeout,200);
          }
      }
  };
  timeout();
}

onAjaxSuccess = function(data) {};

function logClick(elementName, userAction, widget, role, userUri, roleUri){
  $.post('http://beckmann.informatik.rwth-aachen.de:9080/save', {
    elementName: elementName,
    userAction: userAction,
    widget: widget,
    role: role,
    userUri: userUri,
    roleUri: roleUri.replace("#", "")
  }, onAjaxSuccess);
}

function syncLog(elementName, userAction, widget, role, userUri, roleUri, callback){
  var data = {
    elementName: elementName,
    userAction: userAction,
    widget: widget,
    role: role,
    userUri: userUri,
    roleUri: roleUri.replace("#", "")
  }
  $.ajax({
    type: "POST",
    url: "http://beckmann.informatik.rwth-aachen.de:9080/save",
    data: data,
    success: function(msg){
      callback();
    },
    error: function(XMLHttpRequest, textStatus, errorThrown) {
      console.log(XMLHttpRequest);
    }
  });
};