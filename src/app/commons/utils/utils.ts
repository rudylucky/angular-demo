function clone<T>(source: T): T {
  return JSON.parse(JSON.stringify(source));
}

function range(startOrEnd?: number, end?: number): number {
  if (typeof startOrEnd === 'undefined' && typeof end === 'undefined') {
    return range(1);
  }
  if (typeof end === 'undefined') {
    return range(0, startOrEnd);
  }
  return Math.round(Math.random() * (end - startOrEnd) + startOrEnd);
}

function randomTruth() {
  return !!range(1);
}

function isNull(obj) {
  return !obj && obj !== 0;
}

function keys(obj: object) {
  return Object.keys(obj);
}

function values(obj: object) {
  if (isNull(obj)) {
    return null;
  }
  return keys(obj).map(v => obj[v]);
}

const _ = {
  clone,
  range,
  randomTruth,
  isNull,
  keys,
  values
};

export default _;
