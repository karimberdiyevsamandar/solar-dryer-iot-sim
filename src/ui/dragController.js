export class DragController {
  constructor(canvas, components) {
    this.canvas = canvas;
    this.components = components;
    this.drag = null;

    canvas.addEventListener('pointerdown', (e) => this.onDown(e));
    canvas.addEventListener('pointermove', (e) => this.onMove(e));
    canvas.addEventListener('pointerup', () => (this.drag = null));
    canvas.addEventListener('pointerleave', () => (this.drag = null));
  }

  point(e) {
    const rect = this.canvas.getBoundingClientRect();
    return { x: (e.clientX - rect.left) * (this.canvas.width / rect.width), y: (e.clientY - rect.top) * (this.canvas.height / rect.height) };
  }

  onDown(e) {
    const p = this.point(e);
    const c = [...this.components].reverse().find((cmp) => cmp.contains(p.x, p.y));
    if (!c) return;
    this.drag = { c, dx: p.x - c.x, dy: p.y - c.y };
  }

  onMove(e) {
    if (!this.drag) return;
    const p = this.point(e);
    this.drag.c.x = p.x - this.drag.dx;
    this.drag.c.y = p.y - this.drag.dy;
  }
}
