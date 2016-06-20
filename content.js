// Listen for messages
chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse) {
  var title_element = document.getElementsByClassName("js-issue-title")[0];
  var commit_title = title_element.innerHTML;
  var task_id = null;

  // try a regular expression to match
  var re1 = '((?:[a-z][a-z]+))';  // Word 1
  var re2 = '(.)';  // Any Single Character 1
  var re3 = '(\\d+)'; // Integer Number 1

  var p = new RegExp(re1+re2+re3,["i"]);
  var m = p.exec(commit_title);

  if (m != null) {
    var word1 = m[1];
    var c1 = m[2];
    var int1 = m[3];

    task_id = word1 + "-" + int1;
  } else {
    task_id = "ADMIN-8";
  }
  
  console.log("task_id: " + task_id);
  console.log("jira_url: " + jira_url);
  
  var jira_url = "https://jira2.icentris.com/jira/browse/";
  sendResponse(jira_url + task_id);
});