import { readFileSync } from 'fs';

const data = readFileSync('test11.txt', {encoding: 'utf-8'}).slice(0, -1);

const monkeys = data.split('\n\n').map(p => p.split('\n')).map(m => {
	return {
		id: Number(m[0].slice(7, -1)),
		items: m[1].split(': ')[1].split(', ').map(Number),
		op: (old) =>  eval(`var old = ${old}; ${m[2].split('= ')[1]}`),
		testFn: n => n % m[3].split(' ').slice(-1).map(Number)[0] === 0,
		trueId:  m[4].split(' ').slice(-1).map(Number)[0],
		falseId:  m[5].split(' ').slice(-1).map(Number)[0],
		inspected: 0
	}
});
const rounds = 20;
for(let i = 0; i < rounds; ++i) {
	for(let j = 0; j < monkeys.length; ++j) {
		while(monkeys[j].items.length) {
			++monkeys[j].inspected;
			let item = monkeys[j].items.shift();
			item = Math.floor(monkeys[j].op(item) / 3);
			if(monkeys[j].testFn(item))
				monkeys[monkeys[j].trueId].items.push(item);
			else
				monkeys[monkeys[j].falseId].items.push(item);
		}
	}
}

console.log(monkeys.sort((m1, m2) => m2.inspected - m1.inspected).slice(0, 2).reduce((x,y)=>x.inspected*y.inspected));
