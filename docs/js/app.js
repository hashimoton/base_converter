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
  
  converters['line_count'] = (input_text) => {
    const input_lines = input_text.split('\n');
    return input_lines.length;
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
    let packages = ['', '', ''];
    
    for(const line of input_lines) {
      if(!is_skippable(line)) {
        output_lines.push(line);
      }
      
      const stack_regex = /\s+at ([\w.$<>]+)\(([^)]+)\)/;
      const matches = stack_regex.exec(line) || [];
      console.log({matches});
      
      if(matches.length == 3) {
        const modules = matches[1].split('.');
        const j_method = modules.pop();
        const j_class = modules.pop();
        const j_package = modules.join('.');
        packages.push(j_package);
        packages.shift();
        const j_source = matches[2];
        console.log([{j_class}, {j_method}, {j_source}, {packages}]);
        
        if(packages[0] === j_package && packages[1] === j_package) {
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
