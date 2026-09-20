"use strict";

// index.htmlのapp.js/style.css読み込み時の?v=番号と合わせて手動更新する
// (実際にこのapp.jsが読み込まれて実行された、という一番確実な証拠になる)
const APP_VERSION = 29;

if ("serviceWorker" in navigator) {
  // 新しいService Workerが有効化されたら、キャッシュ更新済みの状態で1回だけ自動リロードする
  // (これが無いと「更新したのに反映されない」状態が次にもう一度開くまで残ってしまう)
  let swRefreshing = false;
  navigator.serviceWorker.addEventListener("controllerchange", () => {
    if (swRefreshing) return;
    swRefreshing = true;
    location.reload();
  });
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("service-worker.js").catch(() => {});
  });
}

/* ---------- アイコン ---------- */

function strokeIcon(paths, size = 20, width = 2.2) {
  return (
    `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="${width}" ` +
    `stroke-linecap="round" stroke-linejoin="round" width="${size}" height="${size}">` +
    paths +
    "</svg>"
  );
}

function fillIcon(paths, size = 20) {
  return `<svg viewBox="0 0 24 24" fill="currentColor" width="${size}" height="${size}">${paths}</svg>`;
}

const CAMERA_ICON_PATHS =
  '<path d="M4 8h3l1.5-2h7L17 8h3a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1z"/>' +
  '<circle cx="12" cy="13" r="3.5"/>';
const CAMERA_ICON_SVG = strokeIcon(CAMERA_ICON_PATHS, 19);
const CAMERA_ICON_SVG_SMALL = strokeIcon(CAMERA_ICON_PATHS, 13, 2);

const GEAR_ICON_SVG = strokeIcon(
  '<circle cx="12" cy="12" r="3"/>' +
    '<path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>',
  19
);

const CALENDAR_ICON_SVG = strokeIcon(
  '<rect x="2.5" y="5" width="19" height="16" rx="2"/>' +
    '<line x1="16" y1="2.5" x2="16" y2="6.5"/>' +
    '<line x1="8" y1="2.5" x2="8" y2="6.5"/>' +
    '<line x1="2.5" y1="10" x2="21.5" y2="10"/>',
  19
);

const ROAD_ICON_SVG = fillIcon(
  '<path fill-rule="evenodd" d="M5 21 19 21 14 3 10 3Z ' +
    'M11.3 6h1.4v3h-1.4Z M11.1 10.3h1.8v3h-1.8Z M10.8 15.3h2.4v3.2h-2.4Z"/>',
  19
);

const LIST_ICON_SVG = strokeIcon(
  '<path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"/>' +
    '<polyline points="14 3 14 8 19 8"/>' +
    '<line x1="8.5" y1="13" x2="15.5" y2="13"/>' +
    '<line x1="8.5" y1="17" x2="15.5" y2="17"/>',
  19
);

const SEND_ICON_SVG = strokeIcon(
  '<line x1="21" y1="3" x2="10.5" y2="13.5"/>' + '<polygon points="21 3 14 21 10.5 13.5 3 10 21 3"/>',
  19
);

const PLAY_ICON_SVG = fillIcon('<polygon points="6,4 20,12 6,20"/>', 19);

const HOME_ICON_SVG = strokeIcon(
  '<path d="M3 11.5 12 4l9 7.5"/>' +
    '<path d="M5.5 10v9a1 1 0 0 0 1 1H9.5a1 1 0 0 0 1-1v-4h3v4a1 1 0 0 0 1 1H17.5a1 1 0 0 0 1-1v-9"/>',
  19
);

const OPTIONS_ICON_SVG = strokeIcon(
  '<path d="M4 6h11"/><circle cx="17.5" cy="6" r="2"/>' +
    '<path d="M20 12H9"/><circle cx="6.5" cy="12" r="2"/>' +
    '<path d="M4 18h11"/><circle cx="17.5" cy="18" r="2"/>',
  19
);

const OTHER_ICON_SVG = strokeIcon(
  '<circle cx="5" cy="12" r="1.6"/><circle cx="12" cy="12" r="1.6"/><circle cx="19" cy="12" r="1.6"/>',
  19
);

const SUN_ICON_SVG = strokeIcon(
  '<circle cx="12" cy="12" r="4"/>' +
    '<line x1="12" y1="2" x2="12" y2="4.5"/><line x1="12" y1="19.5" x2="12" y2="22"/>' +
    '<line x1="2" y1="12" x2="4.5" y2="12"/><line x1="19.5" y1="12" x2="22" y2="12"/>' +
    '<line x1="4.6" y1="4.6" x2="6.3" y2="6.3"/><line x1="17.7" y1="17.7" x2="19.4" y2="19.4"/>' +
    '<line x1="4.6" y1="19.4" x2="6.3" y2="17.7"/><line x1="17.7" y1="6.3" x2="19.4" y2="4.6"/>',
  19
);

const MOON_ICON_SVG = strokeIcon(
  '<path d="M20 14.5A8.5 8.5 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5z"/>',
  19
);

const GAUGE_ICON_SVG = strokeIcon(
  '<path d="M4 16a8 8 0 0 1 16 0"/><line x1="12" y1="16" x2="15.3" y2="11.7"/>' +
    '<circle cx="12" cy="16" r="1.3" fill="currentColor" stroke="none"/>',
  20
);

const PAUSE_ICON_SVG = fillIcon(
  '<rect x="7" y="5" width="3.2" height="14" rx="1.2"/><rect x="13.8" y="5" width="3.2" height="14" rx="1.2"/>',
  20
);

const CLOCK_ICON_SVG = strokeIcon(
  '<circle cx="12" cy="12" r="8.5"/><path d="M12 7.5v5l3.5 2"/>',
  19
);

const BACK_ICON_SVG = strokeIcon('<polyline points="15 6 9 12 15 18"/>', 19);

const COPY_ICON_SVG = strokeIcon(
  '<rect x="9" y="9" width="12" height="12" rx="2"/><path d="M5 15V5a2 2 0 0 1 2-2h10"/>',
  15
);

const BELL_ICON_SVG = strokeIcon(
  '<path d="M6 8a6 6 0 0 1 12 0c0 4 1.5 5.5 1.5 5.5h-15S6 12 6 8Z"/><path d="M10 19a2 2 0 0 0 4 0"/>',
  16
);

const BACKUP_EXPORT_ICON_SVG = strokeIcon(
  '<path d="M4 15v3a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-3"/><path d="M12 3v11"/><polyline points="7 10 12 15 17 10"/>',
  17
);

const BACKUP_IMPORT_ICON_SVG = strokeIcon(
  '<path d="M4 15v3a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-3"/><path d="M12 14V3"/><polyline points="7 8 12 3 17 8"/>',
  17
);

const GALLERY_ICON_SVG = strokeIcon(
  '<rect x="7" y="7" width="14" height="14" rx="2"/>' +
    '<path d="M7 11H4a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-3"/>' +
    '<circle cx="15" cy="11.5" r="1.3" fill="currentColor" stroke="none"/>' +
    '<path d="M10 21l3.5-3.5 2 2L20 15"/>',
  18
);

const MAP_PIN_ICON_SVG = strokeIcon(
  '<path d="M12 21s-7-6.5-7-11.5A7 7 0 0 1 19 9.5C19 14.5 12 21 12 21z"/>' + '<circle cx="12" cy="9.5" r="2.3"/>',
  18
);

function injectIcon(id, svg) {
  const el = document.getElementById(id);
  if (el) el.innerHTML = svg;
}

const CAR_ICON_ASPECT = 39 / 67;

function carIconHtml(width) {
  const height = Math.round(width * CAR_ICON_ASPECT);
  return (
    `<span class="themedIcon" style="width:${width}px;height:${height}px;">` +
    `<img class="iconLight" src="car-icon.png" width="${width}" height="${height}" alt="">` +
    `<img class="iconDark" src="car-icon-dark.png" width="${width}" height="${height}" alt="">` +
    `</span>`
  );
}

