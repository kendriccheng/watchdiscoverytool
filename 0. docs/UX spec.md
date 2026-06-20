# Watch Discovery Tool – UX Specification

 

## Overview

 

The Watch Discovery Tool enables users to efficiently discover, evaluate, and organize second-hand watch listings from multiple marketplaces.

 

The experience prioritizes:

- Fast discovery

- Minimal cognitive load

- User-controlled curation through curated lists

- Clean separation between browsing and saved collections

 

---

 

## Primary User Flow

 

```text

Discover Listings

      ↓

Search / Browse Listings

      ↓

Review Results

      ↓

Save Watch to List

      ↓

Select Existing List OR Create New List

      ↓

Continue Browsing

      ↓

(Optional) Open My Lists

      ↓

Review Saved Watches by List

```

## Screen 1: Discovery Dashboard

### Purpose

The Discovery Dashboard provides a clean, search-first experience for browsing watch listings across multiple marketplaces.

It prioritizes fast discovery and browsing while keeping saved collections accessible through secondary navigation, without interrupting the primary search and exploration flow.

### Layout Structure

#### Header (Navigation Only)

- Product Title: Watch Discovery Tool
- Navigation Link: My Lists
“My Lists” is intentionally placed in the header as a secondary navigation element so that it does not interrupt the primary discovery experience.

#### Primary Interaction Area

##### Search Bar (Primary Action)

- Central search input
- Placeholder: “Search watches (brand, model, style, marketplace)...”
- Executes search across aggregated marketplace listings
The search bar is the primary entry point into the product experience.

#### Results Section

##### Listings Feed

A list of watch listings displayed immediately on page load (default state) and dynamically updated based on search input.

Each listing card includes:

- Image
- Title
- Marketplace Source
- Price
- Shipping Cost
- Total Cost
- Condition
- ⭐ Save to List action
### Default State Behavior

When no search query is entered:

- A default feed of recent or relevant listings is displayed
- Users can browse immediately without needing to perform a search
### User Actions

#### Primary Actions

- Search listings
- Browse results
- Open listing details
- Save watch to a curated list
#### Secondary Actions

- Navigate to “My Lists” via header
### Design Principles

#### 1. Search-First Discovery

Search is the primary interaction model. It is the main way users initiate exploration of listings.

#### 2. Tight Search-to-Results Coupling

Search input and results are visually and functionally connected, with no intermediate UI elements that interrupt flow.

#### 3. Progressive Disclosure

Advanced functionality (curated lists) is accessible but intentionally de-emphasized to avoid competing with the primary discovery experience.

#### 4. Clear Hierarchy of Intent

- Primary: Discover watches
- Secondary: Save watches
- Tertiary: Organize saved watches
## Screen 2: Save to List Modal

### Purpose

The Save to List modal enables users to quickly store interesting watches into curated collections with minimal friction.

It prioritizes fast saving over complex organization.

### Entry Point

Triggered when a user clicks:

- ⭐ Save (on a watch listing card)

### Step 1: Save Modal

```text

-----------------------------------------

Save Watch

-----------------------------------------

 

Select a list:

 

(•) Potential Purchases

( ) Vintage Finds

( ) Favorites

( ) Timex Collection

 

-----------------------------------------

 

[ + Create New List ]

[ Save ]

-----------------------------------------

```

### Step 2A: Save to Existing List (Fast Path)

#### Flow

1. User selects an existing list

2. User clicks “Save”

3. Watch is added to the selected list

4. Modal closes immediately

5. User returns to browsing experience

#### UX Principle

Saving should be a single, low-friction action that does not interrupt discovery.

### Step 2B: Create New List

#### Flow

1. User clicks “+ Create New List”

### Step 3: Create List Modal

```text

-----------------------------------------

Create New List

-----------------------------------------

 

List Name:

[ Vintage Field Watches        ]

 

Optional Description:

[ Watches with military / field styling ]

 

-----------------------------------------

 

[ Cancel ]        [ Create & Save ]

-----------------------------------------

```

### Step 4: Post-Creation Behavior

After creation:

- A new list is created
- The selected watch is automatically added to the new list
- Modal closes
- User is returned to the Discovery Dashboard
No additional confirmation step is required.

## Screen 3: My Lists

### Purpose

The My Lists screen allows users to view, manage, and revisit saved watches organized into curated collections.

### Layout Structure

#### List Overview

A simple list of user-created collections:

- Potential Purchases
- Vintage Finds
- Favorites
- Custom user-created lists
#### List Detail View

When a list is selected, it displays:

- Watch cards
  - Image
  - Title
  - Marketplace Source
  - Total Cost
  - Condition
### User Actions

- Switch between lists
- Remove watches from a list
- Open original marketplace listing
- Review saved watches for comparison
### Navigation Flow

```text

Discovery Dashboard

      ↓

Search / Browse Listings

      ↓

Save Watch → Select List / Create List

      ↓

Continue Browsing

      ↓

My Lists (optional navigation)

      ↓

View Saved Collections

```

### Design Principles

#### 1. User-Controlled Curation

The system does not define what is “interesting.” Users define this through curated lists.

#### 2. Low Friction Saving

Saving a watch requires minimal interaction:

- One click to initiate save
- One quick selection to confirm
#### 3. Fast Return to Browsing

Saving a watch never interrupts or blocks the discovery experience.

#### 4. Lists as Meaning Containers

Lists represent user-defined intent such as:

- “Vintage Finds”
- “Potential Purchases”
- “Timex Collection”
They are not system-generated tags or recommendations.

#### 5. Separation of Concerns

- Discovery → Browse listings
- Curation → Organize saved watches
- Review → Evaluate saved collections
#### 6. Progressive Engagement

Users begin with browsing and naturally evolve into structured curation without requiring upfront configuration or onboarding complexity.

 