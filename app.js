"use strict";

/* ---------- IndexedDB ---------- */

const DB_NAME = "koutsuu-kiroku";
const DB_VERSION = 1;
const STORE = "records"; // key: "YYYY-MM-DD"

function openDB() {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, DB_VERSION);
    req.onupgradeneeded = () => {
      const db = req.result;
      if (!db.objectStoreNames.contains(STORE)) {
        db.createObjectStore(STORE, { keyPath: "date" });
      }
    };
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

let dbPromise = openDB();

async function getRecord(dateKey) {
  const db = await dbPromise;
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE, "readonly");
    const req = tx.objectStore(STORE).get(dateKey);
    req.onsuccess = () => resolve(req.result || null);
    req.onerror = () => reject(req.error);
  });
}

async function getRecordsInRange(startKey, endKey) {
  const db = await dbPromise;
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE, "readonly");
    const range = IDBKeyRange.bound(startKey, endKey);
    const req = tx.objectStore(STORE).getAll(range);
    req.onsuccess = () => resolve(req.result || []);
    req.onerror = () => reject(req.error);
  });
}

async function putRecord(record) {
  const db = await dbPromise;
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE, "readwrite");
    tx.objectStore(STORE).put(record);
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
  });
}

/* ---------- 日付・給与締め期間ユーティリティ ---------- */

const CUTOFF_DAY = 16; // 16日始まり〜翌月15日締め
const WEEKDAY_JP = ["日", "月", "火", "水", "木", "金", "土"];

function fmtKey(d) {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

function periodStartFor(refDate) {
  const y = refDate.getFullYear();
  const m = refDate.getMonth();
  const d = refDate.getDate();
  if (d >= CUTOFF_DAY) {
    return new Date(y, m, CUTOFF_DAY);
  }
  return new Date(y, m - 1, CUTOFF_DAY);
}

function periodEndFor(periodStart) {
  const end = new Date(periodStart.getFullYear(), periodStart.getMonth() + 1, CUTOFF_DAY - 1);
  return end;
}

function shiftPeriod(periodStart, deltaMonths) {
  return new Date(periodStart.getFullYear(), periodStart.getMonth() + deltaMonths, CUTOFF_DAY);
}

function fmtPeriodTitle(start, end) {
  const f = (d) => `${d.getFullYear()}/${d.getMonth() + 1}/${d.getDate()}`;
  return `${f(start)} ～ ${f(end)}`;
}

/* ---------- 画像の縮小（保存容量対策） ---------- */

function downscaleImage(file, maxDim = 1280, quality = 0.8) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const url = URL.createObjectURL(file);
    img.onload = () => {
      let { width, height } = img;
      if (width > maxDim || height > maxDim) {
        if (width > height) {
          height = Math.round(height * (maxDim / width));
          width = maxDim;
        } else {
          width = Math.round(width * (maxDim / height));
          height = maxDim;
        }
      }
      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;
      canvas.getContext("2d").drawImage(img, 0, 0, width, height);
      canvas.toBlob(
        (blob) => {
          URL.revokeObjectURL(url);
          resolve(blob);
        },
        "image/jpeg",
        quality
      );
    };
    img.onerror = (e) => {
      URL.revokeObjectURL(url);
      reject(e);
    };
    img.src = url;
  });
}

/* ---------- 状態 ---------- */

let currentPeriodStart = periodStartFor(new Date());
let currentDetailDate = null; // "YYYY-MM-DD"

/* ---------- 氏名 ---------- */

const NAME_KEY = "koutsuu-kiroku-name";

function getUserName() {
  try {
    return localStorage.getItem(NAME_KEY) || "";
  } catch (e) {
    return "";
  }
}

function setUserName(name) {
  try {
    localStorage.setItem(NAME_KEY, name);
  } catch (e) {
    /* ignore */
  }
}

/* ---------- 元画像の保存設定 ---------- */

const SAVE_ORIGINAL_KEY = "koutsuu-kiroku-save-original";

function getSaveOriginalSetting() {
  try {
    return localStorage.getItem(SAVE_ORIGINAL_KEY) === "1";
  } catch (e) {
    return false;
  }
}

