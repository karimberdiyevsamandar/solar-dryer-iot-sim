import { SimulationEngine } from './engine/simulation.js';
import { CanvasRenderer } from './ui/canvasRenderer.js';
import { DragController } from './ui/dragController.js';

const canvas = document.getElementById('simCanvas');
const telemetryEl = document.getElementById('telemetry');
const resetBtn = document.getElementById('resetLayout');

const sim = new SimulationEngine();
const renderer = new CanvasRenderer(canvas);
let dragger = new DragController(canvas, sim.components);

function renderTelemetry(data) {
  telemetryEl.innerHTML = Object.entries(data)
    .map(([k, v]) => `<span>${k}</span><strong>${v}</strong>`)
    .join('');
}

function loop(ts) {
  sim.step(ts);
  renderer.clear();

  for (const wire of sim.wires.routes) {
    const pts = sim.wires.resolvePoints(sim.components, wire);
    const energized = wire.toId !== 'load-1' || sim.telemetry.relay === 'ON';
    renderer.drawWire(pts, energized);
  }

  sim.components.forEach((c) => renderer.drawComponent(c));
  renderTelemetry(sim.telemetry);
  requestAnimationFrame(loop);
}

resetBtn.addEventListener('click', () => {
  sim.resetLayout();
  dragger = new DragController(canvas, sim.components);
});

requestAnimationFrame(loop);
