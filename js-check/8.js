/* eslint-disable max-classes-per-file */
class Planet {
  constructor(name, diameter) {
    this.name = name;
    this.diameter = diameter;
    this.size = this.getSize();
  }

  getSize() {
    return (4 / 3) * Math.PI * (this.diameter / 2) ** 3;
  }

  getPlanetSize() {
    return `Planet: ${this.name}, Size: ${this.size}`;
  }
}

class Earth extends Planet {}

const m = new Planet('Mars', 6779);
console.log(m.getPlanetSize());

const e = new Earth('Earth', 12756);
console.log(e.getPlanetSize());
