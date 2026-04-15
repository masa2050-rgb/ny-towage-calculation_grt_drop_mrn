// ==========================================
// 1. RATES & REGIONS CONFIGURATION
// ==========================================
const regionalRates = {
    nynj: { docking: 2150, escort: 1000 },
    norfolk: { docking: 2150, escort: 1000 },
    charleston: { docking: 2150, escort: 0 },
    savannah: { docking: 2050, escort: 0 },
    miami: { docking: 3100, thirdTug: 4600, escort: 0 },
    neworleans: { docking: 1800, escort: 0 }
};

// ==========================================
// 2. TERMINALS CONFIGURATION
// ==========================================
const terminalsByRegion = {
    charleston: [
        { value: 'none', text: 'Select Terminal...' },
        { value: 'USCHS01', text: 'WANDO WELCH TERMINAL (USCHS01)' }
    ],
    miami: [
        { value: 'none', text: 'Select Terminal...' },
        { value: 'USMIA02', text: 'APM TERMINALS MIAMI (USMIA02)' }
    ],
    neworleans: [
        { value: 'none', text: 'Select Terminal...' },
        { value: 'USMSY01', text: 'NAPOLEON AVENUE TERMINAL (USMSY01)' }
    ],
    nynj: [
        { value: 'none', text: 'Select Terminal...' },
        { value: 'bayonne', text: 'PORT LIBERTY BAYONNE (USNYC01)' },
        { value: 'newyork', text: 'PORT LIBERTY NEW YORK (USNYC02)' },
        { value: 'elizabeth', text: 'APM TERMINALS NEWARK (USNYC06)' }
    ],
    norfolk: [
        { value: 'none', text: 'Select Terminal...' },
        { value: 'USORF01', text: 'NORFOLK INTERNATION TERMINAL (USORF01)' },
        { value: 'USORF03', text: 'VIRGINIA INTERNATIONAL GATEWAY (USORF03)' }
    ],
    savannah: [
        { value: 'none', text: 'Select Terminal...' },
        { value: 'USSAV01', text: 'GARDEN CITY TERMINAL (USSAV01)' }
    ]
};

function handleRegionChange() {
    const regionKey = document.getElementById('region').value;
    const rates = regionalRates[regionKey];
    
    document.getElementById('yearRate').value = rates.docking;
    document.getElementById('escortRate').value = rates.escort;
    
    const destSelect = document.getElementById('destination');
    const terminalGroup = destSelect.closest('.input-group');
    
    const isSavannah = (regionKey === 'savannah');
    if (document.getElementById('teu-group')) document.getElementById('teu-group').style.display = isSavannah ? 'block' : 'none';
    if (document.getElementById('beam-group')) document.getElementById('beam-group').style.display = isSavannah ? 'block' : 'none';
    if (document.getElementById('loa-group')) document.getElementById('loa-group').style.display = isSavannah ? 'block' : 'none';
    if (document.getElementById('draft-group')) document.getElementById('draft-group').style.display = isSavannah ? 'block' : 'none';
    if (document.getElementById('savannah-restrictions')) document.getElementById('savannah-restrictions').style.display = isSavannah ? 'block' : 'none';
    
    if (regionKey === 'nynj' || regionKey === 'norfolk' || regionKey === 'charleston' || regionKey === 'savannah' || regionKey === 'miami' || regionKey === 'neworleans') {
        const terminals = terminalsByRegion[regionKey] || [];
        destSelect.innerHTML = '';
        terminals.forEach(t => {
            const opt = document.createElement('option');
            opt.value = t.value;
            opt.textContent = t.text;
            destSelect.appendChild(opt);
        });
        terminalGroup.style.display = 'block';
        
        if (regionKey === 'nynj') destSelect.value = 'bayonne';
        else if (regionKey === 'norfolk') destSelect.value = 'none';
        else if (regionKey === 'charleston') destSelect.value = 'USCHS01';
        else if (regionKey === 'miami') destSelect.value = 'USMIA02';
        else if (regionKey === 'neworleans') destSelect.value = 'USMSY01';
        else if (regionKey === 'savannah') destSelect.value = 'USSAV01';
    } else {
        terminalGroup.style.display = 'none';
        destSelect.innerHTML = '<option value="none" selected>Not Applicable</option>';
        destSelect.value = 'none';
    }
    
    handleRoutingChange(true); 
}

const formatMoney = (amount) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
const CURRENT_MARKET_FUEL = 4.73;

const destinationRules = {
    bayonne: { runtime: 2.50, zones: '8 & 9', isKVK: false, defaultPolicy: 'waive_both', route: 'Newark Bay → Bayonne' },
    newyork: { runtime: 2.50, zones: '10 & 11', isKVK: true, defaultPolicy: 'standard', route: 'The Narrows → Kill Van Kull' },
    elizabeth: { runtime: 2.50, zones: '10 & 11', isKVK: true, defaultPolicy: 'waive', route: 'The Narrows → Kill Van Kull' },
    redhook: { runtime: 2.50, zones: '9 & 1/2', isKVK: false, defaultPolicy: 'waive', route: 'Upper New York Bay → Red Hook' },
    USORF01: { runtime: 0.0, zones: 'N/A', isKVK: false, defaultPolicy: 'waive', route: 'Norfolk International Terminal' },
    USORF03: { runtime: 0.0, zones: 'N/A', isKVK: false, defaultPolicy: 'waive', route: 'Virginia International Gateway' },
    USCHS01: { runtime: 0.0, zones: 'N/A', isKVK: false, defaultPolicy: 'waive', route: 'Wando Welch Terminal' },
    USMIA02: { runtime: 0.0, zones: 'N/A', isKVK: false, defaultPolicy: 'waive', route: 'APM Terminals Miami' },
    USMSY01: { runtime: 0.0, zones: 'N/A', isKVK: false, defaultPolicy: 'waive', route: 'Napoleon Avenue Terminal' },
    USSAV01: { runtime: 0.0, zones: 'N/A', isKVK: false, defaultPolicy: 'waive', route: 'Garden City Terminal' },
    none: { runtime: 0.0, zones: 'N/A', isKVK: false, defaultPolicy: 'waive', route: 'N/A' }
};

function getCurrentFuelPrice() {
    return CURRENT_MARKET_FUEL;
}

window.extractedInvoiceMetrics = null;

function getBaseState(vClass) {
    const regionKey = document.getElementById('region') ? document.getElementById('region').value : 'nynj';
    const destValue = document.getElementById('destination').value;
    const direction = document.getElementById('direction').value;
    const routeEntry = destinationRules[destValue] || destinationRules.none;
    const destinationRuntime = routeEntry.runtime;
    const runtimePolicy = routeEntry.defaultPolicy;
    const isKVK = routeEntry.isKVK;
    const finalEscortRate = parseFloat(document.getElementById('escortRate').value);

    let simActualTime = destValue === 'bayonne' ? 0.5 : 1.0;
    let simActualTimeOnly = simActualTime;
    let simRuntimeDual = destinationRuntime;
    
    if ((direction === 'inbound' && runtimePolicy === 'waive') || runtimePolicy === 'waive_both') {
        simRuntimeDual = destinationRuntime / 2;
    }
    let simRuntimeOnly = destinationRuntime; 

    let baseDocking = 2;
    let baseEscort = 0;

    if (regionKey === 'savannah') {
        const beam = parseFloat(document.getElementById('beam')?.value || 142);
        const teu = parseFloat(document.getElementById('teu')?.value || 10000);
        const loa = parseFloat(document.getElementById('loa')?.value || 900);
        
        if (beam <= 142) {
            baseEscort = 0;
        } else if (beam > 168) {
            baseEscort = 3;
        } else if (beam > 151 && beam <= 168 && teu >= 11000) {
            if (beam < 158 || loa < 1000) {
                baseEscort = 1;
            } else {
                baseEscort = 2;
            }
        } else if (beam > 142 && beam <= 158 && teu < 11000) {
            baseEscort = 1;
        } else {
            baseEscort = 1; 
        }
        
        baseDocking = Math.max(2, baseEscort); 
    } else {
        let baseIdeal = 2;
        if (vClass === 'SLCV/MLCV') baseIdeal = 4;
        else if (vClass === 'ULCV') baseIdeal = 3;

        baseDocking = baseIdeal;
        baseEscort = (vClass === 'Standard') ? 0 : baseDocking;
        if (isKVK && vClass !== 'Standard') baseDocking = baseEscort - 1;
    }

    if (finalEscortRate === 0) baseEscort = 0;

    let dualCount = Math.min(baseDocking, baseEscort);
    let escortOnlyCount = Math.max(0, baseEscort - dualCount);
    let dockingOnlyCount = Math.max(0, baseDocking - dualCount);

    return {
        dockingOnly: dockingOnlyCount,
        escortDocking: dualCount,
        escortOnly: escortOnlyCount,
        actualTime: dualCount > 0 ? simActualTime : 0,
        runtimeDual: dualCount > 0 ? simRuntimeDual : 0,
        actualTimeOnly: escortOnlyCount > 0 ? simActualTimeOnly : 0,
        runtimeOnly: escortOnlyCount > 0 ? simRuntimeOnly : 0
    };
}

