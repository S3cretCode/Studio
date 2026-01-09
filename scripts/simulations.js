document.addEventListener('DOMContentLoaded', () => {
    // 1. Discharge Sim
    const dischargeBtn = document.getElementById('start-discharge-sim');
    if(dischargeBtn) {
        const ctx = document.getElementById('battery-discharge-sim').getContext('2d');
        dischargeBtn.addEventListener('click', () => {
            const r = document.getElementById('load-resistance').value;
            ctx.clearRect(0,0,600,350);
            ctx.beginPath();
            ctx.moveTo(0, 50);
            for(let t=0; t<600; t+=10) {
                // Conceptual discharge curve
                let v = 1.5 - (t * (50/r) / 1000); 
                if(v < 0) v = 0;
                ctx.lineTo(t, 300 - (v*150));
            }
            ctx.strokeStyle = "red"; ctx.lineWidth = 2; ctx.stroke();
            ctx.fillStyle = "#000"; ctx.fillText("Voltage over Time", 250, 340);
        });
    }

    // 2. Magnetic Field Sim
    const fieldCanvas = document.getElementById('magnetic-field-sim');
    if(fieldCanvas) {
        const ctx = fieldCanvas.getContext('2d');
        const drawField = () => {
            ctx.clearRect(0,0,600,350);
            const amps = document.getElementById('current-strength').value;
            // Wire
            ctx.fillRect(295, 50, 10, 250);
            // Circles
            for(let i=1; i<5; i++) {
                ctx.beginPath();
                ctx.arc(300, 175, i*30, 0, Math.PI*2);
                ctx.strokeStyle = `rgba(0,0,255, ${amps/5})`;
                ctx.stroke();
            }
        };
        document.getElementById('current-strength').addEventListener('input', drawField);
        drawField();
    }
    
    // 3. Motor Sim
    const motorCanvas = document.getElementById('dc-motor-sim');
    if(motorCanvas) {
        const ctx = motorCanvas.getContext('2d');
        let angle = 0;
        let running = false;
        
        function animate() {
            if(!running) return;
            ctx.clearRect(0,0,600,350);
            const speed = document.getElementById('motor-speed').value;
            angle += parseInt(speed);
            
            ctx.save();
            ctx.translate(300, 175);
            ctx.rotate(angle * Math.PI / 180);
            ctx.fillStyle = "orange";
            ctx.fillRect(-40, -40, 80, 80); // Armature
            ctx.restore();
            
            // Stator
            ctx.fillStyle = "red"; ctx.fillRect(150, 135, 50, 80);
            ctx.fillStyle = "blue"; ctx.fillRect(400, 135, 50, 80);
            
            requestAnimationFrame(animate);
        }
        
        document.getElementById('start-motor-sim').onclick = () => { running = true; animate(); };
        document.getElementById('stop-motor-sim').onclick = () => { running = false; };
    }
});
