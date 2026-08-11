// src/data/videos.ts — the screening wall (Amreet Aint on YouTube)
// Five curated uploads across the channel's niches. Swap or reorder freely —
// the Play Room renders whatever is here.
import type { Video, VideoChannel } from "@/types";

export const videoChannel: VideoChannel = {
  name: "Amreet Aint",
  url: "https://www.youtube.com/@amreetaintofficial",
};

export const videos: Video[] = [
  {
    id: "ps5-gta-vi",
    index: "01",
    youtubeId: "WtIsQf1LZn0",
    title: "Unboxing PS5 for GTA VI",
    duration: "14:26",
    published: "APR 2026",
  },
  {
    id: "skyblock-100-days",
    index: "02",
    youtubeId: "niWO7pem-P4",
    title: "Can I Survive 100 Days In Minecraft Skyblock?",
    duration: "18:35",
    published: "DEC 2025",
  },
  {
    id: "gow-walkthrough",
    index: "03",
    youtubeId: "SfOidCiyf4k",
    title: "What A Game This is | GoW 2018 Complete Walkthrough",
    duration: "3:27:57",
    published: "JUL 2026",
  },
  {
    id: "haveli-horror",
    index: "04",
    youtubeId: "5l0oSZDT_Qo",
    title: "12 AM Par Phas Gaya Darawani Haveli Mein!",
    duration: "58:23",
    published: "OCT 2025",
  },
  {
    id: "valorant-veto",
    index: "05",
    youtubeId: "BfkAOWorXOY",
    title: "Veto in Plat vs Immortal — Here's What Happened",
    duration: "5:06",
    published: "OCT 2025",
  },
];
