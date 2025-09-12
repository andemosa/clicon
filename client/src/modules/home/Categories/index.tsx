
import { useState } from "react";
import { Box } from "@chakra-ui/react";
import CategorySelector from "./CategorySelector";
import TabSelector from "./TabSelector";

// 🔹 Define product + category types
type Product = {
  id: number;
  name: string;
  price: number;
  img: string;
  badge?: string;
};

type ProductCategories = {
  "Computer & Laptop": {
    All: Product[];
    Monitors: Product[];
    "Gaming Laptops": Product[];
    Accessories: Product[];
  };
  SmartPhone: {
    All: Product[];
    Android: Product[];
    iOS: Product[];
  };
  Headphones: {
    All: Product[];
    Wireless: Product[];
    Wired: Product[];
  };
  Accessories: {
    All: Product[];
    Cables: Product[];
    Keyboards: Product[];
    Mice: Product[];
    Chargers: Product[];
  };
  "Camera & Photo": {
    All: Product[];
    DSLR: Product[];
    Lenses: Product[];
  };
  "TV & Homes": {
    All: Product[];
    "Smart TV": Product[];
    Speakers: Product[];
  };
};

export type CategoryKey = keyof ProductCategories;

export type Category = {
  label: CategoryKey;
  img: string;
  subcategories: string[];
};

// 🔹 Products (typed)
const products: ProductCategories = {
  "Computer & Laptop": {
    All: [
      {
        id: 4,
        name: "Dell Optiplex All-in-One",
        price: 250,
        img: "/images/monitor.png",
        badge: "SALE",
      },
    ],
    Monitors: [
      {
        id: 4,
        name: "Dell Optiplex All-in-One",
        price: 250,
        img: "/images/monitor.png",
      },
    ],
    "Gaming Laptops": [],
    Accessories: [],
  },
  SmartPhone: {
    All: [
      {
        id: 2,
        name: "Samsung Galaxy S21 5G",
        price: 2300,
        img: "/images/samsung.png",
      },
    ],
    Android: [
      {
        id: 2,
        name: "Samsung Galaxy S21 5G",
        price: 2300,
        img: "/images/samsung.png",
      },
    ],
    iOS: [],
  },
  Headphones: {
    All: [
      {
        id: 1,
        name: "TOZO T6 True Wireless Earbuds",
        price: 70,
        img: "/images/earbuds.png",
        badge: "HOT",
      },
    ],
    Wireless: [
      {
        id: 1,
        name: "TOZO T6 True Wireless Earbuds",
        price: 70,
        img: "/images/earbuds.png",
      },
    ],
    Wired: [],
  },
  Accessories: {
    All: [
      {
        id: 3,
        name: "Amazon Basics HDMI Cable",
        price: 360,
        img: "/images/hdmi.png",
        badge: "BEST DEALS",
      },
    ],
    Cables: [
      {
        id: 3,
        name: "Amazon Basics HDMI Cable",
        price: 360,
        img: "/images/hdmi.png",
      },
    ],
    Keyboards: [],
    Mice: [],
    Chargers: [],
  },
  "Camera & Photo": {
    All: [],
    DSLR: [],
    Lenses: [],
  },
  "TV & Homes": {
    All: [],
    "Smart TV": [],
    Speakers: [],
  },
};

// 🔹 Category metadata
const categories: Category[] = [
  {
    label: "Computer & Laptop",
    img: "/images/laptop.png",
    subcategories: ["All", "Gaming Laptops", "Monitors", "Accessories"],
  },
  {
    label: "SmartPhone",
    img: "/images/smartphone.png",
    subcategories: ["All", "Android", "iOS"],
  },
  {
    label: "Headphones",
    img: "/images/headphones.png",
    subcategories: ["All", "Wireless", "Wired"],
  },
  {
    label: "Accessories",
    img: "/images/accessories.png",
    subcategories: ["All", "Cables", "Keyboards", "Mice", "Chargers"],
  },
  {
    label: "Camera & Photo",
    img: "/images/camera.png",
    subcategories: ["All", "DSLR", "Lenses"],
  },
  {
    label: "TV & Homes",
    img: "/images/tv.png",
    subcategories: ["All", "Smart TV", "Speakers"],
  },
];

const Categories = () => {
  const [selectedCategory, setSelectedCategory] = useState<Category>(categories[0]);
  const [selectedSubcategory, setSelectedSubcategory] = useState<string>("All");

  // ✅ Strong typing for products lookup
  const filteredProducts =
    products[selectedCategory.label][
      selectedSubcategory as keyof (typeof products)[typeof selectedCategory.label]
    ] || [];

  return (
    <Box
      px={{ base: 6, lg: 12 }}
      py={{ base: 6, lg: 12 }}
      maxW={{ base: "full", xl: "1440px" }}
      mx="auto"
      w="full"
    >
      {/* Category carousel */}
      <CategorySelector
        categories={categories}
        selected={selectedCategory}
        onSelect={(cat) => {
          setSelectedCategory(cat);
          setSelectedSubcategory("All");
        }}
      />

      {/* Subcategory tabs */}
      <TabSelector
        subcategories={selectedCategory.subcategories}
        selected={selectedSubcategory}
        onSelect={(sub) => setSelectedSubcategory(sub)}
        products={filteredProducts}
      />
    </Box>
  );
};

export default Categories;
