import { useEffect } from "react";
import { useRouter } from "next/router";
import hljs from "highlight.js/lib/core";
import "highlight.js/styles/atom-one-dark.css";
const javascript = require("highlight.js/lib/languages/javascript");
hljs.registerLanguage("javascript", javascript);
/*
import javascript from "highlight.js/lib/languages/javascript";
import typescript from "highlight.js/lib/languages/typescript";
import shell from "highlight.js/lib/languages/shell";
import xml from "highlight.js/lib/languages/xml";
import yaml from "highlight.js/lib/languages/yaml";
hljs.registerLanguage("javascript", javascript);
hljs.registerLanguage("typescript", typescript);
hljs.registerLanguage("xml", xml);
hljs.registerLanguage("html", xml);
hljs.registerLanguage("shell", shell);
hljs.registerLanguage("yaml", yaml);
hljs.registerLanguage("undefined", shell);
*/

export const useHighlightJS = () => {
  const { pathname } = useRouter();
  useEffect(() => {
    hljs.highlightAll();
    //hljs.initHighlighting.called = false
  }, [pathname]);
};
