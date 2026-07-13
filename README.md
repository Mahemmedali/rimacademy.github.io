# RİMA — Tam işlək landing page

Bu paket GitHub Pages üçün hazır statik saytdır. `index.html` faylını açdıqda bütün bölmələr, mobil menyu, FAQ, sillabus, qiymət kartları və qeydiyyat forması işləyir.

## Fayl strukturu
- `index.html` — bütün məzmun
- `style.css` — bütün dizayn və responsive qaydalar
- `script.js` — menyu, FAQ, qiymət seçimi və forma funksiyaları
- `config.js` — e-mail və sosial linklərin dəyişdirilməsi
- `assets/` — logo, favicon, mentor placeholder və sosial paylaşım şəkli
- `manifest.webmanifest`, `robots.txt`, `sitemap.xml`, `404.html` — launch/SEO faylları

## Mütləq dəyişdiriləcək 3 parametr
`config.js` faylını açın:
```js
window.RIMA_CONFIG = {
  contactEmail: "sizin-emailiniz@example.com",
  instagramUrl: "https://instagram.com/...",
  linkedinUrl: "https://linkedin.com/in/..."
};
```
Forma `mailto:` üsulu ilə işləyir: ziyarətçinin e-mail tətbiqini açır. Backend tələb etmir və GitHub Pages ilə işləyir.

## Təlimçi fotosunu dəyişmək
`assets/mentor-placeholder.svg` faylını öz fotonuzla əvəz edin. PNG/JPG istifadə edirsinizsə, `index.html` daxilində fayl adını dəyişin.

## Qiymətləri dəyişmək
`index.html` faylında `390`, `690` və `990` mətnlərini axtarın. `data-course` atributundakı qiyməti də eyni qaydada dəyişin.

## GitHub Pages launch
1. GitHub-da repository yaradın: `rimaacademy.github.io`
2. Bu qovluqdakı **bütün faylları qovluğun özü olmadan** repository kökünə yükləyin.
3. `Settings → Pages → Deploy from a branch → main → /(root) → Save`
4. Bir neçə dəqiqə sonra sayt `https://rimaacademy.github.io` ünvanında açılacaq.

## Qeyd
Saytda xarici font, kitabxana, video və ya CDN istifadə edilmir. İstifadə olunan bütün vizual assetlər paketə daxildir.
