var gulp = require("gulp"),
	del = require("del"),
	args = require("yargs").argv,
	browserSync = require("browser-sync"),
	$ = require("gulp-load-plugins")({ lazy: true });

var config = require("./config")();

gulp.task("help", $.taskListing);

gulp.task("default", ["help"]);

gulp.task("dev", ["inject"], function () {

	var options = {
		script: config.nodeServer,
		delayTime: 1,
		env: {
			"PORT": config.port,
			"NODE_ENV": config.environment
		},
		watch: [
			"**/*.*"
		],
		ignore: config.ignore
	};

	$.nodemon(options)
		.on("restart", function (ev) {
			log("*** nodemon restarted");	
			log("*** File changed: " + ev);
			setTimeout(function () {
				browserSync.notify("Reloading now...");
				browserSync.reload({ stream: true });
			}, config.browserReloadDelay);
		})
		.on("start", function () {
			log("*** nodemon started");	
			startBrowserSync();
		})
		.on("crash", function () {
			log("*** nodemon crashed!");	
		})
		.on("exit", function () {
			log("*** nodemon exited successfully.");	
		});
});

gulp.task("lint", function () {
	log("*** Linting JS files");
	return gulp.src(config.allJs)
		.pipe($.jshint())
		.pipe($.jshint.reporter("jshint-stylish", { verbose: true }))
		.pipe($.jshint.reporter("fail"));
});

gulp.task("styles", ["clean-styles"], function () {

	log("*** Compiling Stylus ---> CSS");
	return gulp.src(config.stylus)
		.pipe($.plumber())
		.pipe($.stylus())
		.pipe(gulp.dest(config.css));
});

gulp.task("watch-styles", function () {

	log("*** Watching styles for changes ... ");
	gulp.watch(config.stylus, ["styles"]);
});

gulp.task("clean-styles", function (done) {
	log("*** Cleaning out the CSS files");
	clean(config.css + "**/*.*", done);		
});

gulp.task("wiredep", function () {

	log("*** Wiring up bower css js and our js files");
	var wiredep = require("wiredep").stream;
		options = config.getWiredepDefaultOptions();

	return gulp.src(config.index)
		.pipe(wiredep(options))
		.pipe($.inject(gulp.src(config.js)))
		.pipe(gulp.dest(config.client));
});

gulp.task("inject", ["wiredep"], function () {

	log("*** Injecting our css files into the html page");
	return gulp.src(config.index)
		.pipe($.inject(gulp.src(config.css + "site.css")))
		.pipe(gulp.dest(config.client));
});

// ------------------------------------------------------------------------
// Utilties functions
// ------------------------------------------------------------------------

function startBrowserSync() {

	if (args.verbose || browserSync.active) {
		return;
	}

	gulp.watch(config.stylus, ["styles"])
		.on("change", function (event) {
			changeEvent(event);
		});

	var options = {
		proxy: "localhost:" + config.port,
		port: 8000,
		files: [
			config.client + "**/*.*",
			"!" + config.styles + "**/*.styl",
			config.css + "**/*.css"
		],
		ghostMode: {
			clicks: true,
			location: false,
			forms: true,
			scroll: true
		},
		injectChanges: true,
		logChanges: true,
		logLevel: "debug",
		logPrefix: "gulp-patterns",
		notify: true,
		reloadDelay: 1000
	};

	browserSync(options);
}

function changeEvent(event) {
	var srcPattern = new RegExp("/.*(?=/" + config.source + ")/"); 
	log("File " + event.path.replace(srcPattern, "") + " " + event.type);
}

function clean(path, done) {
	log("*** Deleting files: " + path);
	del(path, done);
}

function log(msg) {

	if (typeof(msg) === "object") {
		for (var item in msg) {
			if (msg.hasOwnProperty(msg[item])) {
				$.util.log($.util.colors.green(msg[item]));
			}
		}
	} else {
		$.util.log($.util.colors.green(msg));
	}
}
