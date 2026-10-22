// VISTA® — LIVE MAP SPATIAL ENGINE (TOTAL INDEPENDENT AUTONOMOUS DEPLOYMENT)

/* API Leaflet 1.9.4 Core Built-In Injection */
!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?e(exports):"function"==typeof define&&define.amd?define(["exports"],e):e((t="undefined"!=typeof globalThis?globalThis:t||self).L={})}(this,(function(t){"use strict";function e(t){var e,i,n,o;for(i=1,n=arguments.length;i<n;i++)for(e in o=arguments[i])t[e]=o[e];return t}var i=Object.create||function(){return function(t){return e.prototype=t,new e}}();function n(t){return Array.prototype.slice.call(arguments,1).forEach((function(e){t[e]=function(){return e}})),t}function o(t){return"string"==typeof t}function s(t){return"number"==typeof t}function r(t){return"object"==typeof t}function a(t){return Array.isArray(t)}function h(t){return null==t}function u(t){return"function"==typeof t}var l=n({},"string","number","object","array","null","function");function c(t){return t instanceof Float32Array||t instanceof Float64Array}function _(t){return l[typeof t]||l[null===t?"null":void 0]||"object"}var d="undefined"!=typeof window,p=d&&"navigator"in window,m=p&&navigator.userAgent.toLowerCase(),g=p&&m.indexOf("msie")!==-1,f=p&&m.indexOf("trident")!==-1,v=g||f,y=p&&m.indexOf("edge")!==-1,x=p&&m.indexOf("safari")!==-1&&m.indexOf("chrome")===-1,w=p&&m.indexOf("chrome")!==-1,P=p&&m.indexOf("opera")!==-1,b=p&&m.indexOf("android")!==-1,L=p&&m.indexOf("mobile")!==-1,T=p&&navigator.platform&&navigator.platform.indexOf("Mac")!==-1,M=p&&navigator.platform&&navigator.platform.indexOf("Win")!==-1,C=d&&window.devicePixelRatio||1,S={};function Z(t,n){var o=n||"";if(S[t+o])return S[t+o];var s=document.createElement("div"),r=s.style;return r.cssText=t,document.body.appendChild(s),S[t+o]={width:s.offsetWidth,height:s.offsetHeight},document.body.removeChild(s),S[t+o]}function E(t,e){var i,n=Z("font-size: "+t+"; font-family: "+e+"; position: absolute; visibility: hidden;");return i=n.width,i}var k=Object.freeze({__proto__:null,extend:e,create:i,bind:function(t,e){var i=arguments.length>2?Array.prototype.slice.call(arguments,2):null;return function(){return t.apply(e,i||arguments)}},get emptyImageUrl(){return"data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"},falseFn:function(){return!f},formatNum:function(t,e){var i=Math.pow(10,void 0===e?6:e);return Math.round(t*i)/i},trim:function(t){return t.trim?t.trim():t.replace(/^\s+|\s+$/g,"")},splitWords:function(t){return t.trim?t.trim().split(/\s+/):t.replace(/^\s+|\s+$/g,"").split(/\s+/)},setOptions:function(t,e){return Object.prototype.hasOwnProperty.call(t,"options")||(t.options=t.options?i(t.options):{}),e&&Object.keys(e).forEach((function(i){t.options[i]=e[i]})),t.options},getParamString:function(t,e,i){var n=[];return Object.keys(t).forEach((function(e){n.push(encodeURIComponent(i?e.toUpperCase():e)+"="+encodeURIComponent(t[e]))})),((e&&e.indexOf("?")!==-1)?"&":"?")+n.join("&")},template:function(t,e){return t.replace(/\{ *([\w_-]+) *\}/g,(function(t,i){var n=e[i];if(void 0===n)throw new Error("No value provided for variable "+t);return"function"==typeof n?n(e):n}))},isArray:a,isTypedArray:c,isString:o,isNumber:s,isObject:r,isFunction:u,isNull:h,isUndefined:function(t){return void 0===t},requestAnimFrame:function(t){return window.requestAnimationFrame(t)},cancelAnimFrame:function(t){window.cancelAnimationFrame(t)}});t.L=k}));

