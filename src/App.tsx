import { Routes, Route } from "react-router-dom";
import { Helmet } from "react-helmet";
import Home from "./pages/Home";
import About from "./pages/About";
import Blog from "./pages/Blog";
import Art from "./pages/Art";
import BlogEdit from "./pages/BlogEdit";

function App() {

  return (
    <div>
      <Helmet>
        <title>Mirabellier ⭐</title>
        <link rel="icon" href="https://mirabellier.my.id/favicon.jpg" />
        <meta name="theme-color" content="#EE82EE" />
        <meta content="Mirabellier ⭐ | My blog" property="og:title" />
        <meta content="This site is just my little corner of the web where I share my thoughts, memories, and maybe some projects I’m working on! I might add more pages soon." property="og:description" />
        <meta content="Mirabellier" property="og:site_name" />
        <meta content='https://mirabellier.my.id/favicon.jpg' property='og:image' />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:site" content="Mirabellier ⭐" />
        <meta name="twitter:creator" content="@mirabellier" />
        <meta name="twitter:title" content="Mirabellier ⭐ | My blog" />
        <meta name="twitter:description" content="This site is just my little corner of the web where I share my thoughts, memories, and maybe some projects I’m working on! I might add more pages soon." />
        <meta name="twitter:image" content="https://mirabellier.my.id/background.jpg" />
      </Helmet>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/spill" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/art" element={<Art />} />
        <Route path="/blog/edit" element={<BlogEdit />} />
      </Routes>
    </div>
  )
}

export default App
