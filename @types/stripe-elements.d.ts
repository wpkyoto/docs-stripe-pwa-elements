import { JSX as LocalJSX } from "@stripe-elements/stripe-elements";
import { HTMLAttributes, ReactText } from "react";
type ToReact<T> = {
  [P in keyof T]?: T[P] &
    Omit<HTMLAttributes<Element>, "className"> & {
      class?: string;
      className?: string;
      key?: ReactText;
    };
};

declare global {
  export namespace JSX {
    interface IntrinsicElements
      extends ToReact<
        LocalJSX.IntrinsicElements
      > {
      key?: string;
    }
  }
}
