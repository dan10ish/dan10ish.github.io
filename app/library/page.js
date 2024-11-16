"use client";

import { useState } from "react";
import {
  Podcast,
  Youtube,
  FileText,
  Globe,
  BookOpen,
  Mail,
  Graduation,
} from "lucide-react";
import Footer from "@/components/Footer";
import ButtonsContainer from "@/components/ButtonsContainer";

const bookCategories = [
  "All",
  "Machine Learning",
  "Computer Science",
  "Robotics",
  "Business",
  "Finance",
  "Creativity",
  "Psychology",
  "Philosophy",
];

const books = [
  {
    title: "Hands-On Machine Learning",
    author: "Aurélien Géron",
    cover:
      "https://m.media-amazon.com/images/I/81R5BmGtv-L._AC_UF1000,1000_QL80_.jpg",
    tags: ["Machine Learning"],
    description:
      "Comprehensive guide to ML with scikit-learn, Keras, and TensorFlow",
  },
  {
    title: "Introduction to Algorithms",
    author: "Thomas H. Cormen",
    cover:
      "https://m.media-amazon.com/images/I/61ZYxrQEpCL._AC_UF350,350_QL50_.jpg",
    tags: ["Computer Science"],
    description: "The essential guide to computer algorithms",
  },
  {
    title: "Modern Robotics",
    author: "Kevin M. Lynch",
    cover:
      "https://rukminim2.flixcart.com/image/850/1000/kjvrdzk0/book/y/y/f/modern-robotics-original-imafzcqxjjpfyytf.jpeg?q=20&crop=false",
    tags: ["Robotics"],
    description: "Mechanics, Planning, and Control",
  },
  {
    title: "Fundamentals of Robotics",
    author: "Robert J. Schilling",
    cover:
      "https://m.media-amazon.com/images/I/81EUesHBzhL._AC_UF1000,1000_QL80_.jpg",
    tags: ["Robotics"],
    description: "Analysis and control of robot manipulators",
  },
  {
    title: "Sell Like Crazy",
    author: "Sabri Suby",
    cover:
      "https://m.media-amazon.com/images/I/71oxg2zBdTL._UF1000,1000_QL80_.jpg",
    tags: ["Business"],
    description: "How to get more customers and clients",
  },
  {
    title: "A Random Walk Down Wall Street",
    author: "Burton Malkiel",
    cover:
      "https://m.media-amazon.com/images/I/61YEPc3XWlL._AC_UF1000,1000_QL80_.jpg",
    tags: ["Finance"],
    description: "The time-tested strategy for successful investing",
  },
  {
    title: "Steal Like an Artist",
    author: "Austin Kleon",
    cover:
      "https://m.media-amazon.com/images/I/81VvqDdHEFL._AC_UF894,1000_QL80_.jpg",
    tags: ["Creativity"],
    description: "10 things nobody told you about being creative",
  },
  {
    title: "The Creative Act",
    author: "Rick Rubin",
    cover:
      "https://m.media-amazon.com/images/I/71dUSlTVOwL._AC_UF1000,1000_QL80_.jpg",
    tags: ["Creativity"],
    description: "A way of being",
  },
  {
    title: "The 48 Laws of Power",
    author: "Robert Greene",
    cover: "https://m.media-amazon.com/images/I/61J3Uu4jOLL.jpg",
    tags: ["Psychology"],
    description: "The definitive manual for anyone interested in gaining power",
  },
  {
    title: "The Almanack of Naval Ravikant",
    author: "Eric Jorgenson",
    cover:
      "https://mphonline.com/cdn/shop/products/the-almanack-of-naval-ravikant.jpg?v=1660113474",
    tags: ["Philosophy"],
    description: "A guide to wealth and happiness",
  },
  {
    title: "Algorithms",
    author: "Jeff Erickson",
    cover:
      "https://archive.org/services/img/Algorithms-Jeff-Erickson/full/pct:200/0/default.jpg",
    tags: ["Computer Science"],
    description: "Comprehensive guide to algorithm design and analysis",
  },
  {
    title: "Open Data Structures",
    author: "Pat Morin",
    cover:
      "https://m.media-amazon.com/images/I/51YgRGbu4bL._AC_UF1000,1000_QL80_.jpg",
    tags: ["Computer Science"],
    description: "An introduction to data structures and algorithms",
  },
];

const resourceCategories = ["All", "YouTube", "Papers"];