function calcTotalFromState(state) {
    const yearRate = parseFloat(document.getElementById('yearRate').value);
    const nrt = parseFloat(document.getElementById('nrt').value);
    const fuelPrice = parseFloat(document.getElementById('fuel').value);
    const finalEscortRate = parseFloat(document.getElementById('escortRate').value);

    let totalTugs = state.dockingOnly + state.escortDocking + state.escortOnly;
    let dockingServices = state.dockingOnly + state.escortDocking;
    
    const regionKey = document.getElementById('region') ? document.getElementById('region').value : 'nynj';
    let simBaseCost = 0;

    if (regionKey === 'miami') {
        if (dockingServices <= 2) {
            simBaseCost = dockingServices * yearRate;
        } else {
            simBaseCost = (2 * yearRate) + ((dockingServices - 2) * regionalRates.miami.thirdTug);
        }
    } else {
        simBaseCost = dockingServices * yearRate;
    }
    let simSizeCost = nrt > 40000 ? (dockingServices * 1400) : 0;
    
    let simFuelCost = 0;
    if (fuelPrice > 2.00) {
        const inc = Math.ceil(Math.round((fuelPrice - 2.00) * 100) / 10);
        simFuelCost = totalTugs * (inc * 15);
    }

    let simBilledDual = Math.max(2.0, Math.round((state.actualTime + state.runtimeDual) * 2) / 2);
    let simBilledOnly = Math.max(2.0, Math.round((state.actualTimeOnly + state.runtimeOnly) * 2) / 2);

    let simEscortCost = 0;
    let escortDiscount = (regionKey !== 'nynj') ? 0.75 : 1.0;

    if (state.escortDocking > 0) simEscortCost += state.escortDocking * simBilledDual * finalEscortRate * escortDiscount;
    if (state.escortOnly > 0) simEscortCost += state.escortOnly * simBilledOnly * finalEscortRate * escortDiscount;

    return simBaseCost + simSizeCost + simFuelCost + simEscortCost;
}

function getRangeBoundaries(vClass) {
    let medState = getBaseState(vClass);
    medState.total = calcTotalFromState(medState);

    let minState = { ...medState };
    let maxState = { ...medState };

    let rSteps = 1;
    if (minState.escortDocking > 0) { let d = Math.min(minState.escortDocking, rSteps); minState.escortDocking -= d; rSteps -= d; }
    if (rSteps > 0 && minState.dockingOnly > 0) { let d = Math.min(minState.dockingOnly, rSteps); minState.dockingOnly -= d; rSteps -= d; }
    if (rSteps > 0 && minState.escortOnly > 0) { let d = Math.min(minState.escortOnly, rSteps); minState.escortOnly -= d; rSteps -= d; }
    
    if (minState.actualTime > 0) minState.actualTime = Math.max(0, minState.actualTime - 0.25);
    if (minState.actualTimeOnly > 0) minState.actualTimeOnly = Math.max(0, minState.actualTimeOnly - 0.25);

    maxState.dockingOnly += 1; 
    if (maxState.actualTime > 0) maxState.actualTime += 0.25;
    if (maxState.actualTimeOnly > 0) maxState.actualTimeOnly += 0.25;

    minState.total = calcTotalFromState(minState);
    maxState.total = calcTotalFromState(maxState);

    return { minState, medState, maxState };
}

// --- CORE UI LOGIC ---
function handleRoutingChange(isDestinationChange = false, sourceId = null) {
    if (isDestinationChange && sourceId) {
        const val = document.getElementById(sourceId).value;
        if (document.getElementById('destination')) document.getElementById('destination').value = val;
    }

    const destValue = document.getElementById('destination').value;
    const direction = document.getElementById('direction').value;
    const routeEntry = destinationRules[destValue] || destinationRules.none;

    if (isDestinationChange) {
        let defaultTime = 0.75;
        if (destValue === 'elizabeth' || destValue === 'newyork') defaultTime = 1.0;
        else if (destValue === 'bayonne') defaultTime = 0.5;
        
        if (document.getElementById('adjTime')) document.getElementById('adjTime').value = defaultTime;
        if (document.getElementById('adjTimeOnly')) document.getElementById('adjTimeOnly').value = defaultTime;
    }

    const destinationRuntime = routeEntry.runtime;
    const runtimePolicy = routeEntry.defaultPolicy;

    let effectiveRuntimeDual = destinationRuntime;
    let effectiveRuntimeOnly = destinationRuntime;

    if ((direction === 'inbound' && runtimePolicy === 'waive') || runtimePolicy === 'waive_both') {
        effectiveRuntimeDual = destinationRuntime / 2;
    }

    if (document.getElementById('adjRuntime')) document.getElementById('adjRuntime').value = effectiveRuntimeDual;
    if (document.getElementById('adjRuntimeOnly')) document.getElementById('adjRuntimeOnly').value = effectiveRuntimeOnly;

    updateModel();
}

