const Spritesmith = require('spritesmith');
const fs = require('fs');
const path = require('path');

module.exports = function(source) {
  const callback = this.async();
  const imgs = source.match(/url\((\S*)\?__sprite/g);

  let matchImgs = [], i = 0, imgsLen = imgs.length;

  for(; i < imgsLen; i++) {
    const img = imgs[i].match(/url\((\S*)\?__sprite/)[1];

    matchImgs.push(path.join(__dirname, img));
  }

  Spritesmith.run(
    {
      src: matchImgs
    },
    (err, result) => {
      fs.writeFileSync(path.join(process.cwd(), 'dist/sprite.png'), result.image);
      source = source.replace(/url\((\S*)\?__sprite/g, (match) => {
        return `url('dist/sprite.png'`;
      });
      
      fs.writeFileSync(path.join(process.cwd(), 'dist/index.css'), source);
      callback(null, source);
    }
  )

}