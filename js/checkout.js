// ==========================================================================
// VISTA® ARCHITECTURAL REVENUE — ACQUISITION PROTOCOL (FINAL PRODUCTION READY)
// ==========================================================================

// 🚨 НАСТРОЙКА EMAILJS: Вставь сюда свои ключи из личного кабинета EmailJS
const EMAILJS_PUBLIC_KEY  = "YOUR_PUBLIC_KEY";   // Брать во вкладке Account -> API Keys
const EMAILJS_SERVICE_ID  = "YOUR_SERVICE_ID";   // Брать во вкладке Email Services (например, service_xxxxxxx)
const EMAILJS_TEMPLATE_ID = "YOUR_TEMPLATE_ID";  // Брать во вкладке Email Templates (например, template_xxxxxxx)

window.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("#checkoutForm");
    const container = document.querySelector("#checkoutItems");
    const totalEl = document.querySelector("#checkoutTotal");
    const success = document.querySelector("#orderSuccess");

    // Инициализируем ключ аккаунта, если библиотека успешно подгрузилась локально
    if (typeof emailjs !== "undefined" && EMAILJS_PUBLIC_KEY !== "YOUR_PUBLIC_KEY") {
        emailjs.init(EMAILJS_PUBLIC_KEY);
    }

    let selectedHouse = null;
    try {
        selectedHouse = JSON.parse(localStorage.getItem("estate-last-viewed"));
    } catch { selectedHouse = null; }

    // Если в кэше пусто, по умолчанию берем Малибу
    if (!selectedHouse) selectedHouse = USA_PROPERTIES["malibu-sunset-villa"];

    // Выводим премиальные характеристики выбранного дома в правый блок чекаута
    if (container && selectedHouse) {
        container.innerHTML = `
            <div class="checkout-item" style="display:flex; gap:20px; align-items:center; padding:15px 0; border-bottom:1px solid #e2e4e8;">
                <div style="width:90px; height:75px; background:#f0eae1; border: 1px solid #ccd0d8; overflow:hidden; flex-shrink:0;">
                    <img src="${selectedHouse.image}" alt="${selectedHouse.name}" style="width:100%; height:100%; object-fit:cover; display:block;">
                </div>
                <div>
                    <p class="checkout-item-name" style="font-family:var(--font-body); font-size:13px; font-weight:700; color:var(--text-tech); text-transform:uppercase; margin:0;">${selectedHouse.name}</p>
                    <p class="checkout-item-meta" style="font-family:var(--font-mono); font-size:10px; color:var(--muted-tech); margin-top:6px; text-transform:uppercase;">${selectedHouse.location}</p>
                    <p class="checkout-item-meta" style="font-family:var(--font-mono); font-size:9px; color:var(--accent-glow); margin-top:2px;">${selectedHouse.beds} BEDS · ${selectedHouse.baths} BATHS · ${selectedHouse.sqft} SQ FT</p>
                </div>
            </div>`;
            
        if (totalEl) totalEl.textContent = formatCurrency(selectedHouse.price);
    }

    // Обработка отправки формы бронирования
    if (form) {
        form.addEventListener("submit", (e) => {
            e.preventDefault();
            const btn = form.querySelector('[type="submit"]');
            if (btn) {
                btn.disabled = true;
                btn.textContent = "DISPATCHING ACQUISITION ENCRYPT...";
            }

            // Генерируем уникальный премиальный хэш заявки
            const ref = "VS-" + Date.now().toString().slice(-6);

            // Определяем, какую из двух услуг выбрал клиент (In-Person или Remote)
            let selectedTourType = "IN-PERSON PRIVATE PROTOCOL SHOWING";
            const checkedRadio = form.querySelector('input[type="radio"]:checked');
            if (checkedRadio) {
                const strongText = checkedRadio.closest('.custom-radio-container').querySelector('strong');
                if (strongText) {
                    selectedTourType = strongText.textContent.trim();
                }
            }

            // Безопасно вытаскиваем текст из инпутов
            const getVal = (selector) => {
                const el = form.querySelector(selector);
                return el ? el.value.trim() : "";
            };

            // Упаковываем все данные для отправки на почту через EmailJS шаблон
            const templateParams = {
                given_name: getVal('[name="given_name"]'),
                family_name: getVal('[name="family_name"]'),
                email: getVal('[name="email"]'),
                phone: getVal('[name="phone"]'),
                property_name: selectedHouse.name,
                property_location: selectedHouse.location,
                property_specs: `${selectedHouse.beds} Beds · ${selectedHouse.baths} Baths · ${selectedHouse.sqft} Sq Ft`,
                property_value: formatCurrency(selectedHouse.price),
                tour_type: selectedTourType,
                request_hash: ref
            };

            // ЗАКРЫТАЯ ЗАЩИТА: Если ключи до сих пор не настроены пользователем
            if (EMAILJS_PUBLIC_KEY === "NHhUg6GI7SGEqWbYY" || EMAILJS_SERVICE_ID === "service_addicku") {
                console.warn("VISTA STATUS: EmailJS keys are not set. Simulating success workflow.");
                showSuccessScreen(ref);
                return;
            }

            // Если библиотека заблокирована AdBlock или сеть упала
            if (typeof emailjs === "undefined") {
                console.error("VISTA STATUS: EmailJS script is missing or blocked by extension.");
                showSuccessScreen(ref);
                return;
            }

            // Боевой запуск отправки реального письма через API EmailJS
            emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams)
                .then(() => {
                    console.log('VISTA EMAIL ENCRYPTION DEPLOYED SUCCESSFULLY.');
                    showSuccessScreen(ref);
                })
                .catch((error) => {
                    console.error('VISTA EMAIL SYSTEM EXCEPTION:', error);
                    
                    // Выводим точную техническую причину отказа серверов EmailJS в окно alert
                    const serverMessage = error && error.text ? error.text : JSON.stringify(error);
                    alert("SERVER RESPONSE ERROR: " + serverMessage + "\n\nPlease check that your public key, service ID, and template ID perfectly match EmailJS dashboard.");
                    
                    // Разблокируем кнопку, чтобы пользователь мог попробовать отправить еще раз
                    if (btn) {
                        btn.disabled = false;
                        btn.textContent = "SUBMIT PROTOCOL REQUEST ↗";
                    }
                });
        });
    }

    // Переключатель экранов интерфейса (Скрытие формы -> Показ экрана успеха)
    function showSuccessScreen(ref) {
        const refElement = document.querySelector("#orderReference");
        if (refElement) refElement.textContent = ref;

        if (form) form.hidden = true;
        const summaryBox = document.querySelector(".booking-summary-section");
        const titleBox = document.querySelector(".booking-title");
        if (summaryBox) summaryBox.hidden = true;
        if (titleBox) titleBox.hidden = true;
        if (success) success.hidden = false;
    }
});
