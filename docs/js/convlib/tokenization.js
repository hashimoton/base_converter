let Dictionary = {};

const tokenize = (match) => {
  if(Dictionary[match]) {
    return Dictionary[match];
  }
  
  const new_token = `NAME_${Object.keys(Dictionary).length}_`;
  Dictionary[match] = new_token;
  return new_token;
};

export const Tokenization = {
  "name": "tokenization",
  "func": (input) => {
    let tokenized_text = "";
    if(input) {
      tokenized_text = input.replace(
        /([A-Z][A-z0-9\-]+|[0-9]+|[@\/][A-z0-9]+)/ug,
        tokenize);
    }
    console.log(Dictionary);
    return tokenized_text;
  }
};

