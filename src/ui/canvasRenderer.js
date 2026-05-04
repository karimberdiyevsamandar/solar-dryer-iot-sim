export class CanvasRenderer {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
  }

  clear() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.fillStyle = '#0b1220';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
  }

  drawComponent(component) {
    const { ctx } = this;
    ctx.fillStyle = '#1e293b';
    ctx.strokeStyle = '#38bdf8';
    ctx.lineWidth = 1.5;
    ctx.fillRect(component.x, component.y, component.width, component.height);
    ctx.strokeRect(component.x, component.y, component.width, component.height);

    ctx.fillStyle = '#e2e8f0';
    ctx.font = '13px sans-serif';
    ctx.fillText(component.label, component.x + 8, component.y + 18);

    for (const t of component.terminals) {
      ctx.beginPath();
      ctx.arc(component.x + t.dx, component.y + t.dy, 4, 0, Math.PI * 2);
      ctx.fillStyle = '#f59e0b';
      ctx.fill();
    }
  }

  drawWire(points, energized = true) {
    const { ctx } = this;
    ctx.strokeStyle = energized ? '#22c55e' : '#64748b';
    ctx.lineWidth = 3;
    ctx.beginPath();
    points.forEach((p, i) => (i ? ctx.lineTo(p.x, p.y) : ctx.moveTo(p.x, p.y)));
    ctx.stroke();
  }
}
