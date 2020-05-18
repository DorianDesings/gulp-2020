//HTML
import htmlmin from 'gulp-htmlmin'

//CSS
import postcss from 'gulp-postcss'
import cssnano from 'cssnano'
import autoprefixer from 'autoprefixer'

//JavaScript
import gulp from 'gulp'
import babel from 'gulp-babel'
import terser from 'gulp-terser'

//Common
import concat from 'gulp-concat'

//Variables/constantes
const cssPlugins = [
    cssnano(),
    autoprefixer()
]

gulp.task('html-min', () => {
    return gulp
        .src('./src/*.html')
        .pipe(htmlmin({
            collapseWhitespace: true,
            removeComments: true
        }))
        .pipe(gulp.dest('./public'))
})

gulp.task('styles', () => {
    return gulp
        .src('./src/css/*.css')
        .pipe(concat('styles-min.css'))
        .pipe(postcss(cssPlugins))
        .pipe(gulp.dest('./public/css'))
})

gulp.task('babel', () => {
    return gulp
        .src('./src/js/*.js')
        .pipe(concat('scripts-min.js'))
        .pipe(babel())
        .pipe(terser())
        .pipe(gulp.dest('./public/js'))
})

gulp.task('default', () => {
    gulp.watch('./src/*.html', gulp.series('html-min'))
    gulp.watch('./src/css/*.css', gulp.series('styles'))
    gulp.watch('./src/js/*.js', gulp.series('babel'))
})