import "./App.css";
import Header from "../components/header/header";
import Footer from "../components/footer/footer";
import Main from "../components/main/main";

function App() {
  return (
    <div className="flex flex-col bg-yellow-100 h-screen">
      <Header />
      <Main />
      <Footer />
    </div>
  );
}

export default App;
