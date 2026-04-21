# [cite_start]Economic Modeling of Container Vessel Cost of Sales: A Dynamic Tug Towage Cost Simulation for the Port of New York and New Jersey [cite: 1]

[cite_start]The accurate simulation of Cost of Sales—specifically the Operating Expenses (OPEX) allocated to port calls—for ultra-large container vessels requires a microscopic, deterministic analysis of localized harbor economics[cite: 2]. [cite_start]While macroeconomic variables such as deep-sea fuel consumption, daily vessel charter rates, and global freight indices are heavily scrutinized by fleet operators, the towage and harbor assist component represents a highly variable, structurally complex cost center[cite: 3]. [cite_start]This cost center is dictated by a confluence of spatial geography, fluid dynamics, strict environmental safety regulations, and intricately negotiated contractual matrices[cite: 4]. 

[cite_start]This comprehensive research report provides an exhaustive, first-principles deconstruction of the towage cost architecture specifically governing a container shipping line utilizing Moran Towing Corporation services within the Port of New York and New Jersey[cite: 5]. [cite_start]By synthesizing the harbor's stringent Deep Draft Advisory mandates with the granular financial logic embedded within Moran’s Schedule of Rates, a deterministic mathematical model is formulated[cite: 6]. [cite_start]This algorithmic model is subsequently translated into a functional simulation prototype, enabling high-fidelity OPEX forecasting for specific vessel transits based on dimensional, temporal, and geographic inputs[cite: 7].

---

