function importAll(r) {
  return r.keys().reduce((acc, key) => {
    const name = key.match(/.\/([a-z]*).png/)[1];
    return { ...acc, [name]: r(key) };
  }, {});
};

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function shuffle(array) {
  const result = [...array];
  for (let i = result.length - 1; i > 0; i -= 1) {
    let j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
};

export {
  importAll,
  getRandomInt,
  shuffle
}