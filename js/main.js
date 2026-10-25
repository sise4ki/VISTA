// VISTA® — IMAGE-BASED SPATIAL CORE ENGINE (HYPER-STABLE)

window.addEventListener("DOMContentLoaded", () => {
    // Мгновенно удаляем лоадер заставки
    const loader = document.querySelector(".site-loader");
    if (loader) loader.remove();

    const mapContainer = document.querySelector('#map');
    if (!mapContainer) return;

    // Функция инициализации, которая сработает только когда Leaflet готов
    function initVistamap() {
        if (typeof L === "undefined") {
            // Если Leaflet еще не прогрузился, ждем еще 50 миллисекунд и пробуем снова
            setTimeout(initVistamap, 50);
            return;
        }

        console.log("VISTA CORE: Leaflet successfully detected. Launching map...");

        // НАСТРОЙКА ХОЛСТА ПОД ЛОКАЛЬНОЕ ИЗОБРАЖЕНИЕ (2400 x 1460 px)
        const map = L.map('map', {
            crs: L.CRS.Simple,
            minZoom: -2,
            maxZoom: 2,
            zoomDelta: 1,
            snapZoom: 1
        });

        const w = 2400;
        const h = 1460;
        const bounds = [[0, 0], [h, w]];

        // Накладываем изображение карты из папки assets
        L.imageOverlay('assets/map-bg.jpg', bounds).addTo(map);
        map.fitBounds(bounds);

        // Пиксельные координаты вилл
        const realEstateMarkers = [
            { pixelCoords: [100, 200], name: "THE SUNSET PACIFIC VILLA", price: "$8,500,000", locText: "MALIBU, CA", link: "property.html?house=malibu-sunset-villa", img: "assets/malibu-villa.jpg" },
            { pixelCoords: [300, 400], name: "BEL AIR MINIMALIST ESTATE", price: "$12,900,000", locText: "LOS ANGELES, CA", link: "property.html?house=la-modern-estate", img: "assets/la-estate.jpg" },
            { pixelCoords: [500, 600], name: "BRICKELL SKY PENTHOUSE", price: "$4,200,000", locText: "MIAMI, FL", link: "property.html?house=miami-penthouse", img: "assets/miami-penthouse.jpg" },
            { pixelCoords: [700, 800], name: "SOHO ARCHITECTURAL LOFT", price: "$5,600,000", locText: "NEW YORK, NY", link: "property.html?house=ny-luxury-loft", img: "assets/ny-loft.jpg" }
        ];

        const customIcon = L.divIcon({
            className: 'custom-map-marker',
            html: '<div class="pin-pulse-light"></div><div class="pin-dot-proper"></div>',
            iconSize: [20, 20],
            iconAnchor: [10, 10]
        });

        realEstateMarkers.forEach(data => {
            const popupContent = `
                <div class="map-popup-card">
                    <img src="${data.img}" alt="${data.name}" style="width:100%; height:110px; object-fit:cover; display:block;">
                    <div class="popup-meta" style="margin-top:8px;">
                        <h4 style="font-size:11px; font-weight:700; text-transform:uppercase; margin:0; color:#111; font-family:sans-serif;">${data.name}</h4>
                        <span style="font-size:9px; color:#384a37; font-weight:600; display:block; margin:3px 0 6px; font-family:monospace;">${data.price} // ${data.locText}</span>
                        <a href="${data.link}" style="display:block; font-size:9px; font-weight:700; text-decoration:none; color:#111; border-top:1px solid #eee; padding-top:5px; letter-spacing:0.5px; font-family:monospace;">VIEW SPECIFICATION →</a>
                    </div>
                </div>`;

            L.marker(data.pixelCoords, { icon: customIcon })
                .addTo(map)
                .bindPopup(popupContent, { maxWidth: 240, className: 'vista-custom-popup' });
        });

        setTimeout(() => { map.invalidateSize(); }, 300);
    }

    // Запускаем нашу безопасную проверку
    initVistamap();
});
