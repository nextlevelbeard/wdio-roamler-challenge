const { config } = require("./cucumber.conf.js");
const merge = require("deepmerge");
const path = require("path");

module.exports.config = merge(config, {
	automationProtocol: "webdriver",
	capabilities: config.filterCaps([
		{
			platformName: 'Android',
			maxInstances: 1,
			'appium:automationName': 'UiAutomator2',
			'appium:app': path.join(config._ASSETS, './app-release.apk'),
			'appium:noReset': false,
			'appium:newCommandTimeout': 240,
			'appium:autoGrantPermissions': true,
			appPackage: 'net.roamler'
		}
	]),
	services: [
		...config.services || [],
		[
			'appium', {  command: 'appium' }
		]
	],
	port: 4444,
	path: "/"
});
