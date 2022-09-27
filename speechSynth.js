/**
 * speechSynth module.
 * @module @fizz/speechSynth
 */

/**
 * Voice synthesizer that speaks given text strings.
 */
 export class speechSynth {
  /**
   * Constructor
   * @constructor
   */
  constructor() {
    // class members
    this.synth = window.speechSynthesis;

    this.rate = 1;
    this.pitch = 1;
    this.utterance = null;

    this.init();
  }

  /**
   * Initializes class.
   */
  async init() {
    // this.setUtterance();
    // this.speak();
    // console.log('utterance', this.utterance);
  }

  /**
   * Speaks text string
   * @param {string} textStr The string to be spoken.
   */
  setUtterance(textStr = 'Hello') {
    // console.log('setUtterance', textStr);
    if (textStr !== '') {
      this.utterance = new SpeechSynthesisUtterance(textStr);
    }
  }

  /**
   * Speaks text string
   */
  speak() {
    if (this.synth.speaking) {
      console.warn('warning: still speaking');
      this.synth.cancel();
      // return;
    }

    // console.log('utterance', this.utterance);
    if (this.utterance) {
      this.utterance.onend = (event) => {
        console.log('SpeechSynthesisUtterance.onend');
        // this.synth.speak(new SpeechSynthesisUtterance('done!'));
        // this.utterance = null;
      };

      this.utterance.onerror = (event) => {
        console.error('error: SpeechSynthesisUtterance.onerror');
      };

      this.synth.speak(this.utterance);
    }
  }
}
