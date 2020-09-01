

import Screen from "../components/Screen.component";

export default class ActivityLogScreen extends Screen {
	constructor() {
		super();
	}

	get taskList() { return $(`android=className("android.widget.ScrollView")`); }

	getTask(name) { return this.taskList.$(`//*[@text="${name}"]//parent::android.view.ViewGroup`) }
}
