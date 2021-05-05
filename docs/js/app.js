(function() {
  'use strict';
  
  const converters = {
  };
  
  converters['copy'] = (input_text) => {
    return input_text;
  };
  
  converters['quote'] = (input_text) => {
    return '"' + input_text + '"';
  };
  
  converters['encode_utf8'] = (input_text) => {
    const encoder = new TextEncoder();
    const codes = encoder.encode(input_text);
    return codes;
  };
  
  const is_skippable = (line) => {
    if(line.match(/org\.apache\.felix\.http\.base\.internal\./)
      || line.match(/\.doFilter\(/)) {
      return true;
    } else {
      return false;
    }
  }
  
  converters['shorttrace'] = (input_text) => {
  
    const input_lines = input_text.split('\n');
    let output_lines = [];
    let j_package = '';
    let prev_j_package = '';
    let prev_prev_j_package = '';
    
    for(const line of input_lines) {
      if(!is_skippable(line)) {
        output_lines.push(line);
      }
      
      const stack_regex = /\s+at ([\w.$<>]+)\(([^)]+)\)/;
      const matches = stack_regex.exec(line) || [];
      console.log(matches);
      
      if(matches.length == 3) {
        const modules = matches[1].split('.');
        const j_method = modules.pop();
        const j_class = modules.pop();
        prev_prev_j_package = prev_j_package;
        prev_j_package = j_package;
        j_package = modules.join('.');
        const j_source = matches[2];
        console.log("package=" + j_package);
        console.log("class=" + j_class);
        console.log("method=" + j_method);
        console.log("source=" + j_source);
        
        if(prev_j_package === j_package && prev_prev_j_package == j_package) {
          if(output_lines.slice(-1)[0] !== '...') {
            output_lines.pop();
            output_lines.pop();
            output_lines.push('...');
          }
        }
      }
    }
    
    return output_lines.join('\n');
  };
  
  const selected_converter = (configuration_selector) => {
    const converter_name = document.querySelector(configuration_selector).value;
    return converters[converter_name];
  };
  
  
  const enable_convert = (convert_selector, converters_selector, input_selector, output_selector) => {
    document.querySelector(convert_selector).addEventListener('click', () => {
      const input_text = document.querySelector(input_selector).value;
      const convert = selected_converter(converters_selector);
      document.querySelector(output_selector).value = convert(input_text);
    });
  };
  
  const enable_swap = (swap_selector, input_selector, output_selector) => {
    document.querySelector(swap_selector).addEventListener('click', () => {
      const input_text = document.querySelector(input_selector).value;
      document.querySelector(input_selector).value = document.querySelector(output_selector).value;
      document.querySelector(output_selector).value = '' + input_text;
    });
  };
  
  document.addEventListener('DOMContentLoaded', () => {
    enable_convert('#convert_button', '#converter_configuration', '#input_text', '#output_text');
    enable_swap('#swap_button', '#input_text', '#output_text');
  });
  


})();
