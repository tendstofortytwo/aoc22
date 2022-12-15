import { readFileSync } from 'fs';

const data = readFileSync('input13.txt', {encoding: 'utf-8'}).slice(0, -1);

const pairs = data.split('\n\n').map(p => p.split('\n').map(x => eval(x)));
const correct = [];

const isNum = x => typeof x === 'number';

function check(l, r) {
	if(isNum(l) && isNum(r)) {
		if(l < r) return -1;
		if(r < l) return 1;
		return 0;
	}
	if(isNum(l)) return check([l], r);
	if(isNum(r)) return check(l, [r]);
	let i = 0, j = 0;
	while(i < l.length && j < r.length) {
		const res = check(l[i++], r[j++]);
		if(res !== 0) return res;
	}
	if(l.length === i && r.length === j) return 0;
	if(l.length === i) return -1;
	return 1;
}

pairs.forEach(([l, r], i) => {
	if(check(l, r) === -1) correct.push(i+1);
});
console.log(correct.reduce((x, y) => x + y));
