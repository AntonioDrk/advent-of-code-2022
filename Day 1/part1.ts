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

let maxCal = -1;
let maxCalIndex = -1;
elfs.forEach((elfCal, elfInd) => {
  if (elfCal > maxCal) {
    maxCal = elfCal;
    maxCalIndex = elfInd;
  }
});

console.log(maxCal);
