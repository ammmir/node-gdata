/**
* list.js
* A helper object that wraps a feed list
*
* @author Amir Malik
*/

function DocsList(feed) {
  this.feed = feed['feed'];
  this.iterator = -1;
  
  //require('fs').writeFileSync('/tmp/docs.json', JSON.stringify(this.feed));
  
  console.log(this.feed['title']['$t']);
  console.log('ETag: ' + this.feed['gd$etag']);
  console.log('updated: ' + this.feed['updated']['$t']);
  
  this.length = this.feed['entry'].length;
  
  this.feed['entry'].forEach(function(entry) {
    var type, selfId, parentId;
    
    entry['category'].forEach(function(cat) {
      if('http://schemas.google.com/g/2005#kind' == cat['scheme']) {
        switch(cat['term']) {
          case 'http://schemas.google.com/docs/2007#folder':
            type = 'folder';
            break;
          case 'http://schemas.google.com/docs/2007#spreadsheet':
          case 'http://schemas.google.com/docs/2007#document':
          case 'http://schemas.google.com/docs/2007#presentation':
          default:
            type = 'file';
        }
      }
    });
    
    entry['link'].forEach(function(link) {
      switch(link['rel']) {
        case 'self':
          selfId = link['href'];
          break;
          
        case 'http://schemas.google.com/docs/2007#parent':
          parentId = link['href'];
          break;
      }
    });
    
    var etag = entry['gd$etag'];
    var id = entry['id']['$t'];
    var resid = entry['gd$resourceId']['$t'];
    var title = entry['title']['$t'];
    var published = new Date(Date.parse(entry['published']['$t']));
    var updated = new Date(Date.parse(entry['updated']['$t']));
    //var lastViewed = new Date(Date.parse(entry['gd$lastViewed']['$t']));

    console.log('  entry: ' + title + ' / ' + type);
    console.log('    updated: ' + updated);
  });
}

exports.DocsList = DocsList;
