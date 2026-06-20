# Product Requirements Document (PRD)

# Watch Discovery Tool

## 1. Overview

The Watch Discovery Tool helps users discover relevant second-hand watch listings more efficiently by aggregating listings into a single interface and highlighting promising candidates based on user-defined constraints and historical purchase preferences.

The MVP focuses on improving the discovery experience rather than providing a fully automated recommendation engine.

---

## 2. Goal

Enable users to identify potentially interesting watch listings with less effort than manually searching across marketplaces.

The product should:

- Consolidate watch listings into a single experience
- Reduce noise through filtering
- Surface promising candidates
- Provide transparency into why listings are surfaced

---

## 3. Problem Statement

Users searching for vintage or second-hand watches often:

- Browse multiple marketplaces individually
- Review many irrelevant listings
- Spend significant time evaluating options
- Lack a simple way to prioritize listings worth investigating

The result is a time-consuming and fragmented discovery process.

---

## 4. Target User

### Primary User

Watch enthusiasts searching for affordable vintage watches online.

### User Characteristics

- Regularly browse online marketplaces
- Have budget constraints
- Have subjective preferences regarding style and condition
- Enjoy making final purchasing decisions themselves

---

## 5. User Story

As a watch collector,

I want to view and filter watch listings in one place,

So that I can quickly identify watches worth considering without manually reviewing every listing.

---

## 6. Success Metrics

### MVP Success Indicators

- User can successfully filter listings
- User can identify candidate watches from a larger pool
- User understands why listings were surfaced
- User can complete discovery workflow within a few interactions

### Out of Scope

- Conversion to purchase
- Long-term engagement
- Recommendation accuracy benchmarking

---

# Functional Requirements

## FR1: Display Listings

The system shall display a collection of watch listings.

Each listing shall include:

- Title
- Image
- Marketplace Source
- Price
- Shipping Cost
- Total Cost
- Condition
- Description (truncated)

---

## FR2: Listing Normalization

The system shall normalize listing data into a common structure regardless of source.

### Normalized Fields

| Field | Description |
|---------|---------|
| id | Unique listing identifier |
| title | Listing title |
| marketplace | Listing source |
| price | Watch price |
| shipping | Shipping cost |
| total_cost | Price + shipping |
| condition | Seller-reported condition |
| image_url | Primary image |
| listing_url | Source URL |
| description | Listing description |

---

## FR3: Budget Filtering

Users shall be able to filter listings by maximum total cost.

### MVP Default

Maximum Total Cost ≤ $50 CAD

---

## FR4: Condition Filtering

Users shall be able to exclude listings that are explicitly marked as:

- Broken
- For Parts
- Not Working

---

## FR5: Candidate Identification

The system shall identify listings that satisfy predefined recommendation criteria.

### Example Criteria

- Within budget
- Working condition
- Similar characteristics to historical purchases

Candidate listings shall be visually distinguished from standard listings.

---

## FR6: Recommendation Explanation

Each candidate listing shall include a rationale explaining why it was surfaced.

### Example Rationales

- Similar to previous purchase
- Vintage mechanical watch
- Within budget
- Matches preferred style

The rationale must be human-readable.

---

## FR7: Listing Exploration

Users shall be able to:

- Sort listings
- Expand listing details
- Navigate to original listing source

---

# Non-Functional Requirements

## Performance

- Application loads within 3 seconds
- Filters update within 1 second

---

## Usability

- Interface should require minimal onboarding
- Filtering workflow should be intuitive
- Recommendation rationale should be visible without additional clicks

---

## Explainability

Users must understand why candidate watches are surfaced.

The system should prioritize transparency over recommendation complexity.

---

## Maintainability

Marketplace ingestion logic shall be decoupled from candidate identification logic to support future marketplace integrations.

---

# MVP Scope

## Included

- Representative watch listing dataset
- Listing display
- Filtering
- Candidate identification
- Recommendation rationale
- Basic sorting

---

## Excluded

- Live API integrations
- User accounts
- Saved watches
- Personalized learning
- Machine learning models
- Alerts and notifications

---

# Assumptions

- Representative sample data adequately validates user experience.
- Historical purchases provide sufficient signal for simple candidate identification.
- Users prefer transparent recommendation logic over opaque ranking systems in the MVP stage.

---

# Open Questions

1. Which historical purchase attributes provide the strongest signal?
2. How should candidate listings be visually highlighted?
3. Should candidate identification be binary (candidate/not candidate) or ranked?
4. What additional marketplace sources should be prioritized after MVP validation?