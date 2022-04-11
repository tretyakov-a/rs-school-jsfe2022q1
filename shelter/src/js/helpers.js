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

export {
  importAll,
  getRandomInt
}