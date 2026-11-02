import Footer from "./components/Footer";
import Header from "./components/Menu";
import MainPage from "./components/MainPage";

export default function App() {
  return (
    <div className="min-h-screen bg-black text-white select-none">
      <Header />
      <MainPage />
      <Footer />
    </div>
  )
}


