import dynamic from "next/dynamic";

export const IonApp = dynamic(
  async () => {
    const mod = await import("@ionic/react");
    return mod.IonApp;
  },
  { ssr: false } // this is what makes it work
);
