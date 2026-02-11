
import Header from './components/Layout/Header';
import Hero from './components/Sections/Hero';
import Services from './components/Sections/Services';
import About from './components/Sections/About';
import Contact from './components/Sections/Contact';
import Footer from './components/Layout/Footer';


import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import BlogList from './pages/BlogList';
import BlogPostPage from './pages/BlogPost';

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={
              <>
                <Hero />
                <Services />
                <About />
                <Contact />
              </>
            } />
            <Route path="/blog" element={<BlogList />} />
            <Route path="/blog/:slug" element={<BlogPostPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;