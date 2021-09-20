import dynamic from "next/dynamic";

export const IonHeader = dynamic(
  async () => {
    const mod = await import("@ionic/react");
    return mod.IonHeader;
  },
  { ssr: false } // this is what makes it work
);
