import dynamic from "next/dynamic";

export const IonInput = dynamic(
  async () => {
    const mod = await import("@ionic/react");
    return mod.IonInput;
  },
  { ssr: false } // this is what makes it work
);
