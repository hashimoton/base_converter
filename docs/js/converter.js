import {Copy} from './convlib/copy.js';
import {Quote} from './convlib/quote.js';
import {LineCount} from './convlib/line_count.js';
import {EncodeUTF8} from './convlib/encode_utf8.js';
import {Code2HTML} from './convlib/code2html.js';
import {ShortTrace} from './convlib/shorttrace.js';

class Converter {

  constructor() {
    console.log("Converter initiated");
    console.log(Copy.name);
    
    const libs = [Copy, Quote, LineCount, EncodeUTF8, Code2HTML, ShortTrace];
    const convlib = [];
    for(const lib of libs) {
      convlib[lib.name] = lib.func;
    }
    
    this.convlib = convlib;
  }
  
  list() {
    return this.convlib;
  }

  convert(name, input) {
    console.log("Convert by " + name); 
    const convfunc = this.convlib[name] || this.convlib[Copy.name];
    return convfunc(input);
  }
}

export { Converter };

