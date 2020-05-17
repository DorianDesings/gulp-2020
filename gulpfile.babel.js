import gulp from 'gulp'
import babel from 'gulp-babel'
import terser from 'gulp-terser'
import concat from 'gulp-concat'

gulp.task('babel', () => {
    return gulp
        .src('./src/js/*.js')
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(terser())
        .pipe(concat('scripts-min.js'))
        .pipe(gulp.dest('./public/js'))
})

gulp.task('default', () => {
    gulp.watch('./src/js/*.js', gulp.series('babel'))
})