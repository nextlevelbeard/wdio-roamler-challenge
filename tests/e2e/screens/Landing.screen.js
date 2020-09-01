import Screen from "../components/Screen.component";

export default class LandingScreen extends Screen {
	constructor(init = `resourceId("net.roamler:id/action_bar_root")`) {
		super(init);
	}

	get loginWithEmail() { return $("~Login with email"); }

	get loginWithFacebook() { return $("~Login with Facebook"); }

	get createAnAccount() { return $("~Registration link"); }
}