function updateModel() {
    const regionKey = document.getElementById('region') ? document.getElementById('region').value : 'nynj';
    const grt = parseFloat(document.getElementById('grt').value);
    const nrt = parseFloat(document.getElementById('nrt').value);
    const yearRate = parseFloat(document.getElementById('yearRate').value);
    const fuelPrice = parseFloat(document.getElementById('fuel').value);
    const direction = document.getElementById('direction').value;
    const destValue = document.getElementById('destination').value;
    
    const routeEntry = destinationRules[destValue] || destinationRules.none;
    const destinationRuntime = routeEntry.runtime;
    const isKVK = routeEntry.isKVK;
    let runtimePolicy = routeEntry.defaultPolicy;

    let displayRoute = routeEntry.route;
    if (direction === 'outbound' && displayRoute.includes('→')) {
        displayRoute = displayRoute.split(' → ').reverse().join(' → ');
    }
    document.getElementById('routeDetail').innerText = `Path: ${displayRoute} (Zones ${routeEntry.zones})`;

    let finalEscortRate = parseFloat(document.getElementById('escortRate').value);

    let actualTime = parseFloat(document.getElementById('adjTime').value) || 0;
    let actualTimeOnly = parseFloat(document.getElementById('adjTimeOnly')?.value) || 0;
    let effectiveRuntimeDual = parseFloat(document.getElementById('adjRuntime')?.value) || 0;
    let effectiveRuntimeOnly = parseFloat(document.getElementById('adjRuntimeOnly')?.value) || 0;

    document.getElementById('grt-val').innerText = grt.toLocaleString();
    document.getElementById('nrt-val').innerText = nrt.toLocaleString();
    document.getElementById('fuel-val').innerText = '$' + fuelPrice.toFixed(2);
    document.getElementById('year-rate-val').innerText = '$' + yearRate.toLocaleString();
    document.getElementById('escort-rate-val').innerText = formatMoney(finalEscortRate) + '/hr';

    const teu = parseFloat(document.getElementById('teu')?.value || 11000);
    const beam = parseFloat(document.getElementById('beam')?.value || 158);
    const loa = parseFloat(document.getElementById('loa')?.value || 1000);
    const draft = parseFloat(document.getElementById('draft')?.value || 42.0);

    if (document.getElementById('teu-val')) document.getElementById('teu-val').innerText = teu.toLocaleString();
    if (document.getElementById('beam-val')) document.getElementById('beam-val').innerText = beam + "'";
    if (document.getElementById('loa-val')) document.getElementById('loa-val').innerText = loa + "'";
    if (document.getElementById('draft-val')) document.getElementById('draft-val').innerText = draft.toFixed(1) + "'";

    if (regionKey === 'savannah') {
        const draftRuleEl = document.getElementById('sav-draft-rule');
        const windRuleEl = document.getElementById('sav-wind-rule');
        
        if (teu >= 11000) {
            draftRuleEl.innerHTML = "<strong>Draft Window:</strong> Flood Current Only (Due to 11,000+ TEU ULCV rule).";
        } else if (draft <= 40) {
            draftRuleEl.innerHTML = "<strong>Draft Window:</strong> Anytime movement (offset by negative tide predictions).";
        } else if (draft > 40 && draft <= 42.3) {
            draftRuleEl.innerHTML = "<strong>Draft Window:</strong> Flood Current Only (30 mins after low water to 2 hours before high water).";
        } else {
            draftRuleEl.innerHTML = "<strong>Draft Window:</strong> Governed dynamically by DUKC software (Requires 10-15% UKC).";
        }

        if (teu >= 11000) {
            windRuleEl.innerHTML = "<strong>Wind Limit:</strong> Max 25 knots at channel entrance, 15 knots near container berths.";
        } else {
            windRuleEl.innerHTML = "<strong>Wind Limit:</strong> Standard port conditions apply.";
        }
    }

    if (document.getElementById('adjTime-display')) document.getElementById('adjTime-display').innerText = actualTime.toFixed(2);
    if (document.getElementById('adjTimeOnly-display')) document.getElementById('adjTimeOnly-display').innerText = actualTimeOnly.toFixed(2);
    if (document.getElementById('adjRuntime-display')) document.getElementById('adjRuntime-display').innerText = effectiveRuntimeDual.toFixed(2);
    if (document.getElementById('adjRuntimeOnly-display')) document.getElementById('adjRuntimeOnly-display').innerText = effectiveRuntimeOnly.toFixed(2);

    let vClass = "Standard";
    let baseIdealServices = 2;

    if (grt >= 120000) {
        vClass = "SLCV/MLCV";
        baseIdealServices = 4;
    } else if (grt >= 45000) {
        vClass = "ULCV";
        baseIdealServices = 3;
    }

    let baseDocking = Math.min(5, baseIdealServices);
    let baseEscort = (vClass === "Standard") ? 0 : baseDocking;

    if (isKVK && vClass !== "Standard") baseDocking = baseEscort - 1;
    if (finalEscortRate === 0) baseEscort = 0;

    if (regionKey === 'savannah') {
        const state = getBaseState(vClass);
        baseDualService = state.escortDocking;
        baseEscortOnly = state.escortOnly;
        baseDockingOnly = state.dockingOnly;
    } else {
        var baseDualService = Math.min(baseDocking, baseEscort);
        var baseEscortOnly = Math.max(0, baseEscort - baseDualService);
        var baseDockingOnly = Math.max(0, baseDocking - baseDualService);
    }

    let adjDocking = parseInt(document.getElementById('adjDocking').value) || 0;
    let adjEscortDock = parseInt(document.getElementById('adjEscortDock').value) || 0;
    let adjEscortOnly = parseInt(document.getElementById('adjEscortOnly').value) || 0;

    let dockingOnlyCount = Math.max(0, baseDockingOnly + adjDocking);
    if (baseDockingOnly + adjDocking < 0) { document.getElementById('adjDocking').value = -baseDockingOnly; document.getElementById('adjDocking-display').innerText = -baseDockingOnly; }
    
    let dualServiceCount = Math.max(0, baseDualService + adjEscortDock);
    if (baseDualService + adjEscortDock < 0) { document.getElementById('adjEscortDock').value = -baseDualService; document.getElementById('adjEscortDock-display').innerText = -baseDualService; }
    
    let escortOnlyCount = Math.max(0, baseEscortOnly + adjEscortOnly);
    if (baseEscortOnly + adjEscortOnly < 0) { document.getElementById('adjEscortOnly').value = -baseEscortOnly; document.getElementById('adjEscortOnly-display').innerText = -baseEscortOnly; }

    let maxPhysicalTugs = dockingOnlyCount + dualServiceCount + escortOnlyCount;
    if (maxPhysicalTugs > 5) {
        let overflow = maxPhysicalTugs - 5;
        if (adjEscortOnly > 0 && overflow > 0) {
            let reduction = Math.min(adjEscortOnly, overflow);
            adjEscortOnly -= reduction; escortOnlyCount -= reduction; overflow -= reduction;
            document.getElementById('adjEscortOnly').value = adjEscortOnly;
            document.getElementById('adjEscortOnly-display').innerText = adjEscortOnly;
        }
        if (adjEscortDock > 0 && overflow > 0) {
            let reduction = Math.min(adjEscortDock, overflow);
            adjEscortDock -= reduction; dualServiceCount -= reduction; overflow -= reduction;
            document.getElementById('adjEscortDock').value = adjEscortDock;
            document.getElementById('adjEscortDock-display').innerText = adjEscortDock;
        }
        if (adjDocking > 0 && overflow > 0) {
            let reduction = Math.min(adjDocking, overflow);
            adjDocking -= reduction; dockingOnlyCount -= reduction; overflow -= reduction;
            document.getElementById('adjDocking').value = adjDocking;
            document.getElementById('adjDocking-display').innerText = adjDocking;
        }
        maxPhysicalTugs = 5;
    }

    let dockingServices = dualServiceCount + dockingOnlyCount;
    let baseCost = 0;

    if (regionKey === 'miami') {
        if (dockingServices <= 2) {
            baseCost = dockingServices * yearRate;
        } else {
            baseCost = (2 * yearRate) + ((dockingServices - 2) * regionalRates.miami.thirdTug);
        }
    } else {
        baseCost = dockingServices * yearRate;
    }

    const sizeCostPerTug = nrt > 40000 ? 1400 : 0;
    const sizeCost = dockingServices * sizeCostPerTug;

    let fuelCost = 0;
    let fuelRatePerTug = 0;
    if (fuelPrice > 2.00) {
        const increments = Math.ceil(Math.round((fuelPrice - 2.00) * 100) / 10);
        fuelRatePerTug = increments * 15;
        fuelCost = maxPhysicalTugs * fuelRatePerTug;
    }

    let escortCost = 0;
    let escortDiscount = (regionKey !== 'nynj') ? 0.75 : 1.0;
    
    let rawTimeDual = actualTime + effectiveRuntimeDual;
    let billedTimeDual = Math.max(2.0, Math.round(rawTimeDual * 2) / 2);
    let escortDualCostPerTug = billedTimeDual * finalEscortRate * escortDiscount;

    let rawTimeOnly = actualTimeOnly + effectiveRuntimeOnly;
    let billedTimeOnly = Math.max(2.0, Math.round(rawTimeOnly * 2) / 2);
    let escortOnlyCostPerTug = billedTimeOnly * finalEscortRate * escortDiscount;

    if (dualServiceCount > 0) escortCost += dualServiceCount * escortDualCostPerTug;
    if (escortOnlyCount > 0) escortCost += escortOnlyCount * escortOnlyCostPerTug;

    const runtimeHintEl = document.getElementById('runtimeHint');
    if (runtimeHintEl) {
        if (destinationRuntime === 0) {
            runtimeHintEl.innerText = '';
        } else if (runtimePolicy === 'waive_both') {
            if (dualServiceCount > 0 && escortOnlyCount > 0) {
                runtimeHintEl.innerText = `Runtime waived for ${dualServiceCount} Escort+Docking tugs. Full runtime billed for ${escortOnlyCount} Escort Only tugs.`;
                runtimeHintEl.style.color = 'var(--accent-light)';
            } else if (escortOnlyCount > 0) {
                runtimeHintEl.innerText = 'Full runtime billed: Escort Only tugs do not receive docking waivers.';
                runtimeHintEl.style.color = 'var(--warning)';
            } else if (dualServiceCount > 0) {
                runtimeHintEl.innerText = 'Runtime waived for Escort+Docking tugs (Inbound/Outbound).';
                runtimeHintEl.style.color = 'var(--success)';
            } else {
                runtimeHintEl.innerText = '';
            }
        } else if (direction === 'outbound') {
            runtimeHintEl.innerText = 'Runtime not waived: Escort service occurs after undocking.';
            runtimeHintEl.style.color = 'var(--warning)';
        } else if (runtimePolicy === 'waive') {
            if (dualServiceCount > 0 && escortOnlyCount > 0) {
                runtimeHintEl.innerText = `Runtime waived for ${dualServiceCount} Escort+Docking tugs. Full runtime billed for ${escortOnlyCount} Escort Only tugs.`;
                runtimeHintEl.style.color = 'var(--accent-light)';
            } else if (escortOnlyCount > 0) {
                runtimeHintEl.innerText = 'Full runtime billed: Escort Only tugs do not receive docking waivers.';
                runtimeHintEl.style.color = 'var(--warning)';
            } else if (dualServiceCount > 0) {
                runtimeHintEl.innerText = 'Runtime waived because escort tugs transitioned to docking.';
                runtimeHintEl.style.color = 'var(--success)';
            } else {
                runtimeHintEl.innerText = '';
            }
        } else {
            runtimeHintEl.innerText = '';
        }
    }

    const total = baseCost + sizeCost + fuelCost + escortCost;
    if (document.getElementById('totalCost')) document.getElementById('totalCost').innerText = formatMoney(total);

    let tugBreakdownHTML = '';
    let tugs = [];
    let currentDockingTugCount = 0; 
    let discountText = escortDiscount < 1.0 ? ' (-25%)' : '';
    
    for(let i=0; i<dualServiceCount; i++) {
        currentDockingTugCount++;
        let currentDockingRate = (regionKey === 'miami' && currentDockingTugCount > 2) ? regionalRates.miami.thirdTug : yearRate;
        
        tugs.push({
            type: 'Escort + Docking', 
            dockingCost: currentDockingRate, dockingUnit: '1 Unit',
            nrtCost: sizeCostPerTug, nrtUnit: sizeCostPerTug > 0 ? '1 Unit' : '0 Units',
            fuelCost: fuelRatePerTug, fuelUnit: fuelRatePerTug > 0 ? '1 Unit' : '0 Units',
            escortCost: escortDualCostPerTug, escortUnit: billedTimeDual.toFixed(1) + ' hrs' + discountText
        });
    }
    
    for(let i=0; i<dockingOnlyCount; i++) {
        currentDockingTugCount++;
        let currentDockingRate = (regionKey === 'miami' && currentDockingTugCount > 2) ? regionalRates.miami.thirdTug : yearRate;

        tugs.push({
            type: 'Docking Only', 
            dockingCost: currentDockingRate, dockingUnit: '1 Unit',
            nrtCost: sizeCostPerTug, nrtUnit: sizeCostPerTug > 0 ? '1 Unit' : '0 Units',
            fuelCost: fuelRatePerTug, fuelUnit: fuelRatePerTug > 0 ? '1 Unit' : '0 Units',
            escortCost: 0, escortUnit: '0.0 hrs'
        });
    }
    
    for(let i=0; i<escortOnlyCount; i++) {
        tugs.push({
            type: 'Escort Only', 
            dockingCost: 0, dockingUnit: '0 Units',
            nrtCost: 0, nrtUnit: '0 Units',
            fuelCost: fuelRatePerTug, fuelUnit: fuelRatePerTug > 0 ? '1 Unit' : '0 Units',
            escortCost: escortOnlyCostPerTug, escortUnit: billedTimeOnly.toFixed(1) + ' hrs' + discountText
        });
    }
    
    if (tugs.length === 0) {
        tugBreakdownHTML += '<div style="font-size: 0.8rem; color: #666;">No tugs dispatched.</div>';
    } else {
        tugs.forEach((tug, index) => {
            tugBreakdownHTML += `
            <div style="margin-top: 0.75rem; background: #fdfdfd; padding: 0.6rem 0.75rem; border-radius: 6px; border: 1px solid #e8e4db; box-shadow: 0 1px 3px rgba(0,0,0,0.02);">
                <div style="font-weight: 700; font-size: 0.85rem; color: var(--accent); margin-bottom: 0.4rem; border-bottom: 1px solid #f0ece5; padding-bottom: 0.2rem;">
                    Tug ${index + 1} <span style="font-weight: 500; color: var(--text-muted); font-size: 0.75rem;">(${tug.type})</span>
                </div>
                <div style="display: flex; justify-content: space-between; font-size: 0.8rem; margin-bottom: 0.2rem; color: var(--text-main);">
                    <span style="flex: 1;">Docking</span>
                    <span style="flex: 1; text-align: center; color: var(--text-muted);">${tug.dockingUnit}</span>
                    <span style="flex: 1; text-align: right;">${formatMoney(tug.dockingCost)}</span>
                </div>
                <div style="display: flex; justify-content: space-between; font-size: 0.8rem; margin-bottom: 0.2rem; color: var(--text-main);">
                    <span style="flex: 1;">+40k NRT</span>
                    <span style="flex: 1; text-align: center; color: var(--text-muted);">${tug.nrtUnit}</span>
                    <span style="flex: 1; text-align: right;">${formatMoney(tug.nrtCost)}</span>
                </div>
                <div style="display: flex; justify-content: space-between; font-size: 0.8rem; margin-bottom: 0.2rem; color: var(--text-main);">
                    <span style="flex: 1;">Fuel</span>
                    <span style="flex: 1; text-align: center; color: var(--text-muted);">${tug.fuelUnit}</span>
                    <span style="flex: 1; text-align: right;">${formatMoney(tug.fuelCost)}</span>
                </div>
                <div style="display: flex; justify-content: space-between; font-size: 0.8rem; font-weight: 600; color: var(--text-main);">
                    <span style="flex: 1;">Escort</span>
                    <span style="flex: 1; text-align: center; color: var(--text-muted); font-weight: 400;">${tug.escortUnit}</span>
                    <span style="flex: 1; text-align: right;">${formatMoney(tug.escortCost)}</span>
                </div>
            </div>`;
        });
    }
    
    const breakdownContainer = document.getElementById('tugBreakdownContainer');
    if (breakdownContainer) breakdownContainer.innerHTML = tugBreakdownHTML;

    renderDynamicRanges();
}

