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
import newer from 'gulp-newer';
import optipng from 'imagemin-optipng';
import { deleteAsync } from 'del';

export async function parse_and_export_html(){
    return src('./src/html/**/*.html')
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(dest('../public/dist/'));
}

export async function export_fonts(){
    return src('./src/fonts/**/*', {encoding: false})
        .pipe(newer('../public/dist/fonts/'))
        .pipe(dest('../public/dist/fonts/'));
}

export async function export_sounds(){
    return src('./src/sounds/**/*', {encoding: false})
        .pipe(newer('../public/dist/sounds/'))    
        .pipe(dest('../public/dist/sounds/'));
}

export async function parse_and_export_scss(){
    src('./src/scss/shared/*.scss')
        .pipe(sass())
        .pipe(autoprefixer())
        .pipe(concat('main.css'))
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(dest('../public/dist/'));
    
    return src('./src/scss/unique/*.scss')
        .pipe(sass())
        .pipe(autoprefixer())
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(dest('../public/dist/'));
}

export async function parse_and_export_js(){
    src('./src/js/shared/*.js')
        .pipe(concat('main.js'))
        .pipe(terser())
        .pipe(dest('../public/dist/'));
    
    return src('./src/js/unique/*.js')
        .pipe(terser())
        .pipe(dest('../public/dist/'));
}

export async function optimize_and_export_images(){
    return src('./src/img/**', {encoding: false})
        .pipe(newer('../public/dist/img/'))
        .pipe(imagemin([
            optipng({optimizationLevel: 5})
        ]))
        .pipe(dest('../public/dist/img/'))
}

export async function export_images(){
    return src('./src/img/**', {encoding: false})
        .pipe(newer('../public/dist/img/'))
        .pipe(dest('../public/dist/img/'))
}

export async function full_clean(){
    return await deleteAsync('../public/**', { force: true });
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
        return await export_images();
    });
}

async function watch_fonts(){
    watch('./src/fonts/**', async function fonts(){
        return await export_fonts();
    });
}

async function watch_sounds(){
    watch('./src/sounds/**', async function sounds(){
        return await export_sounds();
    });
}

export async function dev_watch_build(){
    console.log("\n\x1b[43m  Atención: modo development (no se optimizan imágenes)  \x1b[0m");
    
    parse_and_export_html();
    parse_and_export_scss();
    parse_and_export_js();
    export_fonts();
    export_sounds();
    export_images();
    
    watch_html();
    watch_scss();
    watch_js();
    watch_images();
    watch_fonts();
    watch_sounds();

    console.log("esperando cambios…");
}

export function dwb(){ dev_watch_build() };

export default async function dev_build(){
    console.log("\n\x1b[43m  Atención: modo development (no se optimizan imágenes)  \x1b[0m\n");
    await parse_and_export_html();
    await parse_and_export_scss();
    await parse_and_export_js();
    await export_fonts();
    await export_sounds();
    await export_images();
}

export async function prod_build(){
    console.log("\n\x1b[42m  El momento ha llegado! (esto puede demorar varios minutos)  \x1b[0m\n");
    await full_clean();
    await parse_and_export_html();
    await parse_and_export_scss();
    await parse_and_export_js();
    await export_fonts();
    await export_sounds();
    await optimize_and_export_images();
}
