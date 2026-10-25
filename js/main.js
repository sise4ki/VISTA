// VISTA® — IMAGE-BASED SPATIAL CORE ENGINE (100% OFFLINE / PROPERSTAR STYLING)

window.addEventListener("DOMContentLoaded", () => {
    // Мгновенно удаляем лоадер заставки
    const loader = document.querySelector(".site-loader");
    if (loader) loader.remove();

    const mapContainer = document.querySelector('#map');
    if (!mapContainer) return;

    setTimeout(() => {
        if (typeof L === "undefined") {
            console.error("VISTA CORE: Leaflet library failed to load.");
            return;
        }

        // 1. НАСТРОЙКА ХОЛСТА ПОД ЛОКАЛЬНОЕ ИЗОБРАЖЕНИЕ
        // Включаем простую пиксельную сетку вместо географических координат
        const map = L.map('map', {
            crs: L.CRS.Simple,
            minZoom: -2, // Позволяет полностью отдалить карту, чтобы увидеть её целиком
            maxZoom: 2,  // Дает плавное приближение ровно в 4 шага масштаба
            zoomDelta: 1,
            snapZoom: 1
        });

        // 2. РАЗМЕРЫ ТВОЕЙ КАРТИНКИ (2400 x 1460 px)
        const w = 2400;
        const h = 1460;
        const bounds = [[0, 0], [h, w]];

        // Накладываем изображение карты из папки assets
        L.imageOverlay('assets/map-bg.jpg', bounds).addTo(map);

        // Автоматически центрируем объектив камеры строго по границам фотки
        map.fitBounds(bounds);

        // 3. ПИКСЕЛЬНЫЕ КООРДИНАТЫ ДОМОВ НА ФОТО КАРТЫ [Высота Y, Ширина X]
        // Все маркеры выровнены по пикселям от левого нижнего угла картинки
        const realEstateMarkers = [
            {
                pixelCoords: [610, 240], // Малибу (Западное побережье, снизу)
                name: "THE SUNSET PACIFIC VILLA",
                price: "$8,500,000",
                locText: "MALIBU, CA",
                link: "property.html?house=malibu-sunset-villa",
                img: "assets/malibu-villa.jpg"
            },
            {
                pixelCoords: [660, 260], // Бель-Эйр (Чуть выше и правее Малибу в Лос-Анджелесе)
                name: "BEL AIR MINIMALIST ESTATE",
                price: "$12,900,000",
                locText: "LOS ANGELES, CA",
                link: "property.html?house=la-modern-estate",
                img: "assets/la-estate.jpg"
            },
            {
                pixelCoords: [210, 1920], // Майами (Флорида, Юго-Восток)
                name: "BRICKELL SKY PENTHOUSE",
                price: "$4,200,000",
                locText: "MIAMI, FL",
                link: "property.html?house=miami-penthouse",
                img: "assets/miami-penthouse.jpg"
            },
            {
                pixelCoords: [980, 2120], // Сохо, Нью-Йорк (Северо-Восток)
                name: "SOHO ARCHITECTURAL LOFT",
                price: "$5,600,000",
                locText: "NEW YORK, NY",
                link: "property.html?house=ny-luxury-loft",
                img: "assets/ny-loft.jpg"
            }
        ];

        // Кастомизируем маркер под премиальный синий стиль Properstar с пульсацией
        const customIcon = L.divIcon({
            className: 'custom-map-marker',
            html: '<div class="pin-pulse-light"></div><div class="pin-dot-proper"></div>',
            iconSize: [20, 20],
            iconAnchor: [10, 10]
        });

        // Отрисовываем маркеры по рассчитанной пиксельной сетке
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

            L.marker(data.pixelCoords, { icon: customIcon })
                .addTo(map)
                .bindPopup(popupContent, {
                    maxWidth: 240,
                    className: 'vista-custom-popup'
                });
        });

        // Команда пересчета для предотвращения серых зон
        setTimeout(() => { map.invalidateSize(); }, 300);

    }, 200);
});
