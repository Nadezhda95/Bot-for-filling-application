function api_connector () {
  let App_link = "https://script.google.com/macros/s/AKfycbxx7p65pCAuofobJsb4Os5sZuAuNICz9WbI-pAYgWDhDJGI6SEuzFXe3uIQvjMIPh0jXA/exec";
  UrlFetchApp.fetch("https://api.telegram.org/bot"+API+"/setWebHook?url="+App_link); 
}