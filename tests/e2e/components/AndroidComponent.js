import Component from "./Component";

export default class AndroidComponent extends Component {
	constructor(init){
		super(typeof init === "object" ? init : `android=${init}`)

	}

	get container() {
		return (this.element || []).length ? this.element.reverse().pop() : this.element || $(this.selector);
	}

	get containers() {
		return Array.isArray(this.element) ? this.element : this.element || $$(this.selector);
	}
}
