export const EncodeUTF8 = {
  "name": "encode_utf8",
  "func" : (input) => {
    const encoder = new TextEncoder();
    return encoder.encode(input);
  }
};

