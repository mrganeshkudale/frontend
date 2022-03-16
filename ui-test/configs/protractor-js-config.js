const {reporting } = require('qcoe-fedex-ui-test-common');

const globalAny = global;

exports.config = {

  //Before performing any action, Protractor waits until there are no pending asynchronous tasks in your Angular application.
  //This means that all timeouts and http requests are finished.
  allScriptsTimeout: 120000,

  seleniumAddress: 'http://localhost:4444/wd/hub',
  //directConnect: true,
  baseUrl: 'https://spring-petclinic-angular-development-qcoe-dev.tnt-001.tntnpk.az.fxei.fedex.com/',
  capabilities: {
      browserName: 'chrome',
      chromeOptions: {
        args: [
                'start-maximized',
                'no-sandbox'
              ]
      },
      shardTestFiles: true,  // required for parallel
      maxInstances: 2,       // required for parallel -2
  },
  framework: 'mocha',
  specs: [
      '../protractor-javascript/specs/*spec.js'
  ],
  logLevel: 'INFO',
  mochaOpts: {
      bail: false,
      colors: true,
      compilers: 'ts:ts-node/register',
      reporter: 'mochawesome',
      reporterOptions: {
        reportDir: 'reports',
        overwrite: false,
        charts: true,
        Json: true,
        html: false,
        timestamp: true
      },
      timeout: 60000 // mocha test timeout
  },

  onPrepare: () => {
    require("babel-register"); // The following babel require statements are required for translation
    require("babel-polyfill"); // of typescript imports at runtime

    reporting.setupReporter(this);

    const chai = require("chai").use(require("chai-as-promised"));
    globalAny.chai = chai;
  },

};
/*
====================================================================
For full list of Protractor config options,
see- https://github.com/angular/protractor/blob/master/lib/config.ts
====================================================================
**/
