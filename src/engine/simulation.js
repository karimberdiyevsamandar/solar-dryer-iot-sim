import { WireEngine } from './wireEngine.js';
import { createDefaultComponents } from '../registry/componentRegistry.js';
import { PowerModel } from '../power/powerModel.js';

export class SimulationEngine {
  constructor() {
    this.components = createDefaultComponents();
    this.power = new PowerModel();
    this.wires = new WireEngine();
    this.telemetry = {};
    this.lastTs = performance.now();
    this.setupWires();
  }

  setupWires() {
    this.wires.connect('solar-1', 'out', 'cc-1', 'in');
    this.wires.connect('cc-1', 'out', 'bat-1', 'in');
    this.wires.connect('bat-1', 'out', 'bms-1', 'in');
    this.wires.connect('bms-1', 'out', 'load-1', 'in');
    this.wires.connect('aht-1', 'i2c', 'esp-1', 'i2c', [{ x: 420, y: 430 }, { x: 620, y: 430 }]);
  }

  getByType(type) { return this.components.find((c) => c.type === type); }

  resetLayout() {
    this.components = createDefaultComponents();
    this.wires.routes = [];
    this.setupWires();
  }

  step(now = performance.now()) {
    const deltaS = Math.max(0.016, (now - this.lastTs) / 1000);
    this.lastTs = now;

    const sensor = this.getByType('aht10').sample(deltaS);
    const relay = this.getByType('esp32').control(sensor, this.power.state);
    const power = this.power.step(deltaS, relay.relayOn);

    this.telemetry = {
      temperatureC: sensor.temperatureC.toFixed(1),
      humidityPct: sensor.humidityPct.toFixed(1),
      batterySoc: power.batterySoc.toFixed(1),
      batteryVoltage: power.batteryVoltage.toFixed(2),
      panelPowerW: power.panelPowerW.toFixed(0),
      loadServedW: power.loadServedW.toFixed(0),
      relay: relay.relayOn ? 'ON' : 'OFF',
    };
  }
}
