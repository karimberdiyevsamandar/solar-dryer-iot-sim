import { BaseComponent } from './BaseComponent.js';

const baseTerminals = [
  { name: 'in', dx: 0, dy: 37 },
  { name: 'out', dx: 140, dy: 37 },
];

export class SolarPanel extends BaseComponent {
  constructor(props) { super({ ...props, type: 'solar', label: 'Solar Panel', terminals: baseTerminals }); }
}

export class ChargeController extends BaseComponent {
  constructor(props) { super({ ...props, type: 'chargeController', label: 'Charge Controller', terminals: baseTerminals }); }
}

export class Battery extends BaseComponent {
  constructor(props) { super({ ...props, type: 'battery', label: 'Battery', terminals: baseTerminals }); }
}

export class BMS extends BaseComponent {
  constructor(props) { super({ ...props, type: 'bms', label: 'BMS', terminals: baseTerminals }); }
}

export class Load extends BaseComponent {
  constructor(props) { super({ ...props, type: 'load', label: 'Load', terminals: baseTerminals }); }
}
