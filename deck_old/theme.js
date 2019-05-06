import { default as theme } from "mdx-deck/themes";
import prism from "react-syntax-highlighter/styles/prism/tomorrow";
import prismTypescript from "react-syntax-highlighter/languages/prism/typescript";
import graphql from "react-syntax-highlighter/languages/prism/graphql";

export default {
  ...theme,
  prism: {
    style: prism,
    languages: {
      typescript: prismTypescript,
      graphql
    }
  }
};
