```mermaid
graph TD
    %% Define Styles
    classDef default fill:#f8fafc,stroke:#cbd5e1,stroke-width:1px,color:#94a3b8;
    classDef active fill:#fff7ed,stroke:#ea580c,stroke-width:3px,color:#7c2d12;
    
    %% Define Nodes and Classes
    Start(New Port Call)
    Q1{1. Vessel Class?}
    A2[Allocate 4 Tugs]
    Q2{2. Bow Thruster?}
    B1[Keep Baseline: 4 Tugs]
    BaseRate[Base Rate: $2,150]
    Q3{3. NRT?}
    C2["+$1,400 Premium / Tug"]
    Q4{4. Fuel Price?}
    D1[$0 Fuel Surcharge]
    Q5{5. Escort Req?}
    E2[Identify Zone Runtime]
    E3[Calculate Total Time]
    Q6{"6. Time < 2 Hrs?"}
    E4[Charge 2.0 Hr Min / tug]
    E6[Apply $1,000/hr Escort Rate]
    Q7{7. Exceptions?}
    F3[Standard Billing]
    End((Invoice: $22,200))

    %% Assign Active Class to Scenario B Path
    class Start,Q1,A2,Q2,B1,BaseRate,Q3,C2,Q4,D1,Q5,E2,E3,Q6,E4,E6,Q7,F3,End active;

    %% Connection Logic
    Start --> Q1
    Q1 -. "Standard (< 45k GRT)" .-> A1[Allocate 2 Tugs]
    Q1 -- "SLCV (> 120k GRT)" --> A2

    A1 -.-> Q2
    A2 --> Q2

    Q2 -- Yes --> B1
    Q2 -. No .-> B2[Add +1 Tug]

    B1 --> BaseRate
    B2 -.-> BaseRate
    
    BaseRate --> Q3

    Q3 -. "<= 40,000 NRT" .-> C1[$0 Premium]
    Q3 -- "> 40,000 NRT" --> C2

    C1 -.-> Q4
    C2 --> Q4

    Q4 -- "<= $2.00/gal" --> D1
    Q4 -. "> $2.00/gal" .-> D2[+Step Surcharge]

    D1 --> Q5
    D2 -.-> Q5

    Q5 -. No .-> E1[Base Docking Only]
    Q5 -- "Yes (SLCV)" --> E2
    
    E2 --> E3
    E3 --> Q6
    Q6 -- Yes --> E4
    Q6 -. No .-> E5[Pro-rate to nearest 0.5 Hr]
    
    E4 --> E6
    E5 -.-> E6

    E1 -.-> Q7
    E6 --> Q7

    Q7 -. "Holiday / Delays" .-> F1[Apply Penalties]
    Q7 -- Normal Ops --> F3

    F1 -.-> EndFinal((Final Invoice))
    F3 --> End