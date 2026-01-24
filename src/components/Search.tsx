"use client";

function SearchComponents() {
  const category = [
    { id: 1, name: "All", isActive: true },
    { id: 2, name: "Economy", isActive: false },
    { id: 3, name: "Sedan", isActive: false },
    { id: 4, name: "SUV", isActive: false },
    { id: 5, name: "Mini Bus", isActive: false },
  ];

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-2xl mx-auto">
      {/* Search Input */}
      <input
        placeholder="Search all cars here..."
        className="w-full px-5 py-3 border border-gray-300 bg-white text-gray-600"
      />

      {/* Categories */}
      <div className="flex flex-wrap justify-center mt-6 gap-4">
        {category.map((item) => (
          <button
            key={item.id}
            className={`px-4 py-2 text-sm font-medium transition
              ${
                item.isActive
                  ? "bg-black text-white"
                  : "border border-gray-300 text-gray-700 hover:bg-gray-100"
              }`}
          >
            {item.name}
          </button>
        ))}
      </div>
    </div>
  );
}

export default SearchComponents;
