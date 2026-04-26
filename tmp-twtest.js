const postcss = require('postcss');
const plugin = require('@tailwindcss/postcss');
const css = '@import "tailwindcss";\n@layer utilities { .mytest { @apply lg:hidden; } }';
postcss([plugin])
  .process(css, { from: undefined })
  .then(result => {
    console.log('OK');
    console.log(result.css.slice(0, 1000));
  })
  .catch(err => {
    console.error('ERR', err);
    process.exit(1);
  });
