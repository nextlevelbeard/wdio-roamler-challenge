import AndroidComponent from "./AndroidComponent";

export default class SearchTask extends AndroidComponent {
	constructor(selector){
		super(selector)
	}

	get optionsBtn() { return this.container.$("//*[ends-with(@content-desc, 'options button')]"); }
}
