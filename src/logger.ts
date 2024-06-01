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
  log: c.bgWhite.black,
  debug: c.bgBlackBright.whiteBright,
  info: c.bgCyan.black,
  warn: c.bgYellow.black,
  error: c.bgRed.white,
  success: c.bgGreen.white,
} as const;

const reporter: ConsolaReporter = {
  log(obj, { options: { formatOptions } }) {
    const [message, ...args] = obj.args;
    const compact = args.length === 0 || formatOptions.compact;
    const accent = accentMap[obj.type];

    stdout.cork();

    stdout.write(
      c.dim("\n┌── ").concat(
        accent.bold(` ${obj.tag.toUpperCase()} `),
        c.dim(" ─ "),
        c.italic(message),
        "\n",
      ),
    );

    if (compact || typeof args[0] !== "object") {
      stdout.write("\n");
    }
    for (let i = 0; i < args.length; i++) {
      stdout.write(`${inspect(args[i], formatOptions)}\n`);
    }
    if (compact || typeof args[args.length - 1] !== "object") {
      stdout.write("\n");
    }

    stdout.write(
      c.dim("└── ").concat(
        formatOptions.date ? c.dim(obj.date.getTime().toString()) : "",
        "\n\n",
      ),
    );

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