function injectIcons() {
  injectIcon("openSettingsBtn", GEAR_ICON_SVG);
  injectIcon("settingsHomeBtn", HOME_ICON_SVG);
  injectIcon("detailHomeBtn", HOME_ICON_SVG);
  injectIcon("detailSettingsBtn", GEAR_ICON_SVG);
  injectIcon("detailListBtn", BACK_ICON_SVG);
  injectIcon("homeFromListBtn", HOME_ICON_SVG);
  injectIcon("photoIconStart", CAMERA_ICON_SVG);
  injectIcon("photoIconEnd", CAMERA_ICON_SVG);
  injectIcon("destIcon", LIST_ICON_SVG);
  injectIcon("startIcon", GAUGE_ICON_SVG);
  injectIcon("endIcon", GAUGE_ICON_SVG);
  injectIcon("breakIcon", CLOCK_ICON_SVG);
  injectIcon("start2Icon", CLOCK_ICON_SVG);
  injectIcon("end2Icon", CLOCK_ICON_SVG);
  injectIcon("summaryIcon", ROAD_ICON_SVG);
  injectIcon("homeStatIconRoad", ROAD_ICON_SVG);
  injectIcon("homeStatIconCal", CALENDAR_ICON_SVG);
  injectIcon("homeStatIconCar", carIconHtml(28));
  injectIcon("homeMenuPlayIcon", PLAY_ICON_SVG);
  injectIcon("homeListIcon", LIST_ICON_SVG);
  injectIcon("homeSendIcon", SEND_ICON_SVG);
  injectIcon("tabIconHome1", HOME_ICON_SVG);
  injectIcon("tabIconVehicle1", carIconHtml(19));
  injectIcon("tabIconOptions1", OPTIONS_ICON_SVG);
  injectIcon("tabIconOther1", OTHER_ICON_SVG);
  injectIcon("tabIconHome2", HOME_ICON_SVG);
  injectIcon("tabIconVehicle2", carIconHtml(19));
  injectIcon("tabIconOptions2", OPTIONS_ICON_SVG);
  injectIcon("tabIconOther2", OTHER_ICON_SVG);
  injectIcon("exportIcon", SEND_ICON_SVG);
  injectIcon("copyIcon", COPY_ICON_SVG);
  injectIcon("backupExportIcon", BACKUP_EXPORT_ICON_SVG);
  injectIcon("backupImportIcon", BACKUP_IMPORT_ICON_SVG);
  injectIcon("saveOriginalIconStart", SEND_ICON_SVG);
  injectIcon("saveOriginalIconEnd", SEND_ICON_SVG);
  injectIcon("photoChoiceCameraIcon", CAMERA_ICON_SVG);
  injectIcon("photoChoiceLibraryIcon", GALLERY_ICON_SVG);
  injectIcon("optionsGeneralHeadingIcon", OPTIONS_ICON_SVG);
  injectIcon("optionsDestHeadingIcon", MAP_PIN_ICON_SVG);
  injectIcon("photoChoicePrevDayIcon", CLOCK_ICON_SVG);
  injectIcon("homeReminderIcon", BELL_ICON_SVG);
  updateThemeToggleIcon();
}

