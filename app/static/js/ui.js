(function () {
    "use strict";

    const ICONS = {
        truck: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>`,
        grid: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>`,
        mapPin: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>`,
        wrench: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>`,
        fuel: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 22V5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v17"/><path d="M15 10h2a2 2 0 0 1 2 2v2a2 2 0 0 0 2 2h0a2 2 0 0 0 2-2V9.83a2 2 0 0 0-.59-1.42L18 4"/><rect x="6" y="7" width="6" height="5"/><line x1="3" y1="22" x2="15" y2="22"/></svg>`,
        user: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>`,
        barChart: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="20" x2="12" y2="10"/><line x1="18" y1="20" x2="18" y2="4"/><line x1="6" y1="20" x2="6" y2="16"/></svg>`,
        settings: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>`,
        x: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>`,
        search: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>`,
        bell: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>`,
        edit: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>`,
        trash: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>`,
        plus: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>`,
        eye: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>`,
        eyeOff: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>`,
        arrowLeft: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>`,
        arrowRight: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>`,
        check: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>`,
        alert: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>`,
        download: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>`,
        menu: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>`,
        chevLeft: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"/></svg>`,
        chevRight: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>`,
        activity: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>`,
        package: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="16.5" y1="9.4" x2="7.5" y2="4.21"/><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>`,
        phone: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>`,
        shield: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>`,
        calendar: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>`,
        home: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>`,
        logOut: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>`,
        inbox: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="22 12 16 12 14 15 10 15 8 12 2 12"/><path d="M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"/></svg>`,
    };
    window.FleetIcons = ICONS;

    function icon(name, size) {
        size = size || 18;
        const svg = ICONS[name] || "";
        return `<span style="display:inline-flex;width:${size}px;height:${size}px">${svg}</span>`;
    }
    window.fleetIcon = icon;

    function statusPill(status) {
        const map = {
            Available: "pill-green",
            "On Trip": "pill-blue",
            "In Shop": "pill-orange",
            Completed: "pill-green",
            Dispatched: "pill-blue",
            Draft: "pill-purple",
            Cancelled: "pill-red",
            "On Duty": "pill-blue",
            "Off Duty": "pill-slate",
            Suspended: "pill-red",
            Retired: "pill-purple",
            Expired: "pill-red",
            "In Progress": "pill-yellow",
        };
        let cls = map[status] || "pill-slate";
        let extra = "";
        if (status === "Suspended") extra = " animate-pulse";
        if (status === "Expired") extra = " animate-blink";
        let style = status === "Retired" ? ' style="opacity:0.6"' : "";
        return `<span class="pill ${cls}${extra}"${style}>${status}</span>`;
    }
    window.statusPill = statusPill;

    function kpiCard(label, value, sub, iconName, accentColor) {
        return `<div class="glass-card kpi-card animate-fadeInUp" style="border-left:3px solid ${accentColor}">
      <div class="kpi-icon" style="background:${accentColor}18;border:1px solid ${accentColor}33">
        <span style="color:${accentColor}">${icon(iconName, 20)}</span>
      </div>
      <div class="kpi-label">${label}</div>
      <div class="kpi-value" data-count="${value}">${value}</div>
      <div class="kpi-sub">${sub}</div>
      <div class="watermark"><span style="color:${accentColor}">${icon(iconName, 72)}</span></div>
    </div>`;
    }
    window.kpiCard = kpiCard;

    function animateCountUp(el, target, duration) {
        duration = duration || 800;
        const start = performance.now();
        const initial = 0;
        function step(now) {
            const progress = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3); // easeOutCubic
            const current = Math.round(initial + (target - initial) * eased);
            el.textContent = current.toLocaleString("en-IN");
            if (progress < 1) requestAnimationFrame(step);
            else {
                if (el.dataset.suffix)
                    el.textContent =
                        current.toLocaleString("en-IN") + el.dataset.suffix;
                if (el.dataset.prefix)
                    el.textContent = el.dataset.prefix + el.textContent;
            }
        }
        requestAnimationFrame(step);
    }
    window.animateCountUp = animateCountUp;

    function renderTable(containerId, columns, data, options) {
        options = options || {};
        const container = document.getElementById(containerId);
        if (!container) return;

        let currentPage = 1;
        const perPage = options.perPage || 10;
        let sortCol = null;
        let sortDir = "asc";
        let searchTerm = "";

        function getData() {
            let filtered = data;
            if (searchTerm) {
                const q = searchTerm.toLowerCase();
                filtered = data.filter((row) =>
                    columns.some((col) => {
                        const val = col.accessor ? row[col.accessor] : "";
                        return String(val).toLowerCase().includes(q);
                    }),
                );
            }
            if (sortCol !== null) {
                const col = columns[sortCol];
                const key = col.accessor;
                if (key) {
                    filtered = [...filtered].sort((a, b) => {
                        let va = a[key],
                            vb = b[key];
                        if (typeof va === "number" && typeof vb === "number") {
                            return sortDir === "asc" ? va - vb : vb - va;
                        }
                        va = String(va || "").toLowerCase();
                        vb = String(vb || "").toLowerCase();
                        return sortDir === "asc"
                            ? va.localeCompare(vb)
                            : vb.localeCompare(va);
                    });
                }
            }
            return filtered;
        }

        function render() {
            const filtered = getData();
            const totalPages = Math.max(
                1,
                Math.ceil(filtered.length / perPage),
            );
            if (currentPage > totalPages) currentPage = totalPages;
            const start = (currentPage - 1) * perPage;
            const pageData = filtered.slice(start, start + perPage);

            let html = "";
            if (options.showSearch !== false) {
                html += `<div class="table-search">
          <input type="text" placeholder="Search..." value="${searchTerm}" id="${containerId}-search" aria-label="Search table">
        </div>`;
            }
            html += '<div class="table-wrapper">';
            html += '<table class="data-table"><thead><tr>';
            columns.forEach((col, i) => {
                const sorted = sortCol === i;
                const arrow = sorted ? (sortDir === "asc" ? "▲" : "▼") : "⇅";
                const sortClass = sorted ? " sorted" : "";
                html += `<th class="${sortClass}" data-sort="${i}">${col.header} <span class="sort-icon">${arrow}</span></th>`;
            });
            html += "</tr></thead><tbody>";

            if (pageData.length === 0) {
                html += `<tr><td colspan="${columns.length}">
          <div class="table-empty">${icon("inbox", 40)}<p>No records found</p></div>
        </td></tr>`;
            } else {
                pageData.forEach((row, ri) => {
                    html += `<tr class="animate-fadeInUp animate-delay-${Math.min(ri, 4) + 1}">`;
                    columns.forEach((col) => {
                        const val = col.accessor ? row[col.accessor] : "";
                        const rendered = col.render
                            ? col.render(row, val)
                            : escapeHtml(String(val));
                        html += `<td>${rendered}</td>`;
                    });
                    html += "</tr>";
                });
            }
            html += "</tbody></table></div>";

            if (filtered.length > perPage) {
                html += `<div class="table-pagination">
          <span>Showing ${start + 1}–${Math.min(start + perPage, filtered.length)} of ${filtered.length}</span>
          <div style="display:flex;gap:6px">
            <button ${currentPage <= 1 ? "disabled" : ""} data-page="prev" aria-label="Previous page">${icon("chevLeft", 14)} Prev</button>
            <button ${currentPage >= totalPages ? "disabled" : ""} data-page="next" aria-label="Next page">Next ${icon("chevRight", 14)}</button>
          </div>
        </div>`;
            }

            container.innerHTML = html;

            const searchInput = document.getElementById(
                `${containerId}-search`,
            );
            if (searchInput) {
                searchInput.addEventListener("input", (e) => {
                    searchTerm = e.target.value;
                    currentPage = 1;
                    render();
                });
            }
            container.querySelectorAll("th[data-sort]").forEach((th) => {
                th.addEventListener("click", () => {
                    const idx = parseInt(th.dataset.sort);
                    if (sortCol === idx) {
                        sortDir = sortDir === "asc" ? "desc" : "asc";
                    } else {
                        sortCol = idx;
                        sortDir = "asc";
                    }
                    render();
                });
            });
            container.querySelectorAll("[data-page]").forEach((btn) => {
                btn.addEventListener("click", () => {
                    if (btn.dataset.page === "prev") currentPage--;
                    else currentPage++;
                    render();
                });
            });
        }

        container._renderTable = function (newData) {
            data = newData;
            currentPage = 1;
            render();
        };
        render();
    }
    window.renderTable = renderTable;

    function openModal(title, bodyHTML, footerHTML, opts) {
        opts = opts || {};
        closeModal();
        const overlay = document.createElement("div");
        overlay.className = "modal-overlay";
        overlay.id = "modal-overlay";
        const maxW = opts.maxWidth || "540px";
        overlay.innerHTML = `<div class="modal" style="max-width:${maxW}">
      <div class="modal-header">
        <h3>${title}</h3>
        <button class="modal-close" onclick="closeModal()" aria-label="Close modal">${icon("x", 18)}</button>
      </div>
      <div class="modal-body">${bodyHTML}</div>
      ${footerHTML ? `<div class="modal-footer">${footerHTML}</div>` : ""}
    </div>`;
        document.body.appendChild(overlay);
        overlay.addEventListener("click", (e) => {
            if (e.target === overlay) closeModal();
        });
        document.addEventListener("keydown", escHandler);
    }
    function closeModal() {
        const overlay = document.getElementById("modal-overlay");
        if (overlay) overlay.remove();
        document.removeEventListener("keydown", escHandler);
    }
    function escHandler(e) {
        if (e.key === "Escape") closeModal();
    }
    window.openModal = openModal;
    window.closeModal = closeModal;

    let toastContainer;
    function ensureToastContainer() {
        if (!toastContainer || !document.body.contains(toastContainer)) {
            toastContainer = document.createElement("div");
            toastContainer.className = "toast-container";
            document.body.appendChild(toastContainer);
        }
    }
    function showToast(message, type) {
        type = type || "info";
        ensureToastContainer();
        const toast = document.createElement("div");
        toast.className = `toast toast-${type}`;
        const icons = { success: "✓", error: "✕", warning: "⚠", info: "ℹ" };
        toast.innerHTML = `<span style="font-size:16px;font-weight:700">${icons[type] || "ℹ"}</span>
      <span>${message}</span>
      <span class="toast-close" onclick="this.parentElement.remove()">×</span>`;
        toastContainer.appendChild(toast);
        setTimeout(() => {
            if (toast.parentElement) toast.remove();
        }, 4000);
    }
    window.showToast = showToast;

    function confirmDialog(message, onConfirm, opts) {
        opts = opts || {};
        const btnClass =
            opts.variant === "danger" ? "btn-danger" : "btn-primary";
        const label = opts.confirmLabel || "Confirm";
        openModal(
            "Confirm Action",
            `<p style="font-size:14px;color:var(--text-secondary);line-height:1.6">${message}</p>`,
            `<button class="btn btn-ghost" onclick="closeModal()">Cancel</button>
       <button class="btn ${btnClass}" id="confirm-btn">${label}</button>`,
            { maxWidth: "400px" },
        );
        setTimeout(() => {
            const btn = document.getElementById("confirm-btn");
            if (btn)
                btn.addEventListener("click", () => {
                    closeModal();
                    onConfirm();
                });
        }, 50);
    }
    window.confirmDialog = confirmDialog;

    function formInput(label, id, type, placeholder, required, value) {
        value = value || "";
        type = type || "text";
        const req = required ? "required" : "";
        return `<div class="form-group">
      <label class="form-label" for="${id}">${label}${required ? " *" : ""}</label>
      <input class="form-control" type="${type}" id="${id}" name="${id}" placeholder="${placeholder || ""}" value="${escapeHtml(String(value))}" ${req}>
      <div class="form-error" id="${id}-error"></div>
    </div>`;
    }
    function formSelect(label, id, options, required, selected) {
        let html = `<div class="form-group">
      <label class="form-label" for="${id}">${label}${required ? " *" : ""}</label>
      <select class="form-control" id="${id}" name="${id}" ${required ? "required" : ""}>
        <option value="">Select...</option>`;
        options.forEach((o) => {
            const sel = selected && o.value === selected ? " selected" : "";
            const dis = o.disabled ? " disabled" : "";
            html += `<option value="${o.value}"${sel}${dis}>${o.label}</option>`;
        });
        html += `</select><div class="form-error" id="${id}-error"></div></div>`;
        return html;
    }
    function formTextarea(label, id, placeholder, value) {
        return `<div class="form-group">
      <label class="form-label" for="${id}">${label}</label>
      <textarea class="form-control" id="${id}" name="${id}" placeholder="${placeholder || ""}" rows="3">${escapeHtml(value || "")}</textarea>
    </div>`;
    }
    function formCheckboxes(label, id, options, selected) {
        selected = selected || [];
        let html = `<div class="form-group">
      <label class="form-label">${label}</label>
      <div style="display:flex;gap:12px;flex-wrap:wrap">`;
        options.forEach((o) => {
            const chk = selected.includes(o) ? " checked" : "";
            html += `<label class="form-check"><input type="checkbox" name="${id}" value="${o}"${chk}>${o}</label>`;
        });
        html += "</div></div>";
        return html;
    }
    window.formInput = formInput;
    window.formSelect = formSelect;
    window.formTextarea = formTextarea;
    window.formCheckboxes = formCheckboxes;

    function safetyRing(score, size) {
        size = size || 36;
        const r = size / 2 - 4;
        const circ = 2 * Math.PI * r;
        const dash = (score / 100) * circ;
        const color =
            score >= 81
                ? "var(--green)"
                : score >= 61
                  ? "var(--orange)"
                  : "var(--red)";
        return `<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
      <circle cx="${size / 2}" cy="${size / 2}" r="${r}" fill="none" stroke="var(--border)" stroke-width="3"/>
      <circle cx="${size / 2}" cy="${size / 2}" r="${r}" fill="none" stroke="${color}" stroke-width="3"
        stroke-dasharray="${dash} ${circ - dash}" stroke-linecap="round" transform="rotate(-90 ${size / 2} ${size / 2})"/>
      <text x="${size / 2}" y="${size / 2 + 4}" text-anchor="middle" fill="${color}" font-size="${size / 3.5}" font-weight="700" font-family="var(--font-heading)">${score}</text>
    </svg>`;
    }
    window.safetyRing = safetyRing;

    function exportCSV(headers, rows, filename) {
        let csv = headers.join(",") + "\n";
        rows.forEach((row) => {
            csv +=
                row.map((v) => `"${String(v).replace(/"/g, '""')}"`).join(",") +
                "\n";
        });
        const blob = new Blob([csv], { type: "text/csv" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = filename + ".csv";
        a.click();
        URL.revokeObjectURL(url);
        showToast("CSV exported: " + filename + ".csv", "success");
    }
    window.exportCSV = exportCSV;

    function exportJSON(data, filename) {
        const blob = new Blob([JSON.stringify(data, null, 2)], {
            type: "application/json",
        });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = filename + ".json";
        a.click();
        URL.revokeObjectURL(url);
        showToast("JSON exported: " + filename + ".json", "success");
    }
    window.exportJSON = exportJSON;

    function escapeHtml(str) {
        const div = document.createElement("div");
        div.textContent = str;
        return div.innerHTML;
    }
    window.escapeHtml = escapeHtml;

    function getCurrentUser() {
        try {
            return JSON.parse(localStorage.getItem("fleetOS_user"));
        } catch (e) {
            return null;
        }
    }
    function setCurrentUser(user) {
        localStorage.setItem("fleetOS_user", JSON.stringify(user));
    }
    function logout() {
        localStorage.removeItem("fleetOS_user");
        window.location.href = "/";
    }
    function requireAuth() {
        if (!getCurrentUser()) {
            window.location.href = "/";
            return false;
        }
        return true;
    }
    window.getCurrentUser = getCurrentUser;
    window.setCurrentUser = setCurrentUser;
    window.logout = logout;
    window.requireAuth = requireAuth;

    function globalSearch(query) {
        if (!query || query.length < 2) return [];
        const q = query.toLowerCase();
        const results = [];
        DB.vehicles.forEach((v) => {
            if (
                v.name.toLowerCase().includes(q) ||
                v.plate.toLowerCase().includes(q)
            )
                results.push({
                    type: "Vehicle",
                    label: v.name + " — " + v.plate,
                    url: "/vehicles/",
                });
        });
        DB.drivers.forEach((d) => {
            if (d.name.toLowerCase().includes(q))
                results.push({
                    type: "Driver",
                    label: d.name + " — " + d.license,
                    url: "/drivers/" + d.id + "/",
                });
        });
        DB.trips.forEach((t) => {
            if (
                t.id.toLowerCase().includes(q) ||
                t.origin.toLowerCase().includes(q) ||
                t.destination.toLowerCase().includes(q)
            )
                results.push({
                    type: "Trip",
                    label: t.id + ": " + t.origin + " → " + t.destination,
                    url: "/trips/",
                });
        });
        return results;
    }
    window.globalSearch = globalSearch;

    function getNotifications() {
        const notifs = [];
        DB.expiredDrivers().forEach((d) => {
            notifs.push({
                title: "Expired License",
                desc: d.name + "'s license expired on " + d.expiry,
                type: "danger",
            });
        });
        DB.expiringSoonDrivers().forEach((d) => {
            notifs.push({
                title: "License Expiring",
                desc: d.name + "'s license expires on " + d.expiry,
                type: "warning",
            });
        });
        DB.vehicles
            .filter((v) => v.status === "In Shop")
            .forEach((v) => {
                notifs.push({
                    title: "Vehicle In Shop",
                    desc: v.name + " is currently under maintenance",
                    type: "info",
                });
            });
        return notifs;
    }
    window.getNotifications = getNotifications;

    function toggleSidebar() {
        document.body.classList.toggle("sidebar-open");
    }
    function closeSidebar() {
        document.body.classList.remove("sidebar-open");
    }
    function toggleSidebarCollapse() {
        document.body.classList.toggle("sidebar-collapsed");
    }
    window.toggleSidebar = toggleSidebar;
    window.closeSidebar = closeSidebar;
    window.toggleSidebarCollapse = toggleSidebarCollapse;
})();
