module.exports = {
  test: (value) => value instanceof SVGSVGElement,
  print: (value) => {
    const classNames = value.getAttribute('class');
    const size = value.getAttribute('size');
    const viewBox = value.getAttribute('viewBox');

    return `<svg class="${classNames}" size="${size}" viewBox="${viewBox}" >{children}</svg>`;
  },
};
