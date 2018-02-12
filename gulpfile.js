var babelify = require('babelify');
var browserify = require('browserify');
var browserSync = require('browser-sync');
var concat = require('gulp-concat');
var del = require('del');
var gulp = require('gulp');
var jshint = require('gulp-jshint');
var lib = require('bower-files') ({  // look at https://github.com/twbs/bootstrap/issues/16663
  "overrides": {
    "bootstrap": {
      "main": [
        "less/bootstrap.less",
        "dist/css/bootstrap.css",
        "dist/js/bootstrap.js"
      ]
    }
  }
});
var source = require('vinyl-source-stream');
var uglify = require('gulp-uglify');
var utilities = require('gulp-util');

var buildProduction = utilities.env.prod; // append tag '--prod' to gulp command


gulp.task('jshint', function() {
  return gulp.src(['assets/js/*.js', 'spec/*-spec.js'])
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

gulp.task('concatJS', function() {
  return gulp.src(['./assets/js/*.js'])
    .pipe(concat('allConcat.js'))
    .pipe(gulp.dest('./tmp'));
});

gulp.task('concatCSS', function() {
    return gulp.src(['./assets/css/*.css'])
      .pipe(concat('app.css'))  // Change to allConcat after browserify issue is solved
      .pipe(gulp.dest('./tmp'));
});

gulp.task('jsBrowserify', ['concatJS'], function() {
  return browserify({ entries: ['./tmp/allConcat.js'] })
    .transform(babelify.configure({
      presets: ["env"]
    }))
    .bundle()
    .pipe(source('app.js'))
    .pipe(gulp.dest('./build/assets/js'));
});

// gulp.task('cssBrowserify', ['concatCSS'], function() {
//   return browserify({ entries: ['./tmp/allConcat.css'] })
//     .bundle()
//     .pipe(source('app.css'))
//     .pipe(gulp.dest('./build/assets/css'));
// });

gulp.task('cssBrowserify', ['concatCSS'], function() { // Gulp Error when using Browserify *look into browserify-css
  return gulp.src(['./tmp/app.css'])
    .pipe(gulp.dest('./build/assets/css'));
});

gulp.task('minifyJS', ['jsBrowserify'], function() {
  return gulp.src('./build/assets/js/app.js')
    .pipe(uglify())
    .pipe(gulp.dest('./build/assets/js'));
});

// gulp.task minifyCSS ??

gulp.task('jsBower', function() {
  return gulp.src(lib.ext('js').files)
    .pipe(concat('vendor.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./build/assets/js'));
});

gulp.task('cssBower', function() {
  return gulp.src(lib.ext('css').files)
    .pipe(concat('vendor.css'))
    // Minify?
    .pipe(gulp.dest('./build/assets/css'));
});

gulp.task('bower', ['jsBower', 'cssBower']);

gulp.task('clean', function() {
  return del(['build', 'tmp']);
});

gulp.task('build', ['clean'], function() {
  if (buildProduction) {
    gulp.start('minifyJS');
   // Minified version of CSS
  } else {
    gulp.start('jsBrowserify');
    gulp.start('cssBrowserify');
  }

  gulp.start('bower');
  // gulp.start('cssBuild'); -- Use Bootstraps SASS?
});

gulp.task('serve', ['build'], function() {
  browserSync.init({
    server: {
      baseDir: "./",
      index: "index.html"
    }
  });

  gulp.watch(['assets/js/*.js'], ['jsBuild']); // Run jsBuild if any changes are made to any files with ext .js
  gulp.watch(['assets/css/*.css'], ['cssBuild']); // Run cssBuild if any changes are made to any files with ext .css
  gulp.watch(['bower.json'], ['bowerBuild']); // Run bowerBuild if any changes are made to our bower.json file
  gulp.watch(['*.html'], ['htmlBuild']); // Run htmlBuil if any changes are made to any files with ext .html
  //gulp.watch('scss/*.scss', ['cssBuild']);  -- Use Bootstrap's SASS??
});

gulp.task('jsBuild', ['jsBrowserify', 'jshint'], function() {
  browserSync.reload();
});

gulp.task('cssBuild', ['cssBrowserify'], function() {
    browserSync.reload();
});

gulp.task('bowerBuild', ['bower'], function() {
  browserSync.reload();
});

gulp.task('htmlBuild', function() {
  browserSync.reload();
});
