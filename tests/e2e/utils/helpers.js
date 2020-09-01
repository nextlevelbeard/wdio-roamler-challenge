import crypto from "crypto";
import path from "path";
import fs from "fs";

import yaml from "js-yaml";
import logger from "@wdio/logger";

const _ = require("lodash");
const log = logger("Helpers");

export const rand = len =>
	crypto
		.randomBytes(Math.ceil(len / 2))
		.toString("hex")
		.slice(0, len);

export const sanitizeTable = table => {
	const rows = table.hashes();

	if (!rows.length) return;

	return rows.map(row => {
		Object.keys(row).forEach(key => {
			if(!_.isEmpty(row[key]))
				row[_.camelCase(key)] = row[key];
			delete row[key];
		});
		const { type, answer } = row;

		return _.pickBy({
			...row,
			type: type,
			answer: answer
		},
		d => d !== undefined);
	});
};

export const clearSession = () => {
	["sessionStorage", "localStorage"].forEach(s =>
		$(s => window && window[s] && window[s].clear(), s)
	);
	browser.deleteAllCookies();
};

export const buildScreenshotFilename = extra => {
	const { browserName, platformName = "", platFormVersion = "" } = browser.capabilities;
	const date = new Date(),
		shortMonth = date.toLocaleString("default", { month: "short" }),
		d = date.getDate(),
		M = date.getMonth() + 1,
		y = date.getFullYear(),
		h = date.getHours(),
		m = date.getMinutes(),
		s = date.getSeconds();

	// Remove slashes because directories
	extra = extra && extra.replace(/[/|\\]+/g, "");

	const fileName =
		`${d} ${M} ${shortMonth} ${y} @ ${h}H${m}m${s}s ` +
		`[ ${browserName || `${platformName} ${platFormVersion}`.trim() } ]` +
		` ${extra || ""}.png`;

	return path.join(browser.config._SHOTS, fileName);
};

export const setAllureCustomLogo = (logoPath, collapsedLogoPath = logoPath, stylesheetPath ) => {
	try {
		const allureDir = path.resolve("node_modules/allure-commandline");
		const configDir = path.join(allureDir, "dist/config");
		const logoPluginDir = path.join(allureDir, "dist/plugins/custom-logo-plugin");

		const allureYml = path.join(configDir, "allure.yml");
		const cucumberYml = path.join(configDir, "allure-cucumber.yml");
		const placeholderLogo = path.join(logoPluginDir, "static/custom-logo.svg");
		const placeholderCollapsedLogo = path.join(logoPluginDir, "static/custom-logo-collapsed.svg");

		const placeholderStylesheet = path.join(logoPluginDir, "static/styles.css");

		const allureYmlFile = fs.readFileSync(allureYml, "utf8");

		const ymlDocument = yaml.safeLoad(allureYmlFile);
		const { plugins = [] } = ymlDocument;
		const hasEntry = plugins.includes("custom-logo-plugin");

		if (!hasEntry) {
			plugins.push("custom-logo-plugin");
			fs.writeFileSync(allureYml, yaml.safeDump(ymlDocument));
		}

		[
			[allureYml, cucumberYml],
			[logoPath, placeholderLogo],
			[collapsedLogoPath, placeholderCollapsedLogo],
			[stylesheetPath, placeholderStylesheet]
		].forEach(([src, target]) => fs.copyFileSync(src, target))

	} catch (error) {
		log.error(`Could not apply custom logo to Allure report: ${error}`);
	}
};
