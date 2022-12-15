import { readFileSync } from 'fs';

const data = readFileSync('input7.txt', {encoding: 'utf-8'});

const root = {name: '/', type: 'dir', parent: null, files: []};

let cursor = root;

const lines = data.split('\n');
lines.shift();
lines.pop();

let i = 0;
while(i < lines.length) {
	console.log(i, `"${lines[i]}"`, cursor.name);
	if(lines[i][0] == '$') {
		if(lines[i][2] === 'l') {
			let j = i+1;
			while(lines[j] && lines[j][0] !== '$') ++j;
			const descendants = lines.slice(i+1, j);
			descendants.map(d => d.split(' ')).forEach(([info, name]) => {
				let file = {name, parent: cursor};
				if(info === 'dir') {
					file.type = 'dir';
					file.files = [];
				}
				else {
					file.type = 'file';
					file.size = Number(info);
				}
				cursor.files.push(file);
			});
			i = j;
			continue;
		}
		else if(lines[i][2] === 'c') {
			const dirName = lines[i].slice(5);
			if(dirName === '..') cursor = cursor.parent;
			else cursor = cursor.files.filter(f => f.type === 'dir' && f.name === dirName)[0];
			++i;
		}
		else {
			throw i + ' weird line: ' + lines[i];
		}
	}
	else { throw i + ' weird line: ' + lines[i]; }
}

const reqd = [];

function traverse(node) {
	if(!node.size) {
		const sz = node.files.map(traverse).reduce((a,b)=>a+b);
		console.log(node.name, sz);
		if(sz <= 100000) reqd.push(node);
		node.size = sz;
		return sz;
	} else return node.size;
}

traverse(root);
console.log(reqd.map(d => d.size).reduce((a, b)=>a+b));
