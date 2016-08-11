yaml = require('js-yaml');
fs   = require('fs');

function load(filename) {
  var data = fs.readFileSync(filename, 'utf8');

  var content;
  var i = data.indexOf("\n---\n\n");
  if (i > 0) {
    content = data.substring(i+5);
    data = data.substring(0, i);
  }

  var res;
  yaml.safeLoadAll(data, function (doc) {
    if (doc) res = doc;
  });

  res.content = content;
  return res;
}

function save(filename, doc, content) {
  var res = "---\n" + yaml.safeDump(doc) + "---\n";
  if (content) res += "\n" + content;
  fs.writeFileSync(filename, res);
}

var srcdir = './_ep';

var processRow = function (row) {
  var finalVal = '';
  for (var j = 0; j < row.length; j++) {
    var innerValue = row[j] === null ? '' : row[j].toString();
    if (row[j] instanceof Date) {
      innerValue = row[j].toLocaleString();
    };
    var result = innerValue.replace(/"/g, '""');
    if (result.search(/("|,|\n)/g) >= 0)
      result = '"' + result + '"';
    if (j > 0)
      finalVal += ',';
    finalVal += result;
  }
  return finalVal + '\n';
};


fs.readdirSync(srcdir).forEach(function(catfoldername) {
  var catdir = srcdir + '/' + catfoldername;
  if (fs.lstatSync(catdir).isDirectory()) {
    fs.readdirSync(catdir).forEach(function(filename) {
      if (filename.match(/\d\d\d\d-\d\d-\d\d-.*\.md/)) {
        var date = filename.substring(0, 10);
        var slug = filename.substring(11, filename.length - 3);

        var doc = load(catdir + '/' + filename);
        var url = 'http://club.nickvorobiov.com/listbuilder/' + slug + '/';
        var row = [
          url,
          (doc.title ? doc.title : ""),
          (doc.introtext ? doc.introtext : ""),
          (doc.gains ? doc.gains.join(', ') : "")];

        console.log(processRow(row));
      }
    })
  }
})