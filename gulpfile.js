var gulp 		= require('gulp'),
    less 		= require('gulp-less'),
    uglify 		= require('gulp-uglifyjs'),
    concat 		= require('gulp-concat'),
    rename 		= require('gulp-rename'),
    cssnano 	= require('gulp-cssnano'),
    autoprefixer= require('gulp-autoprefixer'),
    del 		= require('del'),
    imagemin    = require('gulp-imagemin'),
    pngquant    = require('imagemin-pngquant'),
    browserSync = require('browser-sync'),
    tinypng = require('gulp-tinypng-compress'),
    sourcemaps = require('gulp-sourcemaps'),
    plumber = require('gulp-plumber'),
    cache       = require('gulp-cache');




//Tasks

gulp.task('css', function () {
    return gulp.src('src/less/**/*.less')
    	.pipe(plumber())
    	.pipe(sourcemaps.init())
    	.pipe(concat('style.css'))
        .pipe(less())
        .pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true }))
        .pipe(sourcemaps.write())
        .pipe(cssnano()) // Сжимаем
        .pipe(rename({suffix: '.min'})) // Добавляем суффикс .min
        .pipe(gulp.dest('src/css'))
        .pipe(browserSync.reload({stream: true}));
});


function wrapPipe(taskFn) {
  return function(done) {
    var onSuccess = function() {
      done();
    };
    var onError = function(err) {
      done(err);
    }
    var outStream = taskFn(onSuccess, onError);
    if(outStream && typeof outStream.on === 'function') {
      outStream.on('end', onSuccess);
    }
  }
}

gulp.task('browser-sync', function() { // Создаем таск browser-sync
    browserSync({ // Выполняем browser Sync
        server: { // Определяем параметры сервера
            baseDir: 'src/' // Директория для сервера - src
        },
        notify: false // Отключаем уведомления
    });
});

gulp.task('libs', function() {
    return gulp.src([ // Берем все необходимые библиотеки
        'src/js-libs/jquery/dist/jquery.min.js',
        'src/js-libs/slick-carousel/slick/slick.min.js',
        'src/js-libs/wow/dist/wow.min.js'])
        .pipe(concat('libs.min.js')) // Собираем их в кучу в новом файле libs.min.js
        .pipe(uglify()) // Сжимаем JS файл
        .pipe(gulp.dest('src/js')); // Выгружаем в папку src/js
});

gulp.task('watch', ['browser-sync', 'css','libs'], function() {
    gulp.watch('src/less/**/*.less', ['css']);
    gulp.watch('src/*.html', browserSync.reload);
    gulp.watch('src/js/**/*.js', browserSync.reload);
});


gulp.task('clean', function() {
    return del.sync('build'); // Удаляем папку dist перед сборкой
});

gulp.task('img', function() {
    return gulp.src('src/img/**/*') // Берем все изображения из app
        .pipe(cache(imagemin({  // Сжимаем их с наилучшими настройками с учетом кеширования
            interlaced: true,
            progressive: true,
            //optimizationLevel: 5,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()]
        })))
        .pipe(gulp.dest('build/img')); // Выгружаем на продакшен
});

gulp.task('tinypng', function () {
    gulp.src('src/img/**/*.{png,jpg,jpeg}')
        .pipe(tinypng({
            key: 'EOSPIOao-miKJ-_0nmZ8fsrrBJFS2HWR',
            sigFile: 'images/.tinypng-sigs',
            log: true
        }))
        .pipe(gulp.dest('build/img'));
});


gulp.task('build', ['clean', 'tinypng',  'css', 'libs'], function() {

    var buildCss = gulp.src([ // Переносим CSS стили в продакшен
        'src/css/style.min.css',
        //'src/css/libs.min.css'
        ])
    .pipe(gulp.dest('build/css'))

    var buildFonts = gulp.src('src/fonts/**/*') // Переносим шрифты в продакшен
    .pipe(gulp.dest('build/fonts'))

    var buildJs = gulp.src('src/js/**/*') // Переносим скрипты в продакшен
    .pipe(gulp.dest('build/js'))

    var buildHtml = gulp.src('src/*.html') // Переносим HTML в продакшен
    .pipe(gulp.dest('build'));

});

gulp.task('clear', function () {
    return cache.clearAll();
})

gulp.task('default', ['watch']);
