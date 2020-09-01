import Screen from "../components/Screen.component";

export default class TaskScreen extends Screen {
	constructor(init = `resourceId("net.roamler:id/action_bar_root")`) {
		super(init);
	}

	get acceptTaskBtn() { return $("~Accept task button"); }

	get closeQuestionnaireBtn() { return $("~Close questionnaire button"); }

	get viewQuestionnaireBtn() { return $("~View Questionnaire button"); }
}
