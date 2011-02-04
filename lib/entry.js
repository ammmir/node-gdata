/**
* entry.js
* A helper object that wraps a feed entry
*
* @author Amir Malik
*/

function Entry(entry) {
  this.entry = entry;

  if(entry)
    this._init();
}

Entry.prototype._init = function _init() {
  var type = 0;
  var selfId;
  var parnetId;

  // type of file
  this.entry['category'].forEach(function(category) {
    if('http://schemas.google.com/g/2005#kind' == category['scheme']) {
      switch(category['term']) {
        case 'http://schemas.google.com/docs/2007#document':
          type = Entry.DOCUMENT;
          break;
        case 'http://schemas.google.com/docs/2007#spreadsheet':
          type = Entry.SPREADSHEET;
          break;
        case 'http://schemas.google.com/docs/2007#presentation':
          type = Entry.PRESENTATION;
          break;
        case 'http://schemas.google.com/docs/2007#folder':
          type = Entry.FOLDER;
          break;
        default:
          type = Entry.FILE;
      }
    }
  });

  // parent folder
  this.entry['link'].forEach(function(link) {
    switch(link['rel']) {
      case 'self':
        selfId = link['href'];
        break;

      case 'http://schemas.google.com/docs/2007#parent':
        parentId = link['href'];
        break;
    }
  });
};

Entry.prototype.getEtag = function getEtag() {
  return this.entry['gd$etag'];
};

Entry.prototype.getTitle = function getTitle() {
  return this.entry['title']['$t'];
};

Entry.prototype.getPublishedDate = function getPublishedDate() {
  return new Date(Date.parse(this.entry['published']['$t']));
};

Entry.prototype.getLastUpdatedDate = function getLastUpdatedDate() {
  return new Date(Date.parse(this.entry['updated']['$t']));
};

Entry.prototype.getId = function getId() {
  return this.entry['id']['$t'];
};

Entry.prototype.getResourceId = function getResourceId() {
  return this.entry['gd$resourceId']['$t'];
};

Entry.prototype.getType = function getType() {
  return this.type;
};

Entry.FILE = 1;
Entry.FOLDER = 2;
Entry.DOCUMENT = 4;
Entry.SPREADSHEET = 8;
Entry.PRESENTATION = 16;

exports.Entry = Entry;
