import { Given, When, Then } from "cucumber";

import LandingScreen from "../screens/Landing.screen";
import EmailLoginScreen from "../screens/EmailLogin.screen";
import HomeScreen from "../screens/Home.screen";
import TaskScreen from "../screens/Task.screen";
import ProfileScreen from "../screens/Profile.screen";
import ActivityLogScreen from "../screens/ActivityLog.screen";
import QuestionnaireScreen from "../screens/Questionnaire.screen";
import CameraScreen from "../screens/Camera.screen";
import ToDoListScreen from "../screens/ToDoList.screen";

import SubmittedTask from "../components/SubmittedTask.component";
import {sanitizeTable} from "../utils/helpers";
import _ from "lodash";

const landingScreen = new LandingScreen();
const emailLoginScreen = new EmailLoginScreen();
const homeScreen = new HomeScreen();
const taskScreen = new TaskScreen();
const profileScreen = new ProfileScreen();
const activityLogScreen = new ActivityLogScreen();
const questionnaireScreen = new QuestionnaireScreen();
const cameraScreen = new CameraScreen();

Given(/^I (?:navigate to "localhost"|(?:open|am on) the (?:app|Home page))$/i, () => {
	homeScreen.container.waitForDisplayed()
});

Given(/^I am logged in$/i, table => {
	const { email, password } = _.pickBy(sanitizeTable(table).pop(), d => d !== undefined)

	landingScreen.loginWithEmail.click()
	emailLoginScreen.emailInput.setValue(email);
	emailLoginScreen.passwordInput.setValue(password)
	emailLoginScreen.loginIn.click();
	emailLoginScreen.loginIn.waitForDisplayed({ reverse : true });
});

Given(/^I search for a task called "(.*)"$/i, function(query) {
	homeScreen.search(query)
	const taskElem = homeScreen.getTask(query);

	this.task = query
	taskElem.waitForDisplayed()
	browser.waitUntil(
		() => taskScreen.viewQuestionnaireBtn.isDisplayed() || taskElem.click(),
		{ interval: 1000 })
});

Given(/^I accept the task$/i, () => taskScreen.acceptTaskBtn.click());

Given(/^I complete the questionnaire$/i, table => {

	const answers = sanitizeTable(table)
		.map(c => _.pickBy(c, d => d !== undefined))

	answers.forEach(({ type, answer })=> {
		switch (type.toLowerCase()){
			default:
			case "navigate":
				answer === "previous" && questionnaireScreen.previousQuestionBtn.click()
				!answer || answer === "next" && questionnaireScreen.nextQuestionBtn.click()
				break;
			case "camera":
				questionnaireScreen.openCameraBtn.click()
				cameraScreen.capturePhotoBtn.click()
				cameraScreen.usePhotoBtn.click()
				break;
			case "picture":
				questionnaireScreen.openGalleryBtn.click()
				questionnaireScreen.photosIcon.click()
				questionnaireScreen.firstFolder.click()
				questionnaireScreen.firstFolder.waitForDisplayed({ reverse : true })
				questionnaireScreen.firstPhoto.click()
				questionnaireScreen.uploadedPicture.waitForDisplayed()
				break;
			case "text":
				questionnaireScreen.answerInput.setValue(answer)
				break;
		}
		questionnaireScreen.nextQuestionBtn.click()
	})

	const { submitTaskBtn, doneBtn } = questionnaireScreen;

	submitTaskBtn.waitForDisplayed()
	submitTaskBtn.click()
	doneBtn.click()
});

When(/^I open (?:my|the) Profile(?: tab)?$/i, () => homeScreen.profileTab.click());
When(/^I press(?: on the)? Activity Log?$/i, () => profileScreen.activityLogLink.click());

Then(/^I should( not)? see the task marked as completed?$/i, function(not) {

	const submittedTask = new SubmittedTask(activityLogScreen.getTask(this.task));
	submittedTask.container.waitForDisplayed()

	not ?
		expect(submittedTask.checkbox).not.toBeDisplayed() :
		expect(submittedTask.checkbox).toBeDisplayed()
});
