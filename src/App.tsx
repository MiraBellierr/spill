import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Blog from "./pages/Blog";
import Art from "./pages/Art";
import BlogEdit from "./pages/BlogEdit";

function App() {
  return (
    <div>
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
