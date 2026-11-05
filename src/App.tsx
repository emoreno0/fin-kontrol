import Menu from "./components/Menu";
import MainPage from "./components/MainPage";

export default function App() {
  return (
    <div className="flex min-h-screen w-full select-none">
      <Menu />

      <main className="min-w-0 flex-1">
        <MainPage />
      </main>
    </div>
  );
}