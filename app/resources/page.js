"use client";

import { useState } from "react";
import { resources, resourceCategories } from "@/lib/library-data";
import FilterComponent from "@/components/FilterComponent";
import { Youtube, FileText, Hammer, Globe } from "lucide-react";
import Footer from "@/components/Footer";
import ButtonsContainer from "@/components/ButtonsContainer";

const ResourceIcon = ({ category }) => {
  const icons = {
    YouTube: Youtube,
    Papers: FileText,
    Tools: Hammer,
  };
  const Icon = icons[category] || Globe;
  return <Icon size={18} />;
};

export default function ResourcesPage() {
  const [selectedCategories, setSelectedCategories] = useState([]);

  const filteredResources =
    selectedCategories.length === 0
      ? resources
      : resources.filter((resource) =>
          selectedCategories.includes(resource.category),
        );

  return (
    <main>
      <div className="header-container">
        <div className="title-container">
          <div className="title-link">
            <h1>Resources</h1>
          </div>
        </div>

        <FilterComponent
          options={resourceCategories}
          activeFilters={selectedCategories}
          onFilterChange={setSelectedCategories}
          placeholder=""
        />
      </div>

      <div className="resources-grid">
        {filteredResources.map((resource) => (
          <a
            key={resource.title}
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
        ))}
      </div>

      <div className="noFooter">
        <Footer />
      </div>
      <ButtonsContainer />
    </main>
  );
}
