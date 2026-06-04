const gulp = require('gulp');
const del = require('del');
const cleanCss = require('gulp-clean-css');
const rename = require('gulp-rename');
const uglify = require('gulp-uglify');
const autoprefixer = require('gulp-autoprefixer');
const imagewebp = require('gulp-webp');
const ttf2woff = require('gulp-ttf2woff');
const ttf2woff2  = require('gulp-ttf2woff2');
const plumber = require('gulp-plumber');
const rigger = require('gulp-rigger');
const panini = require('panini');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass')(require('sass'));


const paths = {
    html: {
        src: 'src/pages/**/*.html',
        dest: 'dist/'
    },
    styles: {
        src: 'src/assets/sass/**/*.scss',
        dest: 'dist/assets/css/',
    },
    scripts: {
        src: 'src/assets/js/*.js',
        dest: 'dist/assets/js/'
    },
    json: {
        src: 'src/assets/json/*.json',
        dest: 'dist/assets/json/'
    },
    php: {
        src: 'src/assets/php/**/*.php',
        dest: 'dist/assets/php/'
    },
    images: {
        src: 'src/assets/img/**/*',
        dest: 'dist/assets/img/'
    },
    noWebp: {
        src: 'src/assets/no-webp/**/*',
        dest: 'dist/assets/img/'
    },
    fonts: {
        src: 'src/assets/fonts/*/*.{ttf, woff,woff2}',
        dest: 'dist/assets/fonts/'
    }
}


function clean() {
    return del(['dist'])
}


function html() {
    panini.refresh();
    return gulp.src(paths.html.src)
    .pipe(plumber())
    .pipe(panini({
      root: 'src/pages/',
      layouts: 'src/layouts/',
      partials: 'src/partials/',
      helpers: 'src/helpers/',
      data: 'src/data/'
    }))
    .pipe(gulp.dest(paths.html.dest))
    .pipe(browserSync.stream())
}


function styles() {
    return gulp.src(paths.styles.src)
    .pipe(plumber())
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({
            cascade: false
        }))
    .pipe(gulp.dest(paths.styles.dest))
    .pipe(cleanCss({
        level: 2
    }))
    .pipe(rename({
        suffix: '.min'
    }))
    .pipe(gulp.dest(paths.styles.dest))
    .pipe(browserSync.stream())
}


function scripts() {
    return gulp.src(paths.scripts.src)
    .pipe(plumber())
    .pipe(rigger())
    .pipe(gulp.dest(paths.scripts.dest))
    .pipe(uglify())
    .pipe(rename({
        suffix: '.min'
    }))
    .pipe(gulp.dest(paths.scripts.dest))
    .pipe(browserSync.stream())
}

function php() {
    return gulp.src(paths.php.src)
    .pipe(plumber())
    .pipe(gulp.dest(paths.php.dest))
    .pipe(browserSync.stream())
}

function json() {
    return gulp.src(paths.json.src)
    .pipe(plumber())
    .pipe(gulp.dest(paths.json.dest))
    .pipe(browserSync.stream())
}


function fonts() {
    const ttfToWoffStream  = gulp.src('src/assets/fonts/**/*.ttf')
        .pipe(ttf2woff())
        .pipe(gulp.dest(paths.fonts.dest));

    const ttfToWoff2Stream  = gulp.src('src/assets/fonts/**/*.ttf')
        .pipe(ttf2woff2())
        .pipe(gulp.dest(paths.fonts.dest));


    const copyStream = gulp.src('src/assets/fonts/**/*.{woff,woff2}')
        .pipe(gulp.dest(paths.fonts.dest));

    return Promise.all([ttfToWoffStream, ttfToWoff2Stream, copyStream]);
}


function images() {
    return gulp.src(paths.images.src)
    .pipe(imagewebp())
    .pipe(gulp.dest(paths.images.dest))
    .pipe(browserSync.stream())
}

function noWebp() {
    return gulp.src(paths.noWebp.src)
    .pipe(gulp.dest(paths.images.dest))
    .pipe(browserSync.stream())
}


function watch() {

    browserSync.init({
        server: {
            baseDir: "./dist"
        }
    });

    gulp.watch('src/**/*.html', html)
    gulp.watch('src/assets/sass/**/*.scss', styles)
    gulp.watch('src/assets/js/**/*.js', scripts)
    gulp.watch(paths.php.src, php)
    gulp.watch('src/assets/json/**/*.json', json)
    gulp.watch(paths.images.src, images)
    gulp.watch(paths.noWebp.src, noWebp)
}


const build = gulp.series(clean, html, gulp.parallel(styles, scripts, php, fonts, images, noWebp, json), watch)


exports.clean = clean
exports.html = html
exports.styles = styles
exports.scripts = scripts
exports.php = php
exports.fonts = fonts
exports.images = images
exports.noWebp = noWebp
exports.json = json
exports.watch = watch
exports.build = build
exports.default = build