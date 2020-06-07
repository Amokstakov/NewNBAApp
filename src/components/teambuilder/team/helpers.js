export const modeData = (playersData, mode) => {
  return playersData
    .map((player) => player[0][mode])
    .filter((value) => typeof value !== "undefined");
};

function getSum(values) {
  return values.reduce((acc, sum) => acc + sum, 0);
}

function getAverage(values) {
  return getSum(values) / values.length;
}

export const all = (players, modes, sumModes) =>
  Object.keys(modes).map((mode) => {
    var data = modeData(players, mode);
    if (mode in sumModes) {
      var sum = getSum(data).toFixed(2);
    }
    var avg = getAverage(data).toFixed(2);

    return { mode, avg, sum };
  });

export const normalStats = (players, modes) =>
  Object.keys(modes).map((mode) => {
    var data = modeData(players, mode);

    return { mode, data };
  });