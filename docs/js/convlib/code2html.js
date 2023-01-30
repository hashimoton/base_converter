export const Code2HTML = {
  "name": "code2html",
  "func": (input) => {
    let escaped = input;
    if(input) {
      escaped = input.replace(/&/g, '&amp;')
                  .replace(/</g, '&lt;')
                  .replace(/>/g, '&gt;')
                  .replace(/"/g, '&quot;')
                  .replace(/'/g, '&#039;');
    }
    return `<pre><code>${escaped}</code></pre>`;
  }
};

