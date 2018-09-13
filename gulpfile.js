var gulp 			= require("gulp"),
	sass				= require("gulp-sass"),
	csso				= require("gulp-csso"),
	autoprefixer	= require("gulp-autoprefixer"),
	rename			= require("gulp-rename"),
	concat			= require("gulp-concat"),
	font2css		= require("gulp-font2css").default,
	iconfont		= require("gulp-iconfont"),
	iconfontCss	= require("gulp-iconfont-css")
	gulpSequence = require('gulp-sequence');

var src	= './';

gulp.task( "font", function() {
	return gulp.src([src + "node_modules/feather-icons/dist/icons/*.svg"])
		.pipe(iconfontCss({
			fontName: "fe",
			cssClass: "fe",
			path: src + "src/template.scss",
			targetPath: "../dist/feather.scss",
			fontPath: src + "dist/"
		}))
		.pipe(iconfont({
			fontName: "fe",
			normalize: true,
			fontHeight: 1000
		}))
		.pipe(gulp.dest(src + "dist/"));
});

gulp.task( "sass", function() {
	return gulp.src([ src + "dist/feather.scss" ])
		.pipe( rename( { suffix: ".min", prefix : ""} ) )
		.pipe( sass() )
		.pipe( gulp.dest( src + "dist/" ) );
} );

gulp.task( "base64", function() {
	return gulp.src( src + "dist/*.{woff, ttf}" )
		.pipe( font2css() )
		.pipe( concat("font.min.css") )
		.pipe( gulp.dest( src + "dist/" ) );
} );

gulp.task( "css", function() {
	return gulp.src([ src + "dist/feather.min.css", src + "dist/font.min.css" ])
		.pipe( concat( "fe-icons.min.css" ) )
		.pipe( csso() )
		.pipe( autoprefixer() )
		.pipe( gulp.dest( src + "dist/css/" ) );
} );

gulp.task( "default",  gulpSequence( [ "font" ], [ "sass", "base64" ], [ "css" ] ) );