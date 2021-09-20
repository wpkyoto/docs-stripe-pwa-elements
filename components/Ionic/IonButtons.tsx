import dynamic from "next/dynamic";

export const IonButtons = dynamic(
  async () => {
    const mod = await import("@ionic/react");
    return mod.IonButtons;
  },
  { ssr: false } // this is what makes it work
);