## [cite_start]Table of Contents [cite: 8]
* [1. [cite_start]The Macroeconomics of Maritime Cost of Sales: Port Omission versus Speeding](#1-the-macroeconomics-of-maritime-cost-of-sales-port-omission-versus-speeding) [cite: 9]
* [2. [cite_start]Hydrodynamic Constraints and Harbor Safety Resource Allocation](#2-hydrodynamic-constraints-and-harbor-safety-resource-allocation) [cite: 10]
* [cite_start][General Draft Regulations and Under Keel Clearance](#general-draft-regulations-and-under-keel-clearance) [cite: 11]
* [cite_start][Vessel Classification Mandates and Tug Matrices](#vessel-classification-mandates-and-tug-matrices) [cite: 12]
* [3. [cite_start]TEU, NRT, and GRT Conversion](#3-teu-nrt-and-grt-conversion) [cite: 13]
* [4. [cite_start]Unit Economics and KPI Benchmarking: Cost per TEU](#4-unit-economics-and-kpi-benchmarking-cost-per-teu) [cite: 14]
* [5. [cite_start]Contractual Architecture: Deconstructing the Moran Towing Agreement](#5-contractual-architecture-deconstructing-the-moran-towing-agreement) [cite: 15]
* [cite_start][The Base Docking Cost](#the-base-docking-cost-c_base) [cite: 16]
* [cite_start][Vessel Size Premiums and the NRT Threshold](#vessel-size-premiums-and-the-nrt-threshold-p_size) [cite: 17]
* [cite_start][Commodity Volatility and the Fuel Surcharge Step Function](#commodity-volatility-and-the-fuel-surcharge-step-function-s_fuel) [cite: 18]
* [6. [cite_start]Spatial Cost Dynamics: Escorting and Geographic Zone Runtimes](#6-spatial-cost-dynamics-escorting-and-geographic-zone-runtimes-c_escort) [cite: 19]
* [cite_start][The Architecture of Zone Running Times (Runtimes)](#the-architecture-of-zone-running-times-runtimes) [cite: 20]
* [cite_start][Container Terminal Routing and Zone Transits](#container-terminal-routing-and-zone-transits) [cite: 21]
* [cite_start][The Transition from Hourly to Flat-Rate and the Absorbed Runtime Anomaly](#the-transition-from-hourly-to-flat-rate-and-the-absorbed-runtime-anomaly) [cite: 22]
* [7. [cite_start]Situational Penalties and Edge Cases](#7-situational-penalties-and-edge-cases-f_penalty) [cite: 23]
* [cite_start][The Additional Tugs Provision and Situational Triggers](#the-additional-tugs-provision-and-situational-triggers) [cite: 24]
* [8. [cite_start]Empirical Validation: Invoice Reconciliation Case Studies](#8-empirical-validation-invoice-reconciliation-case-studies) [cite: 25]
* [cite_start][Case Study A: ULCV Transiting to Howland Hook](#case-study-a-ulcv-transiting-to-howland-hook) [cite: 26]
* [cite_start][Case Study B: SLCV Tethered Escort Execution](#case-study-b-slcv-tethered-escort-execution) [cite: 27]
* [cite_start][Case Study C: Sub-Threshold Efficiency](#case-study-c-sub-threshold-efficiency) [cite: 28]
* [9. [cite_start]Algorithmic Architecture for Digital Cost Simulation](#9-algorithmic-architecture-for-digital-cost-simulation) [cite: 29]
* [cite_start][Automated Spatial Routing and Validation Matrix](#automated-spatial-routing-and-validation-matrix) [cite: 30]
* [cite_start][Automated Fuel Feed Integration](#automated-fuel-feed-integration) [cite: 31]
* [10. [cite_start]Strategic Implications for Fleet Management and Deployment](#10-strategic-implications-for-fleet-management-and-deployment) [cite: 31]

---

## [cite_start]1. The Macroeconomics of Maritime Cost of Sales: Port Omission versus Speeding [cite: 32]

[cite_start]In global maritime logistics, schedule reliability directly impacts the fundamental Cost of Sales and the overarching profitability of a voyage[cite: 33]. [cite_start]When a container vessel experiences operational delays—whether due to severe weather routing, terminal congestion at previous ports, or mechanical inefficiencies—fleet operators face a binary, highly consequential strategic decision paradigm: port omission or speeding[cite: 34].

[cite_start]**The Strategy of Port Omission:** This involves the deliberate cancellation of a scheduled port call, such as bypassing a congested facility in Halifax or Manzanillo, to recover the schedule and immediately reduce direct operating expenses[cite: 35].
* [cite_start]**Benefits:** Total elimination of specific port costs, terminal handling charges, and the immense fuel expenditure required to physically enter and exit the harbor complex[cite: 36]. [cite_start]It allows the vessel to maintain a highly efficient, constant deep-sea cruising speed toward the subsequent destination, ensuring the vessel commits to the Estimated Time of Arrival (ETA) at the critical turn port[cite: 37].
* **Penalties:** Severe degradation of customer delivery reliability. [cite_start]Cargo is not delivered as booked, resulting in supply chain disruptions, potential contractual penalties, and long-term reputational damage[cite: 38].

[cite_start]**The Strategy of Speeding:** This involves executing the delayed port call by drastically increasing the vessel's transit velocity across the ocean to recover the lost time[cite: 39].
* [cite_start]**Benefits:** Preservation of cargo commitments, ensuring that the revenue generated per Twenty-foot Equivalent Unit (TEU) is fully realized and customer transparency is maintained[cite: 40].
* **Penalties:** Mathematically punishing economic consequences. [cite_start]Because maritime fuel consumption scales as a cubic function of vessel speed, even marginal increases in velocity result in exponential spikes in bunker fuel consumption[cite: 41]. [cite_start]Furthermore, speeding guarantees the incurrence of all localized harbor OPEX, including pilotage, terminal fees, and the complex tug towage costs required to safely maneuver the vessel to the berth[cite: 42].

[cite_start]Because the speeding strategy unconditionally commits the fleet operator to these harbor expenses, achieving an exact, data-driven prediction of the impending port call cost is paramount[cite: 43]. [cite_start]The decision to speed or omit cannot rely on human intuition; it requires systematic transparency based on concrete financial algorithms[cite: 44]. [cite_start]In highly regulated and geographically restricted environments like the Port of New York and New Jersey, towage costs are not static flat fees[cite: 45]. [cite_start]They fluctuate dynamically based on the vessel's physical displacement, the active contract year, the spot price of marine diesel, the duration of the escort, and the specific geographic zones traversed[cite: 46].

---

## [cite_start]2. Hydrodynamic Constraints and Harbor Safety Resource Allocation [cite: 47]

[cite_start]The foundational variable in any towage cost simulation is the required number of tugboats necessary to safely arrest, steer, and berth the vessel[cite: 48]. [cite_start]In the Port of New York and New Jersey, this allocation is not left to the discretion of the vessel master [cite: 49][cite_start]; it is strictly dictated by the Harbor Safety, Operations and Navigation Committee's Deep Draft Advisory[cite: 50]. [cite_start]This advisory establishes mandatory minimum asset deployments based on a vessel's Length Overall (LOA), beam width, draft depth, and the operational status of its internal maneuvering thrusters[cite: 51].

### [cite_start]General Draft Regulations and Under Keel Clearance [cite: 52]

[cite_start]Vessels operating within the federal channels of New York and New Jersey must maintain specific Under Keel Clearances (UKC) to mitigate the risks of grounding, particularly given the hydrodynamic effects of squat and bank cushion[cite: 53].
* [cite_start]**Standard Channels:** The recommended UKC is maintained at 3 feet within the primary Ambrose Channel, and 2 feet in all other inner channels[cite: 54].
* [cite_start]**SLCV Rules:** A strict 3 feet of UKC is required across all channels for Super Large Container Vessels (SLCVs)[cite: 55].
* [cite_start]**Moored Vessels:** Ships must remain afloat at all times, a rule interpreted operationally as maintaining at least 1 foot of water under the keel at the lowest tidal point[cite: 56].
* [cite_start]Draft remains a severe restricting factor for operations, even with the 50-foot harbor deepening project[cite: 57].
* [cite_start]**Port Jersey Channel:** Imposes a strict maximum draft limit of 49 feet[cite: 58]. [cite_start]Any standard container vessel departure from Port Jersey with a draft of 41 feet or greater unconditionally mandates a minimum of three tugboats[cite: 59].
* [cite_start]**South Elizabeth Channel:** Vessels presenting drafts exceeding 43 feet face incredibly narrow tidal operational windows[cite: 60]. [cite_start]They are permitted to berth and depart solely between the time of Battery high or low water and two hours subsequent[cite: 61].
* [cite_start]Meteorological conditions further constrain operations and dictate tug usage[cite: 62].
* [cite_start]**Bergen Point:** ULCVs are strictly prohibited from moving when visibility drops below 1.5 miles, or when sustained winds reach 30 knots with gusts exceeding 34 knots at Mariners Harbor[cite: 63].
* [cite_start]**Howland Hook:** ULCV arrivals are restricted to maximum sustained winds of 25 knots[cite: 64].
* [cite_start]These environmental boundaries ensure that the assigned tugboats possess sufficient aggregate bollard pull to overcome the massive aerodynamic windage presented by fully loaded container stacks[cite: 65].

### [cite_start]Vessel Classification Mandates and Tug Matrices [cite: 66]

[cite_start]To systematically manage risk, the Deep Draft Advisory categorizes modern commercial tonnage into distinct classes, each triggering specific operational protocols, pilotage requirements, and minimum tug counts[cite: 67]. [cite_start]The critical delineator in these mandates is the presence of a fully functional bow thruster, which significantly reduces the external rotational force required from the tug fleet[cite: 68]. [cite_start]These classifications correspond closely to established Gross Registered Tonnage (GRT) operational tiers[cite: 69].

| Vessel Classification | GRT Baseline Tier | Dimensional Definition | Tug Mandate (With Working Bow Thruster) | Tug Mandate (Without Working Bow Thruster) | Additional Transit Regulations |
| :--- | :--- | :--- | :--- | :--- | :--- |
| Standard Vessel | < 45,000 GRT | LOA < 997 ft and Beam < 140 ft | 2 Tugs (Standard Docking) | Varies based on draft/pilot | Exempt from mandatory multi-tug transit escorts unless drafted > 41 ft at specific berths. |
| Ultra Large Container Vessel (ULCV) | 45,000 – 120,000 GRT | LOA >= 997 ft or Beam >= 140 ft | 3 Tugs assigned from KVK Lighted Buoy 9. | 4 Tugs assigned from KVK Lighted Buoy 9. | 2 tugs must be stationed at The Narrows with a docking pilot for immediate emergency assistance. |
| Super Large Container Vessel (SLCV) | >= 120,000 GRT | LOA >= 1,165 ft or Beam > 159 ft | 4 Tugs (2 additional tugs joining the 2 at The Narrows). | 5 Tugs (Subject to docking pilot assessment of tidal conditions). | Must maintain 3 ft UKC. Backing into Port Liberty Bayonne requires 4 tugs and slack water. |
| Mega Large Container Vessel (MLCV) | >= 120,000 GRT | Follows SLCV dimensions | Follows SLCV Mandates | Follows SLCV Mandates | Maximum sustained winds of 15 knots. Requires open adjacent berths at specific terminals. |
[cite_start]*Table Data Source* [cite: 70]

[cite_start]The empirical impact of these regulations is clearly visible in the billing data[cite: 71]. [cite_start]Vessels falling safely below the 997-foot LOA threshold—such as a specific feeder vessel featuring an LOA of 610.00 feet, and another regional vessel with an LOA of 728.90 feet—are entirely exempt from the port's mandatory multi-tug transit escort regulations[cite: 72]. [cite_start]Consequently, they only require the baseline deployment of two standard tugboats to execute the physical docking maneuver at facilities like Howland Hook, drastically reducing their harbor OPEX[cite: 73].

---

## [cite_start]3. TEU, NRT, and GRT Conversion [cite: 74]

[cite_start]In order to streamline the operational model and provide a single source of truth for vessel size, operators can parameterize the simulation using the Twenty-foot Equivalent Unit (TEU) carrying capacity[cite: 75]. [cite_start]Because TEU directly dictates the internal volumetric layout of a container ship, it operates as a reliable baseline to dynamically estimate the Length Overall (LOA), Net Registered Tonnage (NRT), and Gross Registered Tonnage (GRT)[cite: 76]. [cite_start]As vessels escalate in TEU capacity, their hull designs transition into "wide-body" profiles, meaning the conversion multipliers gently scale down to reflect modern stacking geometries[cite: 77]. 

[cite_start]To accurately simulate this without requiring manual lookup, the conversion algorithms use linear interpolation bounded by the specific limits derived from the dataset[cite: 78]. [cite_start]By tying these real-world conversion ratios directly into the simulation architecture, the user avoids manual input discrepancies[cite: 79]. [cite_start]A single TEU selection dynamically calculates the exact LOA in feet (triggering the strict Deep Draft Advisory safety mandates, such as the 997 ft ULCV cutoff) and the NRT (determining whether the $1,400 Vessel Size Premium over 40,000 NRT is enforced)[cite: 80].

---

## [cite_start]4. Unit Economics and KPI Benchmarking: Cost per TEU [cite: 81]

[cite_start]Transitioning from gross invoice modeling to unit economics is a critical step for port planners[cite: 82]. [cite_start]Calculating the "Cost per TEU" normalizes the complex variables of different ports (e.g., varying zone runtimes, base rates, and fuel matrices) into a single, comparative metric[cite: 83]. [cite_start]However, calculating this on transpacific routes requires adjusting for severe structural trade imbalances[cite: 84]. [cite_start]To gain complete visibility into operational efficiency and true commercial profitability, the model implements a dual-KPI approach[cite: 85]:

### [cite_start]1. Cost per Handled TEU (Operational Metric) [cite: 86]
* [cite_start]**Denominator:** Total volume of containers actually handled at the terminal (Full + Empty TEUs combined)[cite: 87].
* [cite_start]**Logic:** From a towage and terminal perspective, the physical effort, fuel burn, and hydrodynamic constraints placed on the tugboats are identical regardless of whether a container is loaded with high-value cargo or being repositioned empty[cite: 88]. [cite_start]Because the Asia-North America lane experiences severe imbalances (with North America importing significantly more loaded containers than it exports), evaluating pure operational efficiency requires using the total physical volume moved[cite: 89]. [cite_start]This metric allows operators to benchmark the pure cost-competitiveness of the port infrastructure itself[cite: 90].

### [cite_start]2. Cost per Revenue TEU (Commercial Metric) [cite: 91]
* [cite_start]**Denominator:** Volume of "Full/Revenue" TEUs only[cite: 92].
* [cite_start]**Logic:** This is the ultimate metric of profitability for the specific port call[cite: 93]. [cite_start]The massive cost of repositioning empty containers back to Asia must ultimately be absorbed by the revenue-generating head-haul cargo[cite: 94]. [cite_start]By dividing the total port OPEX strictly by the number of freight-paying containers, the true commercial margin is revealed[cite: 95]. [cite_start]If a massive SLCV incurs a $30,000 towage bill but only unloads a small fraction of full containers, the Cost per Revenue TEU skyrockets, severely crushing profit margins[cite: 96]. [cite_start]This KPI is critical for determining whether to speed up to make a port window or omit the port call entirely[cite: 97].

---

## [cite_start]5. Contractual Architecture: Deconstructing the Moran Towing Agreement [cite: 98]

[cite_start]The total financial invoice generated by Moran Towing for operations executed under a container shipping line contract is not a monolithic figure[cite: 99]. [cite_start]Rather, it is a highly structured composite of flat-rate base services, physical dimensional premiums, indexed commodity surcharges, and geographically pro-rated hourly escort services[cite: 100]. Through forensic analysis of the contractual parameters and associated invoice documentation, the overarching deterministic cost equation can be defined as follows:

[cite_start]`C_total = C_base + P_size + S_fuel + C_escort + F_penalty` [cite: 101]

Where:
* [cite_start]`C_base` : Aggregate base docking and undocking cost[cite: 102, 103].
* [cite_start]`P_size` : Vessel size premium based on Net Registered Tonnage[cite: 104].
* [cite_start]`S_fuel` : Aggregate fuel surcharge driven by market commodity indexing[cite: 105].
* [cite_start]`C_escort` : Discounted cost of hourly spatial escorting services[cite: 106].
* [cite_start]`F_penalty` : Encompasses any situational fees, including detention waiting time or cancellation penalties[cite: 107].

### [cite_start]The Base Docking Cost (C_base) [cite: 108, 109]

[cite_start]Unlike hourly transit services, the physical act of docking and undocking a vessel at the terminal berth is billed as a flat-rate contractual fee[cite: 110]. [cite_start]This provides a degree of predictability for the operator[cite: 111]. [cite_start]The fundamental driver of this base rate is the active contract year[cite: 112]. [cite_start]The negotiated rates per individual tugboat deployment under the container shipping line agreement escalate annually to account for inflation and capital asset depreciation[cite: 113]. 

[cite_start]The mathematical formulation for the base cost incorporates specific maneuver multipliers that can drastically inflate the baseline[cite: 114].
* [cite_start]**Standard Maneuvers:** A standard docking or undocking maneuver utilizes a 1.0 multiplier[cite: 115].
* [cite_start]**Shifting Services:** If the vessel requires shifting between two adjacent berths within the exact same terminal footprint, the effort is charged at one and one-half times (1.5x) the base zone rate[cite: 116]. [cite_start]If the vessel is shifted between entirely different terminals, it is billed as two distinct maneuvers: one full undocking and one full docking[cite: 117].
* [cite_start]**Backing Maneuvers:** When a vessel is forced to be backed one-half mile or more due to specific berthing constraints, the applicable rate for the docking or sailing evolution is increased by a strict 50%[cite: 118].
* [cite_start]**Holiday Penalties:** Operations executed on recognized Federal Holidays incur an additional 35% premium applied to the base rate per tug[cite: 119].
* [cite_start]**Dead Ship Penalties:** If a vessel loses its ability to maneuver under its own power or steering during an evolution, it incurs an automatic minimum penalty of two hours at the standard hourly rate[cite: 120].

### [cite_start]Vessel Size Premiums and the NRT Threshold (P_size) [cite: 121, 122]

[cite_start]Maneuvering massive displacement vessels requires tugboats equipped with highly specialized propulsion systems, such as Azimuth Stern Drives (Z-drives), capable of generating immense multi-directional bollard pull[cite: 123]. [cite_start]To compensate the towage provider for the deployment of these high-horsepower, high-capital-cost assets, a size premium is levied based on the vessel's volumetric capacity[cite: 124]. [cite_start]In the NY/NJ framework, this premium is calculated using the vessel's Net Registered Tonnage (NRT)[cite: 125]. 

[cite_start]Under the specific parameters of the container shipping line agreement, a flat-fee premium of $1,400 per tug is applied exclusively if the vessel's NRT exceeds a critical threshold of 40,000[cite: 126]. [cite_start]Vessels falling below this displacement metric incur a premium of zero[cite: 126]. This binary threshold operates ruthlessly in practice. [cite_start]A specific SLCV, boasting a massive NRT of 82,126, automatically triggered this $1,400 premium across all four assigned tugs, adding a sudden $5,600 to the total invoice[cite: 127]. [cite_start]Conversely, smaller vessels (NRT 11,119) avoid this premium entirely[cite: 128].

### [cite_start]Commodity Volatility and the Fuel Surcharge Step Function (S_fuel) [cite: 129, 130]

[cite_start]Marine diesel represents one of the most volatile elements of maritime operating expenses[cite: 131]. [cite_start]To insulate the towage provider from sudden macroeconomic commodity spikes while maintaining base rate stability for the buyer, a highly dynamic fuel surcharge mechanism is implemented[cite: 132]. [cite_start]Moran New York typically calculates its fuel surcharges based on the EIA New York Harbor Ultra-Low Sulfur No. 2 Diesel (ULSD) Spot Price index[cite: 133]. [cite_start]Based on the service dates and prices observed, here is how the index aligns with market data for March 2026[cite: 134]:

[cite_start]**How Moran Uses This Index:** According to the contract logic observed across multiple invoices, the fuel surcharge operates strictly as follows[cite: 135]:
* [cite_start]**The Base:** The surcharge is calculated against a base price of $2.00 per gallon[cite: 136].
* [cite_start]**The Surcharge:** For every $0.10 increment (or fraction thereof) the index price rises above $2.00, Moran adds $15.00 per tug to the invoice[cite: 137]. [cite_start]The increments are calculated by rounding UP for any fraction of a $0.10 step[cite: 138].
* [cite_start]**Application:** This surcharge applies to every physically dispatched tug (both "Escort Only" and "Docking" tugs)[cite: 139].

[cite_start]**Example Calculation (for 03-23-2026):** [cite: 140]
* [cite_start]**Index Price:** $4.73 [cite: 141]
* [cite_start]**Overage:** $4.73 - $2.00 = $2.73 [cite: 142]
* [cite_start]**Increments:** 28 steps (Calculated by taking the 27.3 intervals and rounding UP for the remaining fraction)[cite: 143].
* [cite_start]**Total Surcharge:** 28 x $15 = $420.00 per tug[cite: 144].

[cite_start]The mathematical representation utilizes the ceiling function to ensure it correctly triggers on fractions of a ten-cent interval[cite: 145, 146]. [cite_start]This mechanism ensures that OPEX modeling must anchor to real-time EIA indices to achieve high-fidelity predictions, as fuel surcharges add hundreds of dollars per maneuver and change weekly based on the spot market[cite: 147].

---

## [cite_start]6. Spatial Cost Dynamics: Escorting and Geographic Zone Runtimes (C_escort) [cite: 148, 149]

[cite_start]While base docking is flat-rated, the mandatory transit escort services required for ULCVs and SLCVs are billed on a strict hourly basis and are heavily dependent on the spatial geography of the harbor[cite: 150].
* [cite_start]**Standard Escorting:** The standard base rate for a standard escorting service in the harbor is historically $1,890 per hour per tug[cite: 151]. [cite_start]Standard escorting involves the tug transiting in close proximity to the container vessel, ready to render assistance if steering or propulsion fails[cite: 152].
* [cite_start]**Tethered Escorting:** For the most massive SLCVs navigating treacherous maritime chokepoints, pilots mandate "Tethered Escorting"[cite: 153]. [cite_start]The tug's heavy towline is actively attached to the vessel's stern or bow while underway[cite: 154]. [cite_start]This allows the tug to act as a massive hydrodynamic drogue to provide instantaneous braking and extreme rotational forces[cite: 155]. [cite_start]Because this subjects the tug's machinery to massive kinetic strain, tethered escorting commands a severe premium rate, historically billed at $3,145 per hour per tug under this specific contract[cite: 156].

[cite_start]*(Note: Per the operational simulation model, operators can dynamically simulate custom rates such as a flatized $1,000/hr rate for both escort varieties to test modified contractual arrangements)*[cite: 157].

[cite_start]Crucially, the container shipping line contract explicitly stipulates a negotiated volume discount[cite: 158]. [cite_start]The terms state that "all other services, including but not limited to escorting," receive a 25% discount off the standard port schedule of rates[cite: 159]. [cite_start]Therefore, a permanent 0.75 multiplier is applied to the final calculated escort gross total to determine the net invoice price[cite: 160].

### [cite_start]The Architecture of Zone Running Times (Runtimes) [cite: 161]

[cite_start]Hourly billing algorithms do not merely commence when the tug arrives alongside the vessel and terminate when the lines are cast off[cite: 162]. [cite_start]The towage provider must recoup the fuel, crew time, and asset depreciation incurred while the tug travels from its customary dispatch station to the operational intercept point, and its subsequent return journey[cite: 163]. [cite_start]To standardize this process and eliminate disputes over exact transit minutes, the Port of New York and New Jersey is divided into heavily formalized geographic zones, each carrying a fixed, unalterable "Running Time" (Runtime)[cite: 164]. [cite_start]For hourly services, these runtimes are charged "each way"—meaning the runtime of the starting zone is added for the inbound trip, and the runtime of the finishing zone is added for the outbound trip[cite: 165]. [cite_start]The exhaustive zone matrix for the harbor is defined as follows[cite: 166]:

### [cite_start]Container Terminal Routing and Zone Transits [cite: 167]

[cite_start]The Narrows is the primary gateway for container ships to enter the port of NYNJ[cite: 168]. [cite_start]The Narrows connects the Lower and Upper New York Bays, allowing major shipping traffic to reach container terminals[cite: 169]. [cite_start]Because hourly escort billing relies on station-to-station routing, the transit path from this gateway to the specific terminal dictates the aggregated runtime[cite: 170]. [cite_start]The latest modeling architectures integrate standardized UN/LOCODEs to match internal shipping dispatch systems[cite: 171].

| Destination Container Terminal (UN/LOCODE) | Geographic Transit Path | Moran Billing Zones Traversed | Aggregated One-Way Runtime |
| :--- | :--- | :--- | :--- |
| Port Liberty Bayonne (USNYC01) | The Narrows → Upper New York Bay → Port Jersey Channel | Zone 9 + Zone 8 | 2.50 hours |
| Port Liberty New York (Howland Hook) (USNYC02) | The Narrows → Kill Van Kull → Arthur Kill | Zone 10 + Zone 11 | 2.50 hours |
| APM Terminals (Elizabeth) (USNYC06) | The Narrows → Kill Van Kull → Newark Bay | Zone 10 + Zone 11 | 2.50 hours |
| Maher Terminals (Elizabeth) | The Narrows → Kill Van Kull → Newark Bay | Zone 10 + Zone 11 | 2.50 hours |
| Port Newark Container Terminal (PNCT) | The Narrows → Kill Van Kull → Newark Bay | Zone 10 + Zone 11 | 2.50 hours |
| Red Hook Container Terminal (Brooklyn) | The Narrows → Upper New York Bay → Buttermilk Channel | Zone 9 + Zone 1 / 2 | ~2.50 - 2.75 hours |
[cite_start]*Table Data Source* [cite: 172]

[cite_start]However, the most punishing factor in the hourly billing framework is the strict implementation of a two-hour minimum per tug[cite: 173]. [cite_start]Even if a tethered escort maneuver requires only 15 actual minutes, the invoice will unconditionally default to a 2.0-hour charge[cite: 174].

### [cite_start]The Transition from Hourly to Flat-Rate and the "Absorbed Runtime" Anomaly [cite: 175]

[cite_start]A critical edge case exists within the spatial billing logic regarding the transition between different service billing models[cite: 176]. [cite_start]While escort services are billed on a strict hourly basis, the physical act of docking the vessel is billed as a comprehensive flat-rate contractual fee[cite: 177]. [cite_start]When a tugboat provides an "Escort Only" service, it bills for both the inbound and outbound (return) zone runtimes to cover its full journey from and back to its dispatch station[cite: 178].

* [cite_start]**The Absorbed Anomaly:** If the tug transitions immediately from an hourly escort into a flat-rate docking assignment for the exact same vessel, the flat fee inherently covers the completion of the vessel's maneuver and the tug's eventual return trip home[cite: 179].
* [cite_start]Charging an hourly outbound runtime for the preceding escort phase would constitute double billing for the same return transit[cite: 180]. [cite_start]Consequently, the running times are waived[cite: 181].

[cite_start]This logic is mathematically represented in the updated escort calculation[cite: 182]. [cite_start]This nuance is mathematically proven in a specific ULCV invoice[cite: 183]. [cite_start]Two deployed tugs escorted the vessel and then immediately assisted with "Docking at Howland Hook"[cite: 184]. [cite_start]Because they transitioned to a flat-rate job, they were only billed for the actual escort time plus the one-way inbound travel runtime, resulting in exactly 2.50 billed hours[cite: 185]. [cite_start]In stark contrast, the third tug provided an "Escort Only" service and departed immediately thereafter[cite: 186]. [cite_start]Because it did not execute the docking, its return runtime was not absorbed[cite: 187]. [cite_start]It billed the actual time plus inbound Zone 10 runtime (1.0 hr) plus outbound Zone 11 runtime (1.5 hr), resulting in a massive 4.00 billed hours for the exact same transit due to the addition of both inbound (Zone 10) and outbound (Zone 11) runtimes[cite: 188]. [cite_start]Recognizing this anomaly allows operators to accurately forecast significant cost reductions per tug when dual services are chained[cite: 189].

---

## [cite_start]7. Situational Penalties and Edge Cases (F_penalty) [cite: 190, 191]

[cite_start]Harbor logistics are deeply susceptible to friction, and towage contracts deploy severe financial penalties to penalize operator-induced delays and safeguard tug availability[cite: 192].
* [cite_start]**Detention Fees (Waiting Time):** Detention occurs when an ordered tug is delayed alongside the vessel for reasons entirely unrelated to the towage provider (e.g., terminal crane breakdowns, pilot delays, or traffic congestion)[cite: 193]. [cite_start]The contract offers a brief grace period of up to one-half hour (30 minutes) at no additional charge[cite: 194]. [cite_start]Any waiting time accumulating in excess of this window is billed continuously at the standard hourly rate ($1,750 per tug), pro-rated to the nearest half-hour[cite: 195].
* [cite_start]**Cancellation Penalties:** Aborting an operation inflicts opportunity costs[cite: 196]. 
    * [cite_start]Notice > 6 hours: $0 penalty[cite: 197].
    * [cite_start]Notice < 6 hours (before arrival): 66.6% of applicable rate[cite: 198].
    * [cite_start]Notice < 2 hours (or after arrival): 75% of applicable rate[cite: 199].
* [cite_start]**Terminal Line Handling:** Subcontracted through the towage provider, running standard rope ship lines incurs a $1,566 flat fee, while heavy wire ship lines demand $2,106[cite: 200].

### [cite_start]The "Additional Tugs" Provision and Situational Triggers [cite: 201]

[cite_start]While baseline tug allocations are dictated by vessel dimensions, non-ULCV vessels may still require supplementary assistance[cite: 202]. [cite_start]For example, a specific 892-foot vessel features a Length Overall (LOA) of 892.39 feet, meaning it falls below the 997-foot threshold and is not classified as an Ultra Large Container Vessel (ULCV)[cite: 203]. [cite_start]Therefore, it is not automatically subject to the strict size-based safety mandates of the Deep Draft Advisory that require three or more tugs for navigational transits[cite: 204].

[cite_start]Instead, the deployment of a third docking tug for such vessels is governed by the "Additional Tugs" provision outlined in Moran's Schedule of Rates, Terms, and Conditions[cite: 205]. [cite_start]According to this contractual rule, more than two tugs are utilized when they are specifically "requested or required to assist a Vessel" due to situational operational challenges[cite: 206]. [cite_start]The contract lists the following specific circumstances that trigger the need for an additional tug[cite: 207]:
* [cite_start]Weather or tidal conditions (e.g., Ice) [cite: 208]
* [cite_start]Congestion or difficult berths [cite: 209]
* [cite_start]Pilot recommendations [cite: 210]
* [cite_start]USCG mandated regulations (e.g., Kill Van Kull specific rules or Inoperable Bow Thrusters) [cite: 211]

[cite_start]In empirical validation, a third tug assisting the two primary docking tugs during the aforementioned 892-foot vessel's docking maneuver at St. George was dispatched due to these specific environmental, situational, or pilot-recommended factors, rather than a mandatory vessel size regulation[cite: 212]. [cite_start]When triggered, these supplemental assets are billed utilizing a 50% multiplier of the base docking or undocking rate per each additional tug[cite: 213].

---

## [cite_start]8. Empirical Validation: Invoice Reconciliation Case Studies [cite: 214]

[cite_start]The deterministic reliability of the mathematical algorithms defined in this report can be definitively proven by stress-testing them against actual historical invoices generated under a container shipping line contract[cite: 215]. [cite_start]Reconciling the theoretical framework against raw billing data exposes the absolute precision of the model[cite: 216].

### [cite_start]Case Study A: ULCV Transiting to Howland Hook [cite: 217]
[cite_start]On November 12, 2025, a specific ULCV arrived in port[cite: 218]. [cite_start]Featuring an LOA of 1,097 feet, it was heavily classified as a ULCV under the Deep Draft Advisory[cite: 219]. [cite_start]According to the regulatory mandates, a ULCV with a functional bow thruster bound for the Kill Van Kull requires three assigned tugboats[cite: 220]. [cite_start]The invoice documentation confirms exactly three tugs were deployed: Tug A, Tug B, and Tug C[cite: 221]. [cite_start]The billing structure executes flawlessly according to the logic framework[cite: 222]:
* [cite_start]**Base Docking:** For the 2025-2026 contract year, the base rate is $2,150[cite: 223]. [cite_start]This was billed flawlessly for Tug A and Tug B[cite: 224].
* [cite_start]**Absorbed Escort Runtimes:** Tug A and Tug B escorted the vessel from 05:05 to 06:10 (65 actual minutes)[cite: 225]. [cite_start]Because they immediately docked the vessel at Howland Hook, their return runtimes were absorbed[cite: 226]. [cite_start]65 minutes + one-way inbound runtime yielded exactly 2.50 billed hours each[cite: 227]. [cite_start]At the historical $1,890 hourly rate, the gross was $4,725[cite: 228]. [cite_start]Applying the 25% discount yielded a net escort cost of $3,543.75 per tug[cite: 229].
* [cite_start]**Unabsorbed Escort Anomaly:** Tug C was deployed solely to fulfill the three-tug ULCV mandate during transit and provided an "Escort Only" service from Constable Hook to Howland Hook[cite: 230]. [cite_start]Because it departed without docking, it absorbed the full spatial penalty[cite: 231]. [cite_start]Actual time (1 hr 25 mins) + Zone 10 inbound (1.0 hr) + Zone 11 outbound (1.5 hr) = 3 hrs 55 mins[cite: 232]. Pro-rated to the nearest half-hour, it billed an immense 4.00 hours. [cite_start]4.0 hours x $1,890 = $7,560 gross[cite: 233, 234]. [cite_start]With the 25% discount, the net escort was $5,670[cite: 234].
* **Fuel Surcharge:** Fuel was logged at $2.79/gal. [cite_start]The step function: `[(2.79 - 2.00)/0.10] = 8` increments[cite: 235, 236]. [cite_start]8 x 15 = $120 per tug[cite: 236, 237].
* [cite_start]**Total Validation:** Every line item reconciles flawlessly with the algorithmic predictions[cite: 238].

### [cite_start]Case Study B: SLCV Tethered Escort Execution [cite: 239]
[cite_start]A specific SLCV, boasting an enormous LOA exceeding 1,194 feet, triggers the most stringent Super Large Container Vessel (SLCV) mandates[cite: 240]. [cite_start]Operating on November 2, 2025, the invoice proves exactly four tugs were deployed for its undocking and escort maneuver[cite: 241].
* [cite_start]**Base and NRT Surcharges:** The base undocking rate was $2,150 across all four assets[cite: 242]. [cite_start]Crucially, because the vessel's NRT of 82,126 obliterates the 40,000 threshold, the rigid $1,400 Vessel Size Premium was ruthlessly applied to every single tug, instantly inflating the base OPEX by $5,600[cite: 243].
* [cite_start]**Tethered Escort Minimums:** One specific tug was designated to provide the highly stressful Tethered Escorting service[cite: 244]. [cite_start]The actual physical maneuver from Port Liberty Bayonne to Robbins Reef lasted a mere 20 chronological minutes (06:30 to 06:50)[cite: 245]. However, the algorithmic two-hour minimum rule superseded reality. [cite_start]The tug was billed for exactly 2.00 hours at the historical premium $3,145 tethered rate, grossing $6,290 before the 25% discount[cite: 246].
* [cite_start]**Standard Escort Minimums:** The remaining three tugs provided standard escorting and were similarly trapped by the 2.0-hour minimum rule, billing $1,890 x 2.0 hours = $3,780 gross each[cite: 247, 248].
* [cite_start]**Fuel Surcharge:** Fuel at $2.69/gal triggered 7 increments ($105/tug), validating the step function logic perfectly[cite: 249].

### [cite_start]Case Study C: Sub-Threshold Efficiency [cite: 250]
[cite_start]To prove the threshold boundaries, the model evaluates vessels falling below the 997-foot ULCV cutoff[cite: 251]. [cite_start]Two specific sub-threshold vessels (LOA 610 ft, NRT 11,119; and LOA 728 ft, NRT 15,033) both arrived at Howland Hook[cite: 252]. [cite_start]Because neither vessel met ULCV dimensions, the multi-tug transit escort mandates were not triggered[cite: 253]. [cite_start]The Deep Draft Advisory permitted standard operations, and invoices confirm exactly two standard tugs were deployed for each[cite: 254]. [cite_start]The $1,400 NRT premium was successfully bypassed on both invoices, as both vessels fell below 40,000 NRT[cite: 255]. [cite_start]Absolutely zero hourly escorting charges were billed, confirming the dimensional exemption[cite: 256]. [cite_start]The base rate of $2,150 applied uniformly[cite: 257]. The only variance was the fuel step function. [cite_start]The first vessel burned fuel at $2.47/gal (5 increments = $75/tug), while the second vessel faced a $3.05/gal spot price (11 increments = $165/tug)[cite: 258]. This isolates the fuel algorithm as the sole variable in sub-threshold standard operations.

---

## [cite_start]9. Algorithmic Architecture for Digital Cost Simulation [cite: 259]

[cite_start]Transitioning this vast array of contractual text, hydrodynamic mandates, and spatial billing logic into a functional computational tool requires a structured algorithmic pipeline[cite: 260]. [cite_start]The required inputs form a strict matrix: vessel physical specifications (LOA, Beam, NRT, Thruster status), operational parameters (Active Contract Year, Spot Fuel Price), and spatial maneuver details (Service Type, Destination Terminal, Elapsed Transit Times)[cite: 261]. [cite_start]To deliver these capabilities, the latest operational architecture is built upon a dynamic, four-panel interface framework designed for both automated forecasting and retrospective auditing[cite: 262].

[cite_start]**The Four-Panel Simulator Interface:** [cite: 263]
* [cite_start]**Panel 1: Baseline & Routing Constraints:** Users set the operational location using standardized UN/LOCODEs (e.g., USNYC01 for Bayonne, USNYC06 for APM Elizabeth)[cite: 264]. [cite_start]The model automatically outputs the corresponding geographical transit routes and sets the baseline spatial constraints[cite: 265].
* [cite_start]**Panel 2: Market Rates & Commodities:** This panel governs the contractual variables, anchoring the docking fee to the active multi-year rate schedule (e.g., $2,150 base in 2026) and ingesting the current market fuel price directly from the EIA NY Harbor ULSD index[cite: 266].
* [cite_start]**Panel 3: Financial Output (The Invoice):** The engine aggregates the inputs to generate the total simulated invoice[cite: 267]. [cite_start]It features a dynamic "Tug Breakdown Container" and distinct "Runtime Hints" that provide visual transparency into how the spatial transit times were absorbed or billed for each individual tug asset deployed[cite: 268].
* [cite_start]**Panel 4: Variable Overrides (Manual Adjustments):** Because real-world maritime environments are unpredictable, the architecture incorporates manual "steppers"[cite: 269]. [cite_start]Planners can manually adjust the count of "Escort + Docking" tugs versus "Escort Only" tugs[cite: 270]. [cite_start]This allows the model to instantly adapt to situational exigencies (e.g., inoperable bow thrusters or severe weather rules forcing additional deployments)[cite: 271].

[cite_start]**Advanced Feature: The Invoice Auditor (PDF Drag & Drop):** Moving beyond pure predictive forecasting, the latest iteration of the digital simulator incorporates a retrospective Invoice Auditor feature[cite: 272]. [cite_start]Utilizing client-side PDF parsing technology (via libraries like PDF.js), fleet operators can drag and drop raw towage invoices directly into the browser interface[cite: 273]. [cite_start]The system automatically extracts the billed line items (such as tug counts, running times, applied fuel rates, and NRT surcharges) and computationally compares them against the simulator’s deterministic baseline[cite: 274]. [cite_start]By displaying these extracted figures alongside a visual "Cost Component Range" legend—which highlights the mathematical Median Point and a ±7% acceptable sub-range—the system instantly flags any billing anomalies or calculation errors made by the towage provider, allowing operators to systematically recover overcharges[cite: 275].

### [cite_start]Automated Spatial Routing and Validation Matrix [cite: 276]

[cite_start]Since the user only knows the destination, the model does the heavy lifting[cite: 277]. [cite_start]To achieve this, the simulation is programmed to automate the selection of the runtime, the zone paths, and the absorbed anomaly based solely on the terminal selected[cite: 278]. [cite_start]The following Validation Matrix (Quick Check) provides the test parameters to ensure the model correctly outputs the expected policy, effective runtime, and minimum bill result based on the destination[cite: 279].

### [cite_start]Automated Fuel Feed Integration [cite: 280]

[cite_start]To remove the burden of manual research and ensure absolute accuracy, the simulation's operational architecture is designed to automatically feed from the EIA NY Harbor ULSD index[cite: 281]. [cite_start]This transparency identifies the exact fuel type and governing body, removing the guesswork of determining the correct commodity index to use for the model's spot price assumptions[cite: 282].

[cite_start]**User Interface and Integration Specifications:** [cite: 283]
* [cite_start]**Input Metric:** "Market Fuel Price (NY Harbor ULSD Index)" [cite: 284]
* [cite_start]**Default Baseline:** $4.73/gal (representing the late March 2026 reference spike)[cite: 285].
* [cite_start]**Transparency Badges:** The model should feature a "Live" indicator stating the source is the EIA NY Harbor Spot Price (Updated Weekly), alongside a direct link to the official EIA portal for user verification[cite: 286].
* [cite_start]**Contextual Tooltip:** A disclaimer clarifies: "Moran uses the NY Harbor No. 2 Diesel index. The surcharge applies to all physically dispatched tugs, regardless of whether they are performing escort or docking duties." [cite: 287]

[cite_start]**Algorithmic Step-Function Logic:** [cite: 288]
[cite_start]The internal logic asynchronously initializes the current market rate and applies a ceiling function[cite: 289]. [cite_start]The model calculates the increments by rounding UP for any fraction of $0.10, and the resulting fuel rate per tug applies to all physically dispatched tugs (i.e., maxPhysicalTugs)[cite: 290].
* [cite_start]**Initialization:** The system fetches or defaults to the current EIA market rate ($4.73)[cite: 291].
* [cite_start]**Surcharge per Tug Formula:** `Surcharge_tug = ceiling[max(0, Price_fuel - 2.00) / 0.10]` [cite: 292]
* [cite_start]**Total Surcharge Formula:** `TotalFuelSurcharge = maxPhysicalTugs x Surcharge_tug` [cite: 293]

[cite_start]By integrating this automated feed to accurately represent the EIA NY Harbor index and enforcing the round-up math logic, the simulation matches the "Fuel Surcharge" line item on an actual invoice with complete precision[cite: 294].

---

## [cite_start]10. Strategic Implications for Fleet Management and Deployment [cite: 295]

[cite_start]The capacity to execute high-fidelity, algorithmic cost simulation extends significantly beyond basic post-voyage accounting reconciliation; it is a critical mechanism for generating strategic leverage in both contract negotiations and real-time fleet deployments[cite: 296, 297]. [cite_start]By isolating the mathematically rigid, granular components of the towage invoice, a fleet operator can decisively optimize operational execution to minimize unavoidable OPEX[cite: 298].

[cite_start]For example, a profound understanding of the "absorbed runtime" spatial anomaly allows dispatchers to schedule harbor operations with clinical efficiency[cite: 299]. [cite_start]If an escort tug is mandated by the Deep Draft Advisory for a ULCV entering Port Jersey, ensuring that the dispatcher tasks the exact same tug to transition directly into the physical docking maneuver effectively deletes up to 1.5 hours of outbound zone runtimes from the final invoice[cite: 300]. [cite_start]Across a major shipping fleet conducting thousands of dense port calls annually, mitigating these non-productive, redundant geographic zone runtimes systematically yields millions of dollars in compound OPEX savings[cite: 301].

[cite_start]Furthermore, integrating this rigorous cost simulation capability into the broader macroeconomic "Omission vs. Speeding" strategic matrix fundamentally shifts how ETA deficits are managed[cite: 302]. [cite_start]If a vessel must aggressively speed across the Atlantic to recover a schedule, the algorithm can instantaneously predict whether the vessel's new arrival velocity will push it into a deteriorating tidal window that necessitates a costlier berthing protocol (e.g., requiring slack water and four tugs rather than three)[cite: 303]. [cite_start]If the recovered speeding maneuver unintentionally pushes the physical arrival into a recognized port holiday window, the simulation immediately highlights the brutal 35% cost penalty applied to the base rate[cite: 304]. [cite_start]This absolute transparency empowers the global fleet manager to weigh the true, hyper-localized financial cost of the recovered schedule directly against the immense savings of executing a strategic port omission[cite: 305].

[cite_start]The towage Cost of Sales for ultra-large container vessels is not an opaque, monolithic expense[cite: 306]. [cite_start]It is a highly dynamic financial output driven by inflexible physical hydrodynamic laws, static port geography, and multi-layered contractual arithmetic[cite: 307]. [cite_start]The Port of New York and New Jersey represents one of the most operationally demanding and heavily restricted environments globally, where vessel displacement dimensions automatically trigger cascading requirements for highly specialized, capital-intensive harbor assets[cite: 308]. [cite_start]By formalizing the Moran Towing schedule of rates into a deterministic, algorithmic model—meticulously incorporating the escalating base matrices, the rigid mathematical step-function of the fuel surcharge, and the unique, heavily pro-rated spatial algorithms governing zone runtimes—this analysis provides a perfectly transparent, data-driven mechanism for OPEX prediction[cite: 309]. [cite_start]The model's foundation serves as a critical operational tool, ensuring that the precise financial impact of every maneuver, delay, and environmental constraint can be instantaneously simulated, audited, and systematically optimized[cite: 310].

---

## [cite_start]Works Cited [cite: 311]

* [cite_start]Schedule of Rates, Terms and Conditions Effective: October 1, 2024 TOWAGE AGREEMENT Albany, New York - Moran Towing, accessed March 27, 2026, https://www.morantug.com/Customer-Content/www/ports-and-operations/Files/Moran_Albany_Schedule_of_Rates_Terms_and_Conditions_05_01_23.pdf [cite: 314]
* [cite_start]Schedule of Rates, Terms and Conditions Effective ... - Moran Towing, accessed March 27, 2026, https://www.morantug.com/Customer-Content/www/ports-and-operations/Files/Moran_New_York_Schedule_of_Rates_Terms_and_Conditions_October_1_2024.pdf [cite: 315]
* [cite_start]Schedule of Rates, Terms and Conditions - Moran Towing, accessed March 27, 2026, https://www.morantug.com/Customer-Content/www/ports-and-operations/Files/Moran_Charleston_Schedule_of_Rates_Terms_and_Conditions_07_15_23.pdf [cite: 316]