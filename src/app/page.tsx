import Scene1Dictionary from "@/components/experience/Scene1Dictionary";
import Scene2Dissolve from "@/components/experience/Scene2Dissolve";
import Scene3Metamorphosis from "@/components/experience/Scene3Metamorphosis";
import Scene4Machinery from "@/components/experience/Scene4Machinery";
import Scene5Resolution from "@/components/experience/Scene5Resolution";

export default function Home() {
  return (
    <div className="bg-[#060606] selection:bg-amber-500 selection:text-black">
      <Scene1Dictionary />
      <Scene2Dissolve />
      <Scene3Metamorphosis />
      <Scene4Machinery />
      <Scene5Resolution />
    </div>
  );
}
