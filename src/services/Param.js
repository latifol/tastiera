class Param {
  constructor({
    type,
    name,
    value,
    min,
    max,
    hideLabel = true,
    options,
    labels,
    top,
    left,
    size,
    padding,
  }) {
    this.type = type;
    this.name = name;
    this.value = value;
    this.hideLabel = hideLabel;
    this.top = top;
    this.left = left;
    this.size = size;
    this.padding = padding;
    if (type === 'knobs') {
      this.config = new Knob(min, max);
    } else if (type === 'radioButtons') {
      this.config = new RadioButton(options, labels);
    }
  }
}

class Knob {
  constructor(min, max) {
    this.min = min;
    this.max = max;
  }
}

class RadioButton {
  constructor(options, labels) {
    this.options = options;
    this.labels = labels;
  }
}

// eslint-disable-next-line no-unused-vars
class Switch {}

export default Param;