function renderDynamicRanges() {
    const grt = parseFloat(document.getElementById('grt').value);
    
    const destSelect = document.getElementById('destination');
    const terminalName = destSelect && destSelect.options[destSelect.selectedIndex] ? destSelect.options[destSelect.selectedIndex].text : '';

    let currentClass = "Standard";
    let displayTitle = `Standard (< 45k GRT) | ${terminalName}`;
    
    if (grt >= 120000) {
        currentClass = "SLCV/MLCV";
        displayTitle = `SLCV (≥ 120k GRT) | ${terminalName}`;
    } else if (grt >= 45000) {
        currentClass = "ULCV";
        displayTitle = `ULCV (45k - 119k GRT) | ${terminalName}`;
    }

    let absoluteMaxCost = calcTotalFromState(getRangeBoundaries(currentClass).maxState);
    const scaleTotal = Math.max(30000, Math.ceil((absoluteMaxCost * 1.07) / 5000) * 5000);
    const scaleTugs = 6; 
    const scaleTimeActual = 2.0; 
    const scaleTimeRuntime = 3.5;

    const buildBlock = (title, cls) => {
        let bounds = getRangeBoundaries(cls);
        let min = bounds.minState;
        let med = bounds.medState;
        let max = bounds.maxState;

        const formatVal = (v, isMoney, isTime, isUnit) => {
            if (isMoney) return formatMoney(v).replace(/\.\d+$/, ''); 
            if (isTime) return v.toFixed(2);
            if (isUnit) return v.toFixed(0); 
            return v.toFixed(0);
        };

        const buildRow = (lbl, key, scaleMax, unit, isMoney=false, isTime=false, isUnit=false) => {
            let vMin = min[key]; let vMed = med[key]; let vMax = max[key];
            if (vMin > vMax) { let t = vMin; vMin = vMax; vMax = t; }

            const pMin = Math.min(100, Math.max(0, (vMin / scaleMax) * 100));
            const pMed = Math.min(100, Math.max(0, (vMed / scaleMax) * 100));
            const pMax = Math.min(100, Math.max(0, (vMax / scaleMax) * 100));

            let track = `<div class="range-line"></div>`;
            
            if (vMin === vMax) {
                track += `
                    <div class="range-point" style="left: ${pMin}%;"></div>
                    <div class="range-median" style="left: ${pMin}%;"></div>
                    <div class="range-val median-val" style="left: ${pMin}%; transform: translateX(-50%);">${formatVal(vMin, isMoney, isTime, isUnit)}</div>
                `;
            } else {
                track += `
                    <div class="range-fill" style="left: ${pMin}%; width: ${pMax - pMin}%;"></div>
                    <div class="range-point" style="left: ${pMin}%;"></div>
                    <div class="range-val" style="left: ${pMin}%; transform: translateX(-90%);">${formatVal(vMin, isMoney, isTime, isUnit)}</div>
                    <div class="range-median" style="left: ${pMed}%;"></div>
                    <div class="range-val median-val" style="left: ${pMed}%; transform: translateX(-50%);">${formatVal(vMed, isMoney, isTime, isUnit)}</div>
                    <div class="range-point" style="left: ${pMax}%;"></div>
                    <div class="range-val" style="left: ${pMax}%; transform: translateX(10%);">${formatVal(vMax, isMoney, isTime, isUnit)}</div>
                `;
            }

            if (isMoney) {
                let min7 = vMed * 0.93; let max7 = vMed * 1.07;
                const pMin7 = Math.min(100, Math.max(0, (min7 / scaleMax) * 100));
                const pMax7 = Math.min(100, Math.max(0, (max7 / scaleMax) * 100));

                track += `
                    <div class="range-point" style="left: ${pMin7}%; height: 12px; top: -2px; background: var(--warning); border-radius: 2px; z-index: 4;"></div>
                    <div class="range-val" style="left: ${pMin7}%; top: 32px; transform: translateX(-50%); color: var(--warning); font-size: 0.65rem; text-align: center; line-height: 1.1;">-7%<br>${formatVal(min7, true)}</div>
                    
                    <div class="range-point" style="left: ${pMax7}%; height: 12px; top: -2px; background: var(--warning); border-radius: 2px; z-index: 4;"></div>
                    <div class="range-val" style="left: ${pMax7}%; top: 32px; transform: translateX(-50%); color: var(--warning); font-size: 0.65rem; text-align: center; line-height: 1.1;">+7%<br>${formatVal(max7, true)}</div>
                `;
            }

            let actualVal = window.extractedInvoiceMetrics ? window.extractedInvoiceMetrics[key] : null;
            if (actualVal !== null && actualVal !== undefined) {
                const pActual = Math.min(100, Math.max(0, (actualVal / scaleMax) * 100));
                track += `
                    <div class="range-actual-marker" style="position: absolute; top: 1px; left: ${pActual}%; width: 12px; height: 12px; background: #e91e63; border: 2px solid #fff; border-radius: 50%; transform: translateX(-50%); z-index: 10; box-shadow: 0 0 5px rgba(0,0,0,0.6);" title="Invoice Value: ${formatVal(actualVal, isMoney, isTime, isUnit)}"></div>
                `;
            }

            const scaleLabel = isMoney ? '$' + (scaleMax / 1000) + 'k' : scaleMax + ' ' + unit;
            const dynamicMargin = isMoney ? 'margin-bottom: 4rem;' : '';

            return `
            <div class="range-row dense-row" style="${dynamicMargin}">
                <div class="range-label-col" style="width: 140px;">${lbl}<br><span style="font-size:0.65rem; color:#999; font-weight:normal;">Scale: ${scaleLabel}</span></div>
                <div class="range-track-col">${track}</div>
            </div>`;
        };

        let html = `<div class="breakdown-group"><h3>${title}</h3>`;
        html += buildRow('Invoice Total', 'total', scaleTotal, '', true, false, false);
        html += buildRow('Docking Only', 'dockingOnly', scaleTugs, 'Units', false, false, true);
        html += buildRow('Escort + Docking', 'escortDocking', scaleTugs, 'Units', false, false, true);
        html += buildRow('Escort Only', 'escortOnly', scaleTugs, 'Units', false, false, true);
        html += buildRow('Actual Escort', 'actualTime', scaleTimeActual, 'hrs', false, true, false);
        html += buildRow('↳ Plus Runtimes', 'runtimeDual', scaleTimeRuntime, 'hrs', false, true, false);
        html += buildRow('Actual E-Only', 'actualTimeOnly', scaleTimeActual, 'hrs', false, true, false);
        html += buildRow('↳ Plus Runtimes', 'runtimeOnly', scaleTimeRuntime, 'hrs', false, true, false);
        html += `</div>`;
        return html;
    };

    const dynContainer = document.getElementById('dynamic-ranges-container');
    if (dynContainer) {
        dynContainer.style.gridTemplateColumns = "1fr"; 
        dynContainer.style.maxWidth = "900px";
        dynContainer.style.margin = "0 auto";
        dynContainer.innerHTML = buildBlock(displayTitle, currentClass);
    }

    const legendContainer = document.querySelector('.range-legend');
    if (legendContainer && window.extractedInvoiceMetrics && !document.getElementById('legend-invoice-marker')) {
        const div = document.createElement('div');
        div.className = 'legend-item';
        div.id = 'legend-invoice-marker';
        div.innerHTML = `<span style="width: 12px; height: 12px; background: #e91e63; border: 2px solid #fff; border-radius: 50%; box-shadow: 0 0 3px rgba(0,0,0,0.4);"></span> Uploaded Invoice`;
        legendContainer.appendChild(div);
    }
}

