function esDepUnitAsync(input) {
  if (typeof input !== 'string') {
    return Promise.reject(new TypeError(`\input\` should be \`String\`, got \`${typeof input}\``));
  }
  return Promise.resolve(input);
}

function esDepUnit(input) {
  if (typeof input !== 'string') {
    throw new TypeError(`\input\` should be \`String\`, got \`${typeof input}\``);
  }
  return input;
}

export { esDepUnit, esDepUnitAsync };
