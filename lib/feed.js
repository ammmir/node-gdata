/**
* list.js
* A helper object that wraps a feed list
*
* @author Amir Malik
*/

var Entry = require('./entry').Entry;

function DocsList(feed) {
  this.feed = feed['feed'];
  this.entries = [];

  //require('fs').writeFileSync('/tmp/docs.json', JSON.stringify(this.feed));

  console.log(this.feed['title']['$t']);
  console.log('ETag: ' + this.feed['gd$etag']);
  console.log('updated: ' + this.feed['updated']['$t']);

  for(var i = 0; i < this.feed['entry'].length; i++) {
    this.entries.push(new Entry(this.feed['entry'][i]));
  }
}

DocsList.prototype.getEntries = function getEntries() {
  return this.entries;
};

exports.DocsList = DocsList;
