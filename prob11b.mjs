import { readFileSync } from 'fs';

const data = readFileSync('input11.txt', {encoding: 'utf-8'}).slice(0, -1);

const monkeys = data.split('\n\n').map(p => p.split('\n')).map(m => {
	return {
		id: Number(m[0].slice(7, -1)),
		items: m[1].split(': ')[1].split(', ').map(Number),
		op: (old) =>  eval(`var old = ${old}; ${m[2].split('= ')[1]}`),
		testNum: m[3].split(' ').slice(-1).map(Number)[0],
		trueId:  m[4].split(' ').slice(-1).map(Number)[0],
		falseId:  m[5].split(' ').slice(-1).map(Number)[0],
		inspected: 0
	}
});
const product = monkeys.map(m => m.testNum).reduce((x, y) => x*y);

const rounds = 10000;
for(let i = 0; i < rounds; ++i) {
	for(let j = 0; j < monkeys.length; ++j) {
		while(monkeys[j].items.length) {
			++monkeys[j].inspected;
			let item = monkeys[j].items.shift();
			item = monkeys[j].op(item) % product;
			if(item % monkeys[j].testNum === 0)
				monkeys[monkeys[j].trueId].items.push(item);
			else
				monkeys[monkeys[j].falseId].items.push(item);
		}
	}
	//console.log(`Round ${i+1}`)
	//monkeys.forEach((m, j) => console.log(`Monkey ${j}: ${m.items}`));
}

console.log(monkeys.sort((m1, m2) => m2.inspected - m1.inspected).slice(0, 2).reduce((x,y)=>x.inspected*y.inspected));
