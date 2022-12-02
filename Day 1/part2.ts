import fs = require("fs");

let elfs: number[] = [];

const inputBuff = fs.readFileSync("input1.in");
const inputText = inputBuff.toString("utf-8");

inputText.split("\r\n\r\n").forEach((elfMeals, index) => {
    let sumOfCal = 0;
    elfMeals.split("\r\n").forEach((elfMealStr, index) => {
        sumOfCal += parseFloat(elfMealStr);
    });

    elfs.push(sumOfCal);
});

elfs.sort((a, b) => b - a);

let maxCals = 0;
for (let i = 0; i < 3; i++) {
    maxCals += elfs[i];
}

console.log(maxCals);
