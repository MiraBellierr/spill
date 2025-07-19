export default function Home() {
  return (
    <div className="min-h-screen bg-blue-50 text-blue-900 font-[sans-serif] flex flex-col">
      <header className="bg-blue-200 border-b-2 border-blue-300 p-4 text-center text-4xl font-bold text-blue-700 shadow-sm">
        <span className="tracking-widest">Mirabellier</span>
      </header>

      <div className="flex lg:flex-row flex-col flex-grow p-4 max-w-7xl mx-auto w-full">
        
        <div className="flex-grow flex-col">
          <aside className="mb-auto bg-blue-100 border border-blue-300 rounded-xl shadow-md">
            <nav className="space-y-2 mb-4">
              <h2 className="text-blue-600 font-bold text-lg text-center p-4">site navigation</h2>
              <ul>
                <li className="text-sm text-center font-bold text-blue-500">home</li>
                <li className="text-sm text-center font-bold text-blue-500">about</li>
                <li className="text-sm text-center font-bold text-blue-500">page</li>
                <li className="text-sm text-center font-bold text-blue-500">another page</li>
                <li className="text-sm text-center font-bold text-blue-500">another page (maybe)</li>
              </ul>
            </nav>
          </aside>

          <div className=" mt-3 mb-auto">
            <img className="h-101 border border-blue-700 shadow-md rounded-2xl" src="https://media1.tenor.com/m/jW2TAwN7h50AAAAC/anime-kanna-kobayashi.gif"/>
          </div>
        </div>
   

        <main className="w-full lg:w-3/5 space-y-6 p-4">
          
          <div className="bg-white p-4 border border-blue-300 rounded-xl shadow">
            <h2 className="text-xl font-bold text-blue-700 mb-2">Welcome to my website!! ^-^</h2>
            <p>Here you can read all about me</p>
            <div className="mt-2 text-sm text-blue-500">
              <p>If you see this, you're cute!!</p>
            </div>
            <div className="mt-2 border-t border-blue-200 pt-2">
              <p>my fwends badboi, prasmit, jas, starker</p>
            </div>
          </div>

          <div className="bg-white p-4 border border-blue-300 rounded-xl shadow">
            <p className="font-bold text-blue-600">Maybe I will write something here soon...</p>
          </div>

            <div className="absolute bottom-1.5">
                <img src="https://imgs.search.brave.com/uy27yZbDjO88Pz6pD7TOlki0cwTwOUy8-WlGKSY6gqc/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9naWZk/Yi5jb20vaW1hZ2Vz/L2hpZ2gvdHJhbnNw/YXJlbnQtYW5pbWUt/Y3V0ZS1zdGl0Y2gt/d2VhcmluZy1oZWFk/YmFuZC13MWNvbmpr/dXdqYzV3NmVxLmdp/Zg.gif"/>
            </div>

        </main>

        <aside className="w-full lg:w-1/5 mb-auto bg-blue-100 border border-blue-300 rounded-xl shadow-md p-4">
          <div className="space-y-2 text-sm">
            <h2 className="text-blue-600 font-bold text-lg text-center">images maybe</h2>
            <p>updates on my images will be displayed here</p>
            <div className="mt-3">
              <img className="rounded w-full object-cover" src="https://i.pinimg.com/736x/ee/2a/71/ee2a7149341c2b23ae2e9c7358ec247d.jpg" />
            </div>
          </div>
        </aside>

      </div>

        <footer className="flex justify-between bg-blue-200 border-b-2 border-blue-300 p-4 text-sm font-bold text-blue-700 shadow-sm">
            <span className="tracking-tight text-left">Made with love ❤️ by mirabellier</span>
            <p className="tracking-tight text-center">I love ya!! ❤️</p>
        </footer>

    </div>
  );
}
