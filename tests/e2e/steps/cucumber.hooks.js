import path from "path";
import allureReporter from '@wdio/allure-reporter';
import { After, Before, Status } from "cucumber";
import { buildScreenshotFilename } from "../utils/helpers";

Before(function(scenario){ this.scenario = scenario });

After(function (scenario) {
	if (scenario.result.status === Status.FAILED) {
		const screenShot = browser.saveScreenshot(buildScreenshotFilename(scenario.pickle.name))
		this.attach(screenShot, 'image/png');
	}
});

// Skip test for certain tags
Before("@skip or @wip or @WIP or @pending", () => "skipped");

// Create user per test
// Only initiates request, returns Promise
// Use browser.call to wait for request to finish
// Before(function () { this.user = signUp() });

Before(() => browser.startRecordingScreen())

After(function(scenario) {
	const filename = `${path.basename(buildScreenshotFilename(scenario.pickle.name), ".png")}.mp4`;

	browser.call(() => browser.saveRecordingScreen(filename))

	this.attach(filename, 'video/mp4');
	allureReporter.addAttachment('Execution video', filename, 'video/mp4')
});
