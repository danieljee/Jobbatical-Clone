

module.exports = {
  port: 3000,
  host: '127.0.0.1',
  sessionSecret: 'terces',
  facebook:{
    clientID: '111269712834023',
    clientSecret: '8eb5b2ac641972078ba23e7cc25fcf49',
    callbackURL: 'http://127.0.0.1:3000/oAuth/facebook/callback'
  },
  google:{
    clientID: '94983040871-jgl2vvgjs9mqgm2kl7pflu68k5rs43er.apps.googleusercontent.com',
    clientSecret: 'mx_RQS9lyWL5z-qL2lxLTxgy',
    callbackURL: 'http://127.0.0.1:3000/oAuth/google/callback'
  },
  get serverURL(){
    return `http://${this.host}:${this.port}`;
  },
};
