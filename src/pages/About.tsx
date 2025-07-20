import divider from "../assets/divider.png";
import Navigation from "../components/Navigation";

const About = () => {
  return (
    <div className="min-h-screen bg-blue-50 text-blue-900 font-[sans-serif] flex flex-col">
      <header className="bg-blue-200 border-b-2 border-blue-300 p-4 text-center text-4xl font-bold text-blue-700 shadow-sm">
        <span className="tracking-widest">Mirabellier</span>
      </header>

      <div className="flex lg:flex-row flex-col flex-grow p-4 max-w-7xl mx-auto w-full">
        
        <div className="flex-grow flex-col">
          <Navigation />

          <div className=" mt-3 mb-auto lg:w-[339px]">
            <img className="h-101 rounded-2xl" src="https://media1.tenor.com/m/VyjZtGRNcMcAAAAd/misskobayashi.gif"/>
          </div>
        </div>
   

        <main className="w-full lg:w-3/5 space-y-2 p-4">
          
          <div className="space-y-1 bg-white p-4 border border-blue-300 rounded-xl shadow">
            <h2 className="text-xl font-bold text-blue-700 mb-2">___🖊️Introduction</h2>
            <div className="space-y-2">
              <p>I am a software developer with over 3 years of experience using Node.js and JavaScript. I have a strong foundation in web development, with familiarity of React.JS.</p>
              <p>I have worked on a wide range of projects, including web applications, React Native mobile apps, and APIs. My Node.js skills have enabled me to efficiently develop scalable and maintainable solutions. I am constantly learning and keeping up with the latest technologies in order to improve my skills and provide the best results for my clients.</p>
              <p>In addition to my technical abilities, I am a team player who enjoys working with others to develop creative solutions to complex problems. I am committed to producing high-quality work and constantly learning and improving my skills.</p>
              <p>I am eager to continue my career in software development and am confident in my ability to contribute to any team.</p>
            </div>
          </div>

          <div className="flex flex-row">
            <img className="h-5 w-60" src={divider}/>
            <img className="h-5 w-60" src={divider}/>
            <img className="h-5 w-60" src={divider}/>
          </div>    

          <div className="space-y-2 bg-white p-4 border border-blue-300 rounded-xl shadow">
            <h2 className="text-xl font-bold text-blue-700 mb-2">📂 Projects</h2>
            <div className="space-y-2 pt-2">
              <h3 className="font-bold text-blue-300">1. Jasmine (<a className="cursor-pointer underline hover:animate-wiggle" href="https://github.com/MiraBellierr/jasmine">Github</a>)</h3>
              <p className="text-sm">A Discord bot I casually developed to keep me learning NodeJS and the fundamentals of REST APIs. The algorithms and the fundamentals of RPG games in turn-based games, the item system, economy system, critical attacks, and luck-based games are strongly used in this project.</p>
            </div>
            <div className="space-y-2 pt-2">
              <h3 className="font-bold text-blue-300">2. Appointment Mobile Application</h3>
              <p className="text-sm">A mobile application for my Final Year Project. The development include using NodeJS, Appwrite, and React Native. The features include a login and sign-up system, notification system, and calendar system.</p>
            </div>
            <div className="space-y-2 pt-2">
              <h3 className="font-bold text-blue-300">3. Conference - Attendance Based Mobile Application</h3>
              <p className="text-sm">This is a client project. It's a mobile application developed using React Native and Firebase. The features include an import system from spreadsheet, QR scanning for attendance, and the announcement system.</p>
            </div>
          </div>

        </main>

        <div className="flex-col">
          <aside className="w-full lg:w-[200px] mb-auto bg-blue-100 border border-blue-300 rounded-xl shadow-md p-4">
            <div className="space-y-2 text-sm text-center font-bold">
              <h2 className="text-blue-600 font-bold text-lg">Skills</h2>
              <p className="text-blue-500">1. Javascript</p>
              <p className="text-blue-500">2. NodeJS</p>
              <p className="text-blue-500">3. TypeScript</p>
              <p className="text-blue-500">4. React</p>
              <p className="text-blue-500">5. React Native</p>
    
            </div>
          </aside>

          <div className=" mt-3 mb-auto lg:w-[200px] ">
            <img className="h-101 rounded-2xl" src="https://media1.tenor.com/m/8o3YhF-eByUAAAAC/kanna-kamui.gif"/>
          </div>
        </div>
        

      </div>

        <footer className="flex justify-between bg-blue-200 border-b-2 border-blue-300 p-4 text-sm font-bold text-blue-700 shadow-sm">
            <span className="tracking-tight text-left">Made with love ❤️ by mirabellier</span>
            <p className="tracking-tight text-center">I love ya!! ❤️</p>
        </footer>

    </div>
  );
}

export default About;