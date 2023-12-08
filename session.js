/* 
    Team Teal: Andrew Cook, Cheryl Moser, Petar Spasic
    Date: 2023-12-03
    AD320 Final Project
*/

const crypto = require('crypto');
const NodeCache = require( "node-cache" );
let secondsToCache = 60 * 15;
const sessions = new NodeCache( { stdTTL: secondsToCache, checkperiod: 30 } );

exports.createSession = function(username) {
    var sessionId = crypto.randomUUID();
    console.log('Session created ', 
        sessions.set(sessionId, username, secondsToCache));
    return sessionId;
}

exports.getSession = function(sessionId) {
    session = sessions.get(sessionId);
    if (session == undefined) {
        return null;
    }
    else {
        return session
    }
}