// --- NATIVE BROWSER PDF READER & LINE-BY-LINE PARSER ---
async function extractInvoiceDataFromPDF(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        
        reader.onload = async function() {
            try {
                const typedarray = new Uint8Array(this.result);
                const pdf = await pdfjsLib.getDocument(typedarray).promise;
                
                let lines = [];
                let fullTextRaw = "";
                
                for (let i = 1; i <= pdf.numPages; i++) {
                    const page = await pdf.getPage(i);
                    const textContent = await page.getTextContent();
                    
                    fullTextRaw += textContent.items.map(item => item.str).join(" ");
                    
                    let items = textContent.items.map(item => ({
                        str: item.str.trim(),
                        x: item.transform[4],
                        y: item.transform[5]
                    })).filter(item => item.str.length > 0);
                    
                    items.sort((a, b) => {
                        if (Math.abs(a.y - b.y) > 3) return b.y - a.y;
                        return a.x - b.x;
                    });
                    
                    let currentRowY = null;
                    let rowText = [];
                    for (let item of items) {
                        if (currentRowY === null || Math.abs(currentRowY - item.y) > 3) {
                            if (rowText.length > 0) lines.push(rowText.join("  "));
                            rowText = [item.str];
                            currentRowY = item.y;
                        } else {
                            rowText.push(item.str);
                        }
                    }
                    if (rowText.length > 0) lines.push(rowText.join("  "));
                }
                
                const fullText = lines.join("\n");
                
                const vesselMatch = fullText.match(/([^\n]+?)\s+and\/or Owners/i);
                let vesselName = vesselMatch ? vesselMatch[1].trim() : 'Unknown Vessel';
                if (vesselName.length > 50 || vesselName === 'Unknown Vessel') {
                    const strictMatch = fullTextRaw.match(/([A-Z0-9\-\s]+)\s+and\/or Owners/i);
                    if (strictMatch) vesselName = strictMatch[1].trim();
                }
                vesselName = vesselName.replace(/Moran New York/gi, '').replace(/A Division of Moran Towing Corporation/gi, '').trim();

                const dateMatch = fullTextRaw.match(/Date:\s*(\d{2}-\d{2}-\d{4})/i) || fullText.match(/Date:\s*(\d{2}-\d{2}-\d{4})/i);
                const loaMatch = fullTextRaw.match(/LOA:?[^\d]*([\d,\.]+)/i) || fullText.match(/LOA:?[^\d]*([\d,\.]+)/i);
                const grtMatch = fullTextRaw.match(/GRT:?[^\d]*([\d,]{4,})/i) || fullText.match(/GRT:?[^\d]*([\d,]{4,})/i);
                const nrtMatch = fullTextRaw.match(/NRT:?[^\d]*([\d,]{4,})/i) || fullText.match(/NRT:?[^\d]*([\d,]{4,})/i);
                const fuelMatch = fullTextRaw.match(/Fuel\s*@\s*([\d\.]+)/i) || fullText.match(/Fuel\s*@\s*([\d\.]+)/i); 
                const directionMatch = fullText.match(/(Undocking|Docking)\s+at/i);
                const totalMatch = fullText.match(/TOTAL\s*AMOUNT\s*DUE:?[^\d\$]*\$?([\d,]+\.\d{2})/i);
                
                // --- DETECT REGION ---
                let regionValue = 'nynj'; 
                const lowerText = fullText.toLowerCase();
                
                if (lowerText.includes('moran charleston')) {
                    regionValue = 'charleston';
                } else if (lowerText.includes('moran miami')) {
                    regionValue = 'miami';
                } else if (lowerText.includes('moran new orleans')) {
                    regionValue = 'neworleans';
                } else if (lowerText.includes('moran norfolk')) {
                    regionValue = 'norfolk';
                } else if (lowerText.includes('moran savannah')) {
                    regionValue = 'savannah';
                } else if (lowerText.includes('moran new york')) {
                    regionValue = 'nynj';
                }

                // --- DETECT CANCELLATION ---
                const isCancellation = /cancell?ation/i.test(fullTextRaw) || /cancelled/i.test(fullTextRaw) || /cancell?ation/i.test(fullText) || /cancelled/i.test(fullText);

                // --- DETECT DESTINATION ---
                let destValue = 'none';
                if (regionValue === 'nynj') {
                    destValue = 'bayonne'; // Default for NYNJ
                    if (lowerText.includes('howland hook') || lowerText.includes('moran yard') || lowerText.includes('st george')) {
                        destValue = 'newyork'; 
                    } else if (lowerText.includes('elizabeth')) {
                        destValue = 'elizabeth';
                    }
                } else if (regionValue === 'norfolk') {
                    if (lowerText.includes('norfolk international terminal') || lowerText.includes('nit')) {
                        destValue = 'USORF01';
                    } else if (lowerText.includes('virginia international gateway') || lowerText.includes('vig') || lowerText.includes('apm')) {
                        destValue = 'USORF03';
                    }
                }

                const invoiceData = {
                    vesselName: vesselName,
                    serviceDate: dateMatch ? dateMatch[1] : 'Unknown Date',
                    loa: loaMatch ? parseFloat(loaMatch[1].replace(/,/g, '')) : 0,
                    grt: grtMatch ? parseFloat(grtMatch[1].replace(/,/g, '')) : 120000,
                    nrt: nrtMatch ? parseFloat(nrtMatch[1].replace(/,/g, '')) : 50000,
                    fuel: fuelMatch ? parseFloat(fuelMatch[1]) : 2.69,
                    direction: (directionMatch && directionMatch[1].toLowerCase() === 'undocking') ? 'outbound' : 'inbound',
                    region: regionValue,
                    destination: destValue,
                    total: totalMatch ? parseFloat(totalMatch[1].replace(/,/g, '')) : 0,
                    isCancellation: isCancellation,
                    tugs: []
                };

                let currentTug = null;
                let possibleTugName = "Unknown Tug";
                
                for (let line of lines) {
                    const itemMatch = line.match(/(.*?)\s+([\d\.,]+)\s+\(?([\d,]+%?)\)?\s+\(?\$([\d,]+\.\d{2})\)?/);
                    
                    if (itemMatch) {
                        let desc = itemMatch[1].trim();
                        desc = desc.replace(/^\d{2}-\d{2}-\d{4}\s*/, '');
                        
                        if (desc.toLowerCase().includes('vessel over 40,000 nrt')) {
                            desc = '+40k NRT Fee';
                        }
                        
                        let qtyStr = itemMatch[2].replace(/,/g, '');
                        let qty = parseFloat(qtyStr);
                        
                        let rateStr = itemMatch[3].replace(/,/g, '').replace('%', '');
                        let rate = parseInt(rateStr);
                        
                        let amountStr = itemMatch[4].replace(/,/g, '');
                        let amount = parseFloat(amountStr);

                        if (line.includes('($') || desc.toLowerCase().includes('discount')) {
                            amount = -Math.abs(amount);
                        }
                        
                        if (!currentTug) {
                            currentTug = { name: possibleTugName, items: [] };
                        }
                        
                        currentTug.items.push({ desc, qty, rate, amount });
                        
                    } else {
                        let cleanLine = line.trim();
                        
                        if (cleanLine.length > 2 && cleanLine.length < 35 && 
                            !cleanLine.includes('$') && !cleanLine.match(/\d/) && 
                            !cleanLine.toLowerCase().includes('description') &&
                            !cleanLine.toLowerCase().includes('fuel') &&
                            !cleanLine.toLowerCase().includes('moran new york') &&
                            !cleanLine.toLowerCase().includes('moran norfolk') &&
                            !cleanLine.toLowerCase().includes('moran charleston') &&
                            !cleanLine.toLowerCase().includes('moran savannah') &&
                            !cleanLine.toLowerCase().includes('moran miami') &&
                            !cleanLine.toLowerCase().includes('moran new orleans') &&
                            !cleanLine.toLowerCase().includes('division') &&
                            !cleanLine.toLowerCase().includes('invoice') &&
                            !cleanLine.toLowerCase().includes('undocking') &&
                            !cleanLine.toLowerCase().includes('docking') &&
                            !cleanLine.toLowerCase().includes('amount due')) {
                            
                            if (currentTug && currentTug.items.length > 0) {
                                invoiceData.tugs.push(currentTug);
                                currentTug = null;
                            }
                            possibleTugName = cleanLine;
                        }
                    }
                }
                
                if (currentTug && currentTug.items.length > 0) {
                    invoiceData.tugs.push(currentTug);
                }

                resolve(invoiceData);

            } catch (err) {
                console.error("Error parsing PDF:", err);
                reject(err);
            }
        };
        
        reader.readAsArrayBuffer(file);
    });
}

