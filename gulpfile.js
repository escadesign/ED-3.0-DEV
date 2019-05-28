"use strict";

var gulp = require("gulp");
var sass = require("gulp-sass");
var browserSync = require("browser-sync").create();
let cleanCSS = require("gulp-clean-css");
var minify = require("gulp-minify");
var concat = require("gulp-concat");

gulp.task("scripts", function() {
  return gulp
    .src("./dev/plugins/*.js")
    .pipe(concat("app.js"))
    .pipe(gulp.dest("./dev"));
});

gulp.task("serve", ["sass"], function() {
  browserSync.init({
    server: {
      baseDir: "./"
    },
    open: true
  });

  gulp
    .watch("./assets/sass/*.+(scss|sass)", ["sass"])
    .on("change", browserSync.reload);
  gulp.watch("./*.html").on("change", browserSync.reload);
  gulp.watch("./assets/dev/js/*.js").on("change", browserSync.reload);
  gulp.watch("./*.css").on("change", browserSync.reload);
});

gulp.task("sass", function() {
  return gulp
    .src("./assets/sass/*.+(scss|sass)")
    .pipe(
      sass({
        outputStyle: "compressed"
      }).on("error", sass.logError)
    )
    .pipe(gulp.dest("./assets/css"))
    .pipe(browserSync.stream());
});

gulp.task("sass:watch", function() {
  gulp.watch("./assets/sass/*.+(scss|sass)", ["sass"]);
});

gulp.task("default", [
  "sass",
  "sass:watch",
  "scripts",
  "compress",
  "minify-css",
  "serve"
]);

gulp.task("compress", function() {
  gulp
    .src(["./dev/*.js"])
    .pipe(minify())
    .pipe(gulp.dest("./dist"));
});

gulp.task("minify-css", () => {
  return gulp
    .src("./dev/*.css")
    .pipe(cleanCSS({ compatibility: "ie8" }))
    .pipe(gulp.dest("./dist"));
});
