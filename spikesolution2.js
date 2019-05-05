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
    
    //Lix Beregning
    var words = text.match(/\w+/g);
    var periods = text.match(/\./g);
    var lwords = text.match(/\w{6,}/g);
    
    var A = words.length;
    var B = periods.length;
    var C = lwords.length;
    
    var lix = Math.round(A/B+(C*100)/A)
    
    //visning
    ui.alert(lix);
  }
  