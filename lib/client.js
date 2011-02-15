/**
 * client.js
 * Google Data API client
 *
 * @author Amir Malik
 */

var querystring = require('querystring'),
    OAuth       = require('oauth').OAuth;

var Feed = require('./feed').Feed;

var GDClient = function(consumer_key, consumer_secret) {
  this.consumer_key = consumer_key;
  this.consumer_secret = consumer_secret;
  this.access_token = undefined;
  this.access_token_secret = undefined;
  this.oauth = new OAuth('https://www.google.com/accounts/OAuthGetRequestToken', 'https://www.google.com/accounts/OAuthGetAccessToken', consumer_key, consumer_secret, '1.0', null, 'HMAC-SHA1');
  this.oauth._headers['GData-Version'] = '2.0'; // HACK
};

GDClient.prototype.getAccessToken = function(email, password, cb) {
  if(!email || !password)
    return cb(new Error('getAccessToken(email, password, cb) expected'));

  cb(new Error('TODO'));
};

GDClient.prototype.setAccessToken = function setAccessToken(token, token_secret) {
  this.access_token = token;
  this.access_token_secret = token_secret;
};

GDClient.prototype.get = function get(url, optargs, cb) {
  if(typeof optargs == 'function') cb = optargs, optargs = {};

  // always request JSON output instead of XML
  // TODO: try adding header: Accept: application/json to force JSON
  if(url.lastIndexOf('alt=json') == -1) {
    if(url.lastIndexOf('?') > -1) {
      url += '&alt=json';
    } else {
      url += '?alt=json';
    }
  }

  this.oauth.get(url,
                 optargs.token || this.access_token,
                 optargs.secret || this.access_token_secret,
                 function(err, data, res) {
                   if(err) {
                     cb(err);
                   } else {
                     try {
                       cb(null, new Feed(JSON.parse(data)));
                     } catch(e) {
                       cb(e);
                     }
                   }
                 });
};

exports.GDClient = GDClient;
