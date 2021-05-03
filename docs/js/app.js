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
  
  converters['shorttrace'] = (input_text) => {
    const input_lines = input_text.split('\n');
    let output_lines = [];
    let prev_j_package = '';
    
    //	at org.apache.jackrabbit.oak.core.SecureNodeBuilder.getChildNode(SecureNodeBuilder.java:328)
    for(const line of input_lines) {
      const stack_regex = /\s+at ([\w.$<>]+)\(([\w.]+)\:(\d+)\)/;
      const matches = stack_regex.exec(line) || [];
      console.log(matches);
      
      if(matches.length == 4) {
        const modules = matches[1].split('.');
        const j_method = modules.pop();
        const j_class = modules.pop();
        const j_package = modules.join('.');
        const j_source = matches[2];
        const j_line = matches[3];
        console.log("package=" + j_package);
        console.log("class=" + j_class);
        console.log("method=" + j_method);
        console.log("source=" + j_source);
        console.log("source=" + j_line);
        
        if(prev_j_package === j_package) {
          if(output_lines.slice(-1)[0] !== '...') {
            output_lines.push('...');
          }
        } else {
          output_lines.push(line);
          prev_j_package = j_package;
        }
      } else {
        output_lines.push(line);
        prev_j_package = '';
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
