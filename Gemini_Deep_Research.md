# Economic Modeling of Container Vessel Cost of Sales
**A Dynamic Tug Towage Cost Simulation for the Port of New York and New Jersey**

The accurate simulation of Cost of Sales—specifically the Operating Expenses (OPEX) allocated to port calls—for ultra-large container vessels requires a microscopic, deterministic analysis of localized harbor economics. 

While macroeconomic variables such as deep-sea fuel consumption, daily vessel charter rates, and global freight indices are heavily scrutinized by fleet operators, the towage and harbor assist component represents a highly variable, structurally complex cost center. This cost center is dictated by a confluence of spatial geography, fluid dynamics, strict environmental safety regulations, and intricately negotiated contractual matrices.

This comprehensive research report provides an exhaustive, first-principles deconstruction of the towage cost architecture specifically governing **Ocean Network Express (ONE)** utilizing **Moran Towing Corporation** services within the Port of New York and New Jersey. 

By synthesizing the harbor's stringent Deep Draft Advisory mandates with the granular financial logic embedded within Moran’s Schedule of Rates, a deterministic mathematical model is formulated. This algorithmic model is subsequently translated into a functional simulation prototype, enabling high-fidelity OPEX forecasting for specific vessel transits based on dimensional, temporal, and geographic inputs.

---

