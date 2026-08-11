// src/pages/Work.tsx — The Engineering Wing (design-v2 work.md)
import WingHeader from "@/sections/work/WingHeader";
import AccordionGallery from "@/sections/work/AccordionGallery";
import MaterialsWall from "@/sections/work/MaterialsWall";
import Provenance from "@/sections/work/Provenance";
import NextRoom from "@/sections/work/NextRoom";
import { usePageTitle } from "@/hooks/usePageTitle";

export default function Work() {
  usePageTitle("Work");
  return (
    <>
      <WingHeader />
      <AccordionGallery />
      <MaterialsWall />
      <Provenance />
      <NextRoom />
    </>
  );
}