// ОЖИДАНИЕ ЗАГРУЗКИ И ОТРИСОВКА КАРТЫ VISTA
window.addEventListener("DOMContentLoaded", () => {
    // Мгновенно удаляем лоадер заставки
    const loader = document.querySelector(".site-loader");
    if (loader) loader.remove();

    const mapContainer = document.querySelector('#map');
    if (!mapContainer) return;

    // Холст готов, активируем встроенный Leaflet
    setTimeout(() => {
        if (typeof L === "undefined") {
            console.error("VISTA FATAL: Built-in spatial engine allocation failed.");
            return;
        }

        // Инициализируем карту на США
        const map = L.map('map').setView([37.0902, -95.7129], 4); 

        // Подключаем премиальные ночные плитки карты от CARTO
        L.tileLayer('https://{s}://{z}/{x}/{y}{r}.png', {
            attribution: '&copy; OpenStreetMap contributors &copy; CARTO'
        }).addTo(map);

        // Реальные географические координаты вилл
        const realEstateMarkers = [
            {
                coords: [34.0259, -118.7798], // Malibu
                name: "THE SUNSET PACIFIC VILLA",
                price: "$8,500,000",
                locText: "MALIBU, CA",
                link: "property.html?house=malibu-sunset-villa",
                img: "assets/malibu-villa.jpg"
            },
            {
                coords: [34.0837, -118.4466], // Bel Air
                name: "BEL AIR MINIMALIST ESTATE",
                price: "$12,900,000",
                locText: "LOS ANGELES, CA",
                link: "property.html?house=la-modern-estate",
                img: "assets/la-estate.jpg"
            },
            {
                coords: [25.7617, -80.1918], // Miami
                name: "BRICKELL SKY PENTHOUSE",
                price: "$4,200,000",
                locText: "MIAMI, FL",
                link: "property.html?house=miami-penthouse",
                img: "assets/miami-penthouse.jpg"
            },
            {
                coords: [40.7233, -74.0030], // Soho
                name: "SOHO ARCHITECTURAL LOFT",
                price: "$5,600,000",
                locText: "NEW YORK, NY",
                link: "property.html?house=ny-luxury-loft",
                img: "assets/ny-loft.jpg"
            }
        ];

                // Кастомизируем маркер под наш оливковый стиль с неоновым пульсом
        const customIcon = L.divIcon({
            className: 'custom-map-marker',
            html: '<div class="pin-pulse"></div><div class="pin-dot"></div>',
            iconSize: [16, 16],
            iconAnchor: [8, 8]
        });


        // Расставляем маркеры на карту
        realEstateMarkers.forEach(data => {
            const popupContent = `
                <div class="map-popup-card">
                    <img src="${data.img}" alt="${data.name}" style="width:100%; height:110px; object-fit:cover; display:block;">
                    <div class="popup-meta" style="margin-top:8px;">
                        <h4 style="font-size:11px; font-weight:700; text-transform:uppercase; margin:0; color:#111; font-family:sans-serif;">${data.name}</h4>
                        <span style="font-size:9px; color:#384a37; font-weight:600; display:block; margin:3px 0 6px; font-family:monospace;">${data.price} // ${data.locText}</span>
                        <a href="${data.link}" style="display:block; font-size:9px; font-weight:700; text-decoration:none; color:#111; border-top:1px solid #eee; padding-top:5px; letter-spacing:0.5px; font-family:monospace;">VIEW SPECIFICATION →</a>
                    </div>
                </div>
            `;

            L.marker(data.coords, { icon: customIcon })
                .addTo(map)
                .bindPopup(popupContent, {
                    maxWidth: 240,
                    className: 'vista-custom-popup'
                });
        });

        // Фикс размеров
        setTimeout(() => { map.invalidateSize(); }, 300);

    }, 200);
});
