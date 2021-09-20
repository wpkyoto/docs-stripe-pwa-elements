import dynamic from "next/dynamic";

export const IonSplitPane = dynamic(
  async () => {
    const mod = await import("@ionic/react");
    return mod.IonSplitPane;
  },
  { ssr: false } // this is what makes it work
);