function setSaveOriginalSetting(value) {
  try {
    localStorage.setItem(SAVE_ORIGINAL_KEY, value ? "1" : "0");
  } catch (e) {
    /* ignore */
  }
}

function tryShareOriginal(file) {
  if (!navigator.share || !navigator.canShare || !navigator.canShare({ files: [file] })) return;
  navigator.share({ files: [file], title: "走行距離写真" }).catch(() => {
    /* ユーザーがキャンセルした場合など */
  });
}

/* ---------- テーマ設定 ---------- */

const THEME_KEY = "koutsuu-kiroku-theme";

function getTheme() {
  try {
    return localStorage.getItem(THEME_KEY) || "system";
  } catch (e) {
    return "system";
  }
}

function applyTheme(theme) {
  if (theme === "light" || theme === "dark") {
    document.documentElement.setAttribute("data-theme", theme);
  } else {
    document.documentElement.removeAttribute("data-theme");
  }
}

function setTheme(theme) {
  try {
    localStorage.setItem(THEME_KEY, theme);
  } catch (e) {
    /* ignore */
  }
  applyTheme(theme);
}

applyTheme(getTheme());

/* ---------- DOM参照 ---------- */

const listView = document.getElementById("listView");
const detailView = document.getElementById("detailView");
const settingsView = document.getElementById("settingsView");
const periodTitleEl = document.getElementById("periodTitle");
const periodNameEl = document.getElementById("periodName");
const dayListEl = document.getElementById("dayList");
const prevPeriodBtn = document.getElementById("prevPeriod");
const nextPeriodBtn = document.getElementById("nextPeriod");
const openSettingsBtn = document.getElementById("openSettingsBtn");
const settingsBackBtn = document.getElementById("settingsBackBtn");
const nameBtn = document.getElementById("nameBtn");
const saveOriginalCheckbox = document.getElementById("saveOriginalCheckbox");
const themeSelect = document.getElementById("themeSelect");
const exportBtn = document.getElementById("exportBtn");
const exportHintText = document.getElementById("exportHintText");
const copyEmailBtn = document.getElementById("copyEmailBtn");
const boxEmailInput = document.getElementById("boxEmailInput");

const backBtn = document.getElementById("backBtn");
const detailDateEl = document.getElementById("detailDate");
const photoBoxStart = document.getElementById("photoBoxStart");
const photoPreviewStart = document.getElementById("photoPreviewStart");
const photoPlaceholderStart = document.getElementById("photoPlaceholderStart");
const retakePhotoStartBtn = document.getElementById("retakePhotoStartBtn");
const removePhotoStartBtn = document.getElementById("removePhotoStartBtn");
const saveOriginalStartBtn = document.getElementById("saveOriginalStartBtn");
const photoBoxEnd = document.getElementById("photoBoxEnd");
const photoPreviewEnd = document.getElementById("photoPreviewEnd");
const photoPlaceholderEnd = document.getElementById("photoPlaceholderEnd");
const retakePhotoEndBtn = document.getElementById("retakePhotoEndBtn");
const removePhotoEndBtn = document.getElementById("removePhotoEndBtn");
const saveOriginalEndBtn = document.getElementById("saveOriginalEndBtn");
const photoInput = document.getElementById("photoInput");
const destinationInput = document.getElementById("destinationInput");
const startInput = document.getElementById("startInput");
const endInput = document.getElementById("endInput");
const breakCheckbox = document.getElementById("breakCheckbox");
const breakFieldRow = document.getElementById("breakFieldRow");
const start2Input = document.getElementById("start2Input");
const end2Input = document.getElementById("end2Input");
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightboxImg");
const lightboxCloseBtn = document.getElementById("lightboxCloseBtn");
const distanceSummary = document.getElementById("distanceSummary");

/* ---------- 一覧描画 ---------- */

