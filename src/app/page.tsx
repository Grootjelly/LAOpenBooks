import Scene1Hero from "@/components/experience/Scene1Hero";
import Scene2Notebook from "@/components/experience/Scene2Notebook";
import Scene3Transform from "@/components/experience/Scene3Transform";
import Scene4Statement from "@/components/experience/Scene4Statement";
import Scene6Ending from "@/components/experience/Scene6Ending";

export default function Home() {
  return (
    <div className="bg-[#060606]">
      <Scene1Hero />
      <Scene2Notebook />
      <Scene3Transform />
      <Scene4Statement />
      <Scene6Ending />
    </div>
  );
}
