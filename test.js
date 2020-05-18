const Spritesmith = require('spritesmith');
const fs = require('fs');
const path = require('path');

const sprites = ['./loaders/images/babel.png', './loaders/images/react.png', './loaders/images/go.png', './loaders/images/flutter.png', './loaders/images/graphql.png'];
Spritesmith.run({ src: sprites }, (err, result) => {
  console.log(result.image);
  console.log(result.coordinates);
  console.log(result.properties);

  fs.writeFileSync(path.join(__dirname, 'dist/sprite.png'), result.image);
})