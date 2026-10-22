// VISTA® REAL ESTATE — SAVED RESIDENCES LOGIC (TOTAL PRODUCTION READY)

// Порядок ID домов на главной странице для автоматического назначения кнопок
const PROPERTY_IDS_ORDER = [
    "malibu-sunset-villa",
    "miami-penthouse",
    "la-modern-estate",
    "ny-luxury-loft"
];

// Получение списка сохраненных ID из localStorage
function getSaved() {
    try {
        const saved = JSON.parse(localStorage.getItem("estate-saved") || "[]");
        return Array.isArray(saved) ? saved.filter(id => USA_PROPERTIES[id]) : [];
    } catch { return []; }
}

// Сохранение списка в localStorage и обновление счетчика
function saveList(items) {
    localStorage.setItem("estate-saved", JSON.stringify(items));
    if (typeof updateSavedCount === "function") updateSavedCount();
}

// Автоматический поиск кнопок на главной и расстановка правильных иконок (♡ / ♥)
function initAndRenderButtons() {
    const list = getSaved();
    // Ищем любые кнопки в карточках каталога
    const buttons = document.querySelectorAll(".wishlist-button, .product-card button, .catalog-inner-scroll button");
    
    buttons.forEach((btn, index) => {
        // Если у кнопки еще нет дата-атрибута, привязываем его по индексу карточки
        if (!btn.dataset.wishlistId && PROPERTY_IDS_ORDER[index]) {
            btn.dataset.wishlistId = PROPERTY_IDS_ORDER[index];
        }

        const id = btn.dataset.wishlistId;
        if (!id) return;

        const active = list.includes(id);
        
        // Добавляем/убираем класс активности и меняем символ сердечка
        btn.classList.toggle("is-favorite", active);
        btn.textContent = active ? "♥" : "♡";
    });
}

// ЖЕСТКИЙ ПЕРЕХВАТ КЛИКА ПО СЕРДЕЧКУ (Срабатывает раньше переходов по ссылкам карточек)
document.addEventListener("click", (e) => {
    // Проверяем, кликнули ли мы по сердечку
    const btn = e.target.closest(".wishlist-button") || e.target.closest("[data-wishlist-id]");
    if (!btn) return; // Если клик мимо сердечка, даем сайту работать штатно
    
    // БЛОКИРОВКА ПЕРЕХОДА: глушим клик, чтобы страница товара не открывалась
    e.preventDefault();
    e.stopPropagation();
    e.stopImmediatePropagation();

    const id = btn.dataset.wishlistId;
    if (!id) return;

    const list = getSaved();
    const idx = list.indexOf(id);

    if (idx !== -1) {
        list.splice(idx, 1); // Если уже было — удаляем
    } else {
        list.push(id); // Если не было — добавляем
    }

    saveList(list);
    initAndRenderButtons(); // Перерисовываем сердечки на главной
    
    // Если мы находимся на странице сохраненного, обновляем список карточек
    if (document.getElementById("wishlistItems")) {
        renderPage();
    }
}, true); // Флаг true перехватывает событие на самом верхнем уровне до выполнения других скриптов

// Отрисовка карточек на странице сохраненного (saved.html)
function renderPage() {
    const container = document.getElementById("wishlistItems");
    const empty = document.getElementById("wishlistEmpty");
    if (!container || !empty) return;

    const list = getSaved();
    container.innerHTML = "";
    
    empty.hidden = list.length > 0;
    container.hidden = list.length === 0;

    list.forEach(id => {
        const house = USA_PROPERTIES[id];
        if (!house) return;
        
        const card = document.createElement("article");
        card.className = "wishlist-card";
        
        card.innerHTML = `
            <div class="wishlist-card-image" onclick="window.location.href='property.html?house=${house.id}'" style="cursor:pointer; height:220px; display:flex; flex-direction:column; justify-content:center; align-items:center; background:#f0eae0; border-bottom: 1px solid #e2e4e8; overflow:hidden;">
                <img src="${house.image}" alt="${house.name}" style="width:100%; height:100%; object-fit:cover;">
            </div>
            <div class="wishlist-card-info" style="padding: 20px; background:#fff;">
                <p class="wishlist-card-category" style="color:var(--brand-olive); font-family:var(--font-mono); font-size:9px; font-weight:500;">${house.category}</p>
                <h2 class="wishlist-card-name" style="font-size:16px; margin:10px 0 6px; text-transform:uppercase; font-weight:600;">${house.name}</h2>
                <p class="wishlist-card-price" style="font-family:var(--font-mono); font-size:13px; font-weight:600; color:var(--text-tech); margin-bottom:15px;">${formatCurrency(house.price)}</p>
                <div class="wishlist-card-actions" style="display:flex; gap:10px;">
                    <a class="wishlist-view-button" href="property.html?house=${house.id}" style="flex:1; background:var(--brand-olive); color:#fff; font-size:10px; display:grid; place-items:center; font-family:var(--font-mono); height:40px; text-transform:uppercase; font-weight:600; text-decoration:none;">DISCLOSE ASSET ↗</a>
                    <button class="wishlist-remove-button" type="button" data-remove-house="${house.id}" style="background:transparent; border:1px solid #baa998; color:#555; padding:0 14px; font-size:10px; font-family:var(--font-mono); cursor:pointer; height:40px; text-transform:uppercase; font-weight:600;">DISMISS ×</button>
                </div>
            </div>
        `;
        container.appendChild(card);
    });
}

// Обработка клика по кнопке DISMISS на странице saved.html
document.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-remove-house]");
    if (!btn) return;
    
    e.preventDefault();
    e.stopPropagation();
    
    const list = getSaved().filter(id => id !== btn.dataset.removeHouse);
    saveList(list);
    initAndRenderButtons();
    renderPage();
});

// Инициализация скрипта после полной загрузки DOM дерева
document.addEventListener("DOMContentLoaded", () => { 
    initAndRenderButtons(); 
    if (document.getElementById("wishlistItems")) {
        renderPage(); 
    }
});
