import divider from "../assets/divider.png";
import Navigation from "../components/Navigation";
import Header from "../components/Header";
import Footer from "../components/Footer";

const Art = () => {
    return (
    <div className="min-h-screen bg-blue-50 text-blue-900 font-[sans-serif] flex flex-col">
      <Header />

      <div className="flex lg:flex-row flex-col flex-grow p-4 max-w-7xl mx-auto w-full">
        
        <div className="flex-grow flex-col">
          <Navigation />

        </div>
   

        <main className="w-full lg:w-3/5 space-y-2 p-4">
          
          <div className="space-y-1 bg-white p-4 border border-blue-300 rounded-xl shadow">
            <h2 className="text-xl font-bold text-blue-700 mb-2 text-center">⚙️ Soon to be implement... (art)</h2>
            <img src="https://media1.tenor.com/m/vk4u2ez6sHUAAAAd/kanna-eating.gif" />
          </div>

          <div className="flex flex-row">
            <img className="h-5 w-60" src={divider}/>
            <img className="h-5 w-60" src={divider}/>
            <img className="h-5 w-60" src={divider}/>
          </div>    

        </main>

        <div className="flex-col">
          <div className=" mt-3 mb-auto lg:w-[200px] ">
          </div>
        </div>
        

      </div>

        <Footer />

    </div>
    )
}

export default Art;