async function renderList() {
  const start = currentPeriodStart;
  const end = periodEndFor(start);
  periodTitleEl.textContent = fmtPeriodTitle(start, end);
  const name = getUserName();
  periodNameEl.textContent = name ? `${name} さん` : "氏名未設定";
  nameBtn.textContent = name ? "氏名を変更" : "氏名を設定";

  const boxEmail = getBoxEmail();
  exportHintText.textContent = boxEmail ? `送信先: ${boxEmail}` : "送信先: 未設定（設定画面で入力してください）";

  const records = await getRecordsInRange(fmtKey(start), fmtKey(end));
  const recordMap = new Map(records.map((r) => [r.date, r]));

  dayListEl.innerHTML = "";
  const days = [];
  for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
    days.push(new Date(d));
  }

  for (const d of days) {
    const key = fmtKey(d);
    const rec = recordMap.get(key);
    const row = document.createElement("div");
    row.className = "dayRow";

    const wd = d.getDay();
    const dateEl = document.createElement("div");
    dateEl.className = "dayDate" + (wd === 0 ? " sun" : wd === 6 ? " sat" : "");
    dateEl.textContent = `${d.getMonth() + 1}/${d.getDate()}(${WEEKDAY_JP[wd]})`;

    const thumb = document.createElement("div");
    thumb.className = "dayThumb";
    const thumbSource = rec && (rec.photoStart || rec.photoEnd);
    if (thumbSource) {
      const img = document.createElement("img");
      img.style.width = "100%";
      img.style.height = "100%";
      img.style.objectFit = "cover";
      img.src = URL.createObjectURL(thumbSource);
      thumb.appendChild(img);
    } else {
      thumb.textContent = "📷";
    }

    const info = document.createElement("div");
    info.className = "dayInfo";
    const memo = document.createElement("div");
    const memoText = rec && rec.destination ? rec.destination.split("\n")[0] : "未入力";
    memo.className = "dayMemo" + (rec && rec.destination ? "" : " empty");
    memo.textContent = memoText;
    info.appendChild(memo);

    const isBreakComplete =
      rec && rec.hasBreak && rec.start != null && rec.end != null && rec.start2 != null && rec.end2 != null;

    const dist = document.createElement("div");
    dist.className = "dayDistance";
    const startText = rec && rec.start != null ? rec.start : "－";
    const endText = rec && rec.end != null ? rec.end : "－";
    const seg1 = rec && rec.start != null && rec.end != null ? rec.end - rec.start : null;
    let distHtml = `<span class="distNum">${startText}</span> → <span class="distNum">${endText}</span>`;
    if (seg1 != null) {
      distHtml += `<span class="distKm">＝ ${seg1.toFixed(1)} km</span>`;
    }
    dist.innerHTML = distHtml;
    info.appendChild(dist);

    if (rec && rec.hasBreak) {
      const breakNote = document.createElement("div");
      breakNote.className = "dayBreakNote";
      if (isBreakComplete) {
        const breakKm = rec.start2 - rec.end;
        breakNote.textContent = `（${rec.start2} → ${rec.end2}　中抜け ${breakKm.toFixed(1)} km）`;
      } else {
        breakNote.textContent = "（中抜けあり）";
      }
      info.appendChild(breakNote);

      if (isBreakComplete) {
        const grandTotal = rec.end2 - rec.start;
        const totalLine = document.createElement("div");
        totalLine.className = "dayGrandTotal";
        totalLine.textContent = `総計 ${grandTotal.toFixed(1)} km`;
        info.appendChild(totalLine);
      }
    }

    const status = document.createElement("div");
    status.className = "dayStatus";
    const mk = (label, ok) => {
      const span = document.createElement("span");
      span.className = ok ? "ok" : "ng";
      span.textContent = `${label}${ok ? "✓" : "未"}`;
      return span;
    };
    status.appendChild(mk("開始写真", !!(rec && rec.photoStart)));
    status.appendChild(mk("終了写真", !!(rec && rec.photoEnd)));
    info.appendChild(status);

    row.appendChild(dateEl);
    row.appendChild(thumb);
    row.appendChild(info);
    row.addEventListener("click", () => openDetail(key));
    dayListEl.appendChild(row);
  }
}

