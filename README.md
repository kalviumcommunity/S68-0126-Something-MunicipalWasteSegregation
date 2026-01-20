```
## 📘 Assignment / Learning Unit  
### [Concept-1] Advanced Data Fetching: Static, Dynamic, and Hybrid Rendering in the App Router

### How does choosing between static, dynamic, and hybrid rendering affect performance, scalability, and data freshness in a Next.js application?

Choosing the correct rendering strategy directly impacts how fast pages load, how well the system scales with traffic, and how fresh the displayed data is. In **WasteWise**, each rendering mode is used deliberately based on the nature of the data and user expectations.

---

### Rendering Trade-offs with Examples from WasteWise

#### Static Rendering (SSG)
**Impact:**
- **Performance:** Excellent (served from CDN as pre-built HTML)
- **Scalability:** Very high (no server computation per request)
- **Data Freshness:** Low (data updates only on rebuild)

**Used in WasteWise for:**
- Landing page (`/`)
- About (`/about`)
- Education (`/education`)
- FAQ (`/faq`)

**Justification:**  
These pages contain informational and educational content that rarely changes and does not depend on user identity. Static rendering ensures fast access for all users while minimizing server load.

---

#### Dynamic Rendering (SSR)
**Impact:**
- **Performance:** Moderate (computed per request)
- **Scalability:** Lower than SSG (depends on server capacity)
- **Data Freshness:** Real-time

**Used in WasteWise for:**
- Household dashboards (`/dashboard/household`)
- Collector validation (`/dashboard/collector`)
- Authority dashboards (`/dashboard/authority`)
- Community issue reporting (`/dashboard/reports`)

**Justification:**  
These pages display live, user-specific data such as segregation scores, validation logs, and reports. Real-time accuracy is critical, so dynamic rendering is enforced using:

```ts
export const dynamic = "force-dynamic";
````

---

#### Hybrid Rendering (ISR)

**Impact:**

* **Performance:** Near-static
* **Scalability:** High
* **Data Freshness:** Periodic and predictable

**Used in WasteWise for:**

* Ward statistics (`/statistics`) – revalidated every 5 minutes
* Community leaderboard (`/statistics/leaderboard`) – revalidated every 10 minutes
* Events and drives (`/statistics/events`) – revalidated every 1 hour

**Justification:**
These pages need to reflect recent progress but do not require real-time updates. Incremental Static Regeneration provides a balance between freshness and performance using:

```ts
export const revalidate = <seconds>;
```

---

## Case Study: “The News Portal That Felt Outdated”

**Scenario:**
At DailyEdge, the homepage is statically generated for speed, but the “Breaking News” section becomes outdated. Switching the entire site to server-side rendering fixed freshness issues but caused slower load times and increased infrastructure costs.

---

### Trade-off Analysis

| Strategy      | Pros                  | Cons                    |
| ------------- | --------------------- | ----------------------- |
| Static (SSG)  | Fast, cheap, scalable | Can become stale        |
| Dynamic (SSR) | Always fresh          | Slower, expensive       |
| Hybrid (ISR)  | Balanced approach     | Slight delay in updates |

---

### Balanced Solution Using Next.js App Router

A better approach would be:

* **Static Rendering** for evergreen content (editorials, categories, static pages)
* **Hybrid Rendering (ISR)** for the homepage and breaking news sections with short revalidation intervals (e.g., 30–60 seconds)
* **Dynamic Rendering** for personalized content such as user feeds or saved articles

Using App Router features:

* `revalidate` to keep headlines fresh without full SSR
* `cache: 'no-store'` or `dynamic = "force-dynamic"` for truly live sections
* Default static caching for content that doesn’t change often

---

### Applying This Logic to WasteWise

The same decision-making framework is used in WasteWise:

* **News Feed Equivalent:** Community reports → Dynamic Rendering
* **User Dashboard Equivalent:** Household and authority dashboards → Dynamic Rendering
* **Product Catalog Equivalent:** Ward statistics and leaderboards → Hybrid Rendering
* **Marketing Pages:** Awareness and education pages → Static Rendering

```