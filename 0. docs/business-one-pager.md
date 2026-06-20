# Watch Discovery Tool – Business Plan

## 1. Problem Statement

Vintage and second-hand watch enthusiasts often search across multiple marketplaces to find watches that match their preferences and budget. Today, this process is highly manual and inefficient:

- Listings are fragmented across platforms such as eBay, Etsy, and others
- Search results are noisy, requiring significant manual filtering
- Determining whether a watch is worth considering requires reviewing many irrelevant listings
- Preferences (style, era, condition, brand interest) are subjective and difficult to capture with simple filters alone

As a result, users spend considerable time searching and evaluating listings before identifying viable or interesting purchase candidates.

---

## 2. Opportunity

There is an opportunity to improve the discovery experience by reducing the effort required to surface relevant and interesting watch listings.

Rather than focusing on building a fully automated recommendation system, the core opportunity is to:

- Aggregate listings into a single view
- Apply lightweight, transparent filtering logic
- Help users quickly identify watches worth their attention

The goal is to reduce cognitive load and time spent scanning irrelevant listings, rather than replace user judgment.

---

## 3. Product Vision

Build a Watch Discovery Tool that enables users to efficiently explore and evaluate second-hand watch listings across marketplaces.

The product will:

1. Aggregate listings from multiple marketplaces (or representative datasets in MVP form)
2. Normalize listings into a consistent structure
3. Allow users to filter based on explicit constraints (e.g. budget, condition)
4. Highlight potential “candidate” listings worth reviewing further
5. Provide simple explanations for why a listing is surfaced

The tool is designed as a **decision-support experience**, not an autonomous recommendation engine.

---

## 4. Key Assumptions

Given the 48-hour constraint and dependency limitations, the following assumptions are made:

- A representative dataset can adequately simulate marketplace listings for MVP validation
- Users are able to express preferences implicitly (e.g. past purchases) or through simple constraints
- Transparent rule-based logic is sufficient to demonstrate value in the MVP stage
- The primary product risk is discovery efficiency, not algorithmic sophistication

These assumptions allow focus on validating the end-to-end user experience rather than integration complexity.

---

## 5. MVP Scope

### Included

- Aggregation of representative watch listing data
- Normalized listing structure across sources
- Basic search and filtering capabilities:
  - Budget threshold (e.g. under $50 CAD including shipping)
  - Condition filtering (exclude explicitly broken items)
- Candidate identification based on lightweight rules
- Simple explanations for surfaced listings (e.g. “within budget”, “similar style to past purchases”)

### Excluded

- Live marketplace integrations (eBay, Etsy, Chrono24 APIs)
- Machine learning or advanced personalization models
- User accounts or persistent profiles
- Automated bidding or purchasing workflows
- Real-time scraping or dynamic crawling infrastructure

The MVP focuses on validating discovery flow and decision support, not marketplace completeness.

---

## 6. Constraints & Tradeoffs

### Constraint

Marketplace API access is not immediately available within the project timeline.

### Decision

Use curated, representative listing data and design a modular ingestion layer that can later be replaced with live marketplace integrations.

### Tradeoff

This approach reduces realism of data ingestion but enables:

- Faster iteration on core product experience
- Full control over dataset quality and edge cases
- Reliable demonstration of filtering and candidate surfacing logic

The primary product hypothesis being tested is whether improved listing aggregation and lightweight curation improves discovery efficiency.

---

## 7. Success Criteria

The MVP is successful if it demonstrates that a user can:

- View aggregated watch listings in a single interface
- Apply simple filters to reduce irrelevant listings
- Identify a subset of promising candidates quickly
- Understand why specific listings were surfaced
- Reduce time and effort required to evaluate potential purchases compared to manual browsing

---

## 8. Future Enhancements (Post-MVP)

If validated, future iterations could include:

- Live marketplace integrations (eBay, Etsy, Chrono24)
- Preference learning based on user behavior and saved watches
- More advanced ranking or personalization logic
- Alerts for new matching listings
- Improved semantic similarity between watches and user collection

---

## Summary

The Watch Discovery Tool is designed to simplify fragmented marketplace browsing into a structured, filterable, and explainable discovery experience.

The MVP prioritizes end-to-end usability and decision support over integration completeness or algorithmic complexity, enabling rapid validation of core user value.