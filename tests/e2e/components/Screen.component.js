import logger from "@wdio/logger";
import AndroidComponent from "./AndroidComponent";

export default class Screen extends AndroidComponent {
	constructor(selector) {
		super(selector);
	}

	get allowLocationServicesBtn () { return $("~Allow location services button"); }

	get allowCameraBtn () { return $("~Allow camera button"); }

	get giveAccessToPhotosBtn () { return $("~Give access to photos button"); }

	get notNowBtn () { return $("~Not now button"); }

	get permissionsAllow () { return $(`resourceId("com.android.packageinstaller:id/permission_allow_button")`); }

	get resolverList () { return $(`android=resourceId("android:id/resolver_list")`); }

	get photosIcon () { return this.resolverList.$(`android=text("Photos")`); }

	get galleryIcon () { return this.resolverList.$(`android=text("Gallery")`); }

	get firstFolder() { return $(`android=className("android.widget.RelativeLayout")`); }

	get firstPhoto () { return $("//android.view.ViewGroup[@content-desc]") }

}

Screen.log = logger(Screen.name);
logger.setLevel(Screen.name, "info");
