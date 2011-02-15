/**
* feed.js
* A GData Feed
*
* @author Amir Malik
*/

var Entry = require('./entry').Entry;

function Feed(feed) {
  this.feed = feed['feed'];
  this.entries = [];

  try {
    this.last_update = new Date(Date.parse(this.feed['updated']['$t']));
  } catch(e) {
    throw new Error('feed must contain "updated" key');
  }

  for(var i = 0; i < this.feed['entry'].length; i++) {
    this.entries.push(new Entry(this.feed['entry'][i]));
  }
}

Feed.prototype.getUpdateDate = function getUpdateDate() {
  return this.last_update;
};

Feed.prototype.getEntries = function getEntries(i) {
  if(i)
    return this.entries[i];
  else
    return this.entries;
};

Feed.prototype.count = function count() {
  return this.entries.length;
};

exports.Feed = Feed;
