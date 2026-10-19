/* Nyyo multi-sector tender demo — static, browser-only assembly. Fictional data only. */
(function () {
  "use strict";
  const LANG = /^fr/i.test(document.documentElement.lang || "") ? "fr" : "en";
  const BASE = document.body.dataset.base || "./data/" + LANG + "/";
  const ORDER = ["proprete", "securite", "it", "formation"];
  const loc = LANG === "fr" ? "fr-FR" : "en-US";

  const STR = {
    fr: {
      required: "Obligatoire", optional: "Facultatif", alt: "Alternative", page: "p.",
      typeQuery: "Saisissez une recherche ou touchez une suggestion.", noMatch: "Aucun résultat — essayez un autre terme.",
      drafting: "Rédaction des rubriques à partir du cadre imposé et de vos anciens mémoires…",
      money: (n) => Number(n).toLocaleString(loc) + " € HT",
      rate: (n) => Number(n).toLocaleString(loc, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + " € HT/h",
      notes: "Engagements de l'entreprise : ",
      mapped: "Réponse proposée", gap: "Écart à corriger", review: "À vérifier",
      noSource: "Aucune pièce trouvée dans vos documents",
      chkMemo: "Brouillon généré dans cette démo", chkPrice: (m) => `Prix saisi : ${m}`, chkPriceNone: "Prix à saisir",
      chkLead: (p) => `Nommé(e) : ${p}`, chkLeadNone: "Personne à nommer", chkForm: "Formulaire officiel à compléter et signer",
      chkAlt: "Accepté à la place de DC1 + DC2", chkVisitOk: "Visite effectuée — joindre l'attestation", chkVisitKo: "Visite à faire",
      attach: "À joindre depuis vos fichiers", formTag: "Formulaire",
      gonogo: (c, t, list) => `<strong>${c}/${t} exigences</strong> déjà couvertes par vos documents ou vos saisies` + (list.length ? ` · <strong>${list.length} à vérifier</strong> : ${list.join(", ")}` : ""),
      gonogoTitle: "Aide au Go / No-Go (exemple)",
      checksOk: (n, t) => `${n}/${t} contrôles au vert`,
      docxLoading: "La bibliothèque DOCX se charge encore — réessayez dans une seconde.",
      docxTitle: "MÉMOIRE TECHNIQUE — BROUILLON À RELIRE",
      docxHeader: "Brouillon — relecture humaine obligatoire · données fictives",
      docxWarn: "RELECTURE HUMAINE OBLIGATOIRE — DCE fictif de démonstration. L'entreprise reste seule responsable de toute offre réelle. Les prix viennent de l'entreprise, jamais de l'IA.",
      docxInfo: ["Acheteur", "Référence", "Procédure", "Durée", "Remise des offres", "Secteur", "Candidat"],
      docxCadre: "Structure : ", docxChecks: "Contrôles avant dépôt", docxChkHdr: ["Contrôle", "Résultat", "Réf."],
      matrix: "Matrice de conformité", hdr: ["Réf.", "Exigence (extrait du DCE)", "Statut", "Réponse sourcée"],
      checklist: "Pièces à remettre (DC1, DC2, DUME, BPU / DQE…)", ckHdr: ["", "Pièce", "Statut"],
      sources: "Annexe — sources citées", srcFrom: "Source : ",
      footer: "Généré par la démo Nyyo Automation · données fictives · ne constitue pas un conseil juridique",
      pageOf: ["Page ", " / "], docTitle: "Mémoire technique (brouillon)",
      genFirst: "Générez d'abord le mémoire.", printTitle: "Mémoire technique — brouillon à relire",
      printWarn: "RELECTURE HUMAINE OBLIGATOIRE — exemple fictif.", loadFail: "Échec du chargement des données de la démo : ",
      dceExtract: "Extrait du DCE fictif", kbExtract: "Extrait de vos documents (fictifs)", close: "Fermer",
      reqsFrom: "Exigences relevées dans cette pièce", openSrc: "Voir l'extrait",
      vStats: (r, d, f, c) => [[r, "exigences repérées, chacune avec son article et sa page"], [d, "pièces listées, dont " + f], [c, "contrôles de cohérence avant dépôt"], ["Word", "mémoire au cadre imposé, prêt à relire"]],
      title: (n) => `Appels d'offres ${n} — démo IA · Nyyo Automation`,
      yes: "oui", no: "non",
    },
    en: {
      required: "Required", optional: "Optional", alt: "Alternative", page: "p.",
      typeQuery: "Type a query or tap a suggestion.", noMatch: "No matches — try another term.",
      drafting: "Drafting each section from the buyer's template and your past proposals…",
      money: (n) => "$" + Number(n).toLocaleString(loc) + " excl. tax",
      rate: (n) => "$" + Number(n).toLocaleString(loc, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + "/h excl. tax",
      notes: "Bidder commitments: ",
      mapped: "Answer drafted", gap: "Gap to fix", review: "To check",
      noSource: "Nothing found in your documents",
      chkMemo: "Draft generated in this demo", chkPrice: (m) => `Price entered: ${m}`, chkPriceNone: "Enter the price",
      chkLead: (p) => `Named: ${p}`, chkLeadNone: "Name someone", chkForm: "Official form to fill in and sign",
      chkAlt: "Accepted instead of the two compliance forms", chkVisitOk: "Visit done — attach the certificate", chkVisitKo: "Site visit to do",
      attach: "Attach from your files", formTag: "Form",
      gonogo: (c, t, list) => `<strong>${c}/${t} requirements</strong> already covered by your documents or inputs` + (list.length ? ` · <strong>${list.length} to check</strong>: ${list.join(", ")}` : ""),
      gonogoTitle: "Go / No-Go aid (sample)",
      checksOk: (n, t) => `${n}/${t} checks passing`,
      docxLoading: "The DOCX library is still loading — try again in a second.",
      docxTitle: "TECHNICAL PROPOSAL — DRAFT FOR REVIEW",
      docxHeader: "Draft — human review required · fictional data",
      docxWarn: "HUMAN REVIEW REQUIRED — fictional sample tender. The bidder remains solely responsible for any real submission. Prices come from the bidder, never from the AI.",
      docxInfo: ["Buyer", "Reference", "Procedure", "Term", "Bid deadline", "Sector", "Bidder"],
      docxCadre: "Structure: ", docxChecks: "Pre-submission checks", docxChkHdr: ["Check", "Result", "Ref."],
      matrix: "Compliance matrix", hdr: ["Ref.", "Requirement (tender extract)", "Status", "Sourced answer"],
      checklist: "Documents to submit (compliance forms, bid submission form, pricing schedule…)", ckHdr: ["", "Document", "Status"],
      sources: "Appendix — cited sources", srcFrom: "Source: ",
      footer: "Generated by the Nyyo Automation demo · fictional data · not legal advice",
      pageOf: ["Page ", " / "], docTitle: "Technical proposal (draft)",
      genFirst: "Generate the proposal first.", printTitle: "Technical proposal — draft for review",
      printWarn: "HUMAN REVIEW REQUIRED — fictional sample.", loadFail: "Demo data failed to load: ",
      dceExtract: "Fictional tender extract", kbExtract: "Extract from your (fictional) documents", close: "Close",
      reqsFrom: "Requirements found in this document", openSrc: "View extract",
      vStats: (r, d, f, c) => [[r, "requirements found, each with its clause and page"], [d, "documents listed: compliance and bid forms, pricing schedule, certificates"], [c, "consistency checks before submission"], ["Word", "proposal in the buyer's template, ready to review"]],
      title: (n) => `${n} public tenders — AI demo · Nyyo Automation`,
      yes: "yes", no: "no",
    },
  };
  const T = STR[LANG];
  if (window.NyyoBM25 && window.NyyoBM25.setLang) window.NyyoBM25.setLang(LANG);

  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const esc = (s) => String(s ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
  const nb = (x) => esc(x).replace(/ /g, "&nbsp;");
  const icons = () => window.lucide && window.lucide.createIcons();

  const ALL = {};
  const st = { id: null, d: null, idx: null, form: null, packReady: false, run: 0 };

  /* ---------- helpers ---------- */
  function kbDoc(id) { return st.d.chunks.find((c) => c.id === id); }
  function field(id) { return st.d.form.fields.find((f) => f.id === id); }
  function fmt(id, v) {
    const f = field(id);
    if (!f) return String(v);
    if (f.type === "money") return T.money(v);
    if (f.type === "rate") return T.rate(v);
    if (f.type === "number") return Number(v).toLocaleString(loc);
    return String(v);
  }
  function fill(tpl, form) { return tpl.replace(/\{(\w+)\}/g, (_, k) => (k in form ? fmt(k, form[k]) : "")); }
  function readForm() {
    const o = {};
    for (const f of st.d.form.fields) {
      const el = $("#f_" + f.id);
      o[f.id] = f.type === "select" ? el.value : Number(el.value);
    }
    o.notes = ($("#f_notes").value || "").trim();
    return o;
  }
  function evalCheck(c, form) {
    const a = form[c.field], bv = c.other ? form[c.other] : c.value;
    const ok = { le: a <= bv, ge: a >= bv, gt: a > bv, eq: a === bv, ne: a !== bv, eqf: Number(a) === Number(bv), gef: Number(a) >= Number(bv) }[c.op];
    return { ...c, pass: !!ok, msg: fill(ok ? c.ok : c.ko, form) };
  }
  function runChecks(form) { return st.d.checks.map((c) => evalCheck(c, form)); }
  function kbCite(id) {
    const d = kbDoc(id);
    if (!d) return "";
    return `<button type="button" class="cite cite-btn" data-kb="${esc(id)}" title="${esc(T.openSrc)}"><i data-lucide="file-text"></i>${esc(d.source)} · ${T.page}${d.page}</button>`;
  }
  function dceCite(r) {
    return `<button type="button" class="cite cite-btn cite-tender" data-req="${esc(r.id)}" title="${esc(T.openSrc)}"><i data-lucide="file-search"></i>${esc(r.source)} · ${T.page}${r.page} · ${esc(r.art)}</button>`;
  }

  /* ---------- sector tabs ---------- */
  function renderTabs() {
    const box = $("#sectorTabs");
    box.innerHTML = ORDER.map((id) => {
      const s = ALL[id];
      return `<button type="button" role="tab" class="sec-tab" id="tab-${id}" data-s="${id}" aria-selected="false" aria-controls="demoRoot" tabindex="-1"><i data-lucide="${s.icon}"></i><span>${esc(s.name)}</span></button>`;
    }).join("");
    box.addEventListener("click", (e) => { const b = e.target.closest(".sec-tab"); if (b) selectSector(b.dataset.s, true); });
    box.addEventListener("keydown", (e) => {
      if (!["ArrowRight", "ArrowLeft", "Home", "End"].includes(e.key)) return;
      e.preventDefault();
      let i = ORDER.indexOf(st.id);
      if (e.key === "ArrowRight") i = (i + 1) % ORDER.length;
      if (e.key === "ArrowLeft") i = (i - 1 + ORDER.length) % ORDER.length;
      if (e.key === "Home") i = 0;
      if (e.key === "End") i = ORDER.length - 1;
      selectSector(ORDER[i], true);
      $("#tab-" + ORDER[i]).focus();
    });
  }

  function selectSector(id, user) {
    if (!ALL[id]) id = ORDER[0];
    st.id = id; st.d = ALL[id]; st.packReady = false; st.form = null; st.run++;
    $$(".sec-tab").forEach((b) => { const on = b.dataset.s === id; b.setAttribute("aria-selected", on); b.tabIndex = on ? 0 : -1; b.classList.toggle("on", on); });
    document.body.dataset.sector = id;
    const u = new URL(location.href);
    u.searchParams.set("s", id);
    u.hash = "";
    history.replaceState(null, "", u.pathname + u.search);
    document.title = T.title(st.d.name);
    renderHero(); renderValue(); renderExtraction(); initKb(); renderForm();
    $("#panelPack").classList.add("hidden");
    $("#panelExtract").classList.add("hidden");
    icons();
    runPipeline();
    if (user) $("#pipeline").scrollIntoView({ behavior: "smooth", block: "nearest" });
  }

  /* ---------- hero + value ---------- */
  function renderHero() {
    const d = st.d;
    $("#heroSector").textContent = d.name;
    $("#heroGrad").textContent = d.h1;
    $("#heroLead").textContent = d.lead;
    $("#heroPieces").textContent = d.pieces;
    $$(".js-pieces").forEach((el) => (el.textContent = d.pieces));
    $("#kbCompany").textContent = d.company;
    $("#kbDesc").textContent = d.company_desc;
    $("#kbQ").placeholder = (LANG === "fr" ? "Essayez : " : "Try: ") + d.chips.slice(0, 3).join(", ") + "…";
  }

  function renderValue() {
    const d = st.d, v = d.value;
    $("#valueSector").textContent = d.name;
    $("#valueCase").textContent = d.meta.title;
    $("#valueRows").innerHTML = v.rows.map((r) => `<tr><td>${esc(r[0])}</td><td class="v-before">${nb(r[1])}</td><td class="v-after">${esc(r[2])}</td></tr>`).join("") +
      `<tr class="v-total"><td>${LANG === "fr" ? "Total sur l'exemple" : "Total on the sample"}</td><td class="v-before">${nb(v.total[0])}</td><td class="v-after">${nb(v.total[1])}</td></tr>`;
    const short = (n) => (/\(AE\)/.test(n) ? "AE" : n.split(" — ")[0].replace(/ \(.*\)$/, ""));
    const forms = d.required_documents.filter((x) => x.kind === "form").map((x) => short(x.name));
    const price = [...new Set(d.required_documents.filter((x) => x.kind === "price").map((x) => x.name.split(" ")[0]))];
    const stats = T.vStats(d.requirements.length, d.required_documents.length, [...forms, ...price].join(", "), d.checks.length);
    $("#valueStats").innerHTML = stats.map((s) => `<div class="v-stat"><b>${esc(s[0])}</b><span>${esc(s[1])}</span></div>`).join("");
  }

  /* ---------- pipeline ---------- */
  function setRing(sel, lab, v) { const r = $(sel); if (!r) return; r.style.setProperty("--p", v); r.dataset.p = v; $(lab).textContent = v + "%"; }
  function animRing(sel, lab, pct, dur) {
    return new Promise((res) => {
      const r = $(sel); if (!r) return res();
      const s = Number(r.dataset.p || 0), t0 = performance.now();
      (function f(t) { const k = Math.min(1, (t - t0) / dur), e = 1 - Math.pow(1 - k, 3); setRing(sel, lab, Math.round(s + (pct - s) * e)); k < 1 ? requestAnimationFrame(f) : res(); })(t0);
    });
  }
  function countUp(el, to, ms) { const t0 = performance.now(); (function f(t) { const k = Math.min(1, (t - t0) / ms); el.textContent = Math.round(to * k) + "%"; if (k < 1) requestAnimationFrame(f); })(t0); }
  function preCoverage() { const r = st.d.requirements; return Math.round((r.filter((x) => x.kb || x.check).length / r.length) * 100); }

  async function runPipeline() {
    const token = st.run;
    const btn = $("#btnRun"); btn.disabled = true;
    setStep(1);
    const nodes = $$(".pipe-node");
    nodes.forEach((n) => n.classList.remove("on", "done"));
    $("#pipeCrit").innerHTML = st.d.scoring.map((c) => `<div class="pc-row" data-id="${c.id}"><span class="id">${c.id}</span><div><span class="pc-name">${esc(c.name)}</span><div class="pc-bar"><b></b></div></div><span class="w" data-w="${c.weight}">0%</span></div>`).join("");
    setRing("#pipeRing", "#pipeRingPct", 0);
    const pipe = $("#pipeline"), fly = $("#flyDocs");
    fly.innerHTML = "";
    const pr = pipe.getBoundingClientRect(), src = nodes[0].getBoundingClientRect(), dst = nodes[1].getBoundingClientRect();
    nodes[0].classList.add("on");
    st.d.fly.forEach((name, i) => {
      const el = document.createElement("div");
      el.className = "fly-doc";
      el.innerHTML = `<span style="color:var(--lime)">&#9632;</span>${esc(name)}`;
      el.style.setProperty("--sx", src.left - pr.left + 6 + i * 10 + "px");
      el.style.setProperty("--sy", src.bottom - pr.top + 8 + i * 6 + "px");
      el.style.setProperty("--tx", dst.left - pr.left + dst.width / 2 - 50 + "px");
      el.style.setProperty("--ty", dst.top - pr.top + dst.height / 2 - 12 + "px");
      el.style.animationDelay = i * 0.28 + "s";
      fly.appendChild(el);
      requestAnimationFrame(() => el.classList.add("go"));
    });
    await sleep(450); if (token !== st.run) return;
    nodes[0].classList.add("done"); nodes[1].classList.add("on");
    await sleep(500); if (token !== st.run) return;
    nodes[1].classList.add("done"); nodes[2].classList.add("on"); nodes[3].classList.add("on");
    const target = preCoverage();
    const ringP = animRing("#pipeRing", "#pipeRingPct", target, 2600);
    const rows = $$(".pc-row"), cards = $$(".crit");
    for (let i = 0; i < rows.length; i++) {
      if (token !== st.run) return;
      const w = Number(rows[i].querySelector(".w").dataset.w);
      rows[i].classList.add("lit");
      rows[i].querySelector(".pc-bar b").style.width = Math.min(100, w * 2.4) + "%";
      countUp(rows[i].querySelector(".w"), w, 650);
      if (cards[i]) cards[i].classList.add("lit");
      await sleep(380);
    }
    nodes[2].classList.add("done");
    await ringP; if (token !== st.run) return;
    setRing("#coverRing", "#coverPct", target);
    nodes[3].classList.add("done");
    $("#panelExtract").classList.remove("hidden");
    btn.disabled = false;
    icons();
  }
  function setStep(n) { $$(".step").forEach((s) => s.classList.toggle("active", Number(s.dataset.step) === n)); }

  /* ---------- extraction ---------- */
  function renderExtraction() {
    const d = st.d, m = d.meta;
    $("#tenderTitle").innerHTML = `<strong>${esc(m.title)}</strong> · ${esc(m.buyer)} · <span class="mono">${esc(m.tender_id)}</span>`;
    $("#tenderMeta").innerHTML = [m.procedure, m.cpv, m.term].map((x) => `<span class="pill">${esc(x)}</span>`).join(" ");
    $("#tenderFiles").innerHTML = m.source_files.map((f) => `<button type="button" class="tender-file" data-file="${esc(f.name)}"><i data-lucide="${/\.xlsx$/.test(f.name) ? "sheet" : /\.docx$/.test(f.name) ? "file-type" : "file-text"}"></i><span>${esc(f.name)}</span><small>${esc(f.type)} · ${f.pages} ${T.page}</small></button>`).join("");
    $("#cadreName").textContent = d.cadre.name;
    $("#cadreNote").textContent = d.cadre.note;
    $("#cadreList").innerHTML = d.scoring.map((c) => `<li><span class="mono">${c.id}</span> ${esc(d.sections[c.id].title)} <span class="w">${c.weight}%</span></li>`).join("");
    const covered = d.requirements.filter((r) => r.kb || r.check).length;
    const toCheck = d.requirements.filter((r) => !r.kb && !r.check).map((r) => r.id);
    $("#gonogo").innerHTML = `<h3><i data-lucide="compass"></i> ${T.gonogoTitle}</h3><p>${T.gonogo(covered, d.requirements.length, toCheck)}</p>`;
    $("#criteria").innerHTML = d.scoring.map((c) => `<div class="crit" data-id="${c.id}"><div class="w">${c.weight}%</div><div class="name">${esc(c.id)} · ${esc(c.name)}</div><p class="desc">${esc(c.description)}</p></div>`).join("");
    $("#deadlines tbody").innerHTML = d.deadlines.map((x) => `<tr><td>${esc(x.label)}</td><td class="mono">${esc([x.date, x.time, x.tz].filter(Boolean).join(" "))}${x.note ? ` <span class="pill">${esc(x.note)}</span>` : ""}</td></tr>`).join("");
    $("#docs tbody").innerHTML = d.required_documents.map((x) => `<tr><td>${esc(x.name)}${x.kind === "form" ? ` <span class="pill form-pill">${T.formTag}</span>` : ""}<div class="doc-note">${esc(x.notes || "")}</div></td><td>${x.alt ? `<span class="pill">${T.alt}</span>` : x.mandatory ? `<span class="pill warn">${T.required}</span>` : `<span class="pill">${T.optional}</span>`}</td></tr>`).join("");
    $("#reqs").innerHTML = d.requirements.map((r) => `<div class="req-item"><span class="id">${esc(r.id)}</span><div><strong>${esc(r.category)}</strong> — ${esc(r.text)}</div><span class="src">${dceCite(r)}</span></div>`).join("");
    $("#alerts").innerHTML = d.alerts.map((a) => `<div class="alert-row ${a.level === "warn" ? "warn" : "info"}"><i data-lucide="${a.level === "warn" ? "triangle-alert" : "info"}"></i><span>${esc(a.text)}</span></div>`).join("");
  }

  /* ---------- KB search ---------- */
  function initKb() {
    const chunks = st.d.chunks.map((c) => ({ ...c }));
    st.idx = window.NyyoBM25.buildIndex(chunks);
    $("#kbChips").innerHTML = st.d.chips.map((c) => `<button type="button" class="chip" data-q="${esc(c)}">${esc(c)}</button>`).join("");
    $("#kbQ").value = st.d.firstQuery;
    searchKb(st.d.firstQuery, true);
  }
  function searchKb(q, silent) {
    if (!silent) setStep(2);
    const query = (q || "").trim();
    if (!query) { $("#kbHits").innerHTML = `<p class="muted-p">${T.typeQuery}</p>`; return; }
    const hits = window.NyyoBM25.score(st.idx, query).slice(0, 4);
    if (!hits.length) { $("#kbHits").innerHTML = `<p class="muted-p">${T.noMatch}</p>`; return; }
    $("#kbHits").innerHTML = hits.map((h) => { const d = kbDoc(h.id); return `<article class="hit"><h4>${esc(d.title)}</h4><p>${esc(d.text.slice(0, 260))}${d.text.length > 260 ? "…" : ""}</p>${kbCite(d.id)}</article>`; }).join("");
    icons();
  }

  /* ---------- form + live checks ---------- */
  function renderForm() {
    const d = st.d;
    $("#bidForm").innerHTML = d.form.fields.map((f) => {
      const id = "f_" + f.id;
      if (f.type === "select") return `<div class="field"><label for="${id}">${esc(f.label)}</label><select id="${id}">${f.options.map((o) => `<option value="${esc(o[0])}"${o[0] === f.value ? " selected" : ""}>${esc(o[1])}</option>`).join("")}</select></div>`;
      return `<div class="field"><label for="${id}">${esc(f.label)}</label><input id="${id}" type="number" inputmode="decimal" value="${f.value}"${f.min != null ? ` min="${f.min}"` : ""}${f.max != null ? ` max="${f.max}"` : ""} step="${f.step || 1}" /></div>`;
    }).join("") + `<div class="field full"><label for="f_notes">${LANG === "fr" ? "Engagements / remarques" : "Commitments / notes"}</label><textarea id="f_notes">${esc(d.form.notes)}</textarea></div>`;
    $("#bidForm").oninput = () => { updateChecks(); if (st.packReady) { st.packReady = false; $("#staleNote").classList.remove("hidden"); } };
    updateChecks();
  }
  function updateChecks() {
    const res = runChecks(readForm());
    const n = res.filter((r) => r.pass).length;
    $("#checksSummary").textContent = T.checksOk(n, res.length);
    $("#checksSummary").className = "pill " + (n === res.length ? "ok" : "warn");
    $("#checks").innerHTML = res.map((r) => `<li class="chk ${r.pass ? "pass" : "fail"}"><i data-lucide="${r.pass ? "circle-check" : "circle-alert"}"></i><div><strong>${esc(r.label)}</strong><span>${esc(r.msg)}</span></div><span class="mono ref">${esc(r.ref)}</span></li>`).join("");
    icons();
    return res;
  }

  /* ---------- generate ---------- */
  function bulletsFor(cid, form) {
    const d = st.d, out = [...d.sections[cid].bullets.map((x) => ({ ...x }))];
    for (const fb of d.formBullets[cid] || []) {
      if (fb.when && form[fb.when[0]] !== fb.when[1]) continue;
      let cite = fb.cite || null;
      if (fb.citeIf && form[fb.citeIf[0]] !== fb.citeIf[1]) cite = null;
      out.push({ text: fill(fb.tpl, form), cite });
    }
    if (cid === d.form.notesCrit && form.notes) out.push({ text: T.notes + form.notes, cite: null });
    return out;
  }
  function reqStatus(r, checks) {
    const c = r.check ? checks.find((x) => x.id === r.check) : null;
    if (c && !c.pass) return { cls: "bad", label: T.gap, note: c.msg };
    if (r.kb || (c && c.pass)) return { cls: "ok", label: T.mapped, note: c ? c.msg : "" };
    return { cls: "warn", label: T.review, note: T.noSource };
  }

  async function generatePack() {
    const token = ++st.run;
    $("#btnRun").disabled = false;
    $("#panelExtract").classList.remove("hidden");
    $$(".pipe-node").forEach((n) => n.classList.add("done"));
    setStep(3);
    st.form = readForm();
    const checks = updateChecks();
    setStep(4);
    const panel = $("#panelPack");
    panel.classList.remove("hidden");
    $("#staleNote").classList.add("hidden");
    const out = $("#proposalOut");
    out.innerHTML = `<p class="cursor-blink muted-p">${T.drafting}</p>`;
    panel.scrollIntoView({ behavior: "smooth", block: "start" });
    await sleep(350);
    out.innerHTML = "";
    $("#packCadre").textContent = st.d.cadre.name + " — " + st.d.cadre.note;
    for (const c of st.d.scoring) {
      if (token !== st.run) return;
      const el = document.createElement("div");
      el.className = "prop-sec";
      el.innerHTML = `<h3><span class="pill">${esc(c.id)} · ${c.weight}%</span> ${esc(st.d.sections[c.id].title)}</h3><ul></ul>`;
      out.appendChild(el);
      await sleep(180);
      el.classList.add("show");
      const ul = $("ul", el);
      const bl = bulletsFor(c.id, st.form);
      for (let i = 0; i < bl.length; i++) {
        const li = document.createElement("li");
        li.innerHTML = esc(bl[i].text) + (bl[i].cite ? " " + kbCite(bl[i].cite) : "");
        ul.appendChild(li);
        await sleep(90);
      }
      icons();
    }
    if (token !== st.run) return;
    $("#matrix tbody").innerHTML = st.d.requirements.map((r) => {
      const s = reqStatus(r, checks);
      return `<tr><td class="mono">${esc(r.id)}</td><td>${esc(r.text)}<div class="mt4">${dceCite(r)}</div></td><td><span class="pill ${s.cls}">${esc(s.label)}</span>${s.note ? `<div class="doc-note">${esc(s.note)}</div>` : ""}</td><td>${r.kb ? kbCite(r.kb) : "—"}</td></tr>`;
    }).join("");
    $("#packChecks").innerHTML = $("#checks").innerHTML;
    $("#checklist tbody").innerHTML = checklistRows(st.form).map((x) => `<tr><td>${esc(x.name)}${x.form ? ` <span class="pill form-pill">${T.formTag}</span>` : ""}</td><td><span class="pill ${x.cls}">${esc(x.note)}</span></td></tr>`).join("");
    const okReqs = st.d.requirements.filter((r) => reqStatus(r, checks).cls === "ok").length;
    await Promise.all([animRing("#coverRing", "#coverPct", Math.round((okReqs / st.d.requirements.length) * 100), 900), animRing("#pipeRing", "#pipeRingPct", Math.round((okReqs / st.d.requirements.length) * 100), 900)]);
    st.packReady = true;
    icons();
  }

  function checklistRows(form) {
    const lead = form.lead;
    return st.d.required_documents.map((x) => {
      let note, cls = "warn";
      if (x.kind === "memo") { note = T.chkMemo; cls = "ok"; }
      else if (x.kind === "price") { if (form.price > 0) { note = T.chkPrice(fmt("price", form.price)); cls = "ok"; } else note = T.chkPriceNone; }
      else if (x.kind === "lead") { if (lead && lead !== "Autre" && lead !== "Other") { note = T.chkLead(lead); cls = "ok"; } else note = T.chkLeadNone; }
      else if (x.kind === "visit") { if (form.visit === "yes") { note = T.chkVisitOk; cls = "ok"; } else { note = T.chkVisitKo; cls = "bad"; } }
      else if (x.alt) { note = T.chkAlt; cls = ""; }
      else if (x.kind === "form") note = x.mandatory ? T.chkForm : T.optional + " — " + x.notes;
      else note = x.mandatory ? T.attach : T.optional;
      return { name: x.name, note, cls, form: x.kind === "form", mandatory: x.mandatory, notes: x.notes };
    });
  }

  /* ---------- source viewer ---------- */
  function openSource(html) {
    const dlg = $("#srcModal");
    $("#srcBody").innerHTML = html;
    icons();
    if (dlg.showModal) dlg.showModal(); else dlg.setAttribute("open", "");
  }
  function showReq(id) {
    const r = st.d.requirements.find((x) => x.id === id);
    if (!r) return;
    const same = st.d.requirements.filter((x) => x.source === r.source && x.id !== r.id);
    openSource(`<p class="src-kicker">${T.dceExtract}</p><h3>${esc(r.source)} · ${T.page}${r.page} · ${esc(r.art)}</h3>
      <blockquote class="src-quote"><span class="mono">${esc(r.art)}</span> ${esc(r.text)}</blockquote>
      <p class="doc-note">${esc(st.d.meta.title)} — ${esc(st.d.meta.buyer)}</p>
      ${r.kb ? `<p class="mt8">${T.mapped} : ${kbCite(r.kb)}</p>` : ""}
      ${same.length ? `<h4>${T.reqsFrom}</h4><ul class="src-list">${same.map((x) => `<li><button type="button" class="linklike" data-req="${x.id}">${x.id} · ${T.page}${x.page} · ${esc(x.category)}</button></li>`).join("")}</ul>` : ""}`);
  }
  function showFile(name) {
    const rs = st.d.requirements.filter((x) => x.source === name).sort((a, b) => a.page - b.page);
    const f = st.d.meta.source_files.find((x) => x.name === name);
    openSource(`<p class="src-kicker">${T.dceExtract}</p><h3>${esc(name)}${f ? ` · ${esc(f.type)} · ${f.pages} ${T.page}` : ""}</h3>
      ${rs.length ? rs.map((r) => `<blockquote class="src-quote"><span class="mono">${T.page}${r.page} · ${esc(r.art)}</span> ${esc(r.text)}</blockquote>`).join("") : `<p class="muted-p">${LANG === "fr" ? "Pièce financière ou annexe : aucune exigence rédactionnelle extraite ; les prix restent saisis par vous." : "Pricing file or appendix: no written requirement extracted; prices stay entered by you."}</p>`}`);
  }
  function showKb(id) {
    const d = kbDoc(id);
    if (!d) return;
    openSource(`<p class="src-kicker">${T.kbExtract}</p><h3>${esc(d.title)}</h3><p class="mono doc-note">${esc(d.source)} · ${T.page}${d.page}</p><blockquote class="src-quote">${esc(d.text)}</blockquote>`);
  }

  /* ---------- DOCX ---------- */
  async function downloadDocx() {
    if (!st.packReady) await generatePack();
    const D = window.docx;
    if (!D) { alert(T.docxLoading); return; }
    const { Document, Packer, Paragraph, TextRun, HeadingLevel, Table, TableRow, TableCell, WidthType, BorderStyle, Header, Footer, PageNumber, AlignmentType, ShadingType } = D;
    const d = st.d, form = st.form || readForm(), checks = runChecks(form);
    const border = { style: BorderStyle.SINGLE, size: 4, color: "C9D3E3" };
    const borders = { top: border, bottom: border, left: border, right: border };
    const cell = (t, w, opt = {}) => new TableCell({ borders, width: { size: w, type: WidthType.DXA }, shading: opt.fill ? { type: ShadingType.CLEAR, color: "auto", fill: opt.fill } : undefined,
      margins: { top: 60, bottom: 60, left: 90, right: 90 },
      children: [new Paragraph({ children: [new TextRun({ text: String(t), bold: !!opt.bold, size: opt.size || 18, color: opt.color })] })] });
    const table = (widths, head, rows) => new Table({ width: { size: widths.reduce((a, b) => a + b, 0), type: WidthType.DXA }, columnWidths: widths,
      rows: [...(head ? [new TableRow({ tableHeader: true, children: head.map((h, i) => cell(h, widths[i], { bold: true, fill: "E8EEF9" })) })] : []),
        ...rows.map((r) => new TableRow({ children: r.map((c, i) => (typeof c === "object" && c !== null ? cell(c.t, widths[i], c) : cell(c, widths[i]))) }))] });
    const dl = d.deadlines.find((x) => /remise|bid deadline|submission/i.test(x.label));
    const used = new Set();
    const children = [
      new Paragraph({ text: T.docxTitle, heading: HeadingLevel.TITLE }),
      new Paragraph({ spacing: { after: 160 }, children: [new TextRun({ text: d.meta.title, bold: true, size: 26 })] }),
      new Paragraph({ spacing: { after: 200 }, shading: { type: ShadingType.CLEAR, color: "auto", fill: "FFF4D6" }, children: [new TextRun({ text: T.docxWarn, bold: true, color: "8A4B00", size: 20 })] }),
      table([2600, 6400], null, [[d.meta.buyer], [d.meta.tender_id], [d.meta.procedure], [d.meta.term],
        [dl ? [dl.date, dl.time, dl.tz].filter(Boolean).join(" ") : "—"], [d.name], [d.company]].map((v, i) => [{ t: T.docxInfo[i], bold: true, fill: "EEF2F8" }, v[0]])),
      new Paragraph({ spacing: { before: 200, after: 200 }, children: [new TextRun({ text: T.docxCadre, bold: true }), new TextRun(d.cadre.name + " — " + d.cadre.note)] }),
    ];
    for (const c of d.scoring) {
      children.push(new Paragraph({ text: `${d.sections[c.id].title} (${c.id} · ${c.weight} %)`, heading: HeadingLevel.HEADING_1, spacing: { before: 240, after: 120 } }));
      for (const bl of bulletsFor(c.id, form)) {
        const runs = [new TextRun(bl.text)];
        const k = bl.cite && kbDoc(bl.cite);
        if (k) { used.add(k.id); runs.push(new TextRun({ text: `  [${T.srcFrom}${k.source}, ${T.page}${k.page}]`, italics: true, color: "5B6B85", size: 18 })); }
        children.push(new Paragraph({ bullet: { level: 0 }, spacing: { after: 80 }, children: runs }));
      }
    }
    children.push(new Paragraph({ text: T.docxChecks, heading: HeadingLevel.HEADING_1, spacing: { before: 280, after: 120 } }));
    children.push(table([3000, 4600, 1400], T.docxChkHdr, checks.map((c) => [c.label, { t: (c.pass ? "✓ " : "✗ ") + c.msg, color: c.pass ? "1E7A3C" : "B42318" }, c.ref])));
    children.push(new Paragraph({ text: T.matrix, heading: HeadingLevel.HEADING_1, spacing: { before: 280, after: 120 } }));
    children.push(table([700, 4300, 1500, 2500], T.hdr, d.requirements.map((r) => {
      const s = reqStatus(r, checks), k = r.kb && kbDoc(r.kb);
      if (k) used.add(k.id);
      return [r.id, `${r.text} (${r.source}, ${T.page}${r.page}, ${r.art})`, { t: s.label, color: s.cls === "ok" ? "1E7A3C" : s.cls === "bad" ? "B42318" : "8A4B00", bold: true }, k ? `${k.source}, ${T.page}${k.page}` : s.note || "—"];
    })));
    children.push(new Paragraph({ text: T.checklist, heading: HeadingLevel.HEADING_1, spacing: { before: 280, after: 120 } }));
    children.push(table([500, 4700, 3800], T.ckHdr, checklistRows(form).map((x) => [x.cls === "ok" ? "☑" : "☐", x.name + (x.notes ? " — " + x.notes : ""), x.note])));
    children.push(new Paragraph({ text: T.sources, heading: HeadingLevel.HEADING_1, spacing: { before: 280, after: 120 } }));
    for (const id of used) { const k = kbDoc(id); children.push(new Paragraph({ bullet: { level: 0 }, children: [new TextRun({ text: k.source, bold: true, size: 18 }), new TextRun({ text: ` — ${k.title}, ${T.page}${k.page}`, size: 18 })] })); }
    children.push(new Paragraph({ spacing: { before: 400 }, children: [new TextRun({ text: T.footer, italics: true, color: "5B6B85", size: 16 })] }));

    const doc = new Document({
      creator: "Nyyo Automation", title: T.docTitle, description: d.meta.tender_id,
      styles: { default: { document: { run: { font: "Calibri", size: 21 } } } },
      sections: [{
        properties: { page: { margin: { top: 1200, bottom: 1100, left: 1200, right: 1200 } } },
        headers: { default: new Header({ children: [new Paragraph({ alignment: AlignmentType.RIGHT, children: [new TextRun({ text: `${d.meta.tender_id} · ${T.docxHeader}`, size: 16, color: "8A4B00" })] })] }) },
        footers: { default: new Footer({ children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ size: 16, color: "5B6B85", children: [T.pageOf[0], PageNumber.CURRENT, T.pageOf[1], PageNumber.TOTAL_PAGES] })] })] }) },
        children,
      }],
    });
    const blob = await Packer.toBlob(doc);
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = d.file + ".docx";
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(a.href), 1500);
  }

  /* ---------- PDF via print ---------- */
  function exportPdf() {
    if (!st.packReady) { alert(T.genFirst); return; }
    const root = $("#printRoot");
    root.classList.remove("hidden");
    root.innerHTML = `<div class="print-doc"><h1>${T.printTitle}</h1><p class="pw">${T.printWarn}</p><p>${esc(st.d.meta.title)} · ${esc(st.d.meta.tender_id)}</p>
      ${$("#proposalOut").innerHTML}<h2>${T.docxChecks}</h2><ul>${$("#packChecks").innerHTML}</ul><h2>${T.matrix}</h2>${$("#matrix").outerHTML}<h2>${T.checklist}</h2>${$("#checklist").outerHTML}</div>`;
    const prev = document.title;
    document.title = st.d.file;
    window.print();
    document.title = prev;
    setTimeout(() => { root.classList.add("hidden"); root.innerHTML = ""; }, 500);
  }

  /* ---------- boot ---------- */
  async function main() {
    try {
      const list = await Promise.all(ORDER.map((id) => fetch(BASE + id + ".json").then((r) => { if (!r.ok) throw new Error(id + ".json " + r.status); return r.json(); })));
      list.forEach((d) => (ALL[d.id] = d));
      renderTabs();
      document.addEventListener("click", (e) => {
        const kb = e.target.closest("[data-kb]"); if (kb) { showKb(kb.dataset.kb); return; }
        const rq = e.target.closest("[data-req]"); if (rq) { showReq(rq.dataset.req); return; }
        const fl = e.target.closest("[data-file]"); if (fl) { showFile(fl.dataset.file); return; }
        const chip = e.target.closest(".chip"); if (chip) { $$(".chip").forEach((x) => x.classList.remove("on")); chip.classList.add("on"); $("#kbQ").value = chip.dataset.q; searchKb(chip.dataset.q); }
      });
      $("#srcClose").addEventListener("click", () => $("#srcModal").close());
      $("#srcModal").addEventListener("click", (e) => { if (e.target.id === "srcModal") $("#srcModal").close(); });
      $("#btnKb").addEventListener("click", () => searchKb($("#kbQ").value));
      $("#kbQ").addEventListener("keydown", (e) => { if (e.key === "Enter") { e.preventDefault(); searchKb($("#kbQ").value); } });
      $("#btnRun").addEventListener("click", () => { st.run++; runPipeline(); });
      $("#btnRunSticky").addEventListener("click", () => { window.scrollTo({ top: $("#pipeline").offsetTop - 20, behavior: "smooth" }); st.run++; runPipeline(); });
      $("#btnGenerate").addEventListener("click", generatePack);
      $("#btnDocx").addEventListener("click", downloadDocx);
      $("#btnPdf").addEventListener("click", exportPdf);
      const q = new URLSearchParams(location.search).get("s") || (location.hash || "").slice(1);
      selectSector(ORDER.includes(q) ? q : ORDER[0], false);
    } catch (err) {
      console.error(err);
      document.body.insertAdjacentHTML("afterbegin", `<p style="color:#ff6b8a;padding:12px">${T.loadFail}${esc(err.message)}</p>`);
    }
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", main); else main();
})();
