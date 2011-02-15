node-gdata
==========

A Google Data API client for node.js. Only the latest release (version 3)
of the GData protocol supported.

Requirements
------------

* [node-oauth](https://github.com/ciaranj/node-oauth)

Example (Picasa Web Albums)
---------------------------

    var GDClient = require('node-gdata').GDClient;
    var PICASA_ALBUMS_URL = 'https://picasaweb.google.com/data/feed/api/user/default';

    var google = new GDClient('consumer key', 'consumer secret');

    // call getAccessToken() to obtain, or setAccessToken() if you have one
    google.setAccessToken('token', 'token secret');

    google.get(PICASA_ALBUMS_URL, function(err, feed) {
      feed.getEntries().forEach(function(entry) {
        console.log('album: ' + entry.getTitle());
      });
    });
