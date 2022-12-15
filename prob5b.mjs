import { readFileSync } from 'fs';

const data = readFileSync('input5.txt', {encoding: 'utf-8'});

const lines = data.split('\n');
const n = lines[0].length / 4;

function chunk(str, n) {
	const arr = [];
	for(let i = 0; i < str.length; i += n) {
		arr.push(str.slice(i, i+n));
	}
	return arr;
}

const stacks = [];

while(lines[0] != '') {
	const chunks = chunk(lines[0], 4).map(s => s[1]);
	//console.log(lines[0], chunks);
	stacks.push(chunks);
	lines.shift();
}
lines.shift();
stacks.pop();

//console.log(stacks);

let instructions = [];

while(lines[0]) {
	const s = lines.shift();
	instructions.push(s.slice(5).split(/ from | to /).map(Number));
}

const newStacks = new Array(stacks[0].length);

// flip the stacks
for(let i = 0; i < newStacks.length; ++i) {
	newStacks[i] = [];
}
for(let j = 0; j < stacks[0].length; ++j) {
	for(let i = stacks.length - 1; i >= 0; --i) {
		//console.log(stacks[i][j]);
		if(stacks[i][j] !== ' ') newStacks[j].push(stacks[i][j]);
	}
}

const printStack = () => console.log(newStacks.map(s => s.join(' ')).join('\n'));

//console.log(instructions);

printStack();

instructions.forEach(([n, from, to]) => {
	//console.log(n, from, to);
	const newVals = [];
	for(let i = 0; i < n; ++i) {
		newVals.unshift(newStacks[from-1].pop());
	}
	newStacks[to-1].push(...newVals);
	printStack();
});

console.log(newStacks.map(s => s[s.length - 1]).join(''));
