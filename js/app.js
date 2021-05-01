(function() {
  'use strict';
  
  const convert = (input_text) => {
    let output = '!' + input_text + '?';
    return output;
  };
  
  
  const enable_converter = (button_selector, input_selector, output_selector) => {
    document.querySelector(button_selector).addEventListener('click', () => {
      const input_text = document.querySelector(input_selector).value;
      document.querySelector(output_selector).value = convert(input_text);
    });
  };
  
  document.addEventListener('DOMContentLoaded', () => {
    enable_converter('#convert_button', '#input_text', '#output_text');
  });
  


})();
