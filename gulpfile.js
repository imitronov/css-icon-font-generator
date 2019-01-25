const arg = (argList => {
  let arg = {}, a, opt, thisOpt, curOpt;
  for (a = 0; a < argList.length; a++) {
    thisOpt = argList[a].trim();
    opt = thisOpt.replace(/^\-+/, '');
    if (opt === thisOpt) {
      // argument value
      if (curOpt) arg[curOpt] = opt;
      curOpt = null;
    } else {
      // argument name
      curOpt = opt;
      arg[curOpt] = true;
    }
  }
  return arg;
})(process.argv);

/* Feather */
if(arg.fe) {
	var iconPack = 'feather';
	var iconPrefix = 'fe';
}

/* SimpleIcons */
if(arg.si) {
	var iconPack = 'simpleicons';
	var iconPrefix = 'si';
}

/* ZondIcons */
if(arg.zi) {
	var iconPack = 'zondicons';
	var iconPrefix = 'zi';
}

/* 60 Vicons */
if(arg.vi) {
	var iconPack = '60vicons';
	var iconPrefix = 'vi';
}

/* LinearIcons Free */
if(arg.lnr) {
	var iconPack = 'linearicons';
	var iconPrefix = 'lnr';
}

/* Entypo + */
if(arg.et) {
	var iconPack = 'entypo';
	var iconPrefix = 'et';
}

/* Ionicon ios + */
if(arg.ios) {
	var iconPack = 'ionios';
	var iconPrefix = 'ios';
}

/* Ionicon material design + */
if(arg.md) {
	var iconPack = 'ionmd';
	var iconPrefix = 'md';
}

/* Ionicon logo + */
if(arg.logo) {
	var iconPack = 'ionlogo';
	var iconPrefix = 'logo';
}

/* Custom */
if(arg.pack !== undefined && arg.prefix !== undefined) {
	var iconPack = arg.pack;
	var iconPrefix = arg.prefix;
}

/*******************************************/

var src	= './';

var gulp 			= require("gulp"),
	sass			= require("gulp-sass"),
	csso			= require("gulp-csso"),
	autoprefixer	= require("gulp-autoprefixer"),
	rename			= require("gulp-rename"),
	concat			= require("gulp-concat"),
	font2css		= require("gulp-font2css").default,
	iconfont		= require("gulp-iconfont"),
	iconfontCss		= require("gulp-iconfont-css")
	gulpSequence	= require('gulp-sequence');

/*******************************************/

gulp.task( "font", function() {
	return gulp.src([src + "icons/" + iconPack + "/*.svg"])
		.pipe(iconfontCss({
			fontName: iconPrefix,
			cssClass: iconPrefix,
			path: src + "src/template.scss",
			targetPath: "../dist/" + iconPack + ".scss",
			fontPath: src + "dist/"
		}))
		.pipe(iconfont({
			fontName: iconPrefix,
			normalize: true,
			fontHeight: 1000
		}))
		.pipe(gulp.dest(src + "dist/"));
});

gulp.task( "sass", function() {
	return gulp.src([ src + "dist/" + iconPack + ".scss" ])
		.pipe( rename( { suffix: ".min", prefix : ""} ) )
		.pipe( sass() )
		.pipe( gulp.dest( src + "dist/" ) );
} );

gulp.task( "base64", function() {
	return gulp.src( src + "dist/" + iconPrefix + ".{woff, ttf}" )
		.pipe( font2css() )
		.pipe( concat( iconPrefix + "-font.min.css") )
		.pipe( gulp.dest( src + "dist/" ) );
} );

gulp.task( "css", function() {
	return gulp.src([ src + "dist/" + iconPack + ".min.css", src + "dist/" + iconPrefix + "-font.min.css" ])
		.pipe( concat( iconPrefix + "-icons.min.css" ) )
		.pipe( csso() )
		.pipe( autoprefixer() )
		.pipe( gulp.dest( src + "dist/css/" ) );
} );

gulp.task( "default",  gulpSequence( [ "font" ], [ "sass", "base64" ], [ "css" ] ) );