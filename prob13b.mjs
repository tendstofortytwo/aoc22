import { readFileSync } from 'fs';

const data = readFileSync('input13.txt', {encoding: 'utf-8'}).slice(0, -1);

const packets = data.split('\n').filter(v => v !== '').map(x => eval(x));
const a = [[2]], b = [[6]];
packets.push(a);
packets.push(b);

const isList = x => typeof x === 'object';
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
packets.sort(check);
console.log((packets.indexOf(a) + 1) * (packets.indexOf(b) + 1));
