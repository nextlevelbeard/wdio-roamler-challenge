import Screen from "../components/Screen.component";

export default class EmailLoginScreen extends Screen {
	constructor() {
		super();
	}

	get emailInput() { return $("~Email text input"); }

	get passwordInput() { return $("~Password text input"); }

	get loginIn() { return $("~Log in button"); }

	get backButton() { return $(`//*[@content-desc="Back button"]`); }

	get forgotPassword() { return $("~Registration link"); }

	get registrationLink() { return $(`//*[@content-desc="Registration link"]`); }
}