const resources = [
  {
    title: "Boris Meinardus",
    creator: "Boris Meinardus",
    link: "https://www.youtube.com/@borismeinardus/",
    category: "YouTube",
    description: "Machine Learning researcher",
  },
  {
    title: "Bridges",
    creator: "Bridges",
    link: "https://www.youtube.com/@bridgesyt",
    category: "YouTube",
    description: "Philosophical insights",
  },
  {
    title: "The Cherno",
    creator: "Yan Chernikov",
    link: "https://www.youtube.com/@TheCherno",
    category: "YouTube",
    description: "Game engine development and C++ programming",
  },
  {
    title: "Andrej Karpathy",
    creator: "Andrej Karpathy",
    link: "https://www.youtube.com/@AndrejKarpathy/",
    category: "YouTube",
    description: "Deep learning and AI concepts explained",
  },
  {
    title: "Easy Actually",
    creator: "Easy Actually",
    link: "https://www.youtube.com/@easyactually",
    category: "YouTube",
    description: "Stuff explained with fewer words and more pictures",
  },
  {
    title: "Horses",
    creator: "Horses",
    link: "https://www.youtube.com/@HorsesOnYT",
    category: "YouTube",
    description: "Essays by Michael Sorensen",
  },
  {
    title: "b001",
    creator: "b001",
    link: "https://www.youtube.com/@b001",
    category: "YouTube",
    description: "Python programming",
  },
  {
    title: "The Matrix Calculus You Need For Deep Learning",
    creator: "Terence Parr, Jeremy Howard",
    link: "https://arxiv.org/abs/1802.01528",
    category: "Papers",
    description: "Essential matrix calculus for deep learning",
  },
  {
    title: "Competitive Programmer's Handbook",
    creator: "Antti Laaksonen",
    link: "https://cses.fi/book/book.pdf",
    category: "Papers",
    description: "Comprehensive guide to competitive programming",
  },
  {
    title: "Data Science and Machine Learning",
    creator: "Dirk P. Kroese",
    link: "https://people.smp.uq.edu.au/DirkKroese/DSML/DSML.pdf",
    category: "Papers",
    description: "Mathematical and Statistical Methods",
  },
  {
    title: "Machine Learning Cheat Sheet",
    creator: "soulmachine",
    link: "https://github.com/soulmachine/machine-learning-cheat-sheet",
    category: "Papers",
    description: "Comprehensive ML algorithms cheat sheet",
  },
  {
    title: "Mathematics for Computer Science",
    creator: "MIT",
    link: "https://people.csail.mit.edu/meyer/mcs.pdf",
    category: "Papers",
    description: "Essential mathematics for CS",
  },
];

const ResourceIcon = ({ category }) => {
  const icons = {
    Podcasts: Podcast,
    YouTube: Youtube,
    Papers: FileText,
    Blogs: Globe,
    Newsletters: Mail,
    Courses: Graduation,
    Tools: FileText,
  };
  const Icon = icons[category] || Globe;
  return <Icon size={18} />;
};

const BookCard = ({ book }) => {
  const [imgError, setImgError] = useState(false);

  return (
    <div className="book-card">
      <div className="book-cover">
        {imgError ? (
          <div className="book-cover-fallback">
            <BookOpen size={32} />
          </div>
        ) : (
          <img
            src={book.cover}
            alt={book.title}
            onError={() => setImgError(true)}
            loading="lazy"
          />
        )}
        <div className="book-cover-overlay">
          <div className="book-info">
            <p className="book-description">{book.description}</p>
          </div>
        </div>
      </div>
      <div className="book-details">
        <h3 className="book-title">{book.title}</h3>
        <p className="book-author">{book.author}</p>
        <div className="book-tags">
          {book.tags.map((tag) => (
            <span key={tag} className="book-tag">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

const ResourceCard = ({ resource }) => (
  <a
    href={resource.link}
    target="_blank"
    rel="noopener noreferrer"
    className="resource-card"
  >
    <div className="resource-icon">
      <ResourceIcon category={resource.category} />
    </div>
    <div className="resource-content">
      <h3 className="resource-title">{resource.title}</h3>
      <p className="resource-creator">
        {resource.creator}
        {resource.year ? ` (${resource.year})` : ""}
      </p>
      <p className="resource-description">{resource.description}</p>
      <span className="resource-category">{resource.category}</span>
    </div>
  </a>
);

const CategoryFilter = ({ categories, activeCategory, onCategoryChange }) => (
  <div className="category-filter">
    {categories.map((category) => (
      <button
        key={category}
        onClick={() => onCategoryChange(category)}
        className={`category-btn ${
          activeCategory === category ? "active" : ""
        }`}
      >
        {category}
      </button>
    ))}
  </div>
);

export default function LibraryPage() {
  const [activeSection, setActiveSection] = useState("books");
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredContent =
    activeSection === "books"
      ? activeCategory === "All"
        ? books
        : books.filter((book) => book.tags.includes(activeCategory))
      : activeCategory === "All"
      ? resources
      : resources.filter((resource) => resource.category === activeCategory);

  return (
    <main>
      <div className="title-container">
        <div className="title-link">
          <h1>Library</h1>
          <p className="library-description">
            A regularly updated collection of books I've read and resources I
            frequently reference in machine learning, computer science, and
            related fields.
          </p>
        </div>
      </div>

      <div className="library-container">
        <div className="library-navigation">
          <div className="library-tabs">
            <button
              onClick={() => {
                setActiveSection("books");
                setActiveCategory("All");
              }}
              className={`library-tab ${
                activeSection === "books" ? "active" : ""
              }`}
            >
              Books
            </button>
            <button
              onClick={() => {
                setActiveSection("resources");
                setActiveCategory("All");
              }}
              className={`library-tab ${
                activeSection === "resources" ? "active" : ""
              }`}
            >
              Resources
            </button>
          </div>
        </div>

        <CategoryFilter
          categories={
            activeSection === "books" ? bookCategories : resourceCategories
          }
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
        />

        <div className="library-content">
          <div
            className={
              activeSection === "books" ? "books-grid" : "resources-grid"
            }
          >
            {filteredContent.map((item) =>
              activeSection === "books" ? (
                <BookCard key={item.title} book={item} />
              ) : (
                <ResourceCard key={item.title} resource={item} />
              )
            )}
          </div>
        </div>
      </div>

      <Footer />
      <ButtonsContainer />
    </main>
  );
}
