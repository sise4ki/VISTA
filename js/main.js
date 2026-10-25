// VISTA® — HIGH-RESOLUTION SPATIAL ENGINE (PROPERSTAR EDITORIAL STYLING)

window.addEventListener("DOMContentLoaded", () => {
    // Мгновенно удаляем лоадер заставки
    const loader = document.querySelector(".site-loader");
    if (loader) loader.remove();

    const mapContainer = document.querySelector('#map');
    if (!mapContainer) return;

    function initVistamap() {
        if (typeof L === "undefined") {
            setTimeout(initVistamap, 50);
            return;
        }

        // Центрируем карту строго по центру США с идеальным приближением (Zoom: 4)
        const map = L.map('map', {
            zoomControl: true,
            minZoom: 3,
            maxZoom: 18
        }).setView([37.0902, -95.7129], 4); 

        // Подключаем светлые классические плитки OpenStreetMap с голубыми океанами
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://openstreetmap.org">OpenStreetMap</a> contributors',
            maxZoom: 19
        }).addTo(map);

        // ТОЧНЫЕ РЕАЛЬНЫЕ КООРДИНАТЫ ДОМОВ В США (Широта и Долгота)
        const realEstateMarkers = [
            {
                coords: [34.0259, -118.7798], // Реальный Малибу, Калифорния
                name: "THE SUNSET PACIFIC VILLA",
                price: "$8,500,000",
                locText: "MALIBU, CA",
                link: "property.html?house=malibu-sunset-villa",
                img: "assets/malibu-villa.jpg"
            },
            {
                coords: [34.0837, -118.4466], // Реальный Бель-Эйр, Лос-Анджелес
                name: "BEL AIR MINIMALIST ESTATE",
                price: "$12,900,000",
                locText: "LOS ANGELES, CA",
                link: "property.html?house=la-modern-estate",
                img: "assets/la-estate.jpg"
            },
            {
                coords: [25.7617, -80.1918], // Реальный Брикелл, Майами, Флорида
                name: "BRICKELL SKY PENTHOUSE",
                price: "$4,200,000",
                locText: "MIAMI, FL",
                link: "property.html?house=miami-penthouse",
                img: "assets/miami-penthouse.jpg"
            },
            {
                coords: [40.7233, -74.0030], // Реальный Сохо, Нью-Йорк
                name: "SOHO ARCHITECTURAL LOFT",
                price: "$5,600,000",
                locText: "NEW YORK, NY",
                link: "property.html?house=ny-luxury-loft",
                img: "assets/ny-loft.jpg"
            }
        ];

        // Кастомизируем маркер под неоновые синие точки Properstar
        const customIcon = L.divIcon({
            className: 'custom-map-marker',
            html: '<div class="pin-pulse-light"></div><div class="pin-dot-proper"></div>',
            iconSize: [20, 20],
            iconAnchor: [10, 10]
        });

        // Расставляем маркеры по Америке
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

        // Моментальный пересчет размеров холста, чтобы карта не сжималась
        setTimeout(() => { map.invalidateSize(); }, 200);
    }

    initVistamap();
});
