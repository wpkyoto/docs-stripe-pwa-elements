import dynamic from "next/dynamic";

export const IonIcon = dynamic(
  async () => {
    const mod = await import("@ionic/react");
    return mod.IonIcon;
  },
  { ssr: false } // this is what makes it work
);
