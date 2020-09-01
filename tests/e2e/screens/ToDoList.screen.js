import Screen from "../components/Screen.component";

export default class ToDoListScreen extends Screen {
	constructor(init = `resourceId("net.roamler:id/action_bar_root")`) {
		super(init);
	}

	get homeTab() { return $("~home, tab, 1 of 4"); }

	get toDoTab() { return $("~todo, tab, 2 of 4"); }

	get messagesTab() { return $("~messages, tab, 3 of 4"); }

	get profileTab() { return $("~profile, tab, 4 of 4"); }

	get anchorList() { return $("~Anchor list"); }

	get searchTasksBtn() { return $("~Search tasks button"); }

	get searchTasksInput() { return $(`android.widget.EditText`); }

	search(query) {
		const { searchTasksBtn, searchTasksInput } = this;

		searchTasksBtn.isDisplayed() && searchTasksBtn.click();
		searchTasksInput.waitForDisplayed();
		searchTasksInput.setValue(query);
	}

	getTask(name) { return $(`android=text("${name}")`) }
}
