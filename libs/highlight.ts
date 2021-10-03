import { useEffect } from "react";
import { useRouter } from "next/router";
import hljs from "highlight.js/lib/core";
import "highlight.js/styles/atom-one-dark.css";

const registerHljsLanguages = (name: string, pathName?: string): void => {
  try {
    const mod = require(`../node_modules/highlight.js/lib/languages/${
      pathName || name
    }`);
    hljs.registerLanguage(name, mod);
  } catch (e) {
    console.log(e);
  }
};
registerHljsLanguages("javascript");
registerHljsLanguages("typescript");
registerHljsLanguages("shell");
registerHljsLanguages("html", "xml");
registerHljsLanguages("undefined", "shell");

export const useHighlightJS = () => {
  const { pathname } = useRouter();
  useEffect(() => {
    hljs.highlightAll();
    //hljs.initHighlighting.called = false
  }, [pathname]);
};
