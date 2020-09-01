import AndroidComponent from "./AndroidComponent";

export default class SubmittedTask extends AndroidComponent {
	constructor(selector){
		super(selector)
	}

	get checkbox() { return this.container.$(`android=className("android.view.ViewGroup").instance(2)`); }
}
