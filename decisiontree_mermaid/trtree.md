```mermaid
graph TD
    %% Define Styles
    classDef default fill:#f8fafc,stroke:#cbd5e1,stroke-width:1px,color:#94a3b8;
    classDef active fill:#eff6ff,stroke:#3b82f6,stroke-width:3px,color:#1e3a8a;
    
    %% Define Nodes and Classes
    Start(New Port Call)
    Q1{1. Vessel Class?}
    A1[Allocate 2 Tugs]
    Q2{2. Bow Thruster?}
    B1[Keep Baseline: 2 Tugs]
    BaseRate[Base Rate: $2,150]
    Q3{3. NRT?}
    C1[$0 Premium]
    Q4{4. Fuel Price?}
    D1[$0 Fuel Surcharge]
    Q5{5. Escort Req?}
    E1[Base Docking Only]
    Q7{7. Exceptions?}
    F3[Standard Billing]
    End((Invoice: $4,300))

    class Start,Q1,A1,Q2,B1,BaseRate,Q3,C1,Q4,D1,Q5,E1,Q7,F3,End active;

    %% Connection Logic
    Start --> Q1
    Q1 -- "Standard (< 45k GRT)" --> A1
    Q1 -. "ULCV / SLCV" .-> A2[Allocate 3-4 Tugs]

    A1 --> Q2
    A2 -.-> Q2

    Q2 -- Yes --> B1
    Q2 -. No .-> B2[Add +1 Tug]

    B1 --> BaseRate
    B2 -.-> BaseRate
    
    BaseRate --> Q3

    Q3 -- "<= 40,000 NRT" --> C1
    Q3 -. "> 40,000 NRT" .-> C2[+$1,400 Premium]

    C1 --> Q4
    C2 -.-> Q4

    Q4 -- "<= $2.00/gal" --> D1
    Q4 -. "> $2.00/gal" .-> D2[+Step Surcharge]

    D1 --> Q5
    D2 -.-> Q5

    Q5 -- No (Standard) --> E1
    Q5 -. Yes (ULCV/SLCV) .-> E2[Escort Logic Branch]
    
    E1 --> Q7
    E2 -.-> Q7

    Q7 -. "Holiday / Delays" .-> F1[Apply Penalties]
    Q7 -- Normal Ops --> F3

    F1 -.-> EndFinal((Final Invoice))
    F3 --> End