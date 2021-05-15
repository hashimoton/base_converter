import {Copy} from './convlib/copy.js';
import {Quote} from './convlib/quote.js';
import {LineCount} from './convlib/line_count.js';
import {EncodeUTF8} from './convlib/encode_utf8.js';
import {ShortTrace} from './convlib/shorttrace.js';

const libs = [Copy, Quote, LineCount, EncodeUTF8, ShortTrace];

class Converter {

  constructor() {
    console.log("Converter initiated");
    console.log(Copy.name);
    
    const convlib = [];
    for(const lib of libs) {
      convlib[lib.name] = lib.func;
    }
    
    this.convlib = convlib;
    
  }

  convert(name, input) {
    console.log("Convert by " + name); 
    const convfunc = this.convlib[name] || this.convlib[Copy.name];
    return convfunc(input);
  }
}

export { Converter };

