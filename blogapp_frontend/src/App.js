import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login/Login";
import Home from "./pages/Home/Home";
import Registration from "./pages/Registration/Registration";
import Blog from "./pages/Blog/Blog";
import ProtectedRoute from "./component/ProtectedRoute";
import Drafts from "./pages/Drafts/Drafts";
import MyBlogs from "./pages/MyBlogs/MyBlogs";
import { BlogProvider } from './context/Context';

const App = () => {
  return (
    <>
    <BlogProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/registration" element={<Registration />} />
          <Route path="/" element={<Login />} />
          <Route element={<ProtectedRoute />}>
              <Route path="/home" element={<Home />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/my-drafts" element={<Drafts />} />
              <Route path="/my-blogs" element={<MyBlogs />} />
          </Route>
        </Routes>
      </BrowserRouter>
      </BlogProvider>
    </>
  )
}

export default App;





