/* ---------- 詳細画面 ---------- */

let currentPhotoStart = null;
let currentPhotoEnd = null;
let pendingSlot = null; // "start" | "end"
let originalPhotoStart = null; // 撮影直後の元画像（保存ボタン用、セッション内のみ）
let originalPhotoEnd = null;

async function openDetail(dateKey) {
  currentDetailDate = dateKey;
  const [y, m, d] = dateKey.split("-").map(Number);
  const dateObj = new Date(y, m - 1, d);
  const wd = dateObj.getDay();
  detailDateEl.textContent = `${y}/${m}/${d}(${WEEKDAY_JP[wd]})`;

  const rec = await getRecord(dateKey);
  currentPhotoStart = rec && rec.photoStart ? rec.photoStart : null;
  currentPhotoEnd = rec && rec.photoEnd ? rec.photoEnd : null;
  originalPhotoStart = null;
  originalPhotoEnd = null;
  saveOriginalStartBtn.hidden = true;
  saveOriginalEndBtn.hidden = true;
  refreshPhotoPreview("start");
  refreshPhotoPreview("end");

  destinationInput.value = (rec && rec.destination) || "";
  startInput.value = rec && rec.start != null ? rec.start : "";
  endInput.value = rec && rec.end != null ? rec.end : "";
  breakCheckbox.checked = !!(rec && rec.hasBreak);
  breakFieldRow.hidden = !breakCheckbox.checked;
  start2Input.value = rec && rec.start2 != null ? rec.start2 : "";
  end2Input.value = rec && rec.end2 != null ? rec.end2 : "";
  updateSummary();

  listView.hidden = true;
  detailView.hidden = false;
}

function refreshPhotoPreview(slot) {
  const blob = slot === "start" ? currentPhotoStart : currentPhotoEnd;
  const img = slot === "start" ? photoPreviewStart : photoPreviewEnd;
  const placeholder = slot === "start" ? photoPlaceholderStart : photoPlaceholderEnd;
  const retakeBtn = slot === "start" ? retakePhotoStartBtn : retakePhotoEndBtn;
  const removeBtn = slot === "start" ? removePhotoStartBtn : removePhotoEndBtn;
  if (blob) {
    img.src = URL.createObjectURL(blob);
    img.hidden = false;
    placeholder.hidden = true;
    retakeBtn.hidden = false;
    removeBtn.hidden = false;
  } else {
    img.hidden = true;
    placeholder.hidden = false;
    retakeBtn.hidden = true;
    removeBtn.hidden = true;
  }
}

function requestPhotoCapture(slot) {
  pendingSlot = slot;
  photoInput.click();
}

function openLightbox(blob) {
  if (!blob) return;
  lightboxImg.src = URL.createObjectURL(blob);
  lightbox.hidden = false;
}

function totalDistance(rec) {
  let total = 0;
  let hasAny = false;
  if (rec.start != null && rec.end != null) {
    total += rec.end - rec.start;
    hasAny = true;
  }
  if (rec.hasBreak && rec.start2 != null && rec.end2 != null) {
    total += rec.end2 - rec.start2;
    hasAny = true;
  }
  return hasAny ? total : null;
}

function updateSummary() {
  const rec = {
    start: startInput.value !== "" ? parseFloat(startInput.value) : null,
    end: endInput.value !== "" ? parseFloat(endInput.value) : null,
    hasBreak: breakCheckbox.checked,
    start2: start2Input.value !== "" ? parseFloat(start2Input.value) : null,
    end2: end2Input.value !== "" ? parseFloat(end2Input.value) : null,
  };
  if (rec.hasBreak && rec.start2 != null && rec.end2 != null && rec.start != null && rec.end != null) {
    const grandTotal = (rec.end2 - rec.start).toFixed(1);
    const breakKm = (rec.start2 - rec.end).toFixed(1);
    distanceSummary.textContent =
      `走行距離: ${grandTotal} km（${rec.start2} → ${rec.end2}　中抜け ${breakKm} km）`;
    return;
  }
  const total = totalDistance(rec);
  if (total == null) {
    distanceSummary.textContent = "走行距離: -";
    return;
  }
  distanceSummary.textContent = `走行距離: ${total.toFixed(1)} km`;
}