## Table of Contents
1. [The Macroeconomics of Maritime Cost of Sales: Port Omission versus Speeding](#1-the-macroeconomics-of-maritime-cost-of-sales-port-omission-versus-speeding)
2. [Hydrodynamic Constraints and Harbor Safety Resource Allocation](#2-hydrodynamic-constraints-and-harbor-safety-resource-allocation)
3. [TEU, NRT, and GRT Conversion](#3-teu-nrt-and-grt-conversion)
4. [Unit Economics and KPI Benchmarking: Cost per TEU](#4-unit-economics-and-kpi-benchmarking-cost-per-teu)
5. [Contractual Architecture: Deconstructing the Moran Towing Agreement](#5-contractual-architecture-deconstructing-the-moran-towing-agreement)
6. [Spatial Cost Dynamics: Escorting and Geographic Zone Runtimes](#6-spatial-cost-dynamics-escorting-and-geographic-zone-runtimes-c_escort)
7. [Situational Penalties and Edge Cases](#7-situational-penalties-and-edge-cases-f_penalty)
8. [Empirical Validation: Invoice Reconciliation Case Studies](#8-empirical-validation-invoice-reconciliation-case-studies)
9. [Algorithmic Architecture for Digital Cost Simulation](#9-algorithmic-architecture-for-digital-cost-simulation)
10. [Strategic Implications for Fleet Management and Deployment](#10-strategic-implications-for-fleet-management-and-deployment)

---

## 1. The Macroeconomics of Maritime Cost of Sales: Port Omission versus Speeding

In global maritime logistics, schedule reliability directly impacts the fundamental Cost of Sales and the overarching profitability of a voyage. When a container vessel experiences operational delays—whether due to severe weather routing, terminal congestion at previous ports, or mechanical inefficiencies—fleet operators face a binary, highly consequential strategic decision paradigm: **port omission** or **speeding**.

### The Strategy of Port Omission
This involves the deliberate cancellation of a scheduled port call, such as bypassing a congested facility in Halifax or Manzanillo, to recover the schedule and immediately reduce direct operating expenses.
* **Benefits:** Total elimination of specific port costs, terminal handling charges, and the immense fuel expenditure required to physically enter and exit the harbor complex. It allows the vessel to maintain a highly efficient, constant deep-sea cruising speed toward the subsequent destination, ensuring the vessel commits to the Estimated Time of Arrival (ETA) at the critical turn port.
* **Penalties:** Severe degradation of customer delivery reliability. Cargo is not delivered as booked, resulting in supply chain disruptions, potential contractual penalties, and long-term reputational damage.

### The Strategy of Speeding
This involves executing the delayed port call by drastically increasing the vessel's transit velocity across the ocean to recover the lost time.
* **Benefits:** Preservation of cargo commitments, ensuring that the revenue generated per Twenty-foot Equivalent Unit (**TEU**) is fully realized and customer transparency is maintained.
* **Penalties:** Mathematically punishing economic consequences. Because maritime fuel consumption scales as a cubic function of vessel speed, even marginal increases in velocity result in exponential spikes in bunker fuel consumption. Furthermore, speeding guarantees the incurrence of all localized harbor OPEX, including pilotage, terminal fees, and the complex tug towage costs required to safely maneuver the vessel to the berth.

Because the speeding strategy unconditionally commits the fleet operator to these harbor expenses, achieving an exact, data-driven prediction of the impending port call cost is paramount. The decision to speed or omit cannot rely on human intuition; it requires systematic transparency based on concrete financial algorithms.

In highly regulated and geographically restricted environments like the Port of New York and New Jersey, towage costs are not static flat fees. They fluctuate dynamically based on the vessel's physical displacement, the active contract year, the spot price of marine diesel, the duration of the escort, and the specific geographic zones traversed.

---

## 2. Hydrodynamic Constraints and Harbor Safety Resource Allocation

The foundational variable in any towage cost simulation is the required number of tugboats necessary to safely arrest, steer, and berth the vessel. In the Port of New York and New Jersey, this allocation is not left to the discretion of the vessel master; it is strictly dictated by the Harbor Safety, Operations and Navigation Committee's **Deep Draft Advisory**. 

This advisory establishes mandatory minimum asset deployments based on a vessel's Length Overall (**LOA**), beam width, draft depth, and the operational status of its internal maneuvering thrusters.

### General Draft Regulations and Under Keel Clearance
Vessels operating within the federal channels of New York and New Jersey must maintain specific **Under Keel Clearances (UKC)** to mitigate the risks of grounding, particularly given the hydrodynamic effects of squat and bank cushion.

* **Standard Channels:** The recommended UKC is maintained at 3 feet within the primary Ambrose Channel, and 2 feet in all other inner channels.
* **SLCV Rules:** A strict 3 feet of UKC is required across all channels for Super Large Container Vessels (**SLCVs**).
* **Moored Vessels:** Ships must remain afloat at all times, a rule interpreted operationally as maintaining at least 1 foot of water under the keel at the lowest tidal point.

Draft remains a severe restricting factor for operations, even with the 50-foot harbor deepening project:
* **Port Jersey Channel:** Imposes a strict maximum draft limit of 49 feet. Any standard container vessel departure from Port Jersey with a draft of 41 feet or greater unconditionally mandates a minimum of three tugboats.
* **South Elizabeth Channel:** Vessels presenting drafts exceeding 43 feet face incredibly narrow tidal operational windows. They are permitted to berth and depart solely between the time of Battery high or low water and two hours subsequent.

Meteorological conditions further constrain operations and dictate tug usage:
* **Bergen Point:** ULCVs are strictly prohibited from moving when visibility drops below 1.5 miles, or when sustained winds reach 30 knots with gusts exceeding 34 knots at Mariners Harbor.
* **Howland Hook:** ULCV arrivals are restricted to maximum sustained winds of 25 knots.

These environmental boundaries ensure that the assigned tugboats possess sufficient aggregate bollard pull to overcome the massive aerodynamic windage presented by fully loaded container stacks.

### Vessel Classification Mandates and Tug Matrices
To systematically manage risk, the Deep Draft Advisory categorizes modern commercial tonnage into distinct classes, each triggering specific operational protocols, pilotage requirements, and minimum tug counts. The critical delineator in these mandates is the presence of a fully functional **bow thruster**, which significantly reduces the external rotational force required from the tug fleet. 

| Vessel Classification | GRT Baseline Tier | Dimensional Definition | Tug Mandate (With Working Bow Thruster) | Tug Mandate (Without Working Bow Thruster) | Additional Transit Regulations |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Standard Vessel** | < 45,000 GRT | LOA < 997 ft and Beam < 140 ft | 2 Tugs (Standard Docking) | Varies based on draft/pilot | Exempt from mandatory multi-tug transit escorts unless drafted > 41 ft at specific berths. |
| **Ultra Large Container Vessel (ULCV)** | 45,000 – 120,000 GRT | LOA $\ge$ 997 ft or Beam $\ge$ 140 ft | 3 Tugs assigned from KVK Lighted Buoy 9. | 4 Tugs assigned from KVK Lighted Buoy 9. | 2 tugs must be stationed at The Narrows with a docking pilot for immediate emergency assistance. |
| **Super Large Container Vessel (SLCV)** | $\ge$ 120,000 GRT | LOA $\ge$ 1,165 ft or Beam > 159 ft | 4 Tugs (2 additional tugs joining the 2 at The Narrows). | 5 Tugs (Subject to docking pilot assessment of tidal conditions). | Must maintain 3 ft UKC. Backing into Port Liberty Bayonne requires 4 tugs and slack water. |
| **Mega Large Container Vessel (MLCV)** | $\ge$ 120,000 GRT | Follows SLCV dimensions | Follows SLCV Mandates | Follows SLCV Mandates | Maximum sustained winds of 15 knots. Requires open adjacent berths at specific terminals. |

The empirical impact of these regulations is clearly visible in the billing data. Vessels falling safely below the 997-foot LOA threshold—such as the **Cape Hellas** featuring an LOA of 610.00 feet, and the **Martinique** with an LOA of 728.90 feet—are entirely exempt from the port's mandatory multi-tug transit escort regulations. Consequently, they only require the baseline deployment of two standard tugboats to execute the physical docking maneuver at facilities like Howland Hook, drastically reducing their harbor OPEX.

---

## 3. TEU, NRT, and GRT Conversion

In order to streamline the operational model and provide a single source of truth for vessel size, operators can parameterize the simulation using the Twenty-foot Equivalent Unit (**TEU**) carrying capacity. Because TEU directly dictates the internal volumetric layout of a container ship, it operates as a reliable baseline to dynamically estimate the Length Overall (**LOA**), Net Registered Tonnage (**NRT**), and Gross Registered Tonnage (**GRT**).

As vessels escalate in TEU capacity, their hull designs transition into "wide-body" profiles, meaning the conversion multipliers gently scale down to reflect modern stacking geometries. To accurately simulate this without requiring manual lookup, the conversion algorithms use linear interpolation bounded by the specific limits derived from the dataset:

| Vessel Class | Nominal TEU Range | LOA Formula (Feet) | GRT Multiplier | NRT Multiplier |
| :--- | :--- | :--- | :--- | :--- |
| **Megamax** | 20,000 – 24,000+ | Fixed at 1,312 ft | 10.0x TEU | 4.85x TEU |
| **Neo-Panamax** | 14,000 – 19,999 | $1,195 + \frac{TEU - 14,000}{6,000} \times 117$ | 10.4x TEU | 5.86x TEU |
| **Standard / Panamax** | 5,100 – 13,999 | $965 + \frac{TEU - 5,100}{8,900} \times 230$ | 11.0x TEU | 5.00x TEU |
| **Feeder** | 1,000 – 5,099 | $656 + \frac{TEU - 1,000}{4,100} \times 309$ | 12.0x TEU | 5.20x TEU |

By tying these real-world conversion ratios directly into the simulation architecture, the user avoids manual input discrepancies. A single TEU selection dynamically calculates the exact LOA in feet (triggering the strict Deep Draft Advisory safety mandates, such as the 997 ft ULCV cutoff) and the NRT (determining whether the $1,400 Vessel Size Premium over 40,000 NRT is enforced).

---

## 4. Unit Economics and KPI Benchmarking: Cost per TEU

Transitioning from gross invoice modeling to unit economics is a critical step for port planners. Calculating the "Cost per TEU" normalizes the complex variables of different ports (e.g., varying zone runtimes, base rates, and fuel matrices) into a single, comparative metric. 

However, calculating this on transpacific routes requires adjusting for severe structural trade imbalances. To gain complete visibility into operational efficiency and true commercial profitability, the model implements a dual-KPI approach:

1.  **Cost per Handled TEU (Operational Metric)**
    * **Denominator:** Total volume of containers actually handled at the terminal (Full + Empty TEUs combined).
    * **Logic:** From a towage and terminal perspective, the physical effort, fuel burn, and hydrodynamic constraints placed on the tugboats are identical regardless of whether a container is loaded with high-value cargo or being repositioned empty. Because the Asia-North America lane experiences severe imbalances (with North America importing significantly more loaded containers than it exports), evaluating pure operational efficiency requires using the total physical volume moved. This metric allows operators to benchmark the pure cost-competitiveness of the port infrastructure itself.

2.  **Cost per Revenue TEU (Commercial Metric)**
    * **Denominator:** Volume of "Full/Revenue" TEUs only.
    * **Logic:** This is the ultimate metric of profitability for the specific port call. The massive cost of repositioning empty containers back to Asia must ultimately be absorbed by the revenue-generating head-haul cargo. By dividing the total port OPEX strictly by the number of freight-paying containers, the true commercial margin is revealed. If a massive SLCV incurs a $30,000 towage bill but only unloads a small fraction of full containers, the Cost per Revenue TEU skyrockets, severely crushing profit margins. This KPI is critical for determining whether to speed up to make a port window or omit the port call entirely.

---

## 5. Contractual Architecture: Deconstructing the Moran Towing Agreement

The total financial invoice generated by Moran Towing for operations executed under the Ocean Network Express (ONE) contract is not a monolithic figure. Rather, it is a highly structured composite of flat-rate base services, physical dimensional premiums, indexed commodity surcharges, and geographically pro-rated hourly escort services.

Through forensic analysis of the contractual parameters and associated invoice documentation, the overarching deterministic cost equation can be defined as follows:

$$C_{total} = C_{base} + P_{size} + S_{fuel} + C_{escort} + F_{penalty}$$

Where:
* $C_{base}$: Aggregate base docking and undocking cost.
* $P_{size}$: Vessel size premium based on Net Registered Tonnage.
* $S_{fuel}$: Aggregate fuel surcharge driven by market commodity indexing.
* $C_{escort}$: Discounted cost of hourly spatial escorting services.
* $F_{penalty}$: Encompasses any situational fees, including detention waiting time or cancellation penalties.

### The Base Docking Cost ($C_{base}$)
Unlike hourly transit services, the physical act of docking and undocking a vessel at the terminal berth is billed as a flat-rate contractual fee. This provides a degree of predictability for the operator. The fundamental driver of this base rate is the active contract year. The negotiated rates per individual tugboat deployment under the ONE agreement escalate annually to account for inflation and capital asset depreciation:

| Contract Period | Negotiated Base Rate per Tug |
| :--- | :--- |
| October 2023 – September 2024 | $2,025.00 |
| October 2024 – September 2025 | $2,100.00 |
| October 2025 – September 2026 | $2,150.00 |

The mathematical formulation for the base cost incorporates specific maneuver multipliers that can drastically inflate the baseline:
* **Standard Maneuvers:** A standard docking or undocking maneuver utilizes a 1.0 multiplier.
* **Shifting Services:** If the vessel requires shifting between two adjacent berths within the exact same terminal footprint, the effort is charged at one and one-half times (1.5x) the base zone rate. If the vessel is shifted between entirely different terminals, it is billed as two distinct maneuvers: one full undocking and one full docking.
* **Backing Maneuvers:** When a vessel is forced to be backed one-half mile or more due to specific berthing constraints, the applicable rate for the docking or sailing evolution is increased by a strict 50%.
* **Holiday Penalties:** Operations executed on recognized Federal Holidays incur an additional 35% premium applied to the base rate per tug.
* **Dead Ship Penalties:** If a vessel loses its ability to maneuver under its own power or steering during an evolution, it incurs an automatic minimum penalty of two hours at the standard hourly rate.

$$C_{base} = N_{tugs} \times R_{contract} \times M_{maneuver} \times M_{holiday}$$

### Vessel Size Premiums and the NRT Threshold ($P_{size}$)
Maneuvering massive displacement vessels requires tugboats equipped with highly specialized propulsion systems, such as Azimuth Stern Drives (Z-drives), capable of generating immense multi-directional bollard pull. 

To compensate the towage provider for the deployment of these high-horsepower, high-capital-cost assets, a size premium is levied based on the vessel's volumetric capacity. In the NY/NJ framework, this premium is calculated using the vessel's Net Registered Tonnage (**NRT**).

Under the specific parameters of the ONE agreement, a flat-fee premium of **$1,400 per tug** is applied exclusively if the vessel's NRT exceeds a critical threshold of 40,000. Vessels falling below this displacement metric incur a premium of zero.

$$P_{size} = N_{tugs} \times \begin{cases} 1400, & \text{if } NRT > 40000 \\ 0, & \text{otherwise} \end{cases}$$

This binary threshold operates ruthlessly in practice. The **ONE HAWK**, boasting a massive NRT of 82,126, automatically triggered this $1,400 premium across all four assigned tugs, adding a sudden $5,600 to the total invoice. Conversely, smaller vessels like the **Cape Hellas** (NRT 11,119) avoid this premium entirely.

### Commodity Volatility and the Fuel Surcharge Step Function ($S_{fuel}$)
Marine diesel represents one of the most volatile elements of maritime operating expenses. To insulate the towage provider from sudden macroeconomic commodity spikes while maintaining base rate stability for the buyer, a highly dynamic fuel surcharge mechanism is implemented.

Moran New York typically calculates its fuel surcharges based on the **EIA New York Harbor Ultra-Low Sulfur No. 2 Diesel (ULSD) Spot Price index**. Based on the service dates and prices observed, here is how the index aligns with market data for March 2026:

| Service Date | Fuel Price ($/gal) | Contextual Market Data (EIA/FRED) |
| :--- | :--- | :--- |
| 03-14-2026 | $4.43 | Matches the peak of the preceding Friday/weekend rate (March 13/14). |
| 03-16-2026 | $4.35 | Aligns with the Monday market opening following the mid-month surge. |
| 03-23-2026 | $4.73 | Represents a significant spike (daily spot highs reached ~$4.71-$4.73 on the preceding Friday, 3/20). |

**How Moran Uses This Index:**
According to the contract logic observed across multiple invoices, the fuel surcharge operates strictly as follows:
* **The Base:** The surcharge is calculated against a base price of **$2.00 per gallon**.
* **The Surcharge:** For every **$0.10 increment** (or fraction thereof) the index price rises above $2.00, Moran adds **$15.00 per tug** to the invoice. The increments are calculated by **rounding UP** for any fraction of a $0.10 step.
* **Application:** This surcharge applies to **every physically dispatched tug** (both "Escort Only" and "Docking" tugs).

**Example Calculation (for 03-23-2026):**
* **Index Price:** $4.73
* **Overage:** $4.73 - $2.00 = $2.73
* **Increments:** 28 steps (Calculated by taking the 27.3 intervals and rounding UP for the remaining fraction).
* **Total Surcharge:** 28 x $15 = **$420.00 per tug**.

The mathematical representation utilizes the ceiling function ($\lceil x \rceil$) to ensure it correctly triggers on fractions of a ten-cent interval:

$$S_{fuel} = N_{tugs} \times \left( \lceil \frac{\max(0, Price_{fuel} - 2.00)}{0.10} \rceil \times 15 \right)$$

This mechanism ensures that OPEX modeling must anchor to real-time EIA indices to achieve high-fidelity predictions, as fuel surcharges add hundreds of dollars per maneuver and change weekly based on the spot market.

---

## 6. Spatial Cost Dynamics: Escorting and Geographic Zone Runtimes ($C_{escort}$)

While base docking is flat-rated, the mandatory transit escort services required for ULCVs and SLCVs are billed on a strict hourly basis and are heavily dependent on the spatial geography of the harbor.

* **Standard Escorting:** The standard base rate for a standard escorting service in the harbor is historically $1,890 per hour per tug. Standard escorting involves the tug transiting in close proximity to the container vessel, ready to render assistance if steering or propulsion fails.
* **Tethered Escorting:** For the most massive SLCVs navigating treacherous maritime chokepoints, pilots mandate "Tethered Escorting." The tug's heavy towline is actively attached to the vessel's stern or bow while underway. This allows the tug to act as a massive hydrodynamic drogue to provide instantaneous braking and extreme rotational forces. Because this subjects the tug's machinery to massive kinetic strain, tethered escorting commands a severe premium rate, historically billed at $3,145 per hour per tug under this specific contract.

*(Note: Per the operational simulation model, operators can dynamically simulate custom rates such as a flatized $1,000/hr rate for both escort varieties to test modified contractual arrangements).*

Crucially, the ONE contract explicitly stipulates a negotiated volume discount. The terms state that "all other services, including but not limited to escorting," receive a **25% discount** off the standard port schedule of rates. Therefore, a permanent **0.75 multiplier** is applied to the final calculated escort gross total to determine the net invoice price.

### The Architecture of Zone Running Times (Runtimes)
Hourly billing algorithms do not merely commence when the tug arrives alongside the vessel and terminate when the lines are cast off. The towage provider must recoup the fuel, crew time, and asset depreciation incurred while the tug travels from its customary dispatch station to the operational intercept point, and its subsequent return journey.

To standardize this process and eliminate disputes over exact transit minutes, the Port of New York and New Jersey is divided into heavily formalized geographic zones, each carrying a fixed, unalterable "**Running Time**" (Runtime). For hourly services, these runtimes are charged "each way"—meaning the runtime of the starting zone is added for the inbound trip, and the runtime of the finishing zone is added for the outbound trip.

The exhaustive zone matrix for the harbor is defined as follows:

| Geographic Zone Designation | Defined Boundaries | Mandated Fixed Runtime |
| :--- | :--- | :--- |
| **Zone 1** | 69th Street Brooklyn to Gowanus Canal | 1.25 hours |
| **Zone 2** | Erie Basin and the Battery to the Williamsburg Bridge | 1.50 hours |
| **Zone 3** | Williamsburg Bridge to Queensboro Bridge | 2.00 hours |
| **Zone 4** | Queensboro Bridge to Hunts Point and Bowery Bay | 2.50 hours |
| **Zone 5** | The Battery to Pier 97 and Pier 7 – Jersey City to Days Point | 2.00 hours |
| **Zone 6** | Pier 97 and Days Point to George Washington Bridge | 2.75 hours |
| **Zone 7** | George Washington Bridge to Yonkers | 3.25 hours |
| **Zone 8** | South of Pier 7, Jersey City to Bayonne Terminal | 1.25 hours |
| **Zone 9** | Staten Island Ferry Terminal to Verrazano Bridge | 1.25 hours |
| **Zone 10** | Staten Island Ferry Terminal & Constable Hook to Bayonne Bridge | 1.00 hour |
| **Zone 11** | Bayonne Bridge to Goethals Bridge & Newark Bay to NJ Turnpike Bridge | 1.50 hours |
| **Zone 12** | NJ Turnpike Bridge to Pulaski Skyway & Hackensack River Turning Basin | 2.00 hours |
| **Zone 13** | Goethals Bridge to Tufts Point in Arthur Kill | 1.50 hours |
| **Zone 14** | Tufts Point to Ferry Point, Perth Amboy and Ward Point Staten Island | 2.00 hours |
| **Zone 15** | Raritan River, South Amboy Reach to Titanium Reach | 2.50 hours |
| **Zone 16** | Leonardo, New Jersey | 2.50 hours |

### Container Terminal Routing and Zone Transits
The Narrows is the primary gateway for container ships to enter the port of NYNJ. The Narrows connects the Lower and Upper New York Bays, allowing major shipping traffic to reach container terminals. Because hourly escort billing relies on station-to-station routing, the transit path from this gateway to the specific terminal dictates the aggregated runtime. 

The latest modeling architectures integrate standardized UN/LOCODEs to match internal shipping dispatch systems:

| Destination Container Terminal (UN/LOCODE) | Geographic Transit Path | Moran Billing Zones Traversed | Aggregated One-Way Runtime |
| :--- | :--- | :--- | :--- |
| **Port Liberty Bayonne** (USNYC01) | The Narrows → Upper New York Bay → Port Jersey Channel | Zone 9 + Zone 8 | 2.50 hours |
| **Port Liberty New York (Howland Hook)** (USNYC02) | The Narrows → Kill Van Kull → Arthur Kill | Zone 10 + Zone 11 | 2.50 hours |
| **APM Terminals (Elizabeth)** (USNYC06) | The Narrows → Kill Van Kull → Newark Bay | Zone 10 + Zone 11 | 2.50 hours |
| **Maher Terminals (Elizabeth)** | The Narrows → Kill Van Kull → Newark Bay | Zone 10 + Zone 11 | 2.50 hours |
| **Port Newark Container Terminal (PNCT)** | The Narrows → Kill Van Kull → Newark Bay | Zone 10 + Zone 11 | 2.50 hours |
| **Red Hook Container Terminal (Brooklyn)** | The Narrows → Upper New York Bay → Buttermilk Channel | Zone 9 + Zone 1 / 2 | ~2.50 - 2.75 hours |

However, the most punishing factor in the hourly billing framework is the strict implementation of a **two-hour minimum per tug**. Even if a tethered escort maneuver requires only 15 actual minutes, the invoice will unconditionally default to a 2.0-hour charge.

### The Transition from Hourly to Flat-Rate and the "Absorbed Runtime" Anomaly
A critical edge case exists within the spatial billing logic regarding the transition between different service billing models. While escort services are billed on a strict hourly basis, the physical act of docking the vessel is billed as a comprehensive flat-rate contractual fee. 

When a tugboat provides an "Escort Only" service, it bills for both the inbound and outbound (return) zone runtimes to cover its full journey from and back to its dispatch station.

**The Absorbed Anomaly:**
If the tug transitions immediately from an hourly escort into a flat-rate docking assignment for the exact same vessel, the flat fee inherently covers the completion of the vessel's maneuver and the tug's eventual return trip home. Charging an hourly outbound runtime for the preceding escort phase would constitute double billing for the same return transit. Consequently, the running times are waived.

This logic is mathematically represented in the updated escort calculation as follows:

$$Time_{maneuver} = \text{Actual duration of escort operations}$$

$$Time_{run} = \begin{cases} 0, & \text{if transitioning directly to docking} \\ Runtime_{inbound} + Runtime_{outbound}, & \text{otherwise} \end{cases}$$

$$Time_{raw} = Time_{maneuver} + Time_{run}$$

$$Time_{billed} = \max(2.0, \text{RoundUpToNearestHalfHour}(Time_{raw}))$$

This nuance is mathematically proven in the **ONE HONOLULU** invoice. The tugs *William E Moran* and *Newt Moran* escorted the vessel and then immediately assisted with "Docking at Howland Hook". Because they transitioned to a flat-rate job, they were only billed for the actual escort time plus the one-way inbound travel runtime, resulting in exactly 2.50 billed hours. 

In stark contrast, the third tug, the *Mary Turecamo*, provided an "Escort Only" service and departed immediately thereafter. Because it did not execute the docking, its return runtime was not absorbed. It billed the actual time plus inbound Zone 10 runtime (1.0 hr) plus outbound Zone 11 runtime (1.5 hr), resulting in a massive 4.00 billed hours for the exact same transit.

Recognizing this anomaly allows operators to accurately forecast significant cost reductions per tug when dual services are chained.

---

## 7. Situational Penalties and Edge Cases ($F_{penalty}$)

Harbor logistics are deeply susceptible to friction, and towage contracts deploy severe financial penalties to penalize operator-induced delays and safeguard tug availability.

* **Detention Fees (Waiting Time):** Detention occurs when an ordered tug is delayed alongside the vessel for reasons entirely unrelated to the towage provider (e.g., terminal crane breakdowns, pilot delays, or traffic congestion). The contract offers a brief grace period of up to one-half hour (30 minutes) at no additional charge. Any waiting time accumulating in excess of this window is billed continuously at the standard hourly rate ($1,750 per tug), pro-rated to the nearest half-hour.
* **Cancellation Penalties:** Aborting an operation inflicts opportunity costs.
    * **Notice > 6 hours:** $0 penalty.
    * **Notice < 6 hours (before arrival):** 66.6% of applicable rate.
    * **Notice < 2 hours (or after arrival):** 75% of applicable rate.
* **Terminal Line Handling:** Subcontracted through the towage provider, running standard rope ship lines incurs a $1,566 flat fee, while heavy wire ship lines demand $2,106.

### The "Additional Tugs" Provision and Situational Triggers
While baseline tug allocations are dictated by vessel dimensions, non-ULCV vessels may still require supplementary assistance. 

For example, the **ONE REINFORCEMENT** features a Length Overall (LOA) of 892.39 feet, meaning it falls below the 997-foot threshold and is not classified as an Ultra Large Container Vessel (ULCV). Therefore, it is not automatically subject to the strict size-based safety mandates of the Deep Draft Advisory that require three or more tugs for navigational transits.

Instead, the deployment of a third docking tug for such vessels is governed by the "**Additional Tugs**" provision outlined in Moran's Schedule of Rates, Terms, and Conditions. According to this contractual rule, more than two tugs are utilized when they are specifically "requested or required to assist a Vessel" due to situational operational challenges. 

The contract lists the following specific circumstances that trigger the need for an additional tug:
* Weather or tidal conditions (e.g., Ice)
* Congestion or difficult berths
* Pilot recommendations
* USCG mandated regulations (e.g., Kill Van Kull specific rules or Inoperable Bow Thrusters)

In empirical validation, the third tug (the *Kimberly Turecamo*) assisting the *Kirby Moran* and *JRT Moran* during the **ONE REINFORCEMENT** docking maneuver at St. George was dispatched due to these specific environmental, situational, or pilot-recommended factors, rather than a mandatory vessel size regulation. 

When triggered, these supplemental assets are billed utilizing a **50% multiplier** of the base docking or undocking rate per each additional tug.

---

## 8. Empirical Validation: Invoice Reconciliation Case Studies

The deterministic reliability of the mathematical algorithms defined in this report can be definitively proven by stress-testing them against actual historical invoices generated under the ONE contract. Reconciling the theoretical framework against raw billing data exposes the absolute precision of the model.

### Case Study A: ULCV Transiting to Howland Hook (**ONE HONOLULU**)
On November 12, 2025, the **ONE HONOLULU** arrived in port. Featuring an LOA of 1,097 feet, it was heavily classified as a ULCV under the Deep Draft Advisory. According to the regulatory mandates, a ULCV with a functional bow thruster bound for the Kill Van Kull requires three assigned tugboats. 

The invoice documentation confirms exactly three tugs were deployed: the *William E Moran*, the *Newt Moran*, and the *Mary Turecamo*.
The billing structure executes flawlessly according to the logic framework:
* **Base Docking:** For the 2025-2026 contract year, the base rate is $2,150. This was billed flawlessly for the *William E Moran* and *Newt Moran*.
* **Absorbed Escort Runtimes:** The *William E Moran* and *Newt Moran* escorted the vessel from 05:05 to 06:10 (65 actual minutes). Because they immediately docked the vessel at Howland Hook, their return runtimes were absorbed. 65 minutes + one-way inbound runtime yielded exactly 2.50 billed hours each. At the historical $1,890 hourly rate, the gross was $4,725. Applying the 25% discount yielded a net escort cost of $3,543.75 per tug.
* **Unabsorbed Escort Anomaly:** The *Mary Turecamo* was deployed solely to fulfill the three-tug ULCV mandate during transit and provided an "Escort Only" service from Constable Hook to Howland Hook. Because it departed without docking, it absorbed the full spatial penalty. Actual time (1 hr 25 mins) + Zone 10 inbound (1.0 hr) + Zone 11 outbound (1.5 hr) = 3 hrs 55 mins. Pro-rated to the nearest half-hour, it billed an immense 4.00 hours. 4.0 hours $\times$ $1,890 = $7,560 gross. With the 25% discount, the net escort was $5,670.
* **Fuel Surcharge:** Fuel was logged at $2.79/gal. The step function: $\lceil (2.79 - 2.00) / 0.10 \rceil = 8$ increments. $8 \times 15 = \$120$ per tug.
* **Total Validation:** Every line item reconciles flawlessly with the algorithmic predictions.

### Case Study B: SLCV Tethered Escort Execution (**ONE HAWK**)
The **ONE HAWK**, boasting an enormous LOA exceeding 1,194 feet, triggers the most stringent Super Large Container Vessel (SLCV) mandates. Operating on November 2, 2025, the invoice proves exactly four tugs were deployed for its undocking and escort maneuver.
* **Base and NRT Surcharges:** The base undocking rate was $2,150 across all four assets. Crucially, because the vessel's NRT of 82,126 obliterates the 40,000 threshold, the rigid $1,400 Vessel Size Premium was ruthlessly applied to every single tug, instantly inflating the base OPEX by $5,600.
* **Tethered Escort Minimums:** The *Newt Moran* was designated to provide the highly stressful Tethered Escorting service. The actual physical maneuver from Port Liberty Bayonne to Robbins Reef lasted a mere 20 chronological minutes (06:30 to 06:50). However, the algorithmic two-hour minimum rule superseded reality. The tug was billed for exactly 2.00 hours at the historical premium $3,145 tethered rate, grossing $6,290 before the 25% discount.
* **Standard Escort Minimums:** The remaining three tugs (*Laura K. Moran*, *William E Moran*, *Mary Turecamo*) provided standard escorting and were similarly trapped by the 2.0-hour minimum rule, billing $1,890 $\times$ 2.0 hours = $3,780 gross each.
* **Fuel Surcharge:** Fuel at $2.69/gal triggered 7 increments ($105/tug), validating the step function logic perfectly.

### Case Study C: Sub-Threshold Efficiency (**CAPE HELLAS** and **MARTINIQUE**)
To prove the threshold boundaries, the model evaluates vessels falling below the 997-foot ULCV cutoff. The **Cape Hellas** (LOA 610 ft, NRT 11,119) and the **Martinique** (LOA 728 ft, NRT 15,033) both arrived at Howland Hook.
* Because neither vessel met ULCV dimensions, the multi-tug transit escort mandates were not triggered. The Deep Draft Advisory permitted standard operations, and invoices #1131067 and #1135489 confirm exactly two standard tugs were deployed for each.
* The $1,400 NRT premium was successfully bypassed on both invoices, as both vessels fell below 40,000 NRT.
* Absolutely zero hourly escorting charges were billed, confirming the dimensional exemption.
* The base rate of $2,150 applied uniformly.
* The only variance was the fuel step function. The **Cape Hellas** burned fuel at $2.47/gal (5 increments = $75/tug), while the **Martinique** faced a $3.05/gal spot price (11 increments = $165/tug). This isolates the fuel algorithm as the sole variable in sub-threshold standard operations.

---

## 9. Algorithmic Architecture for Digital Cost Simulation

Transitioning this vast array of contractual text, hydrodynamic mandates, and spatial billing logic into a functional computational tool requires a structured algorithmic pipeline. 

The required inputs form a strict matrix: vessel physical specifications (LOA, Beam, NRT, Thruster status), operational parameters (Active Contract Year, Spot Fuel Price), and spatial maneuver details (Service Type, Destination Terminal, Elapsed Transit Times). 

To deliver these capabilities, the latest operational architecture is built upon a dynamic, four-panel interface framework designed for both automated forecasting and retrospective auditing.

### The Four-Panel Simulator Interface:
* **Panel 1: Baseline & Routing Constraints:** Users set the operational location using standardized UN/LOCODEs (e.g., USNYC01 for Bayonne, USNYC06 for APM Elizabeth). The model automatically outputs the corresponding geographical transit routes and sets the baseline spatial constraints.
* **Panel 2: Market Rates & Commodities:** This panel governs the contractual variables, anchoring the docking fee to the active multi-year rate schedule (e.g., $2,150 base in 2026) and ingesting the current market fuel price directly from the EIA NY Harbor ULSD index.
* **Panel 3: Financial Output (The Invoice):** The engine aggregates the inputs to generate the total simulated invoice. It features a dynamic "Tug Breakdown Container" and distinct "Runtime Hints" that provide visual transparency into how the spatial transit times were absorbed or billed for each individual tug asset deployed.
* **Panel 4: Variable Overrides (Manual Adjustments):** Because real-world maritime environments are unpredictable, the architecture incorporates manual "steppers." Planners can manually adjust the count of "Escort + Docking" tugs versus "Escort Only" tugs. This allows the model to instantly adapt to situational exigencies (e.g., inoperable bow thrusters or severe weather rules forcing additional deployments).

### Advanced Feature: The Invoice Auditor (PDF Drag & Drop)
Moving beyond pure predictive forecasting, the latest iteration of the digital simulator incorporates a retrospective **Invoice Auditor** feature. Utilizing client-side PDF parsing technology (via libraries like PDF.js), fleet operators can drag and drop raw towage invoices directly into the browser interface. 

The system automatically extracts the billed line items (such as tug counts, running times, applied fuel rates, and NRT surcharges) and computationally compares them against the simulator’s deterministic baseline. By displaying these extracted figures alongside a visual "Cost Component Range" legend—which highlights the mathematical Median Point and a ±7% acceptable sub-range—the system instantly flags any billing anomalies or calculation errors made by the towage provider, allowing operators to systematically recover overcharges.

### Automated Spatial Routing and Validation Matrix
Since the user only knows the destination, the model does the heavy lifting. To achieve this, the simulation is programmed to automate the selection of the runtime, the zone paths, and the absorbed anomaly based solely on the terminal selected. 

The following Validation Matrix (Quick Check) provides the test parameters to ensure the model correctly outputs the expected policy, effective runtime, and minimum bill result based on the destination:

| Destination | Expected Policy | Expected Effective Runtime | Billed Hrs |
| :--- | :--- | :--- | :--- |
| **Bayonne** | standard | 2.5 | 3.5+ (if auto 0.75m + 2.5) |
| **Bayonne (waive)** | waive | 1.25 | 2.0 |
| **New York** | waive | 1.25 | 2.5 |
| **Elizabeth/Newark** | waive | 1.25 | 2.5 |
| **Red Hook** | standard | 2.5 | 3.5+ |

### Automated Fuel Feed Integration
To remove the burden of manual research and ensure absolute accuracy, the simulation's operational architecture is designed to automatically feed from the EIA NY Harbor ULSD index. This transparency identifies the exact fuel type and governing body, removing the guesswork of determining the correct commodity index to use for the model's spot price assumptions.

**User Interface and Integration Specifications:**
* **Input Metric:** "Market Fuel Price (NY Harbor ULSD Index)"
* **Default Baseline:** $4.73/gal (representing the late March 2026 reference spike).
* **Transparency Badges:** The model should feature a "Live" indicator stating the source is the EIA NY Harbor Spot Price (Updated Weekly), alongside a direct link to the official EIA portal for user verification.
* **Contextual Tooltip:** A disclaimer clarifies: *"Moran uses the NY Harbor No. 2 Diesel index. The surcharge applies to all physically dispatched tugs, regardless of whether they are performing escort or docking duties."*

**Algorithmic Step-Function Logic:**
The internal logic asynchronously initializes the current market rate and applies a ceiling function. The model calculates the increments by **rounding UP** for any fraction of $0.10, and the resulting fuel rate per tug applies to all physically dispatched tugs (i.e., maxPhysicalTugs).

* **Initialization:** The system fetches or defaults to the current EIA market rate ($4.73).
* **Surcharge per Tug Formula:**
    $$Surcharge_{tug} = \lceil \frac{\max(0, Price_{fuel} - 2.00)}{0.10} \rceil \times 15.00$$
* **Total Surcharge Formula:**
    $$Total Fuel Surcharge = \text{maxPhysicalTugs} \times Surcharge_{tug}$$

By integrating this automated feed to accurately represent the EIA NY Harbor index and enforcing the round-up math logic, the simulation matches the "Fuel Surcharge" line item on an actual Moran invoice with complete precision.

---

## 10. Strategic Implications for Fleet Management and Deployment

The capacity to execute high-fidelity, algorithmic cost simulation extends significantly beyond basic post-voyage accounting reconciliation; it is a critical mechanism for generating strategic leverage in both contract negotiations and real-time fleet deployments.

By isolating the mathematically rigid, granular components of the towage invoice, a fleet operator can decisively optimize operational execution to minimize unavoidable OPEX. 

For example, a profound understanding of the "absorbed runtime" spatial anomaly allows dispatchers to schedule harbor operations with clinical efficiency. If an escort tug is mandated by the Deep Draft Advisory for a ULCV entering Port Jersey, ensuring that the dispatcher tasks the exact same tug to transition directly into the physical docking maneuver effectively deletes up to 1.5 hours of outbound zone runtimes from the final invoice. 

Across a major shipping fleet conducting thousands of dense port calls annually, mitigating these non-productive, redundant geographic zone runtimes systematically yields millions of dollars in compound OPEX savings.

Furthermore, integrating this rigorous cost simulation capability into the broader macroeconomic "Omission vs. Speeding" strategic matrix fundamentally shifts how ETA deficits are managed. 
* If a vessel must aggressively speed across the Atlantic to recover a schedule, the algorithm can instantaneously predict whether the vessel's new arrival velocity will push it into a deteriorating tidal window that necessitates a costlier berthing protocol (e.g., requiring slack water and four tugs rather than three). 
* If the recovered speeding maneuver unintentionally pushes the physical arrival into a recognized port holiday window, the simulation immediately highlights the brutal 35% cost penalty applied to the base rate. 

This absolute transparency empowers the global fleet manager to weigh the true, hyper-localized financial cost of the recovered schedule directly against the immense savings of executing a strategic port omission.

The towage Cost of Sales for ultra-large container vessels is not an opaque, monolithic expense. It is a highly dynamic financial output driven by inflexible physical hydrodynamic laws, static port geography, and multi-layered contractual arithmetic. The Port of New York and New Jersey represents one of the most operationally demanding and heavily restricted environments globally, where vessel displacement dimensions automatically trigger cascading requirements for highly specialized, capital-intensive harbor assets.

By formalizing the Moran Towing schedule of rates into a deterministic, algorithmic model—meticulously incorporating the escalating base matrices, the rigid mathematical step-function of the fuel surcharge, and the unique, heavily pro-rated spatial algorithms governing zone runtimes—this analysis provides a perfectly transparent, data-driven mechanism for OPEX prediction. 

The model's foundation serves as a critical operational tool, ensuring that the precise financial impact of every maneuver, delay, and environmental constraint can be instantaneously simulated, audited, and systematically optimized.

---

## 11. Works Cited

* [cite_start]Schedule of Rates, Terms and Conditions Effective: October 1, 2024 TOWAGE AGREEMENT Albany, New York - Moran Towing, accessed March 27, 2026, [https://www.morantug.com/Customer-Content/www/ports-and-operations/Files/Moran_Albany_Schedule_of_Rates_Terms_and_Conditions_05_01_23.pdf](https://www.morantug.com/Customer-Content/www/ports-and-operations/Files/Moran_Albany_Schedule_of_Rates_Terms_and_Conditions_05_01_23.pdf) [cite: 289]
* [cite_start]Schedule of Rates, Terms and Conditions Effective ... - Moran Towing, accessed March 27, 2026, [https://www.morantug.com/Customer-Content/www/ports-and-operations/Files/Moran_New_York_Schedule_of_Rates_Terms_and_Conditions_October_1_2024.pdf](https://www.morantug.com/Customer-Content/www/ports-and-operations/Files/Moran_New_York_Schedule_of_Rates_Terms_and_Conditions_October_1_2024.pdf) [cite: 290]
* [cite_start]Schedule of Rates, Terms and Conditions - Moran Towing, accessed March 27, 2026, [https://www.morantug.com/Customer-Content/www/ports-and-operations/Files/Moran_Charleston_Schedule_of_Rates_Terms_and_Conditions_07_15_23.pdf](https://www.morantug.com/Customer-Content/www/ports-and-operations/Files/Moran_Charleston_Schedule_of_Rates_Terms_and_Conditions_07_15_23.pdf) [cite: 291]