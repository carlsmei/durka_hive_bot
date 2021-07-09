const fs = require('fs');
const yaml = require('js-yaml');
const path = require('path');
const file_path = path.join(__dirname, 'load.yml');

if (!fs.existsSync(file_path)) return;

const controllers = yaml.load(fs.readFileSync(file_path));

for (const [key, value] of Object.entries(controllers)) {
	if (typeof(value) == 'string') {
		if (fs.existsSync(path.join(file_path, `../${value}.js`))) {
			require('./' + value);
		}
		else {
			console.log(`[Hive] Controller '${value}' not found.`);
		};
	}
}
