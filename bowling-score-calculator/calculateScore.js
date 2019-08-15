function parse(s) {
  return s === 'A' ? 10 : Number(s);
}

function calculateScore(record) {
  if (typeof record !== 'string') {
    throw new Error(`${record} is not a string`);
  }
  const invalid = record.match(/[^A0-9]/g);
  if (invalid) {
    throw new Error(`${record} has invalid character ${invalid.join(', ')}`);
  }

  const scores = [];
  let left = record;
  let frameNumber = 1;
  let accScore = 0;

  while (left.length > 0) {
    if (frameNumber > 10) {
      throw new Error(`${record} has more than 10 frames.`);
    }

    if (left[0] !== 'A' && left.length < 2) {
      break;
    }

    const frameScore = left[0] === 'A' ? 10 : parse(left[0]) + parse(left[1]);
    let bonusScore = 0;
    if (frameScore > 10) {
      throw new Error(`${record} contains frames with scores greater than 10.`);
    }

    if (left[0] === 'A') {
      left = left.slice(1);
      if (left.length < 2) {
        break;
      }
      bonusScore = parse(left[0]) + parse(left[1]);
      if (frameNumber === 10) {
        left = left.slice(2);
      }
    } else {
      left = left.slice(2);
      if (frameScore === 10) {
        if (left.length < 1) {
          break;
        }
        bonusScore = parse(left[0]);
        if (frameNumber === 10) {
          left = left.slice(1);
        }
      }
    }

    accScore = accScore + frameScore + bonusScore;
    scores.push(accScore);

    frameNumber += 1;
  }

  return scores;
}

module.exports = calculateScore;
