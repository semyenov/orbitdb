import { build } from "esbuild";

build({
  outdir: "./dist",
  entryPoints: ["./src/index.ts"],
  tsconfig: "./tsconfig.build.json",
  sourcemap: "linked",
  format: "esm",
  minify: true,
  bundle: true,
  treeShaking: true,
  define: {
    "process.env.NODE_DEBUG": "false",
    "process.env.NODE_ENV": '"production"',
    global: "globalThis",
  },
}).catch(() => process.exit(1));
