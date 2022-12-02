import * as readline from "readline";
import * as fs from "fs";

const readStream = fs.createReadStream("input1.in");
const rl = readline.createInterface({
    input: readStream,
});

let rounds: number[] = [];
const choiceTranslator: { [key: string]: number } = {
    A: 0,
    B: 1,
    C: 2,
    X: 0,
    Y: 1,
    Z: 2,
};

rl.on("line", (line) => {
    const splitLine = line.split(" ");
    const opponent = choiceTranslator[splitLine[0]];
    const me = choiceTranslator[splitLine[1]];

    if (
        opponent === null ||
        opponent === undefined ||
        me === null ||
        me === undefined
    ) {
        throw new Error(`Could not translate Opponent:${opponent} | Me:${me}`);
    }
    let score = 0;
    score += me + 1;
    if ((opponent + 1) % 3 === me) {
        score += 6;
    }
    if (opponent === me) {
        score += 3;
    }

    rounds.push(score);
});

rl.on("close", () => {
    const sum = rounds.reduce((prevVal, sumTotal) => (sumTotal += prevVal), 0);
    console.log(rounds);
    console.log(sum);
});
