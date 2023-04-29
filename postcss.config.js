// postcss - инструмент для трансформации CSS кода
// с его помощью будем автоматически добавлять вендорные префиксы и минифицировать CSS
// только потребуются два соответствующих плагина
// подключаем плагины в файл
const autoprefixer = require('autoprefixer'); // eslint-disable-line import/no-extraneous-dependencies
const cssnano = require('cssnano'); // eslint-disable-line import/no-extraneous-dependencies

module.exports = {
  // подключаем плагины к PostCSS
  plugins: [
    // подключаем autoprefixer
    autoprefixer,
    // cssnano при подключении нужно передать объект опций
    // { preset: default } говорит о том, что нужно использовать
    // стандартные настройки минификации
    cssnano({ preset: 'default' }),
  ],
};
