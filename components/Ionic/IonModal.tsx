import dynamic from "next/dynamic";

export const IonModal = dynamic(
  async () => {
    const mod = await import("@ionic/react");
    return mod.IonModal;
  },
  { ssr: false } // this is what makes it work
);
