import { src, dest, watch } from 'gulp';
import htmlmin from 'gulp-htmlmin';
import * as dartSass from 'sass'
import gulpSass from 'gulp-sass';
const sass = gulpSass(dartSass);
import concat from 'gulp-concat';
import cleanCSS from 'gulp-clean-css';
import autoprefixer from 'gulp-autoprefixer';
import terser from 'gulp-terser';
import imagemin from 'gulp-imagemin';
import optipng from 'imagemin-optipng';

export async function parse_and_export_html(){
    return src('./src/html/**/*.html')
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(dest('../public/dist/'));
}

export async function parse_and_export_fonts(){
    return src('./src/fonts/**/*', {encoding: false})
        .pipe(dest('../public/dist/fonts'));
}

export async function parse_and_export_sounds(){
    return src('./src/sounds/**/*', {encoding: false})
        .pipe(dest('../public/dist/sounds'));
}

export async function parse_and_export_scss(){
    return src('./src/scss/**/*.scss')
        .pipe(sass())
        .pipe(autoprefixer())
        .pipe(concat('main.css'))
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(dest('../public/dist/'));
}

export async function parse_and_export_js(){
    return src('./src/js/**/*.js')
        .pipe(concat('main.js'))
        .pipe(terser())
        .pipe(dest('../public/dist/'));
}

export async function optimize_and_export_images(){
    return src('./src/img/**', {encoding: false})
        .pipe(imagemin([
            optipng()
        ]))
        .pipe(dest('../public/dist/img/'))
}

async function watch_html(){
    watch('./src/html/**/*.html', async function html(){
        return await parse_and_export_html();
    });
}

async function watch_scss(){
    watch('./src/scss/**/*.scss', async function scss(){
        return await parse_and_export_scss();
    });
}

async function watch_js(){
    watch('./src/js/**/*.js', async function js(){
        return await parse_and_export_js();
    });
}

async function watch_images(){
    watch('./src/img/**', async function img(){
        return await optimize_and_export_images();
    });
}

export async function watch_build(){
    await parse_and_export_html();
    await parse_and_export_scss();
    await parse_and_export_js();
    await parse_and_export_fonts();
    await parse_and_export_sounds();
    
    watch_html();
    watch_scss();
    watch_images();
    watch_js();
}

async function no_watch_build(){
    await parse_and_export_html();
    await parse_and_export_scss();
    await parse_and_export_js();
    await optimize_and_export_images();
    await parse_and_export_fonts();
    await parse_and_export_sounds();
}

export default no_watch_build;
