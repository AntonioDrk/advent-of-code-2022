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
};

function mod(n: number, m: number): number {
    return ((n % m) + m) % m;
}

function getScoreFor(opponent: number, strategy: string) {
    let choice = -1;
    let score = 0;
    switch (strategy) {
        case "X": // Need to lose
            choice = mod(opponent - 1, 3);
            break;
        case "Y": // Need to draw
            choice = opponent;
            score += 3;
            break;
        case "Z": // Need to win
            choice = mod(opponent + 1, 3);
            score += 6;
            break;
    }
    if (choice === -1) {
        throw new Error(
            `Could not compute choice for params opponent=${opponent} and strategy=${strategy}`
        );
    }
    score += choice + 1;
    return score;
}

rl.on("line", (line) => {
    const splitLine = line.split(" ");
    const opponent = choiceTranslator[splitLine[0]];

    if (opponent === null || opponent === undefined) {
        throw new Error(`Could not translate Opponent:${opponent}`);
    }

    rounds.push(getScoreFor(opponent, splitLine[1]));
});

rl.on("close", () => {
    const sum = rounds.reduce((prevVal, sumTotal) => (sumTotal += prevVal), 0);
    console.log(rounds);
    console.log(sum);
});
