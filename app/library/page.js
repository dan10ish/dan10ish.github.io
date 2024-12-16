"use client";

import { useState, useMemo } from "react";
import {
  Podcast,
  Youtube,
  FileText,
  Globe,
  Mail,
  GraduationCap,
  Hammer,
} from "lucide-react";
import Footer from "@/components/Footer";
import ButtonsContainer from "@/components/ButtonsContainer";
import FilterComponent from "@/components/FilterComponent";

const bookCategories = [
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
    title: "Think and Grow Rich",
    author: "Napolean Hill",
    coverColor: "#1c1c1e",
    tags: ["Philosophy"],
    description:
      "Guide to achieving success through desire, faith, and persistence.",
  },
  {
    title: "Hands-On Machine Learning",
    author: "Aurélien Géron",
    coverColor: "#ffffff",
    tags: ["Machine Learning"],
    description:
      "Comprehensive guide to ML with scikit-learn, Keras, and TensorFlow",
  },
  {
    title: "Introduction to Algorithms",
    author: "Thomas H. Cormen",
    coverColor: "#1e71f7",
    tags: ["Computer Science"],
    description: "The essential guide to computer algorithms",
  },
  {
    title: "Modern Robotics",
    author: "Kevin M. Lynch",
    coverColor: "#7d7a7a",
    tags: ["Robotics"],
    description: "Kinematics, Dynamics, Planning, and Control",
  },
  {
    title: "Fundamentals of Robotics",
    author: "Robert J. Schilling",
    coverColor: "#9333ea",
    tags: ["Robotics"],
    description: "Analysis and control of robot manipulators",
  },
  {
    title: "Sell Like Crazy",
    author: "Sabri Suby",
    coverColor: "#ea580c",
    tags: ["Business"],
    description: "How to get more customers and clients",
  },
  {
    title: "A Random Walk Down Wall Street",
    author: "Burton Malkiel",
    coverColor: "#059669",
    tags: ["Finance"],
    description: "The time-tested strategy for successful investing",
  },
  {
    title: "Steal Like an Artist",
    author: "Austin Kleon",
    coverColor: "#6366f1",
    tags: ["Creativity"],
    description: "10 things nobody told you about being creative",
  },
  {
    title: "The Creative Act",
    author: "Rick Rubin",
    coverColor: "#0891b2",
    tags: ["Creativity"],
    description: "A way of being",
  },
  {
    title: "The 48 Laws of Power",
    author: "Robert Greene",
    coverColor: "#4b5563",
    tags: ["Psychology"],
    description: "Manipulative tactics",
  },
  {
    title: "The Almanack of Naval Ravikant",
    author: "Eric Jorgenson",
    coverColor: "#0f766e",
    tags: ["Philosophy"],
    description: "A guide to wealth and happiness",
  },
  {
    title: "Algorithms",
    author: "Jeff Erickson",
    coverColor: "#7c3aed",
    tags: ["Computer Science"],
    description: "Comprehensive guide to algorithm design and analysis",
  },
  {
    title: "Open Data Structures",
    author: "Pat Morin",
    coverColor: "#be185d",
    tags: ["Computer Science"],
    description: "An introduction to data structures and algorithms",
  },
];

const resourceCategories = ["YouTube", "Papers", "Tools"];

const resources = [
  {
    title: "Andrej Karpathy",
    category: "YouTube",
    link: "https://www.youtube.com/@AndrejKarpathy/",
  },
  {
    title: "Sketch",
    category: "Tools",
    link: "https://www.sketch.com",
  },
  {
    title: "Fusion 360",
    category: "Tools",
    link: "https://www.autodesk.com/in/products/fusion-360/overview",
  },
  {
    title: "Horses",
    category: "YouTube",
    link: "https://www.youtube.com/@HorsesOnYT",
  },
  {
    title: "ML Cheat Sheet",
    category: "Papers",
    link: "https://github.com/soulmachine/machine-learning-cheat-sheet",
  },
  {
    title: "Data Science ML",
    category: "Papers",
    link: "https://people.smp.uq.edu.au/DirkKroese/DSML/DSML.pdf",
  },
  {
    title: "The Cherno",
    category: "YouTube",
    link: "https://www.youtube.com/@TheCherno",
  },
  {
    title: "Matrix Calculus",
    category: "Papers",
    link: "https://arxiv.org/abs/1802.01528",
  },
  {
    title: "Math for CS",
    category: "Papers",
    link: "https://people.csail.mit.edu/meyer/mcs.pdf",
  },
  {
    title: "CP Handbook",
    category: "Papers",
    link: "https://cses.fi/book/book.pdf",
  },
  {
    title: "b001",
    category: "YouTube",
    link: "https://www.youtube.com/@b001",
  },
  {
    title: "MATLAB",
    category: "Tools",
    link: "https://in.mathworks.com/products/matlab.html",
  },
  {
    title: "Zed",
    category: "Tools",
    link: "https://www.zed.dev",
  },
];

