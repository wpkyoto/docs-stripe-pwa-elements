import dynamic from "next/dynamic";

export const IonLabel = dynamic(
  async () => {
    const mod = await import("@ionic/react");
    return mod.IonLabel;
  },
  { ssr: false } // this is what makes it work
);
