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
      // Control characters excluding NUL, HT, LF, CR
      // Invisible separators
      // https://dic.nicovideo.jp/a/%E2%81%A3
      revealed = input.replace(
        /([\u0001-\u0008]|\u000B|\u000C|[\u000E-\u001F]|\u007F|\u115F|\u1160|\u180E|\u200B|\u200C|\u200D|\u2060|\u2061|\u2062|\u2063|\u2064|\u3164|\uFFA0)/ug,
        reveal_char);
    }
    return revealed;
  }
};