async function handleFile(file) {
    const dropzone = document.getElementById('invoiceDropzone');
    if (!dropzone) return;

    dropzone.querySelector('h3').innerText = "Reading Native PDF...";
    dropzone.querySelector('p').innerText = "Rebuilding tables & extracting items...";
    
    try {
        const extractedData = await extractInvoiceDataFromPDF(file);
        if (extractedData.tugs.length === 0) throw new Error("No tug line items found.");
        processInvoiceAudit(extractedData);
        
        dropzone.querySelector('h3').innerText = "Drag & Drop Another Invoice";
        dropzone.querySelector('p').innerText = "Supports .PDF";
    } catch (error) {
        console.error(error);
        alert("Could not read the PDF. Check the browser console (F12) for exact extraction errors.");
        dropzone.querySelector('h3').innerText = "Drag & Drop Invoice Here";
        dropzone.querySelector('p').innerText = "Supports .PDF";
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const dropzone = document.getElementById('invoiceDropzone');
    const fileInput = document.getElementById('fileInput');

    if (dropzone) {
        dropzone.addEventListener('dragover', (e) => { e.preventDefault(); dropzone.classList.add('dragover'); });
        dropzone.addEventListener('dragleave', () => { dropzone.classList.remove('dragover'); });
        dropzone.addEventListener('drop', (e) => { e.preventDefault(); dropzone.classList.remove('dragover'); if (e.dataTransfer.files.length) handleFile(e.dataTransfer.files[0]); });
        fileInput.addEventListener('change', (e) => { if (e.target.files.length) handleFile(e.target.files[0]); });
    }
});

