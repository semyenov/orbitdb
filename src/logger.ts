import c from "chalk";
import { inspect } from "util";
import { ConsolaReporter, createConsola } from "consola";

const reporter: ConsolaReporter = {
  log(logObj, { options: { formatOptions } }) {
    const [message, ...args] = logObj.args;
    const formatted = args.map((args) =>
      typeof args === "object" ? inspect(args, formatOptions) : "\n" + args
    );
    console.log(
      c.gray(`[${logObj.tag}]`) +
        c.cyan.bold(` ─── ${message} `) +
        formatted.join("\n") +
        "\n",
    );
  },
};

export const logger = createConsola({
  reporters: [reporter],
  throttle: 100,
  throttleMin: 10,

  formatOptions: {
    columns: 1,
    colors: true,
    date: false,
    compact: false,
  },

  defaults: {
    tag: "orbitdb",
  },
});
