# Service-sector tender responses — Nyyo Automation demo

Live demo (static, no sign-up):

- English (international): https://nyyoautomation.github.io/nyyo-tender-sectors/

Pick a sector: **cleaning, security, IT or training**. The page loads a fictional RFP / ITT pack and lists every requirement with its clause and page. It checks compliance forms, bid submission forms and the pricing schedule before submission, then exports a Word technical proposal in the buyer's imposed template.

**All data is fictional.** Human review is required before any real bid. Time figures are estimates on the fictional sample, not a promise.

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

Online first, isolated workspace, EU or US hosting / data region of your choice. A local version is available as an option ([free installation kit](./install-kit/)). Remote · Worldwide. Pricing on quote.

Available on LaborX · [Profile](https://github.com/nyyoautomation)
