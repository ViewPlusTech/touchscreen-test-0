import {speechSynth} from './speechSynth.js';

window.addEventListener('load', () => new speechMain());

export class speechMain extends EventTarget {
  constructor() {
    super();
    this.synth = null;
    
    this._init();
  }

  
  /**
   * Initializes the module.
   * @private
   * @memberOf module:@fizz/speechMain
   */
  _init() {
    this.synth = new speechSynth();

    this.elementSchema = {
      'rect' : { 
        'name': 'rectangle',
        'attributes': {
          'x': 'start-left',
          'y': 'start-top',
          'width': 'width',
          'height': 'height',
        },
      },
      'circle' : {
        'name': 'circle',
        'attributes': {
          'cx': 'center-x',
          'cy': 'center-y',
          'r': 'radius',
        },
      },
      'polygon' : { 
        'name': 'multi-sided shape',
        'attributes': { 
          'points': 'set of points',
        },
      },
    };

    // this.elementSchema = {
    //   'rect' : { 
    //     'name': 'rectangle',
    //     'attributes': [
    //       { 
    //         'x': 'start-left'
    //       },
    //       { 
    //         'y': 'start-top'
    //       },
    //       { 
    //         'width': 'width'
    //       },
    //       { 
    //         'height': 'height'
    //       },
    //     ],
    //   },
    //   'circle' : {
    //     'name': 'circle',
    //     'attributes': [
    //       { 
    //         'cx': 'center-x'
    //       },
    //       { 
    //         'y': 'center-y'
    //       },
    //       { 
    //         'r': 'radius'
    //       },
    //     ],
    //   },
    //   'polygon' : { 
    //     'name': 'multi-sided shape',
    //     'attributes': [
    //       { 
    //         'points': 'points'
    //       },
    //     ],
    //   },
    // };

    this.iconTargets = document.getElementById('icon-targets');
    this.iconTargets.addEventListener('mouseover', this._evaluateElement.bind(this));
  }

  /**
   * Reads element labels and default settings, and triggers speech.
   * @param {Event} event The event on the element.
   * @private
   * @memberOf module:@fizz/speechMain
   */
  _evaluateElement(event) {
    const target = event.target;

    const utteranceArray = [];

    const label = target.getAttribute('aria-label');
    if (label) {
      utteranceArray.push(label);
    }

    const isDescribe = target.dataset.describe;
    if (isDescribe === 'true') {
      // utteranceArray.push('describe!');
      const desc = this._composeDescription(target);
      utteranceArray.push(desc);
    }

    if (utteranceArray.length) {
      this.synth.setUtterance( utteranceArray.join('. ') );
      this.synth.speak();
    }  
  }

  /**
   * Returns list of descriptive phrases based on element type.
   * @param {Element} target The target element.
   * @private
   * @memberOf module:@fizz/speechMain
   * @returns {string} Descriptive phases.
   */
  _composeDescription(target) {
    const utteranceArray = [];

    const elementType = target.localName;
    const elementSchema = this.elementSchema[target.localName];
    // console.log(elementSchema);
    utteranceArray.push(`This is a ${elementSchema.name}.`);
    for (const attr in elementSchema.attributes) {
      let val = target.getAttribute(attr);
      val = val.replaceAll(/[,\s]/g, ', ');
      const phrase = `The ${elementSchema.attributes[attr]} is ${val}.`;
      utteranceArray.push(phrase);
    }

    return utteranceArray.join(' ');
  }
}
