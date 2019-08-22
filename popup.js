$(document).ready(function(){
    $(".urlbutton").click(function(){
        var project = $(".tfsProject").val();
        var currentYear = new Date().getFullYear()
        for(let i = 2015; i <= currentYear; i++) {
            let urlTfs = `http://so-prd-tfsapp1:8080/tfs/PROD${i}/${project}`
            fetch(urlTfs, {mode: 'cors',method: 'GET', redirect: 'follow', credentials: 'include'}).then((response) => {
                if(response.ok) {
                    chrome.tabs.query({currentWindow: true, active: true}, function (tab) {
                        chrome.tabs.update(tab.id, {url: urlTfs}, (tab) => {window.close();})
                    });
                }
            })
            .catch((error) => console.log(error))
        }
    });

  //allow update when enter is pressed
  $('input').keypress((e) => {
    if (e.which == 13) {
      $(".urlbutton").click();
      return false;
    }
  });    
});