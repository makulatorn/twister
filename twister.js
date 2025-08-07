const canvas = document.getElementById('wheel');
const wheel = canvas.getContext('2d');
const result = document.getElementById('result');

const segments = [];
const colors = ['Red', 'Blue', 'Green', 'Yellow'];
const limbs = ['Venstre Hånd', 'Højre Hånd', 'Left Fod', 'Højre Fod'];

// Create all 16 combinations
limbs.forEach(limb => {
    colors.forEach(color => {
        // ammend new elements to end of array
        segments.push(`${limb} - ${color}`)
    });
});

const segmentAngle = (2 * Math.PI) / segments.length;

function drawWheel() {
    for (let i = 0; i < segments.length; i++) {
        const angle = i * segmentAngle;

        wheel.beginPath();
        wheel.moveTo(250, 250);
        wheel.arc(250, 250, 250, angle, angle + segmentAngle);
        wheel.fillStyle = colors[i % colors.length];

        wheel.fill();
        wheel.stroke();

        wheel.save();
        wheel.translate(250, 250);
        wheel.rotate(angle + segmentAngle / 2);

        wheel.textAlign = 'center';
        wheel.fillStyle = 'black';
        wheel.font = '14px Mono';
        wheel.fillText(segments[i], 160, 5);
        wheel.restore();
    }
}

drawWheel()

document.getElementById('spin').addEventListener('click', () => {
    const spins = Math.floor(Math.round(4.5));
    const randomSegment = Math.floor(Math.random() * segments.length);
    const rotation = (360 / segments.length) * randomSegment + spins * 360;

    canvas.style.transition = 'transform 3s ease-out';
    canvas.style.transform = `rotate(${rotation}deg)`;
    setTimeout(() => {
        const resultText = segments[randomSegment];
        const color = resultText.split(' - ')[1];
        result.textContent = segments[randomSegment];
        result.style.color = color.toLowerCase();
        result.style.display = 'unset';
        canvas.style.transition = 'none';
        canvas.style.transform = 'rotate(0deg)';
        result.fill();
        result.stroke();
        result.save();

        drawWheel();

    }, 3200);
})
