```mermaid
graph TD
    %% Define Styles
    classDef rule fill:#f8fafc,stroke:#94a3b8,stroke-width:2px,color:#0f172a,font-weight:bold;
    classDef pathA fill:#eff6ff,stroke:#3b82f6,stroke-width:2px,color:#1e3a8a;
    classDef pathB fill:#fff7ed,stroke:#ea580c,stroke-width:2px,color:#7c2d12;
    classDef endA fill:#2563eb,stroke:#1e3a8a,stroke-width:3px,color:#ffffff,font-weight:bold;
    classDef endB fill:#ea580c,stroke:#7c2d12,stroke-width:3px,color:#ffffff,font-weight:bold;

    %% 1. Define Nodes
    Start("<b>Cost Analysis Start</b><br>Port Liberty Target")
    Q1{"Rule 1: Vessel Class?<br><i>(Dictates Tug Allocation)</i>"}
    A1["<b>Scenario A</b><br>Allocate 2 Tugs"]
    B1["<b>Scenario B</b><br>Allocate 4 Tugs"]
    
    Q2{"Rule 2: Base Docking Rate<br><i>($2,150 per tug)</i>"}
    A2["2 Tugs × $2,150 = <b>$4,300</b>"]
    B2["4 Tugs × $2,150 = <b>$8,600</b>"]
    
    Q3{"Rule 3: NRT Premium?<br><i>(> 40,000 NRT = +$1,400/tug)</i>"}
    A3["<b>$0 Premium</b>"]
    B3["4 Tugs × $1,400 = <b>$5,600</b>"]
    
    Q4{"Rule 4: Escort Mandate?<br><i>(Required if ≥ 45k GRT)</i>"}
    A4["<b>$0 Escort Fees</b>"]
    B4["Apply Escort Logic<br><i>(Triggers Hourly Rate)</i>"]
    
    Q5{"Rule 5: Escort Minimums<br><i>($1,000/hr, 2-Hr Min.)</i>"}
    B5["4 Tugs × 2.0h × $1,000<br>= <b>$8,000</b>"]
    
    EndA(("<b>Scenario A Total</b><br>$4,300"))
    EndB(("<b>Scenario B Total</b><br>$22,200"))

    %% 2. Connection Logic
    Start --> Q1
    
    Q1 -- "Scenario A<br>(Standard: < 45k GRT)" --> A1
    Q1 -- "Scenario B<br>(SLCV: > 120k GRT)" --> B1

    A1 --> Q2
    B1 --> Q2
    
    Q2 -. "Applies to 2 Tugs" .-> A2
    Q2 -. "Applies to 4 Tugs" .-> B2

    A2 --> Q3
    B2 --> Q3
    
    Q3 -- "Scenario A<br>(<= 40,000 NRT)" --> A3
    Q3 -- "Scenario B<br>(> 40,000 NRT)" --> B3

    A3 --> Q4
    B3 --> Q4
    
    Q4 -- "Scenario A<br>(Exempt)" --> A4
    Q4 -- "Scenario B<br>(Mandatory)" --> B4

    B4 --> Q5
    Q5 -. "Applies to 4 Tugs" .-> B5

    A4 --> EndA
    B5 --> EndB

    %% 3. Assign Classes (Colors and Formatting)
    class Start,Q1,Q2,Q3,Q4,Q5 rule;
    class A1,A2,A3,A4 pathA;
    class B1,B2,B3,B4,B5 pathB;
    class EndA endA;
    class EndB endB;
