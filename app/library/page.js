"use client";

import { useState, useMemo, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
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
import dynamic from "next/dynamic";

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
    coverColor: "#1e293b",
    tags: ["Philosophy"],
    description:
      "Guide to achieving success through desire, faith, and persistence.",
  },
  {
    title: "Hands-On Machine Learning",
    author: "Aurélien Géron",
    coverColor: "#0891b2",
    tags: ["Machine Learning"],
    description:
      "Comprehensive guide to ML with scikit-learn, Keras, and TensorFlow",
  },
  {
    title: "Introduction to Algorithms",
    author: "Thomas H. Cormen",
    coverColor: "#0f766e",
    tags: ["Computer Science"],
    description: "The essential guide to computer algorithms",
  },
  {
    title: "Modern Robotics",
    author: "Kevin M. Lynch",
    coverColor: "#dc2626",
    tags: ["Robotics"],
    description: "Kinematics, Dynamics, Planning, and Control",
  },
  {
    title: "Fundamentals of Robotics",
    author: "Robert J. Schilling",
    coverColor: "#7c3aed",
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
    coverColor: "#4338ca",
    tags: ["Creativity"],
    description: "10 things nobody told you about being creative",
  },
  {
    title: "The Creative Act",
    author: "Rick Rubin",
    coverColor: "#475569",
    tags: ["Creativity"],
    description: "A way of being",
  },
  {
    title: "The 48 Laws of Power",
    author: "Robert Greene",
    coverColor: "#b91c1c",
    tags: ["Psychology"],
    description: "Manipulative tactics",
  },
  {
    title: "The Almanack of Naval Ravikant",
    author: "Eric Jorgenson",
    coverColor: "#2563eb",
    tags: ["Philosophy"],
    description: "A guide to wealth and happiness",
  },
  {
    title: "Algorithms",
    author: "Jeff Erickson",
    coverColor: "#6d28d9",
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

const notes = [
  {
    title: "AI & ML",
    author: "Semester 6",
    coverColor: "#B22222",
    tags: ["AI", "Semester 6"],
    file: "/notes/semester6/AIML.pdf",
  },
  {
    title: "Robotics System Design",
    author: "Semester 7",
    coverColor: "#B8860B",
    tags: ["Robotics", "Semester 7"],
    file: "/notes/semester7/RSD.pdf",
  },
  {
    title: "Industrial Robotics Motion Control",
    author: "Semester 7",
    coverColor: "#4682B4",
    tags: ["Robotics", "Semester 7"],
    file: "/notes/semester7/IRMC.pdf",
  },
  {
    title: "Mechatronics System Design",
    author: "Semester 7",
    coverColor: "#006400",
    tags: ["Mechatronics", "Semester 7"],
    file: "/notes/semester7/MSD.pdf",
  },
  {
    title: "Modern Control Systems",
    author: "Semester 6",
    coverColor: "#CD5C5C",
    tags: ["Control Systems", "Semester 6"],
    file: "/notes/semester6/MCS.pdf",
  },
  {
    title: "Graph Theory and Applications",
    author: "Semester 6",
    coverColor: "#6A5ACD",
    tags: ["Mathematics", "Semester 6"],
    file: "/notes/semester6/GTA.pdf",
  },
  {
    title: "Programmable Logic Controller",
    author: "Semester 6",
    coverColor: "#2F4F4F",
    tags: ["Mechatronics", "Semester 6"],
    file: "/notes/semester6/PLC.pdf",
  },
  {
    title: "Design of Machine Elements",
    author: "Semester 5",
    coverColor: "#8B0000",
    tags: ["Mechatronics", "Semester 5"],
    file: "/notes/semester5/DME.pdf",
  },
  {
    title: "Dynamic System Modelling",
    author: "Semester 5",
    coverColor: "#008B8B",
    tags: ["Control Systems", "Semester 5"],
    file: "/notes/semester5/DSM.pdf",
  },
  {
    title: "Signals and Systems",
    author: "Semester 5",
    coverColor: "#556B2F",
    tags: ["Control Systems", "Semester 5"],
    file: "/notes/semester5/SAS.pdf",
  },
  {
    title: "Rough",
    author: "Semester 5",
    coverColor: "#8B4513",
    tags: ["Miscellaneous", "Semester 5"],
    file: "/notes/semester5/Rough.pdf",
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

const BookCard = ({ book, onClick }) => {
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
      onClick={onClick}
    >
      <div
        className="book-cover"
        style={{
          "--book-color": book.coverColor,
          color: textColor,
          cursor: onClick ? "pointer" : "default",
        }}
      >
        <div
          className="book-spine"
          style={{ backgroundColor: book.coverColor }}
        />
        <div className="book-spine-edge" />
        <div className="book-content">
          <h3 className="book-title">{book.title}</h3>
          <p className="book-author">{book.author}</p>
        </div>
        <div className="book-right-edge" />
      </div>
    </div>
  );
};

const NotesCard = ({ note }) => {
  const handleOpenNote = () => {
    window.open(note.file, "_blank");
  };

  return (
    <div className="book-card" onClick={handleOpenNote}>
      <div
        className="book-cover"
        style={{
          "--book-color": note.coverColor,
          cursor: "pointer",
        }}
      >
        <div
          className="book-spine"
          style={{ backgroundColor: note.coverColor }}
        />
        <div className="book-spine-edge" />
        <div className="book-content">
          <h3 className="book-title">{note.title}</h3>
          <p className="book-author">{note.author}</p>
        </div>
        <div className="book-right-edge" />
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

function LibraryContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const initialSection = searchParams.get("section") || "notes";
  const [activeSection, setActiveSection] = useState(initialSection);
  const [selectedCategories, setSelectedCategories] = useState([]);

  useEffect(() => {
    const section = searchParams.get("section");

    if (
      section !== activeSection &&
      ["books", "notes", "resources"].includes(section)
    ) {
      setActiveSection(section);
    }
  }, [searchParams, activeSection]);

  const updateURL = (section) => {
    const params = new URLSearchParams(searchParams);
    params.set("section", section);
    router.push(`/library?${params.toString()}`, { scroll: false });
  };

  const currentCategories = useMemo(() => {
    switch (activeSection) {
      case "books":
        return bookCategories;
      case "notes":
        return [...new Set(notes.flatMap((note) => note.tags))];
      case "resources":
        return resourceCategories;
      default:
        return [];
    }
  }, [activeSection]);

  const filteredContent = useMemo(() => {
    if (selectedCategories.length === 0) {
      switch (activeSection) {
        case "books":
          return books;
        case "notes":
          return notes;
        case "resources":
          return resources;
        default:
          return [];
      }
    }

    const content =
      activeSection === "books"
        ? books
        : activeSection === "notes"
          ? notes
          : resources;

    return content.filter((item) => {
      const itemCategories =
        activeSection === "resources" ? [item.category] : item.tags;
      return selectedCategories.some((cat) => itemCategories.includes(cat));
    });
  }, [activeSection, selectedCategories]);

  const handleSectionChange = (section) => {
    setActiveSection(section);
    setSelectedCategories([]);
    updateURL(section);
  };

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
              onClick={() => handleSectionChange("notes")}
              className={`library-tab ${
                activeSection === "notes" ? "active" : ""
              }`}
            >
              Notes
            </button>
            <button
              onClick={() => handleSectionChange("books")}
              className={`library-tab ${
                activeSection === "books" ? "active" : ""
              }`}
            >
              Books
            </button>
            <button
              onClick={() => handleSectionChange("resources")}
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
          placeholder={""}
        />

        <div className="library-content">
          <div
            className={
              activeSection === "resources"
                ? "resources-grid"
                : activeSection === "notes"
                  ? "notes-grid"
                  : "books-grid"
            }
          >
            {filteredContent.map((item) => {
              if (activeSection === "resources") {
                return <ResourceCard key={item.title} resource={item} />;
              }
              if (activeSection === "notes") {
                return <NotesCard key={item.title} note={item} />;
              }
              return <BookCard key={item.title} book={item} />;
            })}
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

export default function LibraryPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LibraryContent />
    </Suspense>
  );
}
