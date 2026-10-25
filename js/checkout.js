// ==========================================================================
// VISTA® ARCHITECTURAL REVENUE — INTEGRATED PROTOCOL (ANTI-CORS MONOLITH v4)
// ==========================================================================

// Проверяем загрузку официальной библиотеки EmailJS
if (!window.emailjs) {
    console.error("VISTA STATUS: EmailJS SDK failed to load.");
}
// 🚨 НАСТРОЙКА EMAILJS: Твои проверенные боевые идентификаторы
const EMAILJS_PUBLIC_KEY  = "NHhUg6GI7SGEqWbYY";   
const EMAILJS_SERVICE_ID  = "service_addicku";   
const EMAILJS_TEMPLATE_ID = "template_fotdhjc";  


window.addEventListener("DOMContentLoaded", () => {
    if (!window.emailjs) {
    alert("Email service unavailable. Please reload the page.");
    return;
}

emailjs.init({
    publicKey: EMAILJS_PUBLIC_KEY
});
    const form = document.querySelector("#checkoutForm");
    const container = document.querySelector("#checkoutItems");
    const totalEl = document.querySelector("#checkoutTotal");
    const success = document.querySelector("#orderSuccess");

    let selectedHouse = null;
    try { selectedHouse = JSON.parse(localStorage.getItem("estate-last-viewed")); } catch { selectedHouse = null; }
    if (!selectedHouse) selectedHouse = USA_PROPERTIES["malibu-sunset-villa"];

    if (container && selectedHouse) {
        container.innerHTML = `
            <div class="checkout-item" style="display:flex; gap:20px; align-items:center; padding:15px 0; border-bottom:1px solid #e2e4e8;">
                <div style="width:90px; height:75px; background:#f0eae1; border: 1px solid #ccd0d8; overflow:hidden; flex-shrink:0;">
                    <img src="${selectedHouse.image}" alt="${selectedHouse.name}" style="width:100%; height:100%; object-fit:cover; display:block;">
                </div>
                <div>
                    <p style="font-family:var(--font-body); font-size:13px; font-weight:700; color:var(--text-tech); text-transform:uppercase; margin:0;">${selectedHouse.name}</p>
                    <p style="font-family:var(--font-mono); font-size:10px; color:var(--muted-tech); margin-top:6px; text-transform:uppercase;">${selectedHouse.location}</p>
                    <p style="font-family:var(--font-mono); font-size:9px; color:var(--accent-glow); margin-top:2px;">${selectedHouse.beds} BEDS · ${selectedHouse.baths} BATHS · ${selectedHouse.sqft} SQ FT</p>
                </div>
            </div>`;
        if (totalEl) totalEl.textContent = formatCurrency(selectedHouse.price);
    }

    if (form) {
        form.addEventListener("submit", (e) => {
            e.preventDefault();
            const btn = form.querySelector('[type="submit"]');
            if (btn) { btn.disabled = true; btn.textContent = "DISPATCHING ACQUISITION ENCRYPT..."; }

            const ref = "VS-" + Date.now().toString().slice(-6);
            let selectedTourType = "IN-PERSON PRIVATE PROTOCOL SHOWING";
            const checkedRadio = form.querySelector('input[type="radio"]:checked');
            if (checkedRadio) {
                const strongText = checkedRadio.closest('.custom-radio-container').querySelector('strong');
                if (strongText) selectedTourType = strongText.textContent.trim();
            }

            const getVal = (selector) => { const el = form.querySelector(selector); return el ? el.value.trim() : ""; };

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

            // Прямой боевой вызов встроенной библиотеки без посредников
            window.emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams, EMAILJS_PUBLIC_KEY)
                .then(() => {
                    console.log('VISTA STATUS: PROTOCOL SUCCESS.');
                    showSuccessScreen(ref);
                })
                .catch((error) => {
                    console.error('VISTA STATUS: EXCEPTION.', error);
                    const serverMessage = error && error.text ? error.text : JSON.stringify(error);
                    alert("SERVER PROTOCOL ERROR: " + serverMessage);
                    if (btn) { btn.disabled = false; btn.textContent = "SUBMIT PROTOCOL REQUEST ↗"; }
                });
        });
    }

    function showSuccessScreen(ref) {
        if (document.querySelector("#orderReference")) document.querySelector("#orderReference").textContent = ref;
        if (form) form.hidden = true;
        if (document.querySelector(".booking-summary-section")) document.querySelector(".booking-summary-section").hidden = true;
        if (document.querySelector(".booking-title")) document.querySelector(".booking-title").hidden = true;
        if (success) success.hidden = false;
    }
});
