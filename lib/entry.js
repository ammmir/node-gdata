/**
* entry.js
* A GData Entry
*
* @author Amir Malik
*/

function Entry(entry) {
  this.entry = entry;

  if(entry)
    this._init();
}

Entry.prototype._init = function _init() {
  var self = this;
  var selfId;
  var subFeedId;
  var parentId;

  // type of entry
  this.entry['category'].forEach(function(category) {
    if('http://schemas.google.com/g/2005#kind' == category['scheme']) {
      self.kind_uri = category['term'];
    }
  });

  // parent folder
  this.entry['link'].forEach(function(link) {
    switch(link['rel']) {
      case 'self':
        selfId = link['href'];
        break;

      case 'http://schemas.google.com/g/2005#feed':
        subFeedId = link['href'];
        break;

      case 'http://schemas.google.com/docs/2007#parent':
        parentId = link['href'];
        break;
    }
  });

  if(subFeedId)
    this.feed_url = subFeedId;
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

Entry.prototype.getUpdateDate = function getUpdateDate() {
  return new Date(Date.parse(this.entry['updated']['$t']));
};

Entry.prototype.getId = function getId() {
  return this.entry['id']['$t'];
};

Entry.prototype.getFeedURL = function getFeedURL() {
  return this.feed_url;
};

Entry.prototype.getResourceId = function getResourceId() {
  return this.entry['gd$resourceId']['$t'];
};

Entry.prototype.getKind = function getKind() {
  return this.kind_uri;
};

exports.Entry = Entry;
