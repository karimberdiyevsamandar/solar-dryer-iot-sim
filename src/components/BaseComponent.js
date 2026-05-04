export class BaseComponent {
  constructor({ id, type, label, x, y, width = 140, height = 74, terminals = [] }) {
    this.id = id;
    this.type = type;
    this.label = label;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.terminals = terminals;
    this.state = {};
  }

  contains(px, py) {
    return px >= this.x && px <= this.x + this.width && py >= this.y && py <= this.y + this.height;
  }

  getTerminalPosition(name) {
    const t = this.terminals.find((v) => v.name === name);
    if (!t) return { x: this.x, y: this.y };
    return { x: this.x + t.dx, y: this.y + t.dy };
  }
}
