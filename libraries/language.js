const fs = require('fs');
const yaml = require('js-yaml');
var exports = {};
var stored = {};
var default_language = 'ru';
var folder = 'language';

function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function _get_phrase(tabs, reference) {
	if (!reference) {
		reference = stored['ru']

		if (!reference) return false;
	};

	for (const [, v] of Object.entries(tabs)) {
		let val = reference[v];

		if (typeof(val) === 'object') {
			reference = val;
		}
		else {
			return val;
		}
	};

	return false;
}

global.t = (phrase, args, force_lang) => {
	args = typeof(args) == 'object' ? args : {args};

	let tabs = phrase.split('.');
	phrase = _get_phrase(tabs, stored[force_lang || default_language]) || phrase;

	for (const [k, v] of Object.entries(args)) {
		phrase = phrase.replace(new RegExp(escapeRegExp(`{${k}}`)), v);
	}

	return phrase;
}

exports.all = () => stored;
exports.add = (index, value, reference) => {
	reference = reference ?? stored;

	if (typeof(value) === 'object') {
		reference[index] = reference[index] ?? {};

		for (const [k, v] of Object.entries(value)) {
			exports.add(k, v, reference[index]);
		}
	}
	else {
		reference[index] = value
	}
};

module.exports = exports;

(() => {
	if (!fs.existsSync(folder) || !fs.statSync(folder).isDirectory()) return;

	for (const file_name of fs.readdirSync(folder)) {
		let file_path = `${folder}/${file_name}`;

		if (file_name.match('\\.y(?:a|)ml') && fs.statSync(file_path).isFile()) {
			let contents = fs.readFileSync(file_path, 'utf-8');

			try {
				contents = yaml.load(contents)
			} catch (e) {
				console.log(`[Hive] The error appeared when loading the language file '${file_name}', skipping...`);
				
				contents = false;
			}

			if (contents) {
				for (const [key, value] of Object.entries(contents)) {
					exports.add(key, value);
				}
			}
		}
	}
})();
