const merge = require("deepmerge");
const path = require("path");

require("@babel/register");

const { config: baseConfig } = require("./../../e2e/configs/cucumber.conf");

const baseCapability = {
	"bstack:options": {
		debug: true,
		local: false,
		projectName: baseConfig.project || "Roamler",
		appiumVersion: "1.18.0",
		timezone: "Europe/Amsterdam",
		userName: process.env.BROWSER_STACK_USER,
		accessKey: process.env.BROWSER_STACK_PSW
	}
};

const capabilities = [
	{
		'bstack:options' : {
			"osVersion" : "10.0",
			"deviceName" : "Samsung Galaxy S20",
			"realMobile" : "true"
		},
		"browserName" : "Android"
	}
];

module.exports.config = merge(baseConfig, {
	user: process.env.BROWSER_STACK_USER,
	key: process.env.BROWSER_STACK_PSW,
	capabilities: baseConfig.filterCaps(capabilities.map(cap => merge(baseCapability, cap))),
	browserstackLocal: false,
	services: [
		[ "browserstack", {
			browserstackLocal: false,
			preferScenarioName: true,
			opts: {
				browserstackLocal: false,
				verbose: true,
				logFile: path.join(baseConfig._LOGS, "tunnel.log"),
				key: process.env.BROWSER_STACK_PSW
			}
		}]
	]
});
