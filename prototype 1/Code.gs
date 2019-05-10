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
  paragraphs.forEach(function (par) {
    text += par.getText() + " ";
  });

  tables.forEach(function (table) {
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

  var lix = Math.round(A / B + (C * 100) / A)

  //Visning
  var style = '<style>p{font-family:"Google Sans",Roboto,RobotoDraft,Helvetica,Arial,sans-serif}</style>';
  var info = "";
  if (lix <= 24) {
    info = "24 og under: <b>Let, fx. børnebøger</b>";
  } else if (lix >= 25 && lix <= 34) {
    info = "25 til 34: <b>Mellem let- og middel, fx. ugebladslitteratur og skønlitteratur.</b>";
  } else if (lix >= 35 && lix <= 44) {
    info = "35 til 44: <b>Middel, fx. dagblade og tidsskrifter.</b>";
  } else if (lix >= 45 && lix <= 54) {
    info = "45 til 54: <b>Svær, fx. populærvidenskabelige værker, akademiske udgivelser og saglige bøger.</b>";
  } else if (lix >= 55) {
    info = "55 og over: <b>Meget svær, fx. faglitteratur på akademisk niveau, lovtekster.</b>";
  }
  var html = style
    + "<p>Dit LIX Tal: " + lix
    + "</p><p>" + info
    + "</p><p>Antal ord: " + A
    + "</p><p>Antal punktummer: " + B
    + "</p><p>Antal lange ord (over 6 bogstaver): " + C + "</p>";
  ui.showModelessDialog(HtmlService.createHtmlOutput(html), "LIX Tal");
}
