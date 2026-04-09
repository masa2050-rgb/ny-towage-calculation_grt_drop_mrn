```mermaid
graph TD
    %% Phase 1: Asset Allocation
    Start(New Port Call) --> Q1{1. Vessel Classification?}
    Q1 -- Standard (< 45k GRT) --> A1[Allocate 2 Tugs]
    Q1 -- ULCV (45k - 120k GRT) --> A2[Allocate 3 Tugs]
    Q1 -- SLCV (> 120k GRT) --> A3[Allocate 4 Tugs]

    A1 --> Q2
    A2 --> Q2
    A3 --> Q2

    Q2{2. Working Bow Thruster?}
    Q2 -- Yes --> B1[Keep Baseline Allocation]
    Q2 -- No --> B2[Add +1 Safety Tug]

    %% Phase 2 & 3: Fixed Costs & Surcharges
    B1 --> Q3
    B2 --> Q3

    Q3{3. Net Registered Tonnage?}
    Q3 -- <= 40,000 NRT --> C1[$0 Premium]
    Q3 -- > 40,000 NRT --> C2[+$1,400 Premium per Tug]

    C1 --> Q4
    C2 --> Q4

    Q4{4. Market Fuel Price?}
    Q4 -- <= $2.00/gal --> D1[$0 Fuel Surcharge]
    Q4 -- > $2.00/gal --> D2[+$15 per $0.10 increment per Tug]

    %% Phase 4: Spatial & Escort Logic
    D1 --> Q5
    D2 --> Q5

    Q5{5. Escort Service Required?}
    Q5 -- No (Standard Vessels) --> E1[Base Docking Fee Only]
    Q5 -- Yes (ULCV / SLCV) --> Q6{6. Dual Service or Escort Only?}

    Q6 -- Dual Service (Escort + Dock) --> E2[Waive Return Runtime]
    Q6 -- Escort Only (Departs after) --> E3[Charge Full Round-Trip Runtime]

    E2 --> Q7
    E3 --> Q7

    Q7{7. Total Escort Time < 2 Hrs?}
    Q7 -- Yes --> E4[Charge 2.0 Hr Minimum per tug]
    Q7 -- No --> E5[Pro-rate to nearest 0.5 Hr per tug]

    %% Phase 5: Penalties & Final
    E1 --> Q8
    E4 --> Q8
    E5 --> Q8

    Q8{8. Situational Exceptions?}
    Q8 -- Holiday --> F1[+35% Base Premium]
    Q8 -- Delays > 30 Mins --> F2[$1,750/hr Detention Fee]
    Q8 -- Normal Operations --> F3[Standard Billing]

    F1 --> End((Final Invoice Generated))
    F2 --> End
    F3 --> End