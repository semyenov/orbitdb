import c from "chalk";
import { inspect } from "util";
import { ConsolaReporter, createConsola } from "consola";
import { nextTick, stdout } from "process";

inspect.defaultOptions = {
  numericSeparator: true,
  breakLength: 80,
  getters: true,
  depth: 3,
};

const accentMap = {
  log: c.bgWhite,
  debug: c.bgBlackBright,
  info: c.bgCyan,
  warn: c.bgYellow,
  error: c.bgRedBright,
  success: c.bgGreen,
} as const;

const reporter: ConsolaReporter = {
  log(obj, { options: { formatOptions } }) {
    const [message, ...args] = obj.args;
    const accent = accentMap[obj.type];

    stdout.cork();

    stdout.write(c.dim("\n┌── "));
    stdout.write(
      accent.bold(` ${obj.tag.toUpperCase()} `),
    );
    stdout.write(c.dim(" ─ "));
    stdout.write(c.italic(`${message}`));
    stdout.write("\n");

    (typeof args[0] !== "object" ||
      formatOptions.compact) &&
      stdout.write("\n");
    args.forEach((arg) => {
      stdout.write(inspect(arg, formatOptions));
      stdout.write("\n");
    });
    (typeof args[args.length - 1] !== "object" ||
      formatOptions.compact) &&
      stdout.write("\n");

    stdout.write(c.dim("└── "));
    if (formatOptions.date) {
      stdout.write(c.dim(`${obj.date.getTime()}`));
    }
    stdout.write("\n");
    stdout.write("\n");

    nextTick(() => stdout.uncork());
  },
};

export const logger = createConsola({
  reporters: [reporter],
  throttle: 100,
  throttleMin: 10,

  formatOptions: {
    columns: 1,
    colors: true,
    date: true,
    compact: true,
  },

  defaults: {
    tag: "orbitdb",
  },
});