// --- UI RENDER FUNCTION ---
function processInvoiceAudit(extractedData) {
    // --- PREVENT SLIDER ROUNDING FOR EXACT EXTRACTED VALUES ---
    // If the step is left at "1000", updating an NRT of 40,052 snaps it to 40,000 immediately, dodging the surcharge.
    if (document.getElementById('grt')) document.getElementById('grt').step = "1";
    if (document.getElementById('nrt')) document.getElementById('nrt').step = "1";

    document.getElementById('region').value = extractedData.region;
    handleRegionChange(); 
    
    document.getElementById('grt').value = extractedData.grt;
    document.getElementById('nrt').value = extractedData.nrt;
    document.getElementById('fuel').value = extractedData.fuel;
    document.getElementById('destination').value = extractedData.destination;
    document.getElementById('direction').value = extractedData.direction;

    handleRoutingChange(true, 'destination');

    let vClass = "Standard";
    if (extractedData.grt >= 120000) vClass = "SLCV/MLCV";
    else if (extractedData.grt >= 45000) vClass = "ULCV";

    const bounds = getRangeBoundaries(vClass);
    const median = bounds.medState;

    let extDockingOnly = 0, extEscortDocking = 0, extEscortOnly = 0;
    let extMaxTimeDual = 0, extMaxTimeOnly = 0;

    let invoiceDockingRates = new Set();
    let invoiceEscortRates = new Set();
    let hasTethered = false;
    let tetheredRate = 0;

    extractedData.tugs.forEach(tug => {
        let hasDocking = false, hasEscort = false, billedTime = 0;
        tug.items.forEach(item => {
            let descLower = item.desc.toLowerCase();
            if ((descLower.includes('docking') && !descLower.includes('escort')) || descLower.includes('undocking')) {
                hasDocking = true;
                invoiceDockingRates.add(item.rate);
            }
            if (descLower.includes('escort') || descLower.includes('detention')) { 
                hasEscort = true; 
                billedTime = Math.max(billedTime, item.qty);
                if (item.rate > 0) invoiceEscortRates.add(item.rate);
                if (descLower.includes('tethered')) {
                    hasTethered = true;
                    tetheredRate = item.rate;
                }
            }
        });
        
        if (hasDocking && hasEscort) {
            extEscortDocking++;
            extMaxTimeDual = Math.max(extMaxTimeDual, billedTime);
        } else if (hasDocking) {
            extDockingOnly++;
        } else if (hasEscort) {
            extEscortOnly++;
            extMaxTimeOnly = Math.max(extMaxTimeOnly, billedTime);
        }
    });

    let extMaxBilledTime = Math.max(extMaxTimeDual, extMaxTimeOnly);

    window.extractedInvoiceMetrics = {
        total: extractedData.total,
        dockingOnly: extDockingOnly,
        escortDocking: extEscortDocking,
        escortOnly: extEscortOnly,
        actualTime: extEscortDocking > 0 ? Math.max(0, extMaxTimeDual - median.runtimeDual) : 0, 
        runtimeDual: median.runtimeDual,
        actualTimeOnly: extEscortOnly > 0 ? Math.max(0, extMaxTimeOnly - median.runtimeOnly) : 0,
        runtimeOnly: median.runtimeOnly
    };

    const container = document.getElementById('auditResultsGrid');
    container.classList.remove('assumptions-grid'); 
    let html = '';

    html += `<h3 style="font-size: 1.1rem; color: var(--accent); margin: 1rem 0; border-bottom: 2px solid var(--border); padding-bottom: 0.5rem; grid-column: 1 / -1;">Audit Results: Line-by-Line Breakdown</h3>`;

    html += `
    <div style="background: var(--panel-bg); border: 1px solid var(--border); border-radius: var(--radius); padding: 1.5rem; margin-bottom: 1.5rem; display: flex; flex-wrap: wrap; gap: 2.5rem; box-shadow: var(--shadow);">
        <div><div style="font-size: 0.75rem; color: var(--text-muted); font-weight: 700; text-transform: uppercase;">Vessel Name</div><div style="font-family: var(--font-sans); font-size: 1.1rem; font-weight: 800; color: var(--accent);">${extractedData.vesselName}</div></div>
        <div><div style="font-size: 0.75rem; color: var(--text-muted); font-weight: 700; text-transform: uppercase;">Service Date</div><div style="font-family: var(--font-mono); font-size: 1.1rem; font-weight: 800; color: var(--text-main);">${extractedData.serviceDate}</div></div>
        <div><div style="font-size: 0.75rem; color: var(--text-muted); font-weight: 700; text-transform: uppercase;">LOA</div><div style="font-family: var(--font-mono); font-size: 1.1rem; font-weight: 800; color: var(--text-main);">${extractedData.loa.toLocaleString()} ft</div></div>
        <div><div style="font-size: 0.75rem; color: var(--text-muted); font-weight: 700; text-transform: uppercase;">GRT</div><div style="font-family: var(--font-mono); font-size: 1.1rem; font-weight: 800; color: var(--text-main);">${extractedData.grt.toLocaleString()}</div></div>
        <div><div style="font-size: 0.75rem; color: var(--text-muted); font-weight: 700; text-transform: uppercase;">NRT</div><div style="font-family: var(--font-mono); font-size: 1.1rem; font-weight: 800; color: var(--text-main);">${extractedData.nrt.toLocaleString()}</div></div>
    </div>`;

    const yearRate = parseFloat(document.getElementById('yearRate').value);
    const finalEscortRate = parseFloat(document.getElementById('escortRate').value);
    const expectedNrtFee = extractedData.nrt > 40000 ? 1400 : 0;
    
    let expectedFuelFee = 0;
    if (extractedData.fuel > 2.00) {
        const increments = Math.ceil(Math.round((extractedData.fuel - 2.00) * 100) / 10);
        expectedFuelFee = increments * 15;
    }

    let expectedBilledTimeDual = Math.max(2.0, Math.round((median.actualTime + median.runtimeDual) * 2) / 2);
    let expectedBilledTimeOnly = Math.max(2.0, Math.round((median.actualTimeOnly + median.runtimeOnly) * 2) / 2);
    
    let totalExpected = median.total;
    let totalMin = totalExpected * 0.93;
    let totalMax = totalExpected * 1.07;
    let totalBadge = '';
    
    if (extractedData.total > totalMax) {
        totalBadge = `<span style="background: #ffebee; color: var(--warning); border: 1px solid #ffcdd2; padding: 4px 8px; border-radius: 4px; font-size: 0.8rem; font-weight: bold; margin-left: 12px;">FAIL (+7% EXCEEDED)</span>`;
    } else if (extractedData.total < totalMin) {
        totalBadge = `<span style="background: #e3f2fd; color: var(--accent-light); border: 1px solid #bbdefb; padding: 4px 8px; border-radius: 4px; font-size: 0.8rem; font-weight: bold; margin-left: 12px;">SHORT (-7% SHORT)</span>`;
    } else {
        totalBadge = `<span style="background: #e8f5e9; color: var(--success); border: 1px solid #c8e6c9; padding: 4px 8px; border-radius: 4px; font-size: 0.8rem; font-weight: bold; margin-left: 12px;">PASS (WITHIN ±7%)</span>`;
    }

    let summaryBullets = [];
    
    let physicalTugDiff = (extDockingOnly + extEscortDocking + extEscortOnly) - (median.dockingOnly + median.escortDocking + median.escortOnly);
    if (physicalTugDiff > 0) {
        summaryBullets.push(`<strong>Fleet Variance:</strong> The invoice billed ${physicalTugDiff} additional physical tug(s) compared to the ${vClass} standard. This is likely an extra safety docking tug. Confirm arrangement with agent.`);
    } else if (physicalTugDiff < 0) {
        summaryBullets.push(`<strong>Fleet Variance:</strong> The invoice billed ${Math.abs(physicalTugDiff)} fewer physical tug(s) than expected for a ${vClass} vessel.`);
    }

    // --- NRT VARIANCE CHECK ---
    let totalBilledNRT = 0;
    extractedData.tugs.forEach(t => t.items.forEach(i => {
        if (i.desc.toLowerCase().includes('nrt')) totalBilledNRT += i.amount;
    }));
    let totalExpectedNRT = expectedNrtFee * (extDockingOnly + extEscortDocking);
    
    if (totalBilledNRT !== totalExpectedNRT) {
        let nrtDiff = totalBilledNRT - totalExpectedNRT;
        let colorClass = nrtDiff > 0 ? "var(--warning)" : "var(--success)";
        
        let impactComment = "";
        if (extractedData.total > totalMax && nrtDiff > 0) {
             impactComment = " <strong>This NRT overcharge directly contributed to the invoice failing the +7% threshold.</strong>";
        } else if (extractedData.total < totalMin && nrtDiff < 0) {
             impactComment = " <strong>This missing NRT charge contributed to the invoice falling below the -7% threshold.</strong>";
        }

        summaryBullets.push(`<strong>NRT Surcharge Variance:</strong> The baseline expects an NRT cost of $${totalExpectedNRT} (based on ${extractedData.nrt.toLocaleString()} NRT). The invoice billed $${totalBilledNRT}. This altered the invoice by <span style="color: ${colorClass}; font-weight: bold;">${nrtDiff > 0 ? '+' : ''}${formatMoney(nrtDiff)}</span>.${impactComment}`);
    }

    // Rate Variances
    invoiceDockingRates.forEach(rate => {
        if (rate !== yearRate && rate > 0) {
            let rDiff = rate - yearRate;
            let rVerb = rDiff > 0 ? "higher" : "lower";
            let totalDockingCount = extDockingOnly + extEscortDocking;
            let totalImpact = rDiff * totalDockingCount;
            let colorClass = rDiff > 0 ? "var(--warning)" : "var(--success)";
            summaryBullets.push(`<strong>Docking Rate Variance:</strong> Docking line items were billed at $${rate}, which is $${Math.abs(rDiff)} ${rVerb} per tug than the $${yearRate} baseline. This altered the invoice by <span style="color: ${colorClass}; font-weight: bold;">${rDiff > 0 ? '+' : ''}${formatMoney(totalImpact)}</span>.`);
        }
    });

    invoiceEscortRates.forEach(rate => {
        if ((rate !== finalEscortRate && rate > 0 && !hasTethered) || (hasTethered && rate !== tetheredRate && rate !== finalEscortRate)) {
            let rDiff = rate - finalEscortRate;
            let rVerb = rDiff > 0 ? "higher" : "lower";
            let totalHoursAtRate = 0;
            extractedData.tugs.forEach(t => t.items.forEach(i => {
                if ((i.desc.toLowerCase().includes('escort') || i.desc.toLowerCase().includes('detention')) && i.rate === rate) totalHoursAtRate += i.qty;
            }));
            let totalImpact = rDiff * totalHoursAtRate;
            let colorClass = rDiff > 0 ? "var(--warning)" : "var(--success)";
            summaryBullets.push(`<strong>Escort Rate Variance:</strong> Standard escorting was billed at $${rate}/hr, which is $${Math.abs(rDiff)} ${rVerb} than the $${finalEscortRate}/hr baseline. Over ${totalHoursAtRate} billed hours, this altered the invoice by <span style="color: ${colorClass}; font-weight: bold;">${rDiff > 0 ? '+' : ''}${formatMoney(totalImpact)}</span>.`);
        }
    });

    if (hasTethered) {
        summaryBullets.push(`<strong>Anomaly Detected:</strong> A 'Tethered Escort' rate of $${tetheredRate} was billed. This specific service rate is not standard on the 2025-2026 contract. Please investigate this charge with the agent.`);
    }

    if (median.escortDocking > 0 && extEscortDocking === 0 && extEscortOnly === 0) {
        let avoidedCost = median.escortDocking * expectedBilledTimeDual * finalEscortRate * ((extractedData.region !== 'nynj') ? 0.75 : 1.0);
        summaryBullets.push(`<strong>Service Variance:</strong> The baseline expects ${median.escortDocking} Escort + Docking tugs for a ${vClass} vessel. The invoice used ${extDockingOnly} Docking Only tugs instead. No escort time was billed, reducing the total expected cost by <span style="color: var(--success); font-weight: bold;">${formatMoney(avoidedCost)}</span>.`);
    } else {
        let dualDiff = extEscortDocking - median.escortDocking;
        let onlyDiff = extEscortOnly - median.escortOnly;
        
        if (dualDiff < 0 && onlyDiff > 0) {
            let substitutedCount = Math.min(Math.abs(dualDiff), onlyDiff);
            let expectedDualCost = (expectedBilledTimeDual * finalEscortRate * ((extractedData.region !== 'nynj') ? 0.75 : 1.0)) + yearRate + expectedNrtFee;
            let expectedOnlyCost = (expectedBilledTimeOnly * finalEscortRate * ((extractedData.region !== 'nynj') ? 0.75 : 1.0));
            let costDiff = (expectedOnlyCost - expectedDualCost) * substitutedCount;
            let timeDiff = expectedBilledTimeOnly - expectedBilledTimeDual;

            let costDiffText = costDiff > 0 
                ? `<span style="color: var(--warning); font-weight: bold;">increasing the invoice by ${formatMoney(costDiff)}</span>`
                : `<span style="color: var(--success); font-weight: bold;">saving ${formatMoney(Math.abs(costDiff))}</span>`;
                
            summaryBullets.push(`<strong>Service Substitution:</strong> ${substitutedCount} standard Escort+Docking tug(s) were replaced by Escort Only tug(s). This forfeited the docking waiver (+${timeDiff.toFixed(2)} hrs billed per tug) but dropped the Docking and NRT fees, ultimately ${costDiffText} vs the baseline.`);
        }
    }

    let timeVarianceBullets = [];
    if (extMaxTimeDual > expectedBilledTimeDual + 0.1) {
        let diff = extMaxTimeDual - expectedBilledTimeDual;
        let costImpact = diff * finalEscortRate * extEscortDocking * ((extractedData.region !== 'nynj') ? 0.75 : 1.0);
        timeVarianceBullets.push(`Escort+Docking tugs exceeded the baseline time by <strong>${diff.toFixed(2)} hours</strong>, increasing the cost by <span style="color: var(--warning); font-weight: bold;">${formatMoney(costImpact)}</span>.`);
    }
    if (extMaxTimeOnly > expectedBilledTimeOnly + 0.1) {
        let diff = extMaxTimeOnly - expectedBilledTimeOnly;
        let costImpact = diff * finalEscortRate * extEscortOnly * ((extractedData.region !== 'nynj') ? 0.75 : 1.0);
        timeVarianceBullets.push(`Escort Only tugs exceeded the baseline time by <strong>${diff.toFixed(2)} hours</strong>, increasing the cost by <span style="color: var(--warning); font-weight: bold;">${formatMoney(costImpact)}</span>.`);
    }
    
    if (timeVarianceBullets.length > 0) {
        summaryBullets.push(`<strong>Time Variance:</strong> ${timeVarianceBullets.join(' ')} Recommend verifying the maneuver timeline.`);
    }

    let grandTotalDiff = extractedData.total - totalExpected;
    if (Math.abs(grandTotalDiff) > 0.01) {
        let totalVerb = grandTotalDiff > 0 ? "higher" : "lower";
        let totalColor = grandTotalDiff > 0 ? "var(--warning)" : "var(--success)";
        summaryBullets.push(`<strong>Overall Impact:</strong> As a total, the invoice is <span style="color: ${totalColor}; font-weight: bold;">${formatMoney(Math.abs(grandTotalDiff))} ${totalVerb}</span> than the baseline expected cost.`);
    }

    if (summaryBullets.length === 0) {
        summaryBullets.push(`<span style="color: var(--success); font-weight: 600;">All line items perfectly match the simulated standard baseline.</span> No further action required.`);
    }

    let cancellationBanner = '';
    if (extractedData.isCancellation) {
        cancellationBanner = `
        <div style="background: #ffebee; border: 1px solid #ffcdd2; padding: 0.75rem 1rem; margin-top: 1rem; border-radius: 6px;">
            <strong style="color: var(--warning); font-size: 0.85rem;"><span style="background: var(--warning); color: #fff; padding: 2px 6px; border-radius: 4px; font-size: 0.65rem; margin-right: 6px;">CANCELLATION</span></strong> 
            <span style="font-size: 0.85rem; color: var(--text-main);">This invoice includes cancellation charges. Please review this invoice manually</span>
        </div>`;
    }

    let summaryHtml = `<ul style="margin-top: 1rem; padding-left: 1.2rem; font-size: 0.85rem; color: var(--text-muted); line-height: 1.6;">`;
    summaryBullets.forEach(bullet => { summaryHtml += `<li style="margin-bottom: 0.5rem;">${bullet}</li>`; });
    summaryHtml += `</ul>`;

    html += `
    <div class="audit-card" style="padding: 1.5rem; background: #f4f8fc; border: 2px solid var(--accent-light); box-shadow: var(--shadow); margin-bottom: 1.5rem;">
        <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px dashed var(--border); padding-bottom: 1rem;">
            <div>
                <h3 style="margin: 0; color: var(--accent); font-size: 1.15rem; font-weight: 800; text-transform: uppercase;">Invoice Total</h3>
                <div style="font-size: 0.85rem; color: var(--text-muted); margin-top: 4px;">Median Expected: ${formatMoney(totalExpected)}</div>
            </div>
            <div style="display: flex; align-items: center;">
                <div style="font-family: var(--font-mono); font-weight: 800; color: var(--text-main); font-size: 1.6rem;">${formatMoney(extractedData.total)}</div>
                ${totalBadge}
            </div>
        </div>
        <div style="margin-top: 1rem;">
            <div style="display: flex; align-items: baseline; gap: 10px;">
                <h4 style="font-size: 0.8rem; text-transform: uppercase; color: var(--text-main); font-weight: 700; margin: 0;">Auditor Summary</h4>
                <span style="background: #e0f2f1; color: #00796b; padding: 2px 6px; border-radius: 4px; font-size: 0.65rem; font-weight: bold; border: 1px solid #b2dfdb;">EXPERIMENTAL FEATURE</span>
            </div>
            ${cancellationBanner} ${summaryHtml}
            <div style="font-size: 0.75rem; color: var(--text-light); margin-top: 0.5rem; font-style: italic;">
                * Note: The logic above is for educational and analytical guidance only and may not capture all operational nuances (e.g., weather delays or tariff modifications). Always verify discrepancies directly with the port agent.
            </div>
        </div>
    </div>`;

    // 3. INDIVIDUAL TUG LINE ITEMS
    extractedData.tugs.forEach((tug, index) => {
        let tugTotal = tug.items.reduce((sum, item) => sum + item.amount, 0);

        html += `
        <div class="audit-card" style="margin-bottom: 1.5rem; padding: 1.5rem;">
            <div style="display: flex; justify-content: space-between; align-items: baseline; border-bottom: 2px solid var(--border-light); padding-bottom: 0.5rem; margin-bottom: 1rem;">
                <div class="audit-card-header" style="margin: 0; color: var(--accent); font-size: 0.95rem;">Tug ${index + 1}: ${tug.name || 'Unknown Tug'}</div>
                <div style="font-family: var(--font-mono); font-weight: 800; color: var(--text-main); font-size: 1.2rem;">${formatMoney(tugTotal)}</div>
            </div>
        `;

        let hasDocking = false, hasEscort = false;
        tug.items.forEach(item => {
            let descLower = item.desc.toLowerCase();
            if ((descLower.includes('docking') && !descLower.includes('escort')) || descLower.includes('undocking')) hasDocking = true;
            if (descLower.includes('escort') || descLower.includes('detention')) hasEscort = true;
        });

        tug.items.forEach(item => {
            let expectedAmount = item.amount;
            let expectedQty = item.qty;
            let descLower = item.desc.toLowerCase();
            let reasonText = "";
            
            if (descLower.includes('discount')) {
                let expTime = (hasDocking && hasEscort) ? expectedBilledTimeDual : expectedBilledTimeOnly;
                expectedAmount = (extractedData.region !== 'nynj') ? -(expTime * finalEscortRate * 0.25) : 0;
                expectedQty = item.qty;
                reasonText = `<div style="font-size: 0.7rem; color: var(--success); margin-top: 2px;">Expected 25% Contract Discount on Escort/Detention.</div>`;
            }
            else if ((descLower.includes('docking') && !descLower.includes('escort')) || descLower.includes('undocking')) { 
                expectedAmount = yearRate; expectedQty = 1; 
                if (item.rate !== yearRate) {
                    reasonText = `<div style="font-size: 0.7rem; color: var(--text-light); margin-top: 2px;">Rate variance: billed $${item.rate} vs expected $${yearRate}</div>`;
                }
            } 
            else if (descLower.includes('nrt')) { 
                expectedAmount = expectedNrtFee; expectedQty = 1; 
            } 
            else if (descLower.includes('fuel surcharge')) { 
                expectedAmount = expectedFuelFee; expectedQty = 1; 
            } 
            else if (descLower.includes('escort') || descLower.includes('detention')) {
                let expTime = (hasDocking && hasEscort) ? expectedBilledTimeDual : expectedBilledTimeOnly;
                expectedAmount = expTime * finalEscortRate; expectedQty = expTime; 
            }

            let itemDiff = item.amount - expectedAmount;
            let qtyDiff = item.qty - expectedQty;

            let qtyBadgeHtml = '';
            if (Math.abs(qtyDiff) > 0.01) { 
                if (qtyDiff > 0) qtyBadgeHtml = `<span style="color: var(--warning); font-size: 0.85rem; font-weight: 800; margin-left: 4px;" title="Expected ${expectedQty.toFixed(2)}">(+${qtyDiff.toFixed(2)})</span>`;
                else qtyBadgeHtml = `<span style="color: var(--accent-light); font-size: 0.85rem; font-weight: 800; margin-left: 4px;" title="Expected ${expectedQty.toFixed(2)}">(${qtyDiff.toFixed(2)})</span>`;
            }

            let badgeHtml = '';
            if (itemDiff > 0) {
                badgeHtml = `<span style="background: #ffebee; color: var(--warning); border: 1px solid #ffcdd2; padding: 2px 6px; border-radius: 4px; font-size: 0.65rem; font-weight: bold; margin-left: 10px; display: inline-block;">FAIL (+${formatMoney(itemDiff)})</span>`;
            } else if (itemDiff < 0) {
                badgeHtml = `<span style="background: #e3f2fd; color: var(--accent-light); border: 1px solid #bbdefb; padding: 2px 6px; border-radius: 4px; font-size: 0.65rem; font-weight: bold; margin-left: 10px; display: inline-block;">SHORT (${formatMoney(itemDiff)})</span>`;
            } else {
                badgeHtml = `<span style="background: #e8f5e9; color: var(--success); border: 1px solid #c8e6c9; padding: 2px 6px; border-radius: 4px; font-size: 0.65rem; font-weight: bold; margin-left: 10px; display: inline-block;">PASS</span>`;
            }

            let unitLabel = (descLower.includes('time') || descLower.includes('escort') || descLower.includes('runtimes') || descLower.includes('detention')) ? 'hrs' : 'units';
            
            html += `
            <div style="display: flex; justify-content: space-between; align-items: flex-start; font-size: 0.85rem; margin-bottom: 0.8rem; color: var(--text-main);">
                <div style="flex: 2; font-weight: 500; display:flex; flex-direction:column;">
                    ${item.desc}
                    ${reasonText}
                </div>
                <span style="flex: 1.5; text-align: center; color: var(--text-muted); font-family: var(--font-mono); padding-top: 2px;">${item.qty.toFixed(2)} ${unitLabel} ${qtyBadgeHtml} @ $${item.rate}</span>
                <span style="flex: 1.5; text-align: right; display: flex; justify-content: flex-end; align-items: flex-start; padding-top: 2px;">
                    <span style="font-family: var(--font-mono); min-width: 70px;">${formatMoney(item.amount)}</span>
                    ${badgeHtml}
                </span>
            </div>`;
        });

        html += `</div>`;
    });

    container.innerHTML = html;
    document.getElementById('auditResultsContainer').style.display = 'block';

    renderDynamicRanges();
}

function setRate(value) { document.getElementById('yearRate').value = value; updateModel(); }
function setEscortRate(value) { document.getElementById('escortRate').value = value; updateModel(); }
function setFuelPrice(value) { document.getElementById('fuel').value = value; updateModel(); }
function stepValue(id, delta) {
    const input = document.getElementById(id);
    let currentVal = parseInt(input.value) || 0;
    input.value = currentVal + delta;
    document.getElementById(id + '-display').innerText = currentVal + delta;
    updateModel();
}
function stepTimeValue(id, delta) {
    const input = document.getElementById(id);
    if (!input) return;
    let currentVal = parseFloat(input.value) || 0;
    input.value = Math.max(0, currentVal + delta);
    updateModel();
}

document.getElementById('fuel').value = getCurrentFuelPrice();
handleRoutingChange(true);