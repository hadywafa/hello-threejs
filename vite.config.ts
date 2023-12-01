import { defineConfig } from "vite";
import path from "path";

export default defineConfig(({ command, mode, isSsrBuild, isPreview }) => {
  // console.log("command => " + command, ",mode => " + mode);
  // console.log("isSsrBuild => " + isSsrBuild, ",isPreview => " + isPreview);

  return {
    base: "/",
    logLevel: "error",
    server: {
      port: 3200,
    },
    build: {
      rollupOptions: {
        input: {
          home: path.resolve(__dirname, "./src/components/home/home.html"),
          about: path.resolve(__dirname, "./src/components/about/about.html"),
        },
      },
    },
  };
});
//---------------------------------
// export default{};
//---------------------------------
// export default defineConfig({});
//---------------------------------