/* ---------- 月次出力 ---------- */

const BOX_EMAIL_KEY = "koutsuu-kiroku-box-email";

function getBoxEmail() {
  try {
    return localStorage.getItem(BOX_EMAIL_KEY) || "";
  } catch (e) {
    return "";
  }
}

function setBoxEmail(value) {
  try {
    localStorage.setItem(BOX_EMAIL_KEY, value);
  } catch (e) {
    /* ignore */
  }
}

async function exportCurrentPeriod() {
  const start = currentPeriodStart;
  const end = periodEndFor(start);
  const records = await getRecordsInRange(fmtKey(start), fmtKey(end));

  const payload = {
    name: getUserName(),
    periodStart: fmtKey(start),
    periodEnd: fmtKey(end),
    records: records.map((r) => ({
      date: r.date,
      destination: r.destination || "",
      start: r.start,
      end: r.end,
      hasBreak: !!r.hasBreak,
      start2: r.start2,
      end2: r.end2,
    })),
  };

  const json = JSON.stringify(payload, null, 2);
  const blob = new Blob([json], { type: "application/json" });
  const fileName = `走行距離_${payload.name || "未設定"}_${payload.periodStart}.json`;
  const file = new File([blob], fileName, { type: "application/json" });

  if (navigator.share && navigator.canShare && navigator.canShare({ files: [file] })) {
    try {
      await navigator.share({ files: [file], title: fileName });
      return;
    } catch (e) {
      /* ユーザーがキャンセルした場合など */
      return;
    }
  }
  alert("この端末では共有機能が使えないため、ファイルを直接送信できません。");
}

async function saveCurrentDetail() {
  if (!currentDetailDate) return;
  const s = startInput.value !== "" ? parseFloat(startInput.value) : null;
  const e = endInput.value !== "" ? parseFloat(endInput.value) : null;
  const hasBreak = breakCheckbox.checked;
  const s2 = hasBreak && start2Input.value !== "" ? parseFloat(start2Input.value) : null;
  const e2 = hasBreak && end2Input.value !== "" ? parseFloat(end2Input.value) : null;
  await putRecord({
    date: currentDetailDate,
    destination: destinationInput.value,
    start: s,
    end: e,
    hasBreak,
    start2: s2,
    end2: e2,
    photoStart: currentPhotoStart,
    photoEnd: currentPhotoEnd,
    updatedAt: Date.now(),
  });
}

async function closeDetail() {
  await saveCurrentDetail();
  detailView.hidden = true;
  listView.hidden = false;
  await renderList();
}

/* ---------- イベント ---------- */

prevPeriodBtn.addEventListener("click", () => {
  currentPeriodStart = shiftPeriod(currentPeriodStart, -1);
  renderList();
});

nextPeriodBtn.addEventListener("click", () => {
  currentPeriodStart = shiftPeriod(currentPeriodStart, 1);
  renderList();
});

nameBtn.addEventListener("click", () => {
  const current = getUserName();
  const next = prompt("氏名を入力してください", current);
  if (next !== null) {
    setUserName(next.trim());
    renderList();
  }
});

openSettingsBtn.addEventListener("click", () => {
  themeSelect.value = getTheme();
  boxEmailInput.value = getBoxEmail();
  listView.hidden = true;
  settingsView.hidden = false;
});

boxEmailInput.addEventListener("blur", () => {
  setBoxEmail(boxEmailInput.value.trim());
});

themeSelect.addEventListener("change", () => {
  setTheme(themeSelect.value);
});

exportBtn.addEventListener("click", exportCurrentPeriod);

copyEmailBtn.addEventListener("click", async () => {
  const email = getBoxEmail();
  if (!email) {
    alert("設定画面で送信先メールアドレスを入力してください。");
    return;
  }
  try {
    await navigator.clipboard.writeText(email);
    copyEmailBtn.textContent = "✓ コピーしました";
  } catch (e) {
    copyEmailBtn.textContent = "コピー失敗";
  }
  setTimeout(() => {
    copyEmailBtn.textContent = "📋 コピー";
  }, 1500);
});

