const is_skippable = (line) => {
  if (
    line.match(/org\.apache\.felix\.http\.base\.internal\./) ||
    line.match(/\.doFilter\(/)
  ) {
    return true;
  } else {
    return false;
  }
};

export const ShortTrace = {

  "name": "shorttrace",
  
  "func" : (input) => {
    const input_lines = input.split("\n");
    let output_lines = [];
    let packages = ["", "", ""];

    const line_count = input_lines.length;
    for (let i = 0; i < line_count; i++) {
      const line = input_lines[i];

      if (!is_skippable(line)) {
        output_lines.push(line);
      }

      const stack_regex = /\s+at ([\w.$<>]+)\(([^)]+)\)/;
      const matches = stack_regex.exec(line) || [];
      console.log({ matches });

      if (matches.length == 3) {
        const modules = matches[1].split(".");
        const j_method = modules.pop();
        const j_class = modules.pop();
        const j_package = modules.join(".");
        packages.push(j_package);
        packages.shift();
        const j_source = matches[2];
        console.log([
          { j_class },
          { j_method },
          { j_source },
          { packages },
        ]);

        if (packages[0] === j_package && packages[1] === j_package) {
          if (
            !/\s- \w/.exec(input_lines[i + 1]) &&
            output_lines.slice(-1)[0] !== "..."
          ) {
            output_lines.pop();
            output_lines.pop();
            output_lines.push("...");
          }
        }
      } else {
        packages = ["", "", ""];
      }
    }

    return output_lines.join("\n");
  }
};

