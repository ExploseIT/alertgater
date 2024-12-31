/**
 
 Install node and npm from https://nodejs.org

 Copy boostrap, jquery etc to the wwwroot/dist folder from node_modules by running 'npm install' then 'npx gulp'
 
 Remove initially installed Bootstrap, jQuery by removing the css, js, and lib folders from the wwwroot folder

 Remove also _ValidationScriptsPartial.cshtml in Views/Shared

 Update the Bootstrap and jQuery links to put to those generated in the wwwroot/dist folder

 **/

 const { src, dest, series } = require('gulp');
 var clean = require('gulp-clean');
 
 
  function jqueryuicopy(cb) {
      src('./node_modules/jquery-ui/dist/jquery-ui.min.js')
          .pipe(dest('static/vendor/jquery-ui/js/'));
      src('./node_modules/jquery-ui/dist/themes/smoothness/**')
          .pipe(dest('static/vendor/jquery-ui/css/smoothness/'));
          cb();
  }
 
  function bootstrapcopy(cb) {
      src('./node_modules/bootstrap/dist/css/bootstrap.min.*')
      .pipe(dest('static/vendor/bootstrap/css/'));
      src('./node_modules/bootstrap/dist/js/bootstrap.bundle.min.*')
      .pipe(dest('static/vendor/bootstrap/js/'));
      cb();
  }
  
  function jquerycopy(cb) {
      src('./node_modules/jquery/dist/**')
    .pipe(dest('static/vendor/jquery/'));
    cb();
  }
  
  function fortawesomecopy(cb) {
      src('./node_modules/@fortawesome/fontawesome-free/css/all.css')
          .pipe(dest('static/vendor/fontawesome-free/css/'));
      src('./node_modules/@fortawesome/fontawesome-free/webfonts/fa-regular-400.*')
          .pipe(dest('static/vendor/fontawesome-free/webfonts/'));
      src('./node_modules/@fortawesome/fontawesome-free/webfonts/fa-solid-900.*')
          .pipe(dest('static/vendor/fontawesome-free/webfonts/'));
      src('./node_modules/@fortawesome/fontawesome-free/webfonts/fa-brands-400.*')
          .pipe(dest('static/vendor/fontawesome-free/webfonts/'));
      cb();
  }
 
  function normalizecopy(cb) {
     src('./node_modules/normalize.css/normalize.css')
     .pipe(dest('static/vendor/normalize.css/'));
     cb();
 }
  
  
  function jqueryvalidationcopy(cb) {
      src('./node_modules/jquery-validation/dist/*.js')
          .pipe(dest('static/vendor/jquery-validation/'));
      cb();
  }
  
  
  // The `clean` function is not exported so it can be considered a private task.
  // It can still be used within the `series()` composition.
  function doclean(cb) {
      src('dist/**', { read: false })
          .pipe(clean());
      cb();
    }
    
    // The `build` function is exported so it is public and can be run with the `gulp` command.
    // It can also be used within the `series()` composition.
    function build(cb) {
      // body omitted
      cb();
    }
    
 exports.build = build;
 
 exports.default = series(
      fortawesomecopy
      , bootstrapcopy
     , normalizecopy
     , jquerycopy
     , jqueryuicopy
     , jqueryvalidationcopy
  );
 
  exports.doclean = series(
     doclean
  );
 
 