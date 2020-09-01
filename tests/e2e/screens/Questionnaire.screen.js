
import Screen from "../components/Screen.component";

export default class QuestionnaireScreen extends Screen {
	constructor(init = `resourceId("net.roamler:id/action_bar_root")`) {
		super(init);
	}

	get previousQuestionBtn() { return $("~Previous button"); }

	get nextQuestionBtn() { return $("~Next button"); }

	get answerInput() { return $("~Your answer text input"); }

	get submitTaskBtn() { return $("~Submit Task button"); }

	get doneBtn() { return $("~Done button"); }

	getOption(name) { return $(`~${name}`); }

	get openCameraBtn() { return $("~Open camera button"); }

	get openGalleryBtn() { return $("~Open gallery button"); }

	get takenPhoto () { return $(`android=resourceId("net.roamler:id/texture_view")`); }

	get uploadedPicture() { return $(`android.widget.ScrollView`).$(`android.widget.ImageView`); }
}
