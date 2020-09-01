import Screen from "../components/Screen.component";

export default class CameraScreen extends Screen {
	constructor() {
		super();
	}

	get capturePhotoBtn() { return $("~Capture photo"); }

	get usePhotoBtn() { return $("~Use Photo button"); }

	get retakePhotoBtn() { return $("~Retake button"); }
}
