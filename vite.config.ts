import { defineConfig } from "vite";

// import path from "path";
// export default defineConfig(({ command, mode, isSsrBuild, isPreview }) => {
//   console.log("command => " + command, ",mode => " + mode);
//   console.log("isSsrBuild => " + isSsrBuild, ",isPreview => " + isPreview);
//   return {
//     base: "/home",
//     logLevel: "error",
//     server: {
//       port: 3200,
//     },
//     build: {
//       rollupOptions: {
//         input: {
//           home: path.resolve(__dirname, "./src/components/home/home.html"),
//           about: path.resolve(__dirname, "./src/components/about/about.html"),
//         },
//       },
//     },
//   };
// });
//---------------------------------
const isCodeSandbox = !!process.env.SANDBOX_URL;
export default defineConfig({
  root: "src/",
  publicDir: "../static/",
  base: "./",
  server: {
    host: true,
    open: !isCodeSandbox,
    port: 3200,
  },
  build: {
    outDir: "../dist",
    emptyOutDir: true,
    sourcemap: true,
  },
});
//---------------------------------
// export default defineConfig({});
//---------------------------------
