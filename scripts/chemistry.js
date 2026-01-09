document.addEventListener('DOMContentLoaded', () => {
    const calcBtn = document.getElementById('calculate-battery');
    if(!calcBtn) return;

    calcBtn.addEventListener('click', () => {
        const zn = parseFloat(document.getElementById('zinc-mass').value);
        const mno2 = parseFloat(document.getElementById('mno2-mass').value);
        
        // Constants
        const F = 96485; 
        const mmZn = 65.38;
        const mmMnO2 = 86.94;
        
        // Moles
        const molZn = zn / mmZn;
        const molMnO2 = mno2 / mmMnO2;
        
        // Electrons (Zn -> 2e-, MnO2 -> 1e- per reaction)
        const eFromZn = molZn * 2;
        const eFromMnO2 = molMnO2 * 1;
        
        // Limiting Reactant
        const limiting = eFromZn < eFromMnO2 ? "Zinc" : "Manganese Dioxide";
        const actualMolE = Math.min(eFromZn, eFromMnO2);
        
        // Results
        const charge = actualMolE * F;
        const energy = charge * 1.5; // 1.5V nominal
        
        document.getElementById('limiting-reactant').innerText = limiting;
        document.getElementById('moles-electrons').innerText = actualMolE.toFixed(4);
        document.getElementById('total-charge').innerText = charge.toFixed(2);
        document.getElementById('electrical-energy').innerText = energy.toFixed(2);
        
        // Show work details
        const workDiv = document.querySelector('.work-details');
        workDiv.innerHTML = `
            <p>1. Mol Zn = ${zn}/${mmZn} = ${molZn.toFixed(4)}</p>
            <p>2. Mol MnO₂ = ${mno2}/${mmMnO2} = ${molMnO2.toFixed(4)}</p>
            <p>3. e⁻ from Zn = ${molZn.toFixed(4)} * 2 = ${eFromZn.toFixed(4)}</p>
            <p>4. e⁻ from MnO₂ = ${molMnO2.toFixed(4)} * 1 = ${eFromMnO2.toFixed(4)}</p>
            <p>5. Limiting is ${limiting}. Actual e⁻ = ${actualMolE.toFixed(4)}</p>
            <p>6. Charge Q = ${actualMolE.toFixed(4)} * 96485 = ${charge.toFixed(2)} C</p>
            <p>7. Energy E = ${charge.toFixed(2)} * 1.5V = ${energy.toFixed(2)} J</p>
        `;
    });
    
    document.querySelector('.toggle-work').addEventListener('click', function() {
        const div = document.querySelector('.work-details');
        div.style.display = div.style.display === 'none' ? 'block' : 'none';
    });
});
