import Footer from "./components/Footer";
import Header from "./components/Header";
import MainPage from "./components/MainPage";

export default function App() {
  return (
    <div className="min-h-screen bg-black py-4 px-4 space-y-4 text-white select-none">
      <Header />
      <MainPage />
      <Footer />
    </div>
  )
}


