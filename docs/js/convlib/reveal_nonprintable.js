const reveal_char = (match) => {
  const hex = match.charCodeAt(0).toString(16).toUpperCase().padStart(2, '0');
  const starred = `★0x${hex}★`;
  console.log(`found ${starred}: ${match}`);
  return starred;
};

export const RevealNonPrintable = {
  "name": "reveal_nonprintable",
  "func": (input) => {
    let revealed = input;
    if(input) {
      revealed = input.replace(/(\u000B)/ug, reveal_char); // VT
    }
    return revealed;
  }
};

