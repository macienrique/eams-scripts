module.exports = {
  test: (value) => value instanceof HTMLImageElement,
  print: (value) => {
    const srcLength = value.src.length;
    const middleLength = Math.floor(srcLength / 2);

    const beginning = value.src.substr(0, 30);
    const middle = value.src.substr(middleLength, 35);
    const end = value.src.substring(srcLength - 35);

    return `<img src="${beginning}...${middle}...${end}" alt="${value.alt}" />`;
  },
};
