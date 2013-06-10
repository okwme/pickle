function genericOnClick(info, tab) {
  console.log(info);
  console.log(tab);
    chrome.tabs.executeScript(null, {"code" : 'findall("'+info.selectionText+'");'}, function(result){
    	console.log("finished");
    });
}

// Create one test item for each context type.
var contexts = ["selection"];
for (var i = 0; i < contexts.length; i++) {
  var context = contexts[i];
  console.log(context);
  var title = "Pickle '%s'";
  var id = chrome.contextMenus.create({"title": title, "contexts":[context],
                                       "onclick": genericOnClick});
}