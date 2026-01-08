# Trade Gorilla

**Product Thesis:** German retail investors lose money to fees and inflation because comparing brokers is tedious; Trade Gorilla replaces marketing fluff with evidence-backed data and habit visualization.

## Architecture

```
[User Browser]
      |
   (Vue 3 SPA)
      |
   [Express API]
      |
[JSON Data Store] (Providers, Sources, Facts)
```

## Features

1.  **Evidence-First Comparison:** Every claim (fee, rate) is linked to a specific source URL with a "Last Verified" date.
2.  **Decision Wizard:** A rule-based engine mapping user constraints (Tax ID needs, Travel habits) to provider attributes.
3.  **Visual Progress:** 365-dot grid visualizing interest accrual to encourage saving habits.
4.  **Compliance-Ready:** Strictly models jurisdiction and source excerpts to avoid misleading financial advice claims.

## Security Checklist

- [x] **Helmet:** Secure HTTP headers configured.
- [x] **CORS:** Restricted to environment-defined origin.
- [x] **Rate Limiting:** Public API endpoints limited to 100 req/15min.
- [x] **Input Validation:** Typed interfaces and basic runtime checks.
- [x] **No Client Secrets:** All logic requiring sensitive data (none currently, but architecturally enforced) stays on backend.

## Evidence Model

We do not hardcode "Trade Republic is cheap". We model it as:
1.  **Source:** `src_tr_pl` (URL to pricing list).
2.  **Fact:** `fact_tr_cost` ("1€ settlement fee") -> linked to `src_tr_pl`.
3.  **Provider:** Trade Republic -> has `fact_tr_cost`.

This allows the UI to render a "Verified" tooltip for every checkmark in the comparison table.

## How to Run

1.  **Install:** `npm install` (from root).
2.  **Dev:** `npm run dev` (starts API on :3000 and Web on :5173).
3.  **Test:** `npm run test` (Runs Jest/Vitest).

## Disclaimer

**Informational Only.** This application is a technical demonstration and does not constitute financial or legal advice. Capital is at risk. Verified sources may become outdated immediately after verification date.
