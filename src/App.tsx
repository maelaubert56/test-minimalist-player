import MiniPlayer from "@/components/MiniPlayer";
function App() {
  const url =
    "https://dn801203.us.archive.org/0/items/BigBuckBunny_328/BigBuckBunny_512kb.mp4";
  return (
    <main className="mx-auto space-y-2 p-4">
      <h1 className="text-xl font-bold">Minimalist Player Test</h1>
      <MiniPlayer videoUrl={url} />
      <p className="text-sm text-gray-500">Press Play to start</p>
    </main>
  );
}

export default App;
