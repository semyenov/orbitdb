import { nextTick, stdout } from "node:process";
import { inspect } from "node:util";

import c from "chalk";
import { ConsolaOptions, ConsolaReporter, createConsola } from "consola";

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

export const reporter: ConsolaReporter = {
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

    if (!formatOptions.compact) {
      stdout.write(
        c.dim("└── ").concat(
          formatOptions.date ? c.dim(obj.date.getTime().toString()) : "",
          "\n",
        ),
      );
    }
    stdout.write("\n");

    nextTick(() => stdout.uncork());
  },
};
export const createCoolConsola = (options?: Partial<ConsolaOptions>) =>
  createConsola({
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
      tag: "cool:logger",
    },

    ...options,
  });

export const logger = createCoolConsola();

// logger.debug("debug", { a: 1, b: 2 });
// logger.success("success", { test: true, test2: false });
// logger.info("info", { lorem: "ipsum", a: 1, b: 2 });
// logger.warn("warn", { foo: "bar", a: 1, b: 2 });
// logger.error("error", { test: "huest" });
// logger.log("log", { a: 1, b: 2 });
