export class WireEngine {
  constructor() {
    this.routes = [];
  }

  connect(fromId, fromTerminal, toId, toTerminal, bends = []) {
    this.routes.push({ fromId, fromTerminal, toId, toTerminal, bends });
  }

  static orthogonalRoute(a, b) {
    const mx = (a.x + b.x) / 2;
    return [{ x: mx, y: a.y }, { x: mx, y: b.y }];
  }

  resolvePoints(components, route) {
    const from = components.find((c) => c.id === route.fromId);
    const to = components.find((c) => c.id === route.toId);
    const start = from.getTerminalPosition(route.fromTerminal);
    const end = to.getTerminalPosition(route.toTerminal);
    const bends = route.bends.length ? route.bends : WireEngine.orthogonalRoute(start, end);
    return [start, ...bends, end];
  }
}
