document.addEventListener('DOMContentLoaded', () => {
    const slider = document.getElementById('battery-health');
    const canvas = document.getElementById('energy-flow-canvas');
    if(!canvas) return;
    const ctx = canvas.getContext('2d');
    
    function draw(health) {
        ctx.clearRect(0,0,800,450);
        
        // Calculation logic
        const voltage = 1.5 * (health/100);
        const internalR = 0.5 + (100-health)/100; // Resistance goes up as health goes down
        const current = voltage / (1 + internalR); // I = V/R
        
        // Visualization
        const intensity = current / 1.5 * 255;
        ctx.fillStyle = `rgb(${intensity}, 50, 50)`;
        
        // Battery Node
        ctx.beginPath(); ctx.arc(100, 225, 40, 0, Math.PI*2); ctx.fill();
        ctx.fillStyle = "#000"; ctx.fillText("Battery", 80, 230);
        
        // Motor Node
        ctx.fillStyle = `rgb(50, 50, ${intensity})`;
        ctx.beginPath(); ctx.arc(700, 225, 40 + (current*10), 0, Math.PI*2); ctx.fill();
        ctx.fillStyle = "#fff"; ctx.fillText("Motor", 680, 230);
        
        // Flow Arrow
        ctx.strokeStyle = `rgba(233, 69, 96, ${health/100})`;
        ctx.lineWidth = 10 * current;
        ctx.beginPath(); ctx.moveTo(140, 225); ctx.lineTo(660, 225); ctx.stroke();
        
        // Text
        document.getElementById('battery-health-value').innerText = health + '%';
        let text = "";
        if(health > 80) text = `High chemical potential allows ${current.toFixed(2)}A current. Strong magnetic fields!`;
        else if(health > 30) text = `Moderate health. Internal resistance is limiting current to ${current.toFixed(2)}A.`;
        else text = `Depleted. Voltage drop is too high. Motor barely moves.`;
        document.getElementById('interpretation-text').innerText = text;
    }
    
    slider.addEventListener('input', (e) => draw(e.target.value));
    draw(100);
});
