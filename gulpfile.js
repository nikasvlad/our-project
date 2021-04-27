const { src, dest, task, series, watch, parallel } = require('gulp');
const rm = require('gulp-rm');
const sass = require('gulp-sass');
const concat = require('gulp-concat');
const browserSync = require('browser-sync').create();
const reload = browserSync.reload;
const sassGlob = require('gulp-sass-glob');
const autoprefixer = require('gulp-autoprefixer');
// const px2rem = require('gulp-smile-px2rem');
const gcmq = require('gulp-group-css-media-queries');
const cleanCSS = require('gulp-clean-css');
const sourcemaps = require('gulp-sourcemaps');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const gulpif = require('gulp-if');

const env = process.env.NODE_ENV;


const {SRC_PATH, DIST_PATH} = require('./gulp.config'); 


sass.compiler = require('node-sass');

task('clean', () => {
  return src(`${DIST_PATH}/**/*`, { read: false }).pipe(rm());
});

task('copy', () => {
  return src('./*.html').pipe(dest(`${DIST_PATH}/styles`)).pipe(reload({stream: true}));
});

task('styles', () => {
  return src([
    'css/main.scss'
  ])
    .pipe(gulpif(env === 'dev', sourcemaps.init()))
    .pipe(concat('main.min.scss'))
    .pipe(sassGlob())
    .pipe(sass().on('error', sass.logError))
    // .pipe(px2rem())
    .pipe(gulpif(env === 'dev',       
      autoprefixer({
        browsers: ['last 2 versions'],
        cascade: false
      }))
    )
    .pipe(gulpif(env === 'prod', gcmq()))
    .pipe(gulpif(env === 'prod', cleanCSS()))
    .pipe(gulpif(env === 'dev', sourcemaps.write()))
    // .pipe(sourcemaps.write())    
    // .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(dest(`${DIST_PATH}/styles`))
    .pipe(reload({stream: true}));
});

const libs = [
  './js/*.js'
]

task('js', () => {
  return src(libs)
  .pipe(gulpif(env === 'dev', sourcemaps.init()))
  // .pipe(sourcemaps.init())
  .pipe(concat('main.min.js'))
  .pipe(gulpif(env === 'prod',     
    babel({
    presets: ['@babel/env']
    }))
  )
  // .pipe(
  //   babel({
  //     presets: ['@babel/env']
  //   })
  // )
  .pipe(gulpif(env === 'prod', uglify()))
  // .pipe(uglify())
  .pipe(sourcemaps.write())
  .pipe(dest(`${DIST_PATH}/styles`))
  .pipe(reload({stream: true}));
});

task('server', () => {
  browserSync.init({
      server: {
        baseDir: `${DIST_PATH}/styles`,
        open: false
      }
  });
});

task('watch', () => {
  watch('./css/**/*.scss', series('styles'));
  watch('./*.html', series('copy'));
  watch('./js/*.js', series('js'));
})

// watch('./css/**/*.scss', series('styles'));
// watch('./*.html', series('copy'));
// watch('./js/*.js', series('js'));

task(
  'default',
  series(
    'clean',
    parallel('copy', 'styles', 'js' ),
    parallel('watch', 'server')
  )
);

task(
  'build',
  series(
    'clean',
    parallel('copy', 'styles', 'js' )
  )
);