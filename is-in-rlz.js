function isInRLZ(priceHistory, stopPercent) {
  const currentCdl = createCdl(priceHistory[0]);
  const stopIndex = Math.floor(stopPercent * (priceHistory.length - 1));
  let index = 1;
  let topOfFib = createEmptyFib();
  let bottomOfFib = createEmptyFib();

  while (index < priceHistory.length - 1 && index < stopIndex) {
    let candleInQuestion = createCdl(priceHistory[index]);
    let nextCdl = createCdl(priceHistory[index + 1]);
    let prevCdl = createCdl(priceHistory[index - 1]);

    if (isFractalUp(candleInQuestion, nextCdl, prevCdl)) {
      topOfFib = {
        value: candleInQuestion.high,
        index: index
      }
    }

    if (isFractalDown(candleInQuestion, nextCdl, prevCdl)) {
      bottomOfFib = {
        value: candleInQuestion.low,
        index: index
      };
    }

    if (isWithinRLZBounds(bottomOfFib, topOfFib, currentCdl.close)) {
      return true;
    }

    index++;
  }\
  return false;
}

function isFractalUp(currentCdl, nextCdl, prevCdl) {
  return (
    currentCdl.high > nextCdl.high
    && currentCdl.high > prevCdl.high
  );
}

function isFractalDown(currentCdl, nextCdl, prevCdl) {
  return (
    currentCdl.low < nextCdl.low
    && currentCdl.low < prevCdl.low
  );
}

function isWithinRLZBounds(bottomOfFib, topOfFib, currentClose) {
  const LINE_IN_THE_SAND = 0.618;
  const MOUNTAIN_MAN = 0.721;
  const diff = Math.abs(bottomOfFib.value - topOfFib.value);

  if (
    currentClose >= diff * LINE_IN_THE_SAND
    && currentClose <= diff * MOUNTAIN_MAN
  ) {
    return true
  }

  return false;
}

function createEmptyFib() {
  return {
    value: -1,
    index: -1
  };
}

function createCdl(candleArray) {
  return {
    open: candleArray[1],
    high: candleArray[2],
    low: candleArray[3],
    close: candleArray[4],
  };
}