const ResourceIcon = ({ category }) => {
  const icons = {
    YouTube: Youtube,
    Papers: FileText,
    Tools: Hammer,
  };
  const Icon = icons[category] || Globe;
  return <Icon size={18} />;
};

const BookCard = ({ book }) => {
  const [isActive, setIsActive] = useState(false);

  const shouldUseWhiteText = (hexColor) => {
    const r = parseInt(hexColor.slice(1, 3), 16);
    const g = parseInt(hexColor.slice(3, 5), 16);
    const b = parseInt(hexColor.slice(5, 7), 16);
    return (0.299 * r + 0.587 * g + 0.114 * b) / 255 < 0.5;
  };

  const textColor = shouldUseWhiteText(book.coverColor) ? "#ffffff" : "#000000";

  return (
    <div
      className={`book-card ${isActive ? "touch-active" : ""}`}
      onTouchStart={() => setIsActive(true)}
      onTouchEnd={() => setIsActive(false)}
      onTouchCancel={() => setIsActive(false)}
    >
      <div
        className="book-cover"
        style={{
          backgroundColor: book.coverColor,
          color: textColor,
        }}
      >
        <div
          className="book-spine"
          style={{
            backgroundColor: book.coverColor,
          }}
        ></div>
        <div className="book-spine-edge"></div>
        <div className="book-content">
          <h3 className="book-title">{book.title}</h3>
          <p className="book-author">{book.author}</p>
        </div>
        <div className="book-right-edge"></div>
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
    data-category={resource.category}
  >
    <div className="resource-icon-wrapper">
      <ResourceIcon category={resource.category} />
    </div>
    <h3 className="resource-title">{resource.title}</h3>
    <span className="resource-category">{resource.category}</span>
  </a>
);

export default function LibraryPage() {
  const [activeSection, setActiveSection] = useState("books");
  const [selectedCategories, setSelectedCategories] = useState([]);

  const currentCategories =
    activeSection === "books" ? bookCategories : resourceCategories;

  const filteredContent = useMemo(() => {
    if (selectedCategories.length === 0) {
      return activeSection === "books" ? books : resources;
    }

    return (activeSection === "books" ? books : resources).filter((item) => {
      const itemCategories =
        activeSection === "books" ? item.tags : [item.category];
      return selectedCategories.some((cat) => itemCategories.includes(cat));
    });
  }, [activeSection, selectedCategories]);

  return (
    <main>
      <div className="title-container">
        <div className="title-link">
          <h1>Library</h1>
        </div>
      </div>

      <div className="library-container">
        <div className="library-navigation">
          <div className="library-tabs">
            <button
              onClick={() => {
                setActiveSection("books");
                setSelectedCategories([]);
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
                setSelectedCategories([]);
              }}
              className={`library-tab ${
                activeSection === "resources" ? "active" : ""
              }`}
            >
              Resources
            </button>
          </div>
        </div>

        <FilterComponent
          options={currentCategories}
          activeFilters={selectedCategories}
          onFilterChange={setSelectedCategories}
          placeholder={`by ${activeSection === "books" ? "category" : "type"}`}
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
              ),
            )}
          </div>
        </div>
      </div>
      <div className="noFooter">
        <Footer />
      </div>
      <ButtonsContainer />
    </main>
  );
}
