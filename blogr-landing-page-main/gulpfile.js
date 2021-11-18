'use strict';

const { src, dest, watch, series} = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const prefix = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const terser = require( 'gulp-terser' );
const rename = require('gulp-rename');
const imagemin = require('gulp-imagemin-changba');

function compilescss() {
  return src('src/scss/main.scss') // change to your source directory
    .pipe(sass({includePaths: ['scss']}))
    .pipe(prefix('last 2 versions'))
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(dest('dist/css')) // change to your final/public directory
};

//minify images
function imgmin () {
  return src( [
    'src/images/*.png',
    'src/images/*.jpg'
  ] )
    .pipe(imagemin())
    .pipe( rename( { suffix: '.min' } ) )
    .pipe( dest( 'dist/images' ) )
}

// move SVG images
function imgSVG(){
  return src('./images/*.svg') // change to your source directory
    .pipe(dest('dist/images')); // change to your final/public directory
}

// minify js
function jsmin(){
  return src( [
    'src/js/*.js'
  ] ) // change to your source directory
    .pipe(terser())
    .pipe(dest('dist/js')); // change to your final/public directory
}


// move html
function html(){
  return src('./index.html') // change to your source directory
    .pipe(dest('dist/')); // change to your final/public directory
}

//watchtask
function watchTask(){
  watch('src/scss/**/*.scss', compilescss); // change to your source directory
  watch('src/images/*', imgmin); // change to your source directory
  watch('src/images/*', imgSVG); // change to your source directory
  watch('src/js/*.js', jsmin); // change to your source directory
  watch("./index.html", html); // change to your source directory
}

// Default Gulp task 
exports.default = series(
    compilescss,
    jsmin,
    imgmin,
    imgSVG,
    html,
    watchTask
)

