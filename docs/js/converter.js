import {Copy} from './convlib/copy.js';
import {Quote} from './convlib/quote.js';
import {LineCount} from './convlib/line_count.js';
import {EncodeUTF8} from './convlib/encode_utf8.js';
import {ShortTrace} from './convlib/shorttrace.js';

class Converter {

  constructor() {
    console.log("Converter initiated");
    console.log(Copy.name);
    
    const convlib = [];
    convlib[Copy.name] = Copy.func;
    convlib[Quote.name] = Quote.func;
    convlib[LineCount.name] = LineCount.func;
    convlib[EncodeUTF8.name] = EncodeUTF8.func;
    convlib[ShortTrace.name] = ShortTrace.func;
    
    console.log(EncodeUTF8.constructor.name);
    
    this.convlib = convlib;
    
  }

  convert(name, input) {
    console.log("Convert by " + name); 
    const convfunc = this.convlib[name] || this.convlib[Copy.name];
    return convfunc(input);
  }
}

export { Converter };

