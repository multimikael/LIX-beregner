function onOpen(e) {
  DocumentApp.getUi().createAddonMenu()
      .addItem('Start', 'getText')
      .addToUi();
}

function getText() {
  var doc = DocumentApp.getActiveDocument();
  var body = doc.getBody();
  var ui = DocumentApp.getUi();
  var paragraphs = body.getParagraphs();
  var tables = body.getTables();
  
  var text = "";
  paragraphs.forEach(function(par) {
    text += par.getText() + " ";
  });
  
  tables.forEach(function(table) {
    tableText = table.getText();
    tableText = tableText.split("\n").join("");
    text = text.replace(tableText, "");
  });
  
  ui.alert(text);
}
