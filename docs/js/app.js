import {Converter} from './converter.js'

const selected_converter = (configuration_selector) => {
  return document.querySelector(configuration_selector).value;
};

const enable_convert = (convert_selector, converters_selector, input_selector, output_selector) => {
  const converter = new Converter();
  
  document.querySelector(convert_selector).addEventListener('click', () => {
    const input_text = document.querySelector(input_selector).value;
    const converter_name = selected_converter(converters_selector);
    document.querySelector(output_selector).value = converter.convert(converter_name, '' + input_text);
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

