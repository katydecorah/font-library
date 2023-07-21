import { GeneratedData } from "./main-app";

export default function filter(
  state: {
    selectedSearch: string;
    selectedTag: string;
    selectedCategory: string;
    selectedSubset: string;
    selectedVariant: string;
    selectedVariable: boolean;
    sortBy: string;
    currentPage: number;
    pageSize: number;
  },
  generatedData: GeneratedData
): [number, GeneratedData] {
  const {
    selectedSearch,
    selectedTag,
    selectedCategory,
    selectedSubset,
    selectedVariant,
    selectedVariable,
    sortBy,
    currentPage,
    pageSize,
  } = state;
  let filteredData = generatedData;

  if (selectedSearch) {
    filteredData = filteredData.filter((row) =>
      row.family.toLowerCase().includes(selectedSearch.toLowerCase())
    );
  }

  if (selectedTag && selectedTag !== "need tags") {
    filteredData = filteredData.filter((row) => row.tags.includes(selectedTag));
  }
  if (selectedTag === "need tags") {
    filteredData = filteredData.filter((row) => row.tags.length === 0);
  }
  if (selectedCategory) {
    filteredData = filteredData.filter(
      (row) => row.category === selectedCategory
    );
  }
  if (selectedSubset) {
    filteredData = filteredData.filter((row) =>
      row.subsets.includes(selectedSubset)
    );
  }
  if (selectedVariant) {
    filteredData = filteredData.filter((row) =>
      row.variants.includes(selectedVariant)
    );
  }

  if (selectedVariable === true) {
    filteredData = filteredData.filter((row) => row.variable);
  }

  if (sortBy === "date") {
    filteredData = filteredData.sort(
      (a, b) =>
        new Date(b.lastModified).getTime() - new Date(a.lastModified).getTime()
    );
  }

  if (sortBy === "family") {
    filteredData = filteredData.sort((a, b) =>
      a.family.localeCompare(b.family)
    );
  }

  const paginated = filteredData.filter((row, index) => {
    const start = (currentPage - 1) * pageSize;
    const end = currentPage * pageSize;
    if (index >= start && index < end) return true;
  });

  return [filteredData.length, paginated];
}