function getEffectiveTheme() {
  const t = getTheme();
  if (t === "light" || t === "dark") return t;
  return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function updateThemeToggleIcon() {
  injectIcon("themeToggleBtn", getEffectiveTheme() === "dark" ? MOON_ICON_SVG : SUN_ICON_SVG);
}

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

async function getAllRecords() {
  const db = await dbPromise;
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE, "readonly");
    const req = tx.objectStore(STORE).getAll();
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

const QUICK_SEND_GRACE_DAYS = 4; // 16日〜19日は「前の期間をまだ送っていないかもしれない」猶予期間とみなす

function periodForQuickSend(today) {
  const currentPeriod = periodStartFor(today);
  const prevPeriod = shiftPeriod(currentPeriod, -1);
  const dayOfMonth = today.getDate();
  const inGraceWindow = dayOfMonth >= CUTOFF_DAY && dayOfMonth < CUTOFF_DAY + QUICK_SEND_GRACE_DAYS;
  // 猶予期間中でも、前の期間をすでに送信済みなら普通に今の期間を対象にする
  if (inGraceWindow && !getSentAt(fmtKey(prevPeriod))) {
    return prevPeriod;
  }
  return currentPeriod;
}

function periodStartForEndMonth(year, endMonthHuman) {
  // 「year年endMonthHuman月分」(=その月15日締め)の期間開始日を返す
  const d = new Date(year, endMonthHuman - 1, CUTOFF_DAY);
  d.setMonth(d.getMonth() - 1);
  return d;
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
let detailLoading = false; // openDetailの非同期読み込み中はsaveCurrentDetailを走らせない
let detailDirty = false; // ユーザーが実際に何か操作したか（何もしていない日を保存しないため）

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

/* ---------- 行き先の履歴（よく使う候補） ---------- */

const COMMUTE_LABEL = "通勤";
const DEST_HISTORY_KEY = "koutsuu-kiroku-dest-history";
const DEST_HISTORY_MAX_KEY = "koutsuu-kiroku-dest-history-max";
const DEST_HISTORY_MAX_DEFAULT = 8;
const DEST_PINNED_KEY = "koutsuu-kiroku-dest-pinned";
const DEST_PINNED_DEFAULT = ["土場"];

function getPinnedDest() {
  try {
    const raw = localStorage.getItem(DEST_PINNED_KEY);
    if (raw == null) return [...DEST_PINNED_DEFAULT]; // 未設定なら今までのデフォルトを引き継ぐ
    const list = JSON.parse(raw);
    return Array.isArray(list) ? list : [...DEST_PINNED_DEFAULT];
  } catch (e) {
    return [...DEST_PINNED_DEFAULT];
  }
}

function setPinnedDest(list) {
  try {
    localStorage.setItem(DEST_PINNED_KEY, JSON.stringify(list));
  } catch (e) {
    /* ignore */
  }
}

function addPinnedDest(value) {
  const v = (value || "").trim();
  if (!v) return;
  const list = getPinnedDest();
  if (!list.includes(v)) {
    list.push(v);
    setPinnedDest(list);
  }
  // 通常の履歴側に同じ値が残っていると、デフォルト候補と重複して表示され続けるため取り除く
  try {
    const history = getDestHistory().filter((x) => x !== v);
    localStorage.setItem(DEST_HISTORY_KEY, JSON.stringify(history));
  } catch (e) {
    /* ignore */
  }
}

function removePinnedDest(value) {
  setPinnedDest(getPinnedDest().filter((x) => x !== value));
}

function getDestHistoryMax() {
  try {
    const v = parseInt(localStorage.getItem(DEST_HISTORY_MAX_KEY), 10);
    return Number.isFinite(v) && v > 0 ? v : DEST_HISTORY_MAX_DEFAULT;
  } catch (e) {
    return DEST_HISTORY_MAX_DEFAULT;
  }
}

function setDestHistoryMax(value) {
  try {
    localStorage.setItem(DEST_HISTORY_MAX_KEY, String(value));
  } catch (e) {
    /* ignore */
  }
}

function getDestHistory() {
  try {
    return JSON.parse(localStorage.getItem(DEST_HISTORY_KEY) || "[]");
  } catch (e) {
    return [];
  }
}

function addDestHistoryFromText(text) {
  // 「本社 → 現場A → 会社」のように矢印区切りで入力された場合、行き先全体を1件の履歴にせず
  // 矢印で区切られた地点ごとに履歴へ残す(チップから個別の地点を再利用しやすくするため)
  const parts = (text || "").split("→").map((s) => s.trim()).filter(Boolean);
  for (const part of parts) addDestHistory(part);
}

function addDestHistory(value) {
  const v = (value || "").trim();
  if (!v || getPinnedDest().includes(v) || v === COMMUTE_LABEL) return;
  try {
    let list = getDestHistory().filter((x) => x !== v);
    list.unshift(v);
    const max = getDestHistoryMax();
    if (list.length > max) list = list.slice(0, max);
    localStorage.setItem(DEST_HISTORY_KEY, JSON.stringify(list));
  } catch (e) {
    /* ignore */
  }
}

function removeDestHistory(value) {
  try {
    const list = getDestHistory().filter((x) => x !== value);
    localStorage.setItem(DEST_HISTORY_KEY, JSON.stringify(list));
  } catch (e) {
    /* ignore */
  }
}

function applyCommuteOnlyState() {
  const commuteOnly = commuteOnlyCheckbox.checked;
  destinationInput.disabled = commuteOnly;
  destHistoryChips.hidden = commuteOnly;
}

function escapeHtml(s) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function renderDestHistoryChips() {
  const pinned = getPinnedDest();
  const chips = [...pinned, ...getDestHistory()];
  destHistoryChips.innerHTML = chips
    .map((v, i) => {
      const escaped = escapeHtml(v);
      if (i < pinned.length) {
        return `<button type="button" class="destChip pinned" data-value="${escaped}">${escaped}</button>`;
      }
      return (
        `<span class="destChip destChipHistory">` +
        `<button type="button" class="destChipLabel" data-value="${escaped}">${escaped}</button>` +
        `<button type="button" class="destChipRemove" data-value="${escaped}" aria-label="履歴から削除">✕</button>` +
        `</span>`
      );
    })
    .join("");
}

function renderPinnedDestList() {
  const list = getPinnedDest();
  pinnedDestList.innerHTML = list
    .map((v) => {
      const escaped = escapeHtml(v);
      return `<span class="pinnedDestItem">${escaped}<button type="button" class="pinnedDestRemove" data-value="${escaped}" aria-label="削除">✕</button></span>`;
    })
    .join("");
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

/* ---------- 車両情報 ---------- */

const VEHICLE_KEYS = {
  vehicleYear: "koutsuu-kiroku-vehicle-year",
  vehicleModel: "koutsuu-kiroku-vehicle-model",
  engineDisplacement: "koutsuu-kiroku-engine-displacement",
};

function getVehicleInfo() {
  const info = {};
  for (const [field, key] of Object.entries(VEHICLE_KEYS)) {
    try {
      info[field] = localStorage.getItem(key) || "";
    } catch (e) {
      info[field] = "";
    }
  }
  return info;
}

function setVehicleField(field, value) {
  try {
    localStorage.setItem(VEHICLE_KEYS[field], value);
  } catch (e) {
    /* ignore */
  }
}

function buildVehicleYearOptions() {
  const currentReiwa = new Date().getFullYear() - 2018;
  const reiwaMax = currentReiwa + 6;
  const options = [];
  for (let r = reiwaMax; r >= 1; r--) {
    options.push(`令和${r}年式`);
  }
  for (let h = 31; h >= 1; h--) {
    options.push(`平成${h}年式`);
  }
  return options;
}

function populateVehicleYearSelect(currentValue) {
  const options = buildVehicleYearOptions();
  if (currentValue && !options.includes(currentValue)) {
    options.unshift(currentValue);
  }
  vehicleYearInput.innerHTML =
    '<option value="">未選択</option>' +
    options.map((v) => `<option value="${v}">${v}</option>`).join("");
  vehicleYearInput.value = currentValue || "";
}

/* ---------- 自動バックアップ設定 ---------- */

const AUTO_BACKUP_KEY = "koutsuu-kiroku-auto-backup";
const AUTO_BACKUP_LAST_KEY = "koutsuu-kiroku-auto-backup-last";
const AUTO_BACKUP_INTERVAL_HOURS_KEY = "koutsuu-kiroku-auto-backup-interval-hours";
const AUTO_BACKUP_INTERVAL_HOURS_DEFAULT = 6;

function getAutoBackupSetting() {
  try {
    return localStorage.getItem(AUTO_BACKUP_KEY) === "1";
  } catch (e) {
    return false;
  }
}

function setAutoBackupSetting(value) {
  try {
    localStorage.setItem(AUTO_BACKUP_KEY, value ? "1" : "0");
  } catch (e) {
    /* ignore */
  }
}

function getAutoBackupIntervalHours() {
  try {
    const v = parseFloat(localStorage.getItem(AUTO_BACKUP_INTERVAL_HOURS_KEY));
    return Number.isFinite(v) && v > 0 ? v : AUTO_BACKUP_INTERVAL_HOURS_DEFAULT;
  } catch (e) {
    return AUTO_BACKUP_INTERVAL_HOURS_DEFAULT;
  }
}

function setAutoBackupIntervalHours(hours) {
  try {
    localStorage.setItem(AUTO_BACKUP_INTERVAL_HOURS_KEY, String(hours));
  } catch (e) {
    /* ignore */
  }
}

function getLastAutoBackupAt() {
  try {
    return parseInt(localStorage.getItem(AUTO_BACKUP_LAST_KEY) || "0", 10);
  } catch (e) {
    return 0;
  }
}

function setLastAutoBackupAt(timestamp) {
  try {
    localStorage.setItem(AUTO_BACKUP_LAST_KEY, String(timestamp));
  } catch (e) {
    /* ignore */
  }
}

/* ---------- ホームのリマインダー表示設定 ---------- */

const SHOW_REMINDER_KEY = "koutsuu-kiroku-show-reminder";

function getShowReminderSetting() {
  try {
    const v = localStorage.getItem(SHOW_REMINDER_KEY);
    return v === null ? true : v === "1"; // 未設定時は今までどおり表示する
  } catch (e) {
    return true;
  }
}

function setShowReminderSetting(value) {
  try {
    localStorage.setItem(SHOW_REMINDER_KEY, value ? "1" : "0");
  } catch (e) {
    /* ignore */
  }
}

const SENT_LOG_KEY = "koutsuu-kiroku-sent-log";

function getSentLog() {
  try {
    return JSON.parse(localStorage.getItem(SENT_LOG_KEY) || "{}");
  } catch (e) {
    return {};
  }
}

function getSentAt(periodStartKey) {
  return getSentLog()[periodStartKey] || null;
}

function setSentAt(periodStartKey, timestamp) {
  try {
    const log = getSentLog();
    log[periodStartKey] = timestamp;
    localStorage.setItem(SENT_LOG_KEY, JSON.stringify(log));
  } catch (e) {
    /* ignore */
  }
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

if (window.matchMedia) {
  window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", () => {
    if (getTheme() === "system") updateThemeToggleIcon();
  });
}

/* ---------- DOM参照 ---------- */

const loadingView = document.getElementById("loadingView");
const homeView = document.getElementById("homeView");
const goToListBtn = document.getElementById("goToListBtn");
const homeFromListBtn = document.getElementById("homeFromListBtn");
const homeStatToday = document.getElementById("homeStatToday");
const homeStatMonth = document.getElementById("homeStatMonth");
const homeVehicleBtn = document.getElementById("homeVehicleBtn");
const homeVehicleSummary = document.getElementById("homeVehicleSummary");
const startTodayBtn = document.getElementById("startTodayBtn");
const homeExportBtn = document.getElementById("homeExportBtn");
const homeReminder = document.getElementById("homeReminder");
const homeReminderText = document.getElementById("homeReminderText");
const listView = document.getElementById("listView");
const detailView = document.getElementById("detailView");
const settingsView = document.getElementById("settingsView");
const periodTitleEl = document.getElementById("periodTitle");
const sentStatusEl = document.getElementById("sentStatus");
const dayListEl = document.getElementById("dayList");
const prevPeriodBtn = document.getElementById("prevPeriod");
const nextPeriodBtn = document.getElementById("nextPeriod");
const periodLabelBtn = document.getElementById("periodLabelBtn");
const periodJumpPanel = document.getElementById("periodJumpPanel");
const jumpYearSelect = document.getElementById("jumpYearSelect");
const jumpMonthSelect = document.getElementById("jumpMonthSelect");
const jumpGoBtn = document.getElementById("jumpGoBtn");
const jumpTodayBtn = document.getElementById("jumpTodayBtn");
const openSettingsBtn = document.getElementById("openSettingsBtn");
const settingsHomeBtn = document.getElementById("settingsHomeBtn");
const themeToggleBtn = document.getElementById("themeToggleBtn");
const settingsSectionTitle = document.getElementById("settingsSectionTitle");
const nameInput = document.getElementById("nameInput");
const saveOriginalCheckbox = document.getElementById("saveOriginalCheckbox");
const themeSelect = document.getElementById("themeSelect");
const exportBtn = document.getElementById("exportBtn");
const exportHintText = document.getElementById("exportHintText");
const copyEmailBtn = document.getElementById("copyEmailBtn");
const boxEmailInput = document.getElementById("boxEmailInput");
const vehicleYearInput = document.getElementById("vehicleYearInput");
const vehicleModelInput = document.getElementById("vehicleModelInput");
const engineDisplacementInput = document.getElementById("engineDisplacementInput");
const autoBackupCheckbox = document.getElementById("autoBackupCheckbox");
const autoBackupIntervalRow = document.getElementById("autoBackupIntervalRow");
const autoBackupIntervalSelect = document.getElementById("autoBackupIntervalSelect");
const showReminderCheckbox = document.getElementById("showReminderCheckbox");
const pinnedDestList = document.getElementById("pinnedDestList");
const pinnedDestInput = document.getElementById("pinnedDestInput");
const addPinnedDestBtn = document.getElementById("addPinnedDestBtn");
const destHistoryMaxInput = document.getElementById("destHistoryMaxInput");
const exportAllBtn = document.getElementById("exportAllBtn");
const importAllBtn = document.getElementById("importAllBtn");
const importAllFileInput = document.getElementById("importAllFileInput");
const versionLabel = document.getElementById("versionLabel");
const warningBox = document.getElementById("warningBox");

const detailHomeBtn = document.getElementById("detailHomeBtn");
const detailSettingsBtn = document.getElementById("detailSettingsBtn");
const detailListBtn = document.getElementById("detailListBtn");
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
const photoInputLibrary = document.getElementById("photoInputLibrary");
const photoChoiceSheet = document.getElementById("photoChoiceSheet");
const photoChoiceCameraBtn = document.getElementById("photoChoiceCameraBtn");
const photoChoiceLibraryBtn = document.getElementById("photoChoiceLibraryBtn");
const photoChoicePrevDayBtn = document.getElementById("photoChoicePrevDayBtn");
const photoChoiceCancelBtn = document.getElementById("photoChoiceCancelBtn");
const photoChoiceBackdrop = document.querySelector(".photoChoiceBackdrop");
const destinationInput = document.getElementById("destinationInput");
const destHistoryChips = document.getElementById("destHistoryChips");
const commuteOnlyCheckbox = document.getElementById("commuteOnlyCheckbox");
const startInput = document.getElementById("startInput");
const endInput = document.getElementById("endInput");
const breakCheckbox = document.getElementById("breakCheckbox");
const breakFieldRow = document.getElementById("breakFieldRow");
const start2Input = document.getElementById("start2Input");
const end2Input = document.getElementById("end2Input");
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightboxImg");
const lightboxCloseBtn = document.getElementById("lightboxCloseBtn");
const distanceSummaryValue = document.getElementById("distanceSummaryValue");
const distanceSummaryUnit = document.getElementById("distanceSummaryUnit");
const distanceSummaryExtra = document.getElementById("distanceSummaryExtra");
const saveToast = document.getElementById("saveToast");

let saveToastTimer = null;
function showSavedToast(message) {
  saveToast.textContent = message || "保存しました";
  saveToast.classList.add("show");
  clearTimeout(saveToastTimer);
  saveToastTimer = setTimeout(() => saveToast.classList.remove("show"), 1400);
}

/* ---------- ホーム画面描画 ---------- */

async function renderHome() {
  const today = new Date();
  const todayKey = fmtKey(today);
  const todayRec = await getRecord(todayKey);
  const todayTotal = todayRec ? totalDistance(todayRec) : null;
  homeStatToday.textContent = todayTotal != null ? `${todayTotal.toFixed(1)} km` : "- km";

  const periodStart = periodStartFor(today);
  const periodEnd = periodEndFor(periodStart);
  const records = await getRecordsInRange(fmtKey(periodStart), fmtKey(periodEnd));

  let monthTotal = 0;
  for (const r of records) {
    const t = totalDistance(r);
    if (t != null) monthTotal += t;
  }
  homeStatMonth.textContent = `${monthTotal.toFixed(1)} km`;

  const vehicleInfo = getVehicleInfo();
  homeVehicleSummary.textContent = vehicleInfo.vehicleModel
    ? `${vehicleInfo.vehicleModel}（${vehicleInfo.vehicleYear || "年式未設定"}）`
    : "年式・車種・排気量を設定";

  if (!getShowReminderSetting()) {
    homeReminder.hidden = true;
  } else {
    homeReminder.hidden = false;
    const daysLeft = daysUntilNextSixteenth(today);
    const urgent = daysLeft <= 3;
    if (daysLeft === 0) {
      homeReminderText.textContent = "本日が今月分の提出期限です。今すぐ送信しましょう";
    } else if (urgent) {
      homeReminderText.textContent = `提出期限（毎月16日）まであと ${daysLeft} 日。お早めに送信を`;
    } else {
      homeReminderText.textContent = `提出期限（毎月16日）まであと ${daysLeft} 日`;
    }
    homeReminder.classList.toggle("urgent", urgent);
  }
}

function daysUntilNextSixteenth(from) {
  const fromMid = new Date(from.getFullYear(), from.getMonth(), from.getDate());
  const deadline = new Date(from.getFullYear(), from.getMonth(), 16);
  if (deadline < fromMid) {
    deadline.setMonth(deadline.getMonth() + 1);
  }
  const msPerDay = 24 * 60 * 60 * 1000;
  return Math.round((deadline - fromMid) / msPerDay);
}

/* ---------- 一覧描画 ---------- */

function fmtSentAt(timestamp) {
  const d = new Date(timestamp);
  const pad = (n) => String(n).padStart(2, "0");
  return `${d.getMonth() + 1}/${d.getDate()} ${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

async function renderList() {
  const start = currentPeriodStart;
  const end = periodEndFor(start);
  periodTitleEl.textContent = fmtPeriodTitle(start, end);

  const sentAt = getSentAt(fmtKey(start));
  sentStatusEl.textContent = sentAt ? `✓ 送信済み（${fmtSentAt(sentAt)}）` : "未送信";
  sentStatusEl.classList.toggle("sent", !!sentAt);

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
    dateEl.innerHTML =
      `<div class="dayDateNum">${d.getMonth() + 1}/${d.getDate()}</div>` +
      `<div class="dayDateWd">(${WEEKDAY_JP[wd]})</div>`;

    const startPhotoOk = !!(rec && rec.photoStart);
    const endPhotoOk = !!(rec && rec.photoEnd);
    const thumb = document.createElement("div");
    thumb.className = "dayPhotoStatus";
    thumb.innerHTML =
      `<div class="photoStatusLine${startPhotoOk ? " ok" : ""}"><span class="photoStatusIcon">${CAMERA_ICON_SVG_SMALL}</span>開始</div>` +
      `<div class="photoStatusLine${endPhotoOk ? " ok" : ""}"><span class="photoStatusIcon">${CAMERA_ICON_SVG_SMALL}</span>終了</div>`;

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
    let distHtml = `<div class="distRow"><span class="distNum">${startText}</span> → <span class="distNum">${endText}</span></div>`;
    if (seg1 != null) {
      distHtml += `<div class="distKm">＝ ${seg1.toFixed(1)} km</div>`;
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
let previousDayEnd = null; // 前日の最終メーター値(逆行チェック用)
let previousDayEndPhoto = null; // 前日の終了写真(開始写真へのコピー用)
const MAX_PLAUSIBLE_DAILY_KM = 500; // 1日の走行距離としてこれを超える場合は入力ミスを疑う目安

async function openDetail(dateKey) {
  currentDetailDate = dateKey;
  detailLoading = true; // 読み込み完了までは、他の日付の保存処理がこのdateKeyに紛れ込まないようにする
  detailDirty = false;
  const [y, m, d] = dateKey.split("-").map(Number);
  const dateObj = new Date(y, m - 1, d);
  const wd = dateObj.getDay();
  detailDateEl.textContent = `${y}/${m}/${d}(${WEEKDAY_JP[wd]})`;

  const prevDateObj = new Date(y, m - 1, d - 1);
  const prevRec = await getRecord(fmtKey(prevDateObj));
  previousDayEnd = prevRec ? (prevRec.hasBreak && prevRec.end2 != null ? prevRec.end2 : prevRec.end) : null;
  previousDayEndPhoto = prevRec && prevRec.photoEnd ? prevRec.photoEnd : null;

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
  commuteOnlyCheckbox.checked = destinationInput.value === COMMUTE_LABEL;
  preCommuteDestination = ""; // 前に開いていた日の行き先が別の日に紛れ込まないようにする
  applyCommuteOnlyState();
  renderDestHistoryChips();
  startInput.value =
    rec && rec.start != null ? rec.start : previousDayEnd != null ? previousDayEnd : "";
  endInput.value = rec && rec.end != null ? rec.end : "";
  breakCheckbox.checked = !!(rec && rec.hasBreak);
  breakFieldRow.hidden = !breakCheckbox.checked;
  start2Input.value = rec && rec.start2 != null ? rec.start2 : "";
  end2Input.value = rec && rec.end2 != null ? rec.end2 : "";
  updateSummary();

  listView.hidden = true;
  detailView.hidden = false;
  detailLoading = false;
}

function refreshPhotoPreview(slot) {
  const blob = slot === "start" ? currentPhotoStart : currentPhotoEnd;
  const img = slot === "start" ? photoPreviewStart : photoPreviewEnd;
  const placeholder = slot === "start" ? photoPlaceholderStart : photoPlaceholderEnd;
  const retakeBtn = slot === "start" ? retakePhotoStartBtn : retakePhotoEndBtn;
  const removeBtn = slot === "start" ? removePhotoStartBtn : removePhotoEndBtn;
  if (img.dataset.objectUrl) {
    URL.revokeObjectURL(img.dataset.objectUrl);
    delete img.dataset.objectUrl;
  }
  if (blob) {
    const url = URL.createObjectURL(blob);
    img.dataset.objectUrl = url;
    img.src = url;
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
  photoChoicePrevDayBtn.hidden = !(slot === "start" && previousDayEndPhoto);
  photoChoiceSheet.hidden = false;
}

function closePhotoChoiceSheet() {
  photoChoiceSheet.hidden = true;
}

function openLightbox(blob) {
  if (!blob) return;
  if (lightboxImg.dataset.objectUrl) {
    URL.revokeObjectURL(lightboxImg.dataset.objectUrl);
  }
  const url = URL.createObjectURL(blob);
  lightboxImg.dataset.objectUrl = url;
  lightboxImg.src = url;
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
  updateWarnings();
  const rec = {
    start: startInput.value !== "" ? parseFloat(startInput.value) : null,
    end: endInput.value !== "" ? parseFloat(endInput.value) : null,
    hasBreak: breakCheckbox.checked,
    start2: start2Input.value !== "" ? parseFloat(start2Input.value) : null,
    end2: end2Input.value !== "" ? parseFloat(end2Input.value) : null,
  };
  const total = totalDistance(rec);
  if (total == null) {
    distanceSummaryValue.textContent = "-";
    distanceSummaryUnit.textContent = "";
    distanceSummaryExtra.textContent = "";
    return;
  }
  distanceSummaryValue.textContent = total.toFixed(1);
  distanceSummaryUnit.textContent = "km";
  if (rec.hasBreak && rec.start2 != null && rec.end2 != null && rec.start != null && rec.end != null) {
    const breakKm = (rec.start2 - rec.end).toFixed(1);
    const grandTotal = (rec.end2 - rec.start).toFixed(1);
    distanceSummaryExtra.textContent = `中抜け ${breakKm} km／総計 ${grandTotal} km`;
  } else {
    distanceSummaryExtra.textContent = "";
  }
}

function updateWarnings() {
  const start = startInput.value !== "" ? parseFloat(startInput.value) : null;
  const end = endInput.value !== "" ? parseFloat(endInput.value) : null;
  const hasBreak = breakCheckbox.checked;
  const start2 = start2Input.value !== "" ? parseFloat(start2Input.value) : null;
  const end2 = end2Input.value !== "" ? parseFloat(end2Input.value) : null;

  const messages = [];
  if (start != null && end != null && end < start) {
    messages.push("終針が始針より小さくなっています。");
  }
  if (hasBreak && start2 != null && end2 != null && end2 < start2) {
    messages.push("終了距離2が再開距離より小さくなっています。");
  }
  if (hasBreak && start2 != null && end != null && start2 < end) {
    messages.push("再開距離が終針より小さくなっています。");
  }
  if (start != null && previousDayEnd != null && start < previousDayEnd) {
    messages.push(`前日の終針（${previousDayEnd}）より小さい値です。`);
  }
  if (start != null && end != null && end - start > MAX_PLAUSIBLE_DAILY_KM) {
    messages.push(`1日の走行距離が${MAX_PLAUSIBLE_DAILY_KM}kmを超えています。入力ミスがないか確認してください。`);
  }
  if (start != null && previousDayEnd != null && start - previousDayEnd > MAX_PLAUSIBLE_DAILY_KM) {
    messages.push(`前日の終針（${previousDayEnd}）から${MAX_PLAUSIBLE_DAILY_KM}km以上離れています。入力ミスがないか確認してください。`);
  }
  if (hasBreak && start2 != null && end2 != null && end2 - start2 > MAX_PLAUSIBLE_DAILY_KM) {
    messages.push(`中抜け後の走行距離が${MAX_PLAUSIBLE_DAILY_KM}kmを超えています。入力ミスがないか確認してください。`);
  }

  if (messages.length > 0) {
    warningBox.textContent = "⚠ " + messages.join(" ");
    warningBox.hidden = false;
  } else {
    warningBox.hidden = true;
  }
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

async function exportCurrentPeriod(options = {}) {
  const { skipConfirm = false, periodStart = currentPeriodStart, markSent = true } = options;
  const start = periodStart;
  const end = periodEndFor(start);
  const records = await getRecordsInRange(fmtKey(start), fmtKey(end));

  const name = getUserName();
  if (!name) {
    // 自動バックアップは無言で諦める(ユーザー操作なしに割り込みアラートを出さないため)
    if (markSent) {
      alert("氏名が未設定です。設定画面で氏名を入力してから送信してください。");
    }
    return;
  }

  const vehicleInfo = getVehicleInfo();
  const payload = {
    name,
    vehicleYear: vehicleInfo.vehicleYear,
    vehicleModel: vehicleInfo.vehicleModel,
    engineDisplacement: vehicleInfo.engineDisplacement,
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

  if (!skipConfirm) {
    let filledDays = 0;
    let breakDays = 0;
    let totalKm = 0;
    for (const r of payload.records) {
      if (r.start != null && r.end != null) {
        filledDays++;
      }
      totalKm += totalDistance(r) || 0;
      if (r.hasBreak) breakDays++;
    }
    // payload.records はIndexedDBに一度でも保存された日だけ(=中身が空でも一度触ればずっと残る)なので、
    // 期間の実際の日数はカレンダー計算で出す(renderListの日付ループと同じ考え方)
    let totalDays = 0;
    for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) totalDays++;
    const summary =
      `以下の内容で送信します。\n\n` +
      `氏名: ${payload.name}\n` +
      `期間: ${payload.periodStart} 〜 ${payload.periodEnd}\n` +
      `入力済み: ${filledDays} / ${totalDays} 日\n` +
      `中抜けあり: ${breakDays} 日\n` +
      `合計走行距離: ${totalKm.toFixed(1)} km\n\n` +
      `送信してよろしいですか？`;
    if (!confirm(summary)) return;
  }

  const json = JSON.stringify(payload, null, 2);
  const blob = new Blob([json], { type: "application/json" });
  const fileNamePrefix = markSent ? "走行距離" : "走行距離_自動バックアップ";
  const fileName = `${fileNamePrefix}_${payload.name}_${payload.periodStart}.json`;
  const file = new File([blob], fileName, { type: "application/json" });

  if (navigator.share && navigator.canShare && navigator.canShare({ files: [file] })) {
    try {
      await navigator.share({ files: [file], title: fileName });
      // 自動バックアップは保険的な送信であり、月次提出ボタンからの「送信済み」とは区別する
      // （自動送信だけで済ませたつもりが、正式な提出をし忘れる事態を防ぐため）
      if (markSent) {
        setSentAt(fmtKey(start), Date.now());
        renderList();
      }
      return;
    } catch (e) {
      /* ユーザーがキャンセルした場合など */
      return;
    }
  }
  if (markSent) {
    alert("この端末では共有機能が使えないため、ファイルを直接送信できません。");
  }
}

/* ---------- 全データのバックアップ/復元 ---------- */

function blobToDataUrl(blob) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}

async function dataUrlToBlob(dataUrl) {
  const res = await fetch(dataUrl);
  return res.blob();
}

async function exportAllDataBackup() {
  const records = await getAllRecords();
  const serializedRecords = [];
  for (const r of records) {
    serializedRecords.push({
      ...r,
      photoStart: r.photoStart ? await blobToDataUrl(r.photoStart) : null,
      photoEnd: r.photoEnd ? await blobToDataUrl(r.photoEnd) : null,
    });
  }

  const vehicleInfo = getVehicleInfo();
  const payload = {
    exportedAt: new Date().toISOString(),
    name: getUserName(),
    vehicleYear: vehicleInfo.vehicleYear,
    vehicleModel: vehicleInfo.vehicleModel,
    engineDisplacement: vehicleInfo.engineDisplacement,
    boxEmail: getBoxEmail(),
    theme: getTheme(),
    autoBackup: getAutoBackupSetting(),
    autoBackupIntervalHours: getAutoBackupIntervalHours(),
    showReminder: getShowReminderSetting(),
    saveOriginal: getSaveOriginalSetting(),
    destHistory: getDestHistory(),
    destHistoryMax: getDestHistoryMax(),
    pinnedDest: getPinnedDest(),
    sentLog: getSentLog(),
    records: serializedRecords,
  };

  const json = JSON.stringify(payload);
  const blob = new Blob([json], { type: "application/json" });
  const fileName = `走行距離_全データバックアップ_${new Date().toISOString().slice(0, 10)}.json`;

  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = fileName;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 10000);
}

async function importAllDataBackup(file) {
  const text = await file.text();
  let payload;
  try {
    payload = JSON.parse(text);
  } catch (e) {
    alert("ファイルの読み込みに失敗しました（JSON形式ではありません）。");
    return;
  }

  const records = payload.records || [];
  if (
    !confirm(
      `${records.length}件のデータを復元します。同じ日付のデータは上書きされます。続けますか？`
    )
  ) {
    return;
  }

  let restoredCount = 0;
  try {
    for (const r of records) {
      if (!r || !r.date) continue;
      const rec = { ...r };
      if (rec.photoStart) rec.photoStart = await dataUrlToBlob(rec.photoStart);
      if (rec.photoEnd) rec.photoEnd = await dataUrlToBlob(rec.photoEnd);
      await putRecord(rec);
      restoredCount++;
    }
  } catch (e) {
    alert(`復元中にエラーが発生しました（${restoredCount}件まで復元済みです）。ファイルが壊れている可能性があります。`);
    return;
  }

  if (payload.name) setUserName(payload.name);
  if (payload.vehicleYear) setVehicleField("vehicleYear", payload.vehicleYear);
  if (payload.vehicleModel) setVehicleField("vehicleModel", payload.vehicleModel);
  if (payload.engineDisplacement) setVehicleField("engineDisplacement", payload.engineDisplacement);
  if (payload.boxEmail) setBoxEmail(payload.boxEmail);
  if (payload.theme) {
    setTheme(payload.theme);
    updateThemeToggleIcon();
  }
  if (typeof payload.autoBackup === "boolean") setAutoBackupSetting(payload.autoBackup);
  if (typeof payload.autoBackupIntervalHours === "number") {
    setAutoBackupIntervalHours(payload.autoBackupIntervalHours);
  }
  if (typeof payload.showReminder === "boolean") setShowReminderSetting(payload.showReminder);
  if (typeof payload.saveOriginal === "boolean") setSaveOriginalSetting(payload.saveOriginal);
  saveOriginalCheckbox.checked = getSaveOriginalSetting();

  if (Array.isArray(payload.destHistory)) {
    // 文字列以外の要素が混じっていると、後で行き先チップの描画時に例外が出て
    // 画面が開けなくなるため、復元時に取り除いておく
    const cleaned = payload.destHistory.filter((x) => typeof x === "string");
    try {
      localStorage.setItem(DEST_HISTORY_KEY, JSON.stringify(cleaned));
    } catch (e) {
      /* ignore */
    }
  }
  if (typeof payload.destHistoryMax === "number") setDestHistoryMax(payload.destHistoryMax);
  if (Array.isArray(payload.pinnedDest)) {
    setPinnedDest(payload.pinnedDest.filter((x) => typeof x === "string"));
  }

  if (payload.sentLog && typeof payload.sentLog === "object") {
    // 既存の送信済み記録を消してしまわないよう、日付ごとに新しい方のタイムスタンプを残す
    const merged = getSentLog();
    for (const [key, ts] of Object.entries(payload.sentLog)) {
      if (!merged[key] || ts > merged[key]) merged[key] = ts;
    }
    try {
      localStorage.setItem(SENT_LOG_KEY, JSON.stringify(merged));
    } catch (e) {
      /* ignore */
    }
  }

  // 設定画面を開いたまま復元した場合に表示が古いままにならないようにする
  if (!settingsView.hidden) loadSettingsFields();

  alert(`${restoredCount}件のデータを復元しました。`);
}

async function saveCurrentDetail(options = {}) {
  const { skipBreakSelfHeal = false } = options;
  if (!currentDetailDate || detailLoading) return;
  if (!detailDirty) return; // 何も操作していない日は、前日分の引き継ぎ表示だけでレコードを作らない
  const s = startInput.value !== "" ? parseFloat(startInput.value) : null;
  const e = endInput.value !== "" ? parseFloat(endInput.value) : null;
  let hasBreak = breakCheckbox.checked;
  const s2 = hasBreak && start2Input.value !== "" ? parseFloat(start2Input.value) : null;
  const e2 = hasBreak && end2Input.value !== "" ? parseFloat(end2Input.value) : null;
  if (!skipBreakSelfHeal && s == null && e == null && s2 == null && e2 == null) {
    // 開始/終了/中抜けの数値が全て空なら、中抜けフラグだけが残らないようにする
    // (チェックを入れた直後でまだ何も入力していないだけの場合はskipBreakSelfHealで除外する)
    hasBreak = false;
    if (breakCheckbox.checked) breakCheckbox.checked = false;
  }
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

async function closeDetailToList() {
  await saveCurrentDetail();
  currentDetailDate = null;
  detailView.hidden = true;
  listView.hidden = false;
  await renderList();
  await maybeAutoBackup();
}

async function closeDetailToHome() {
  await saveCurrentDetail();
  currentDetailDate = null;
  detailView.hidden = true;
  await showSection("home");
  await maybeAutoBackup();
}

async function maybeAutoBackup() {
  if (!getAutoBackupSetting()) return;
  const now = Date.now();
  const intervalMs = getAutoBackupIntervalHours() * 60 * 60 * 1000;
  if (now - getLastAutoBackupAt() < intervalMs) return;
  setLastAutoBackupAt(now); // キャンセルされても再送を連発しないよう先に記録
  await exportCurrentPeriod({ skipConfirm: true, periodStart: periodForQuickSend(new Date()), markSent: false });
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

periodLabelBtn.addEventListener("click", () => {
  if (!periodJumpPanel.hidden) {
    periodJumpPanel.hidden = true;
    return;
  }
  const periodEnd = periodEndFor(currentPeriodStart);
  const currentYear = periodEnd.getFullYear();
  const currentMonth = periodEnd.getMonth() + 1;

  jumpYearSelect.innerHTML = "";
  for (let y = currentYear - 3; y <= currentYear + 1; y++) {
    const opt = document.createElement("option");
    opt.value = String(y);
    opt.textContent = `${y}年`;
    if (y === currentYear) opt.selected = true;
    jumpYearSelect.appendChild(opt);
  }

  jumpMonthSelect.innerHTML = "";
  for (let m = 1; m <= 12; m++) {
    const opt = document.createElement("option");
    opt.value = String(m);
    opt.textContent = `${m}月分`;
    if (m === currentMonth) opt.selected = true;
    jumpMonthSelect.appendChild(opt);
  }

  periodJumpPanel.hidden = false;
});

jumpGoBtn.addEventListener("click", () => {
  const year = parseInt(jumpYearSelect.value, 10);
  const month = parseInt(jumpMonthSelect.value, 10);
  currentPeriodStart = periodStartForEndMonth(year, month);
  periodJumpPanel.hidden = true;
  renderList();
});

jumpTodayBtn.addEventListener("click", () => {
  currentPeriodStart = periodStartFor(new Date());
  periodJumpPanel.hidden = true;
  renderList();
});

nameInput.addEventListener("blur", () => {
  setUserName(nameInput.value.trim());
  showSavedToast();
});

const SETTINGS_SECTION_TITLES = {
  vehicle: "車両管理",
  options: "オプション",
  other: "その他",
};

function updateEmailHint() {
  const boxEmail = getBoxEmail();
  exportHintText.textContent = boxEmail ? `送信先: ${boxEmail}` : "送信先: 未設定";
}

function loadSettingsFields() {
  nameInput.value = getUserName();
  themeSelect.value = getTheme();
  boxEmailInput.value = getBoxEmail();
  updateEmailHint();
  const vehicleInfo = getVehicleInfo();
  populateVehicleYearSelect(vehicleInfo.vehicleYear);
  vehicleModelInput.value = vehicleInfo.vehicleModel;
  engineDisplacementInput.value = vehicleInfo.engineDisplacement;
  autoBackupCheckbox.checked = getAutoBackupSetting();
  autoBackupIntervalSelect.value = String(getAutoBackupIntervalHours());
  autoBackupIntervalRow.hidden = !autoBackupCheckbox.checked;
  showReminderCheckbox.checked = getShowReminderSetting();
  renderPinnedDestList();
  const destHistoryMax = getDestHistoryMax();
  // プリセットにない値が既に保存されていた場合、無言で変更してしまわないよう選択肢を足しておく
  if (!Array.from(destHistoryMaxInput.options).some((o) => Number(o.value) === destHistoryMax)) {
    const opt = document.createElement("option");
    opt.value = String(destHistoryMax);
    opt.textContent = `${destHistoryMax}件`;
    destHistoryMaxInput.appendChild(opt);
  }
  destHistoryMaxInput.value = String(destHistoryMax);
}

const settingsPanels = document.querySelectorAll(".settingsPanel");
const bottomTabBtns = document.querySelectorAll(".bottomTabBtn");
const bottomTabsNavs = document.querySelectorAll(".bottomTabs");
const BOTTOM_TAB_ORDER = ["home", "vehicle", "options", "other"];

function setActiveBottomTab(target) {
  bottomTabBtns.forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.target === target);
  });
  const index = BOTTOM_TAB_ORDER.indexOf(target);
  if (index === -1) return;
  const leftPercent = ((index + 0.5) / BOTTOM_TAB_ORDER.length) * 100;
  bottomTabsNavs.forEach((nav) => {
    const indicator = nav.querySelector(".bottomTabIndicator");
    if (indicator) indicator.style.left = `${leftPercent}%`;
  });
}

async function showSection(target) {
  // 画面がhidden(display:none)のままインジケーターの位置を変えるとtransitionが効かず
  // 瞬間移動して見えるため、表示を切り替えた後・次のフレームで動かす
  if (target === "home") {
    settingsView.hidden = true;
    listView.hidden = true;
    homeView.hidden = false;
    requestAnimationFrame(() => setActiveBottomTab(target));
    await renderHome();
    return;
  }
  loadSettingsFields();
  settingsPanels.forEach((panel) => {
    panel.hidden = panel.dataset.panel !== target;
  });
  settingsSectionTitle.textContent = SETTINGS_SECTION_TITLES[target] || "";
  homeView.hidden = true;
  listView.hidden = true;
  settingsView.hidden = false;
  requestAnimationFrame(() => setActiveBottomTab(target));
}

bottomTabBtns.forEach((btn) => {
  btn.addEventListener("click", () => showSection(btn.dataset.target));
});

openSettingsBtn.addEventListener("click", () => showSection("vehicle"));
homeVehicleBtn.addEventListener("click", () => showSection("vehicle"));
settingsHomeBtn.addEventListener("click", () => showSection("home"));

themeToggleBtn.addEventListener("click", () => {
  const next = getEffectiveTheme() === "dark" ? "light" : "dark";
  setTheme(next);
  themeSelect.value = next;
  updateThemeToggleIcon();
});

goToListBtn.addEventListener("click", async () => {
  currentPeriodStart = periodStartFor(new Date());
  homeView.hidden = true;
  listView.hidden = false;
  await renderList();
});

homeFromListBtn.addEventListener("click", async () => {
  listView.hidden = true;
  homeView.hidden = false;
  await renderHome();
});

startTodayBtn.addEventListener("click", async () => {
  currentPeriodStart = periodStartFor(new Date());
  homeView.hidden = true;
  await openDetail(fmtKey(new Date()));
});

homeExportBtn.addEventListener("click", async () => {
  currentPeriodStart = periodForQuickSend(new Date());
  await exportCurrentPeriod();
});

homeReminder.addEventListener("click", () => {
  goToListBtn.click();
});

boxEmailInput.addEventListener("blur", () => {
  setBoxEmail(boxEmailInput.value.trim());
  updateEmailHint();
  showSavedToast();
});

vehicleYearInput.addEventListener("change", () => {
  setVehicleField("vehicleYear", vehicleYearInput.value);
  showSavedToast();
});
vehicleModelInput.addEventListener("blur", () => {
  setVehicleField("vehicleModel", vehicleModelInput.value.trim());
  showSavedToast();
});
engineDisplacementInput.addEventListener("blur", () => {
  setVehicleField("engineDisplacement", engineDisplacementInput.value.trim());
  showSavedToast();
});
autoBackupCheckbox.addEventListener("change", () => {
  setAutoBackupSetting(autoBackupCheckbox.checked);
  autoBackupIntervalRow.hidden = !autoBackupCheckbox.checked;
});

autoBackupIntervalSelect.addEventListener("change", () => {
  setAutoBackupIntervalHours(parseFloat(autoBackupIntervalSelect.value));
  showSavedToast();
});

showReminderCheckbox.addEventListener("change", () => {
  setShowReminderSetting(showReminderCheckbox.checked);
});

addPinnedDestBtn.addEventListener("click", () => {
  const v = pinnedDestInput.value.trim();
  if (!v) return;
  addPinnedDest(v);
  pinnedDestInput.value = "";
  renderPinnedDestList();
  renderDestHistoryChips();
  showSavedToast();
});

pinnedDestInput.addEventListener("keydown", (ev) => {
  if (ev.key === "Enter") {
    ev.preventDefault();
    addPinnedDestBtn.click();
  }
});

pinnedDestList.addEventListener("click", (ev) => {
  const btn = ev.target.closest(".pinnedDestRemove");
  if (!btn) return;
  removePinnedDest(btn.dataset.value);
  renderPinnedDestList();
  renderDestHistoryChips();
  showSavedToast();
});

destHistoryMaxInput.addEventListener("change", () => {
  const v = parseInt(destHistoryMaxInput.value, 10);
  if (Number.isFinite(v) && v > 0) {
    setDestHistoryMax(v);
    // 件数を減らした場合、既存の履歴もその場で切り詰める
    const trimmed = getDestHistory().slice(0, v);
    try {
      localStorage.setItem(DEST_HISTORY_KEY, JSON.stringify(trimmed));
    } catch (e) {
      /* ignore */
    }
    showSavedToast();
  } else {
    destHistoryMaxInput.value = getDestHistoryMax();
  }
});

exportAllBtn.addEventListener("click", () => {
  exportAllDataBackup();
});

importAllBtn.addEventListener("click", () => {
  importAllFileInput.click();
});

importAllFileInput.addEventListener("change", async () => {
  const file = importAllFileInput.files[0];
  importAllFileInput.value = "";
  if (!file) return;
  await importAllDataBackup(file);
  await renderList();
});

themeSelect.addEventListener("change", () => {
  setTheme(themeSelect.value);
  updateThemeToggleIcon();
});

exportBtn.addEventListener("click", () => exportCurrentPeriod());

copyEmailBtn.addEventListener("click", async () => {
  const email = getBoxEmail();
  if (!email) {
    alert("上の欄に送信先メールアドレスを入力してください。");
    return;
  }
  try {
    await navigator.clipboard.writeText(email);
    copyEmailBtn.textContent = "✓ コピーしました";
  } catch (e) {
    copyEmailBtn.textContent = "コピー失敗";
  }
  setTimeout(() => {
    copyEmailBtn.innerHTML = '<span class="inlineIcon" id="copyIcon"></span>コピー';
    injectIcon("copyIcon", COPY_ICON_SVG);
  }, 1500);
});

saveOriginalCheckbox.checked = getSaveOriginalSetting();
saveOriginalCheckbox.addEventListener("change", () => {
  setSaveOriginalSetting(saveOriginalCheckbox.checked);
});

detailHomeBtn.addEventListener("click", closeDetailToHome);
detailListBtn.addEventListener("click", closeDetailToList);
detailSettingsBtn.addEventListener("click", async () => {
  await saveCurrentDetail();
  currentDetailDate = null;
  detailView.hidden = true;
  await showSection("vehicle");
});

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

photoChoiceCameraBtn.addEventListener("click", () => {
  closePhotoChoiceSheet();
  photoInput.click();
});
photoChoiceLibraryBtn.addEventListener("click", () => {
  closePhotoChoiceSheet();
  photoInputLibrary.click();
});
photoChoicePrevDayBtn.addEventListener("click", async () => {
  const slot = pendingSlot;
  pendingSlot = null;
  closePhotoChoiceSheet();
  if (slot !== "start" || !previousDayEndPhoto) return;
  currentPhotoStart = previousDayEndPhoto;
  originalPhotoStart = null;
  saveOriginalStartBtn.hidden = true;
  detailDirty = true;
  refreshPhotoPreview("start");
  await saveCurrentDetail();
});
photoChoiceCancelBtn.addEventListener("click", () => {
  pendingSlot = null;
  closePhotoChoiceSheet();
});
photoChoiceBackdrop.addEventListener("click", () => {
  pendingSlot = null;
  closePhotoChoiceSheet();
});

async function handlePhotoFileSelected(input) {
  const file = input.files[0];
  const slot = pendingSlot;
  const targetDate = currentDetailDate; // 縮小処理中に日付が切り替わっても混線しないよう固定
  pendingSlot = null;
  input.value = "";
  if (!file || !slot) return;

  let blob;
  try {
    blob = await downscaleImage(file);
  } catch (e) {
    blob = file;
  }

  if (currentDetailDate !== targetDate) {
    // 縮小処理中に別の日付の画面へ移動していた場合、表示中の状態(グローバル変数)を
    // 汚さないよう、対象の日付のレコードを直接読み書きする
    const rec = (await getRecord(targetDate)) || { date: targetDate };
    if (slot === "start") {
      rec.photoStart = blob;
    } else {
      rec.photoEnd = blob;
    }
    await putRecord(rec);
    await renderList();
    return;
  }

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
  if (slot === "start") {
    currentPhotoStart = blob;
  } else {
    currentPhotoEnd = blob;
  }
  detailDirty = true;
  refreshPhotoPreview(slot);
  await saveCurrentDetail();
}

photoInput.addEventListener("change", () => handlePhotoFileSelected(photoInput));
photoInputLibrary.addEventListener("change", () => handlePhotoFileSelected(photoInputLibrary));

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
  detailDirty = true;
  saveOriginalStartBtn.hidden = true;
  refreshPhotoPreview("start");
  await saveCurrentDetail();
});

removePhotoEndBtn.addEventListener("click", async (ev) => {
  ev.stopPropagation();
  currentPhotoEnd = null;
  originalPhotoEnd = null;
  detailDirty = true;
  saveOriginalEndBtn.hidden = true;
  refreshPhotoPreview("end");
  await saveCurrentDetail();
});

async function saveDetailAndToast() {
  await saveCurrentDetail();
  showSavedToast();
}

destinationInput.addEventListener("input", () => {
  detailDirty = true;
});

destinationInput.addEventListener("blur", () => {
  addDestHistoryFromText(destinationInput.value);
  renderDestHistoryChips();
  saveDetailAndToast();
});

destHistoryChips.addEventListener("mousedown", (ev) => {
  // チップ押下時に行き先入力欄がblurするとチップ自体が再描画されて消え、
  // その後のclickイベントが発火しなくなるため、blurを起こさせない
  if (ev.target.closest(".destChip")) ev.preventDefault();
});

destHistoryChips.addEventListener("click", (ev) => {
  const removeBtn = ev.target.closest(".destChipRemove");
  if (removeBtn) {
    removeDestHistory(removeBtn.dataset.value);
    renderDestHistoryChips();
    return;
  }
  const btn = ev.target.closest(".destChipLabel, .destChip.pinned");
  if (!btn) return;
  const value = btn.dataset.value;
  const current = destinationInput.value.trim();
  destinationInput.value = current ? `${current} → ${value}` : value;
  detailDirty = true;
  addDestHistory(value);
  renderDestHistoryChips();
  saveDetailAndToast();
});

let preCommuteDestination = "";

commuteOnlyCheckbox.addEventListener("change", () => {
  detailDirty = true;
  const current = destinationInput.value.trim();
  if (commuteOnlyCheckbox.checked) {
    if (current && current !== COMMUTE_LABEL) {
      if (!confirm(`入力済みの行き先「${current}」は消えますが、よろしいですか？`)) {
        commuteOnlyCheckbox.checked = false;
        return;
      }
    }
    preCommuteDestination = current === COMMUTE_LABEL ? "" : current;
    destinationInput.value = COMMUTE_LABEL;
  } else {
    destinationInput.value = preCommuteDestination;
    preCommuteDestination = "";
  }
  applyCommuteOnlyState();
  saveDetailAndToast();
});
startInput.addEventListener("input", () => {
  detailDirty = true;
  updateSummary();
});
endInput.addEventListener("input", () => {
  detailDirty = true;
  updateSummary();
});
startInput.addEventListener("blur", saveDetailAndToast);
endInput.addEventListener("blur", saveDetailAndToast);

breakCheckbox.addEventListener("change", async () => {
  detailDirty = true;
  if (!breakCheckbox.checked && (start2Input.value !== "" || end2Input.value !== "")) {
    if (!confirm("中抜けの再開距離・終了距離2が入力されています。チェックを外すとこの数値は消えますが、よろしいですか？")) {
      breakCheckbox.checked = true;
      return;
    }
  }
  breakFieldRow.hidden = !breakCheckbox.checked;
  if (!breakCheckbox.checked) {
    start2Input.value = "";
    end2Input.value = "";
  }
  updateSummary();
  // チェックを入れた直後はまだ再開/終了距離2が未入力で当然なので、
  // 「全項目空なら中抜けフラグを消す」自己修復の対象から外す
  await saveCurrentDetail({ skipBreakSelfHeal: breakCheckbox.checked });
});
start2Input.addEventListener("input", () => {
  detailDirty = true;
  updateSummary();
});
end2Input.addEventListener("input", () => {
  detailDirty = true;
  updateSummary();
});
start2Input.addEventListener("blur", saveDetailAndToast);
end2Input.addEventListener("blur", saveDetailAndToast);

// アプリがバックグラウンドに回る/閉じられるとblurが発火しないことがあるため、
// フォーカスを外さずに離脱しても入力中の内容が消えないようにする保険
document.addEventListener("visibilitychange", () => {
  if (document.visibilityState === "hidden") {
    saveCurrentDetail();
  }
});
window.addEventListener("pagehide", () => {
  saveCurrentDetail();
});

/* ---------- 初期化 ---------- */

(async () => {
  injectIcons();
  versionLabel.textContent = `バージョン ${APP_VERSION}`;
  try {
    await dbPromise;
    await renderHome();
  } catch (e) {
    // 白画面のまま固まらないよう、読み込み画面にエラー文言を残して表示し続ける
    const loadingSpinner = document.getElementById("loadingSpinner");
    const loadingText = document.getElementById("loadingText");
    if (loadingSpinner) loadingSpinner.hidden = true;
    if (loadingText) {
      loadingText.textContent =
        "データの読み込みに失敗しました。プライベートブラウズモードや、端末のストレージ空き容量不足が原因の可能性があります。ブラウザの設定を確認し、アプリを再度開いてください。";
    }
    alert(
      "データの読み込みに失敗しました。プライベートブラウズモードや、端末のストレージ空き容量不足が原因の可能性があります。ブラウザの設定を確認し、アプリを再度開いてください。"
    );
    return;
  }
  loadingView.hidden = true;
  homeView.hidden = false;
})();
