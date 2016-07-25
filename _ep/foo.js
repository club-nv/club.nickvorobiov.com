yaml = require('js-yaml');
fs   = require('fs');

var o = {
  date: process.argv[2],
  slug: process.argv[3],
}

o.folder = '../episode/' + o.date + '-' + o.slug + '/';

function load(filename) {
  var data = fs.readFileSync(o.folder + filename, 'utf8');
  yaml.safeLoadAll(data, function (doc) {
    if (doc) {
      Object.keys(doc).forEach(function(key){
        o[key] = doc[key];
      })
    }
  });
}

load('enjoy.md');
load('listbuilder.md');

var filename = 'summary.md';
var path = o.folder + filename;

var content;
try {
  var data = fs.readFileSync(path, 'utf8');
  content = data.substring(data.indexOf("\n\n")+2);
} catch (e) {
}

var o2 = { title: o.title };

if (o.introtext) o2.introtext = o.introtext;
if (o.program) o2.program = o.program;
if (o.gains) o2.gains = o.gains;
if (o.stream) o2.stream = o.stream;
if (o.event) o2.event = o.event;

var res = "---\n" + yaml.safeDump(o2) + "---\n";

if (content) res += "\n" + content;

fs.writeFileSync('./' + o.date + '-' + o.slug + '.md', res);

