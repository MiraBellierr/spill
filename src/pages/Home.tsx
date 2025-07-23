import Navigation from "../components/Navigation";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Divider from "../components/Divider";

import background from "../assets/background.jpeg";

const Home = () => {

  return (
    <div className="min-h-screen text-blue-900 font-[sans-serif] flex flex-col">
      <Header />
      
     <div className="min-h-screen flex flex-col bg-cover bg-no-repeat bg-scroll" style={{ backgroundImage: `url(${background})` }}>
        <div className="flex lg:flex-row flex-col flex-grow p-4 max-w-7xl mx-auto w-full">
          
          <div className="flex-grow flex-col">
            <Navigation />

            <div className=" mt-3 mb-auto justify-center items-center flex">
              <img className="h-101 border border-blue-700 shadow-md rounded-2xl" src="https://media1.tenor.com/m/jW2TAwN7h50AAAAC/anime-kanna-kobayashi.gif"/>
            </div>
          </div>
    

          <main className="w-full lg:w-3/5 space-y-2 p-4">
            
            <div className="space-y-1 p-2 border-[10px] [border-image:url('/border.png')_10_fill_round]">
              <h2 className="text-xl font-bold text-blue-700 mb-2">🌸 About Me 🌸</h2>
              <p>Hiya!! I'm Mirabellier! 💙</p>
              <p>I'm just a <span className="font-bold text-blue-600">chill internet spirit</span> who loves <span className="underline font-bold text-blue-600">cute</span> things, and making friends!</p>
              <p>I also enjoy programming, watching anime and cuddling with my cat. (I love cats!! 😸)</p>
              <div className="mt-2 text-sm text-blue-500">
                <p>If you see this, you're cute!!</p>
              </div>
              <div className="mt-2 border-t border-blue-200 pt-2 text-[14px]">
                  <p className='pr-2'>channeling my phychic power. ⚡</p>
              </div>
            </div>

            <Divider />   

            <div className="space-y-1 p-2 border-[10px] [border-image:url('/border.png')_10_fill_round]">
              <h2 className="text-xl font-bold text-blue-700 mb-2">🧠 Random Facts!</h2>
              <p className="">• My favorite color is <span className="font-bold text-blue-300">pastel blue</span> 💙</p>
              <p className="">• I love collecting plushies and stickers</p>
              <p className="">• Sometimes I stay up too late making silly stuff like this</p>
              <p className="">• I think you're awesome just for being here ^-^</p>
            </div>

            <Divider />

            <div className="space-y-1 p-2 border-[10px] [border-image:url('/border.png')_10_fill_round]">
              <h2 className="text-xl font-bold text-blue-700 mb-2">💬 What You’ll Find Here</h2>
              <p className="">This site is just my little corner of the web where I share my thoughts, memories, and maybe some projects I’m working on!
                I might add more pages soon, like:</p>
              <p className="">• ✏️ My blog</p>
              <p className="">• 🎨 Art or doodles</p>
              <p className="">• 🧩 Mini web games</p>
              <p className="">• 💾 Programming experiments</p>
            </div>

          </main>

          <aside className="w-full lg:w-1/5 mb-auto bg-blue-100 border border-blue-300 rounded-xl shadow-md p-4 opacity-90">
            <div className="space-y-2 text-sm">
              <h2 className="text-blue-600 font-bold text-lg text-center">anime updatess!!</h2>
              <p>updates of my currently watching anime displayed here</p>
              <div className="flex flex-col mt-3 space-y-5">
                <a href="https://myanimelist.net/anime/59845/Kaoru_Hana_wa_Rin_to_Saku" target="_blank" rel="noopener noreferrer">
                  <div className="cursor-pointer hover:animate-zoom-out-once border bg-pink-100 border-blue-300 rounded-lg p-2">
                    <h3 className="font-bold text-blue-700">1. The Fragrant Flower Blooms with Dignity</h3>
                    <img className="rounded w-full object-cover" src="https://i.pinimg.com/736x/a2/f6/94/a2f694c10cc0294b62d136e1c54a7731.jpg" />
                  </div>
                </a>
                <a href="https://myanimelist.net/anime/60543/Dandadan_2nd_Season" target="_blank" rel="noopener noreferrer">
                  <div className="cursor-pointer hover:animate-zoom-out-once  bg-green-100 border border-blue-300 rounded-lg p-2">
                    <h3 className="font-bold text-blue-700">2. Dan Da Dan Season 2</h3>
                    <img className="rounded w-full object-cover" src="https://i.pinimg.com/736x/23/e7/f5/23e7f559ae81d246abb9ba9e456f9075.jpg" />
                  </div>
                </a>
                <a href="https://myanimelist.net/anime/21/One_Piece" target="_blank" rel="noopener noreferrer">
                  <div className="cursor-pointer hover:animate-zoom-out-once  bg-yellow-100 border border-blue-300 rounded-lg p-2">
                    <h3 className="font-bold text-blue-700">3. One Piece</h3>
                    <img className="rounded w-full object-cover" src="https://i.pinimg.com/736x/eb/ad/26/ebad2683b9ce3d2eb0fdd23f4e3f8eda.jpg" />
                  </div>
                </a>
              </div>
            </div>
          </aside>

        </div>
      </div>

        <Footer />

    </div>
  );
}

export default Home;