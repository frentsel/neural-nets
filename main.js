const net = new brain.NeuralNetwork();
const experience = [];

for (var i = 0; i <= 255; i++) {

  const output = {};
  let key = 'middle';

  if (i < 85) key = 'dark';
  if (i > 170) key = 'light';

  output[key] = 1;
  experience.push({
    input: {
      r: i / 255,
      g: i / 255,
      b: i / 255
    },
    output
  });
}

net.trainAsync(experience);

const hexToRgb = (hex) => {
  return hex.replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i, (m, r, g, b) => '#' + r + r + g + g + b + b).substring(1).match(/.{2}/g).map(x => parseInt(x, 16));
}

const checkColor = (c) => {
  const [r, g, b] = hexToRgb(c);
  const rgb = {
    r: r / 255,
    g: g / 255,
    b: b / 255
  };
  const result = brain.likely(rgb, net);
  document.getElementById('result').innerHTML = result;
}
