const reporter = require('cucumber-html-reporter');

const options = {
    theme: 'bootstrap',
    jsonFile: 'reports/cucumber_report.json', 
    output: 'reports/cucumber_report.html',   
    reportSuiteAsScenarios: true,
    scenarioTimestamp: true,
    launchReport: true, 
    metadata: {
        "App Version":"1.0.0",
        "Test Environment": "PROD",
        "Browser": "Chrome  Headless",
        "Platform": "Github Actions / Linux",
        "Parallel": "Scenarios",
        "Executed": "Remote"
    }
};

reporter.generate(options);