/**
 * client.js
 * Google Documents List API client
 *
 * @author Amir Malik
 */

var querystring = require('querystring'),
    OAuth       = require('oauth').OAuth;

var DocsList = require('./list').DocsList;

var API_URL = 'https://docs.google.com/feeds';

var DocsClient = function(consumer_key, consumer_secret) {
  this.consumer_key = consumer_key;
  this.consumer_secret = consumer_secret;
  this.access_token = undefined;
  this.access_token_secret = undefined;
  this.oauth = new OAuth('https://www.google.com/accounts/OAuthGetRequestToken', 'https://www.google.com/accounts/OAuthGetAccessToken', consumer_key, consumer_secret, '1.0', null, 'HMAC-SHA1');
  this.oauth._headers['GData-Version'] = '3.0'; // HACK
};

DocsClient.prototype.getAccessToken = function(email, password, cb) {
  if(!email || !password)
    return cb(new Error('getAccessToken(email, password, cb) expected'));

  cb(new Error('TODO'));
};

DocsClient.prototype.getList = function getList(optargs, cb) {
  if(typeof optargs == 'function') cb = optargs, optargs = {};

  this.oauth.get(API_URL + '/default/private/full?showfolders=true&alt=json',
                 optargs.token || this.access_token,
                 optargs.secret || this.access_token_secret,
                 function(err, data, res) {
                   if(err) {
                     cb(err);
                   } else {
                     try {
                       cb(err, new DocsList(JSON.parse(data)));
                     } catch(e) {
                       cb(e);
                     }
                   }
                 });
};

DocsClient.prototype.getFile = function getFile(url, optargs, cb) {
  if(typeof optargs == 'function') cb = optargs, optargs = {};

  cb(new Error('TODO'));
};

exports.DocsClient = DocsClient;
