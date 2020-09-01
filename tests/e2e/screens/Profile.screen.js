import Screen from "../components/Screen.component";

export default class ProfileScreen extends Screen {
	constructor(init = `resourceId("net.roamler:id/action_bar_root")`) {
		super(init);
	}

	get activityLogLink() { return $("~Activity Log link"); }
}
