"use strict";

var gulp = require("gulp");
var prettier = require("gulp-prettier");
var sass = require("gulp-sass");
var uglify = require("gulp-uglify");
var pump = require("pump");
var browserSync = require("browser-sync").create();
var concat = require("gulp-concat");

gulp.task("serve", ["sass"], function() {
  browserSync.init({
  });

  gulp
    .watch("./sass/*.+(scss|sass)", ["sass"])
    .on("change", browserSync.reload);
  gulp.watch("./*.html").on("change", browserSync.reload);
  gulp.watch("./js/*.js").on("change", browserSync.reload);
});

gulp.task("scripts", function() {
  return gulp
    .src(["./js/*.js"])
    .pipe(concat(".js/app.js"))
    .pipe(gulp.dest("./js/"));
});

gulp.task("sass", function() {
  return gulp
    .src("./sass/*.+(scss|sass)")
    .pipe(
      sass({
        outputStyle: "compressed"
      }).on("error", sass.logError)
    )
    .pipe(gulp.dest("./css"))
    .pipe(browserSync.stream());
});

gulp.task("sass:watch", function() {
  gulp.watch("./sass/*.+(scss|sass)", ["sass"]);
});

gulp.task(
  "default",
  ["scripts", "sass", "sass:watch", "compress", "serve"],
  function() {
    return gulp.src("./js/app.js").pipe(gulp.dest("./"));
  }
);

gulp.task("compress", function(cb) {
  pump([gulp.src("./js/app.js"), uglify(), gulp.dest("./")], cb);
});
