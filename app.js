const req = require('request');
const CryptoJS = require('crypto-js');

try {
    config = require('./config');
} catch (ex) {
    console.log('Config not found. Remember to copy config.js.example and set variables. Exiting.');
    process.exit(1);
}

const tokenAPI = `${config.apiURL}/v1.0/token?grant_type=1`;
const acAPI = `${config.apiURL}/v1.0/infrareds/${config.remoteID}/ac/send-keys`;

const args = process.argv.slice(2);

if (args.length != 4) {
    console.log(`
        Usage: "node tuya.js 1 0 22 3"
        1) Power - 0: off, 1:on
        2) Mode - 0: cooling, 1: heating, 2: automatic, 3: air supply, 4: dehumidification
        3) Temperature - range 16-31
        4) Wind - 0: automatic, 1: low, 2: medium, 3: high
    `);
    process.exit(0);
}

// TODO: sanitize params

const setPower = args[0]; //example 1 (on)
const setMode = args[1]; // example 0 (cooling)
const setTemp = args[2]; // example 22 (temp)
const setWind = args[3]; // example 3 (max air)

const commandTemplate = `{
  "remote_id": "${config.acID}",
  "remote_index": "${config.remoteIndex}",
  "power": "${setPower}",
  "mode": "${setMode}",
  "temp": "${setTemp}",
  "wind": "${setWind}"
}`;

main();


function main() {
    var timestamp = getTime();
    var sign = calcSign(config.apiKey,config.apiSecret,timestamp);

    var headers = {
        'client_id': config.apiKey,
        'sign': sign,
        't': timestamp,
        'sign_method': 'HMAC-SHA256'
    };

    req.get({ url: tokenAPI, headers: headers }, function (e, r, body) {
        let data = JSON.parse(body);
        let token = data.result.access_token;
        setData(token);
    });
}

function setData(token) {

    var timestamp = getTime();
    var sign = calcSign2(config.apiKey,token,config.apiSecret,timestamp);

    var headers = {
        'client_id': config.apiKey,
        'access_token': token,
        'sign': sign,
        't': timestamp,
        'sign_method': 'HMAC-SHA256'
    };
    var data = commandTemplate;

    req.post({ url: acAPI, body:data, headers: headers }, function (e, r, body) {
        if (e) {
            console.log('Error:'+e.message);
            process.exit(1);
        }
        console.log('Ok');
        process.exit(0);
    });
}

function getTime(){
    var timestamp = new Date().getTime();
    return timestamp;
}

function calcSign(clientId,secret,timestamp){
    var str = clientId + timestamp;
    var hash = CryptoJS.HmacSHA256(str, secret);
    var hashInBase64 = hash.toString();
    var signUp = hashInBase64.toUpperCase();
    return signUp;
}

function calcSign2(clientId,access_token,secret,timestamp){
    var str = clientId + access_token + timestamp;
    var hash = CryptoJS.HmacSHA256(str, secret);
    var hashInBase64 = hash.toString();
    var signUp = hashInBase64.toUpperCase();
    return signUp;
}