const platform = require('os').platform();

const imageFolder = `${__dirname}/assets`;

exports.config = {
  config: platform,
  keepTemplate: `${imageFolder}/keepTemplate.png`,
  keepHighlight: `${imageFolder}/keepHighlight.png`,
};