settingsBackBtn.addEventListener("click", () => {
  settingsView.hidden = true;
  listView.hidden = false;
  renderList();
});

saveOriginalCheckbox.checked = getSaveOriginalSetting();
saveOriginalCheckbox.addEventListener("change", () => {
  setSaveOriginalSetting(saveOriginalCheckbox.checked);
});

backBtn.addEventListener("click", closeDetail);

photoBoxStart.addEventListener("click", () => {
  if (currentPhotoStart) openLightbox(currentPhotoStart);
  else requestPhotoCapture("start");
});
photoBoxEnd.addEventListener("click", () => {
  if (currentPhotoEnd) openLightbox(currentPhotoEnd);
  else requestPhotoCapture("end");
});

retakePhotoStartBtn.addEventListener("click", (ev) => {
  ev.stopPropagation();
  requestPhotoCapture("start");
});
retakePhotoEndBtn.addEventListener("click", (ev) => {
  ev.stopPropagation();
  requestPhotoCapture("end");
});

lightbox.addEventListener("click", () => {
  lightbox.hidden = true;
});

lightboxCloseBtn.addEventListener("click", (ev) => {
  ev.stopPropagation();
  lightbox.hidden = true;
});

photoInput.addEventListener("change", async () => {
  const file = photoInput.files[0];
  const slot = pendingSlot;
  pendingSlot = null;
  if (!file || !slot) return;
  const saveOriginalBtn = slot === "start" ? saveOriginalStartBtn : saveOriginalEndBtn;
  if (getSaveOriginalSetting()) {
    if (slot === "start") {
      originalPhotoStart = file;
    } else {
      originalPhotoEnd = file;
    }
    saveOriginalBtn.hidden = false;
  } else {
    saveOriginalBtn.hidden = true;
  }
  let blob;
  try {
    blob = await downscaleImage(file);
  } catch (e) {
    blob = file;
  }
  if (slot === "start") {
    currentPhotoStart = blob;
  } else {
    currentPhotoEnd = blob;
  }
  refreshPhotoPreview(slot);
  await saveCurrentDetail();
  photoInput.value = "";
});

saveOriginalStartBtn.addEventListener("click", (ev) => {
  ev.stopPropagation();
  tryShareOriginal(originalPhotoStart);
});

saveOriginalEndBtn.addEventListener("click", (ev) => {
  ev.stopPropagation();
  tryShareOriginal(originalPhotoEnd);
});

removePhotoStartBtn.addEventListener("click", async (ev) => {
  ev.stopPropagation();
  currentPhotoStart = null;
  originalPhotoStart = null;
  saveOriginalStartBtn.hidden = true;
  refreshPhotoPreview("start");
  await saveCurrentDetail();
});

removePhotoEndBtn.addEventListener("click", async (ev) => {
  ev.stopPropagation();
  currentPhotoEnd = null;
  originalPhotoEnd = null;
  saveOriginalEndBtn.hidden = true;
  refreshPhotoPreview("end");
  await saveCurrentDetail();
});

destinationInput.addEventListener("blur", saveCurrentDetail);
startInput.addEventListener("input", updateSummary);
endInput.addEventListener("input", updateSummary);
startInput.addEventListener("blur", saveCurrentDetail);
endInput.addEventListener("blur", saveCurrentDetail);

breakCheckbox.addEventListener("change", async () => {
  breakFieldRow.hidden = !breakCheckbox.checked;
  if (!breakCheckbox.checked) {
    start2Input.value = "";
    end2Input.value = "";
  }
  updateSummary();
  await saveCurrentDetail();
});
start2Input.addEventListener("input", updateSummary);
end2Input.addEventListener("input", updateSummary);
start2Input.addEventListener("blur", saveCurrentDetail);
end2Input.addEventListener("blur", saveCurrentDetail);

/* ---------- 初期化 ---------- */

renderList();
