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
      document.querySelector(output_selector).value = input_text;
    });
  };
  
  document.addEventListener('DOMContentLoaded', () => {
    enable_convert('#convert_button', '#converter_configuration', '#input_text', '#output_text');
    enable_swap('#swap_button', '#input_text', '#output_text');
  });
  


})();
