import dynamic from "next/dynamic";

export const IonButton = dynamic(
  async () => {
    const mod = await import("@ionic/react");
    return mod.IonButton;
  },
  { ssr: false } // this is what makes it work
);
