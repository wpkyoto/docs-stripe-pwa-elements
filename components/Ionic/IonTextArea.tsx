import dynamic from "next/dynamic";

export const IonTextarea = dynamic(
  async () => {
    const mod = await import("@ionic/react");
    return mod.IonTextarea;
  },
  { ssr: false } // this is what makes it work
);
