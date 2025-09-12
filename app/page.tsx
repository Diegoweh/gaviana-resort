import Rooms from "@/components/layout/Rooms";
import VideoBanner from "@/components/layout/VideoBanner";
import WeSection from "@/components/layout/WeSection";

import Image from "next/image";

export default function Home() {
  return (
    
    <>
    <VideoBanner
          desktopVideo="/media/gavianaHeader.mp4"
          mobileVideo="/media/gavianaHeader.mp4"          
    />
    <WeSection />

    <Rooms />
   
    </>

  );
}
