# Service-sector public tenders — Nyyo Automation demo

Live demo (static, no sign-up):

- Français : https://nyyoautomation.github.io/nyyo-tender-sectors/fr/
- English: https://nyyoautomation.github.io/nyyo-tender-sectors/

Pick a sector: **propreté / cleaning, sécurité / security, IT, or formation / training**. The page loads a fictional public tender pack (DCE) and lists every requirement with its clause and page. It runs checks before submission (DC1, DC2, DUME, DC4, AE, BPU / DQE) and exports a Word technical proposal (mémoire technique) in the buyer's imposed template.

**All data is fictional.** Relecture humaine obligatoire: a person must review everything before any real bid. Time figures are estimates on the fictional sample, not a promise.

## What runs live and what is pre-computed

| Step | In the demo |
|---|---|
| Tender extraction (criteria, requirements, dates, documents) | **Pre-analysed sample** (stored results) |
| Search in past proposals, with citations | **Live**, in-browser BM25 |
| Bid inputs and consistency checks | **Live** |
| Proposal, compliance matrix and checklist | **Live**, built in the browser |
| DOCX export (`docx.js`) and PDF (print) | **Live** |

This repository holds only the public static demo. The code of the real tool is private.

## Hosting and pricing

Online first, isolated workspace, AI in Europe. A local version is available as an option ([free installation kit](./install-kit/)). Pricing on quote.

Contact: LaborX (https://laborx.com/freelancers/users/id475124)
