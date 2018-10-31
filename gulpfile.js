/* Feather */
var iconPack = 'feather';
var iconPrefix = 'fe';

/* ZondIcons */
// var iconPack = 'zondicons';
// var iconPrefix = 'zi';

/* 60 Vicons */
// var iconPack = '60vicons';
// var iconPrefix = 'vi';

/* LinearIcons Free */
// var iconPack = 'linearicons';
// var iconPrefix = 'lnr';

/* Entypo + */
// var iconPack = 'entypo';
// var iconPrefix = 'et';

/* Ionicon ios + */
// var iconPack = 'ionios';
// var iconPrefix = 'ios';

/* Ionicon material design + */
// var iconPack = 'ionmd';
// var iconPrefix = 'md';

/* Ionicon logo + */
// var iconPack = 'ionlogo';
// var iconPrefix = 'logo';

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