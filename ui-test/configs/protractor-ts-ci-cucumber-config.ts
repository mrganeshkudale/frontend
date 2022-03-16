import { Config } from 'protractor';
import { reporting } from "qcoe-fedex-ui-test-common";
import options from "../utils/cucumber.report.options";

const globalAny: any = global;

export const config: Config = {
  //Before performing any action, Protractor waits until there are no pending asynchronous tasks in your Angular application.
  //This means that all timeouts and http requests are finished.
    allScriptsTimeout: 120000,

    directConnect: true,
    chromeDriver: "/usr/bin/chromedriver",
    baseUrl: 'https://spring-petclinic-angular-development-qcoe-dev.tnt-001.tntnpk.az.fxei.fedex.com/',
    capabilities: {
        browserName: 'chrome',
        chromeOptions: {
            args: [
              'headless',
              'start-maximized',
              'no-sandbox']
        }
        // ,
        // shardTestFiles: true,  // required for parallel
        // maxInstances: 2,       // required for parallel - 2 browsers
    },

    framework: 'custom',
    frameworkPath: require.resolve("protractor-cucumber-framework"),
    specs: [
        '../../protractor-typescript-cucumber/features/*.feature'
    ],
    logLevel: 'INFO',

    cucumberOpts: {
        "compiler": 'ts:ts-node/register',
        "dry-run": false,
        "fail-fast": false,
        "reporter": 'cucumber-html-reporter',
        "format": ["json:./reports/cucumber_report.json"],
        "require": ["../protractor-typescript-cucumber/stepdefinitions/*.js"],
        "tags": ["@functional"],
    },

    onPrepare: () => {
      reporting.setupReporter(this);

      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const chai = require("chai").use(require("chai-as-promised"));
      globalAny.chai = chai;
    },
    onComplete: () => {
      reporting.generateReport(options);
    },
};
/*
====================================================================
For full list of Protractor config options,
see- https://github.com/angular/protractor/blob/master/lib/config.ts
====================================================================
**/
