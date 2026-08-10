import { Routes, Route } from "react-router";
import Layout from "@/components/Layout";
import { AudioProvider } from "@/providers/AudioProvider";
import Home from "@/pages/Home";
import Work from "@/pages/Work";
import Music from "@/pages/Music";
import Gaming from "@/pages/Gaming";

export default function App() {
  return (
    <AudioProvider>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="work" element={<Work />} />
          <Route path="music" element={<Music />} />
          <Route path="gaming" element={<Gaming />} />
        </Route>
      </Routes>
    </AudioProvider>
  );
}
