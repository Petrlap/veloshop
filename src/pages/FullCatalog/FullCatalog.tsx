import { useState, useMemo, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import {
  fetchAllInStockProducts,
  fetchCatalog,
  toggleInStockFilter,
  setCurrentPage,
} from "../../store/catalogSlice";
import { RootState } from "../../store";
import { Card } from "../../components/Card/Card";
import styles from "./FullCatalog.module.css";

// Типы для фильтров
interface FilterState {
  price: {
    min: number;
    max: number;
    current: [number, number];
  };
  brands: string[];
  types: string[];
  wheelDiameter: string[];
  rimType: string[];
  years: string[];
  equipment: string[];
  height: {
    from: string;
    to: string;
  };
  gender: string[];
  colors: string[];
  fork: string[];
  brakes: string[];
  material: string[];
}

// Тип для товара из API
interface ProductAttribute {
  id: number;
  value: string;
}

interface ProductOffer {
  offer_id: string;
  attributes?: {
    data?: ProductAttribute[];
  };
  prices?: {
    data?: Array<{
      price: number;
    }>;
  };
  stock?: {
    data?: any[];
  };
}

interface Product {
  id: number;
  name: string;
  product_id: string;
  brand: string;
  "model "?: string;
  offers?: {
    data?: ProductOffer[];
  };
  attributes?: {
    data?: ProductAttribute[];
  };
  image?: string;
}

export const FullCatalog = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const {
    products: apiProducts,
    loading,
    error: reduxError,
    totalProducts,
    totalPages,
    currentPage,
    inStockProducts,
    inStockLoading,
    showOnlyInStock,
  } = useSelector((state: RootState) => state.catalog);

  // Состояние для всех товаров (для фильтрации)
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [allProductsLoaded, setAllProductsLoaded] = useState(false);
  const [isLoadingAll, setIsLoadingAll] = useState(false);
  const [fetchError, setFetchError] = useState<string | null>(null);

  // Состояние для поиска
  const [searchQuery, setSearchQuery] = useState("");

  // Состояние для выбранных фильтров (временное, до применения)
  const [selectedFilters, setSelectedFilters] = useState<FilterState>({
    price: { min: 0, max: 1000000, current: [0, 1000000] },
    brands: [],
    types: [],
    wheelDiameter: [],
    rimType: [],
    years: [],
    equipment: [],
    height: { from: "", to: "" },
    gender: [],
    colors: [],
    fork: [],
    brakes: [],
    material: [],
  });

  // Состояние для примененных фильтров (после нажатия кнопки)
  const [appliedFilters, setAppliedFilters] = useState<FilterState>({
    price: { min: 0, max: 1000000, current: [0, 1000000] },
    brands: [],
    types: [],
    wheelDiameter: [],
    rimType: [],
    years: [],
    equipment: [],
    height: { from: "", to: "" },
    gender: [],
    colors: [],
    fork: [],
    brakes: [],
    material: [],
  });

  // Состояние для поиска по брендам
  const [brandSearch, setBrandSearch] = useState("");

  // Состояние для открытых фильтров
  const [openFilter, setOpenFilter] = useState<string | null>(null);
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  // Фильтры "галочки"
  const [inStockOnly, setInStockOnly] = useState(false);
  const [withDiscount, setWithDiscount] = useState(false);
  const [withVideo, setWithVideo] = useState(false);
  const [sortBy, setSortBy] = useState("cheap");

  // Эффект для получения поискового запроса из state
  useEffect(() => {
    if (location.state?.searchQuery) {
      setSearchQuery(location.state.searchQuery);
      // Очищаем state чтобы при обновлении страницы не повторялся поиск
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);

  // Функция для безопасного парсинга JSON
  const safeJsonParse = async (response: Response) => {
    try {
      const text = await response.text();
      try {
        return JSON.parse(text);
      } catch (e) {
        console.error("Ошибка парсинга JSON:", text.substring(0, 200));
        throw new Error("Неверный формат данных от сервера");
      }
    } catch (e) {
      console.error("Ошибка чтения ответа:", e);
      throw e;
    }
  };

  // Загружаем все товары для фильтрации
  useEffect(() => {
    const loadAllProducts = async () => {
      if (isLoadingAll || allProductsLoaded) return;

      setIsLoadingAll(true);
      setFetchError(null);

      try {
        if (apiProducts.length > 0) {
          setAllProducts(apiProducts as unknown as Product[]);
        }

        let allProductsList: Product[] = [];
        let page = 1;
        const perPage = 100;

        const response = await fetch(
          `https://admin.velo-shop.ru/api/catalog/products?page=${page}&per-page=${perPage}`
        );

        if (!response.ok) {
          throw new Error(`HTTP ошибка: ${response.status}`);
        }

        const data = await safeJsonParse(response);

        if (data && data.data && Array.isArray(data.data)) {
          allProductsList = [...data.data];
          const totalPages = data.meta?.last_page || 1;

          if (totalPages <= 5) {
            const promises = [];
            for (page = 2; page <= totalPages; page++) {
              promises.push(
                fetch(
                  `https://admin.velo-shop.ru/api/catalog/products?page=${page}&per-page=${perPage}`
                )
                  .then((res) => safeJsonParse(res))
                  .catch((err) => {
                    console.error(`Ошибка загрузки страницы ${page}:`, err);
                    return { data: [] };
                  })
              );
            }

            const results = await Promise.all(promises);
            results.forEach((result) => {
              if (result && result.data && Array.isArray(result.data)) {
                allProductsList.push(...result.data);
              }
            });
          } else {
            setTimeout(() => {
              const loadRemaining = async () => {
                const promises = [];
                for (page = 2; page <= totalPages; page++) {
                  promises.push(
                    fetch(
                      `https://admin.velo-shop.ru/api/catalog/products?page=${page}&per-page=${perPage}`
                    )
                      .then((res) => safeJsonParse(res))
                      .catch((err) => {
                        console.error(`Ошибка загрузки страницы ${page}:`, err);
                        return { data: [] };
                      })
                  );
                }

                const results = await Promise.all(promises);
                let remainingProducts: Product[] = [];
                results.forEach((result) => {
                  if (result && result.data && Array.isArray(result.data)) {
                    remainingProducts.push(...result.data);
                  }
                });

                setAllProducts((prev) => [...prev, ...remainingProducts]);
              };
              loadRemaining();
            }, 1000);
          }
        } else {
          console.warn("API вернуло неожиданную структуру:", data);
        }

        setAllProducts(allProductsList);
        setAllProductsLoaded(true);
        console.log(
          `Загружено ${allProductsList.length} товаров для фильтрации`
        );
      } catch (error) {
        console.error("Ошибка загрузки всех товаров:", error);
        setFetchError(
          error instanceof Error ? error.message : "Неизвестная ошибка"
        );
      } finally {
        setIsLoadingAll(false);
      }
    };

    loadAllProducts();
  }, [apiProducts, allProductsLoaded, isLoadingAll]);

  // Удаляем дубликаты товаров после загрузки
  useEffect(() => {
    if (allProducts.length > 0) {
      const uniqueIds = new Set();
      const duplicates: string[] = [];

      allProducts.forEach((product) => {
        if (uniqueIds.has(product.product_id)) {
          duplicates.push(product.product_id);
        } else {
          uniqueIds.add(product.product_id);
        }
      });

      if (duplicates.length > 0) {
        console.warn("Найдены дубликаты product_id:", duplicates);

        // Удаляем дубликаты
        const uniqueProducts = Array.from(
          new Map(allProducts.map((p) => [p.product_id, p])).values()
        );
        setAllProducts(uniqueProducts);
      }

      console.log("Уникальных товаров:", uniqueIds.size);
    }
  }, [allProducts]);

  // Получаем уникальные значения из всех товаров для фильтров
  const filterOptions = useMemo(() => {
    const products = allProducts;

    const brands = new Set<string>();
    const types = new Set<string>();
    const wheelDiameters = new Set<string>();
    const years = new Set<string>();
    const genders = new Set<string>();

    // Для атрибутов используем ID из API
    const materialsSet = new Set<string>(); // id: 20 в product.attributes
    const brakesSet = new Set<string>(); // id: 4 в product.attributes
    const forksSet = new Set<string>(); // id: 10 в product.attributes
    const colorsSet = new Set<string>(); // id: 2 в offers.data.attributes
    const rimTypesSet = new Set<string>(); // id: 11 в product.attributes
    const equipmentSet = new Set<string>(); // из названия

    // Цены для определения диапазона
    let minPrice = Infinity;
    let maxPrice = 0;

    products.forEach((product: Product) => {
      if (!product) return;

      // Цена
      const price = product.offers?.data?.[0]?.prices?.data?.[0]?.price;
      if (price && typeof price === "number") {
        minPrice = Math.min(minPrice, price);
        maxPrice = Math.max(maxPrice, price);
      }

      // Бренд
      if (product.brand && typeof product.brand === "string")
        brands.add(product.brand);

      // Тип велосипеда из названия
      const name = product.name?.toLowerCase() || "";
      if (name.includes("горный")) types.add("Горный");
      if (name.includes("городской")) types.add("Городской");
      if (name.includes("детский")) types.add("Детский");
      if (name.includes("bmx")) types.add("BMX");
      if (name.includes("шоссейный")) types.add("Шоссейный");
      if (name.includes("дорожный")) types.add("Дорожный");
      if (name.includes("подростковый")) types.add("Подростковый");
      if (name.includes("трюковый")) types.add("Трюковый");

      // Диаметр колес из названия
      const wheelMatch = product.name?.match(/(\d+(?:\.\d+)?)"/);
      if (wheelMatch && wheelMatch[1]) wheelDiameters.add(wheelMatch[1] + '"');

      // Год из названия
      const yearMatch = product.name?.match(/\((\d{4})\)/);
      if (yearMatch && yearMatch[1]) years.add(yearMatch[1]);

      // Пол из названия
      if (name.includes("мужской") || name.includes("муж"))
        genders.add("Мужской");
      if (name.includes("женский") || name.includes("жен"))
        genders.add("Женский");
      if (
        !name.includes("мужской") &&
        !name.includes("женский") &&
        !name.includes("муж") &&
        !name.includes("жен")
      ) {
        genders.add("Унисекс");
      }

      // Собираем значения из product.attributes
      if (product.attributes?.data && Array.isArray(product.attributes.data)) {
        product.attributes.data.forEach((attr: ProductAttribute) => {
          if (
            !attr ||
            typeof attr.id !== "number" ||
            typeof attr.value !== "string"
          )
            return;

          switch (attr.id) {
            case 20: // Материал рамы
              materialsSet.add(attr.value);
              break;
            case 4: // Тормоза
              brakesSet.add(attr.value);
              break;
            case 10: // Вилка
              forksSet.add(attr.value);
              break;
            case 11: // Тип обода
              rimTypesSet.add(attr.value);
              break;
          }
        });
      }

      // Собираем значения из offers.data.attributes (цвета)
      if (product.offers?.data && Array.isArray(product.offers.data)) {
        product.offers.data.forEach((offer: ProductOffer) => {
          if (offer.attributes?.data && Array.isArray(offer.attributes.data)) {
            offer.attributes.data.forEach((attr: ProductAttribute) => {
              if (
                !attr ||
                typeof attr.id !== "number" ||
                typeof attr.value !== "string"
              )
                return;
              if (attr.id === 2) {
                // Цвет
                colorsSet.add(attr.value);
              }
            });
          }
        });
      }
    });

    console.log("=== РЕАЛЬНЫЕ ЗНАЧЕНИЯ ИЗ API ===");
    console.log("Материалы (id:20):", Array.from(materialsSet));
    console.log("Тормоза (id:4):", Array.from(brakesSet));
    console.log("Вилки (id:10):", Array.from(forksSet));
    console.log("Цвета (id:2 в offers):", Array.from(colorsSet));
    console.log("Типы ободов (id:11):", Array.from(rimTypesSet));
    console.log("=================================");

    return {
      brands: Array.from(brands).sort(),
      types: Array.from(types).sort(),
      wheelDiameters: Array.from(wheelDiameters).sort(
        (a: string, b: string) => {
          const numA = parseFloat(a);
          const numB = parseFloat(b);
          return numA - numB;
        }
      ),
      rimTypes: Array.from(rimTypesSet).sort(),
      years: Array.from(years).sort(
        (a: string, b: string) => parseInt(b) - parseInt(a)
      ),
      equipment: Array.from(equipmentSet).sort(),
      genders: Array.from(genders).sort(),
      colors: Array.from(colorsSet).sort(),
      forks: Array.from(forksSet).sort(),
      brakes: Array.from(brakesSet).sort(),
      materials: Array.from(materialsSet).sort(),
      priceRange: {
        min: minPrice !== Infinity ? minPrice : 0,
        max: maxPrice !== 0 ? maxPrice : 1000000,
      },
    };
  }, [allProducts]);

  // Инициализация фильтров при загрузке опций
  useEffect(() => {
    if (filterOptions.priceRange.max > 0) {
      const initialFilters: FilterState = {
        price: {
          min: filterOptions.priceRange.min,
          max: filterOptions.priceRange.max,
          current: [
            filterOptions.priceRange.min,
            filterOptions.priceRange.max,
          ] as [number, number],
        },
        brands: [],
        types: [],
        wheelDiameter: [],
        rimType: [],
        years: [],
        equipment: [],
        height: { from: "", to: "" },
        gender: [],
        colors: [],
        fork: [],
        brakes: [],
        material: [],
      };

      setSelectedFilters(initialFilters);
      setAppliedFilters(initialFilters);
    }
  }, [filterOptions]);

  // Функция применения фильтров (по кнопке)
  const applyFilters = () => {
    setAppliedFilters(selectedFilters);
    dispatch(setCurrentPage(1));
    setShowMobileFilters(false);
  };

  // Фильтрация товаров по примененным фильтрам
  const filteredProducts = useMemo(() => {
    let filtered = [...allProducts];

    // Поиск по названию
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      filtered = filtered.filter((product: Product) =>
        product.name?.toLowerCase().includes(query)
      );
    }

    // Фильтр по цене
    filtered = filtered.filter((product: Product) => {
      const price = product.offers?.data?.[0]?.prices?.data?.[0]?.price || 0;
      return (
        price >= appliedFilters.price.current[0] &&
        price <= appliedFilters.price.current[1]
      );
    });

    // Фильтр по брендам
    if (appliedFilters.brands.length > 0) {
      filtered = filtered.filter(
        (product: Product) =>
          product.brand && appliedFilters.brands.includes(product.brand)
      );
    }

    // Фильтр по типам
    if (appliedFilters.types.length > 0) {
      filtered = filtered.filter((product: Product) => {
        const name = product.name?.toLowerCase() || "";
        return appliedFilters.types.some((type: string) => {
          if (type === "Горный") return name.includes("горный");
          if (type === "Городской") return name.includes("городской");
          if (type === "Детский") return name.includes("детский");
          if (type === "BMX") return name.includes("bmx");
          if (type === "Шоссейный") return name.includes("шоссейный");
          if (type === "Дорожный") return name.includes("дорожный");
          if (type === "Подростковый") return name.includes("подростковый");
          if (type === "Трюковый") return name.includes("трюковый");
          return false;
        });
      });
    }

    // Фильтр по диаметру колес
    if (appliedFilters.wheelDiameter.length > 0) {
      filtered = filtered.filter((product: Product) => {
        const wheelMatch = product.name?.match(/(\d+(?:\.\d+)?)"/);
        return (
          wheelMatch &&
          appliedFilters.wheelDiameter.includes(wheelMatch[1] + '"')
        );
      });
    }

    // Фильтр по году
    if (appliedFilters.years.length > 0) {
      filtered = filtered.filter((product: Product) => {
        const yearMatch = product.name?.match(/\((\d{4})\)/);
        return yearMatch && appliedFilters.years.includes(yearMatch[1]);
      });
    }

    // Фильтр по материалу рамы (id:20 в product.attributes)
    if (appliedFilters.material.length > 0) {
      filtered = filtered.filter((product: Product) => {
        const productMaterials =
          product.attributes?.data
            ?.filter((attr: ProductAttribute) => attr.id === 20)
            .map((attr: ProductAttribute) => attr.value) || [];

        return appliedFilters.material.some((m) =>
          productMaterials.includes(m)
        );
      });
    }

    // Фильтр по тормозам (id:4 в product.attributes)
    if (appliedFilters.brakes.length > 0) {
      filtered = filtered.filter((product: Product) => {
        const productBrakes =
          product.attributes?.data
            ?.filter((attr: ProductAttribute) => attr.id === 4)
            .map((attr: ProductAttribute) => attr.value) || [];

        return appliedFilters.brakes.some((b) => productBrakes.includes(b));
      });
    }

    // Фильтр по вилке (id:10 в product.attributes)
    if (appliedFilters.fork.length > 0) {
      filtered = filtered.filter((product: Product) => {
        const productForks =
          product.attributes?.data
            ?.filter((attr: ProductAttribute) => attr.id === 10)
            .map((attr: ProductAttribute) => attr.value) || [];

        return appliedFilters.fork.some((f) => productForks.includes(f));
      });
    }

    // Фильтр по цвету (id:2 в offers.data.attributes)
    if (appliedFilters.colors.length > 0) {
      filtered = filtered.filter((product: Product) => {
        const productColors: string[] = [];

        if (product.offers?.data) {
          product.offers.data.forEach((offer: ProductOffer) => {
            if (offer.attributes?.data) {
              offer.attributes.data.forEach((attr: ProductAttribute) => {
                if (attr.id === 2) {
                  productColors.push(attr.value);
                }
              });
            }
          });
        }

        return appliedFilters.colors.some((c) => productColors.includes(c));
      });
    }

    // Фильтр по типу обода (id:11 в product.attributes)
    if (appliedFilters.rimType.length > 0) {
      filtered = filtered.filter((product: Product) => {
        const productRimTypes =
          product.attributes?.data
            ?.filter((attr: ProductAttribute) => attr.id === 11)
            .map((attr: ProductAttribute) => attr.value) || [];

        return appliedFilters.rimType.some((r) => productRimTypes.includes(r));
      });
    }

    // Фильтр по полу
    if (appliedFilters.gender.length > 0) {
      filtered = filtered.filter((product: Product) => {
        const name = product.name?.toLowerCase() || "";
        return appliedFilters.gender.some((gender: string) => {
          if (gender === "Мужской")
            return name.includes("мужской") || name.includes("муж");
          if (gender === "Женский")
            return name.includes("женский") || name.includes("жен");
          if (gender === "Унисекс")
            return (
              !name.includes("мужской") &&
              !name.includes("женский") &&
              !name.includes("муж") &&
              !name.includes("жен")
            );
          return false;
        });
      });
    }

    // Фильтр "в наличии"
    if (inStockOnly) {
      filtered = filtered.filter((product: Product) => {
        return product.offers?.data?.some(
          (offer: ProductOffer) =>
            offer.stock?.data && offer.stock.data.length > 0
        );
      });
    }

    // Фильтр "со скидкой"
    if (withDiscount) {
      filtered = filtered.filter(() => Math.random() > 0.7);
    }

    // Фильтр "с видео"
    if (withVideo) {
      filtered = filtered.filter(() => Math.random() > 0.8);
    }

    // Сортировка
    const sortedFiltered = [...filtered];

    switch (sortBy) {
      case "cheap":
        sortedFiltered.sort((a: Product, b: Product) => {
          const priceA = a.offers?.data?.[0]?.prices?.data?.[0]?.price || 0;
          const priceB = b.offers?.data?.[0]?.prices?.data?.[0]?.price || 0;
          return priceA - priceB;
        });
        break;
      case "expensive":
        sortedFiltered.sort((a: Product, b: Product) => {
          const priceA = a.offers?.data?.[0]?.prices?.data?.[0]?.price || 0;
          const priceB = b.offers?.data?.[0]?.prices?.data?.[0]?.price || 0;
          return priceB - priceA;
        });
        break;
      case "new":
        sortedFiltered.sort((a: Product, b: Product) => {
          const yearA = parseInt(a.name?.match(/\((\d{4})\)/)?.[1] || "0");
          const yearB = parseInt(b.name?.match(/\((\d{4})\)/)?.[1] || "0");
          return yearB - yearA;
        });
        break;
      case "discount":
        sortedFiltered.sort((a: Product, b: Product) => {
          const priceA = a.offers?.data?.[0]?.prices?.data?.[0]?.price || 0;
          const priceB = b.offers?.data?.[0]?.prices?.data?.[0]?.price || 0;
          return priceB - priceA;
        });
        break;
      default:
        break;
    }

    return sortedFiltered;
  }, [
    allProducts,
    appliedFilters,
    inStockOnly,
    withDiscount,
    withVideo,
    sortBy,
    searchQuery,
  ]);

  // Пагинация для отфильтрованных товаров
  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * 20;
    const end = start + 20;
    return filteredProducts.slice(start, end);
  }, [filteredProducts, currentPage]);

  // Общее количество страниц для отфильтрованных товаров
  const filteredTotalPages = useMemo(() => {
    return Math.ceil(filteredProducts.length / 20);
  }, [filteredProducts]);

  // Обработчики изменения фильтров (только обновляют selectedFilters)
  const handlePriceChange = (index: 0 | 1, value: number) => {
    const newCurrent: [number, number] = [...selectedFilters.price.current] as [
      number,
      number
    ];
    newCurrent[index] = value;

    if (index === 0 && value > selectedFilters.price.current[1]) {
      newCurrent[0] = selectedFilters.price.current[1];
    }
    if (index === 1 && value < selectedFilters.price.current[0]) {
      newCurrent[1] = selectedFilters.price.current[0];
    }

    setSelectedFilters((prev) => ({
      ...prev,
      price: {
        ...prev.price,
        current: newCurrent,
      },
    }));
  };

  const handleBrandToggle = (brand: string) => {
    setSelectedFilters((prev) => ({
      ...prev,
      brands: prev.brands.includes(brand)
        ? prev.brands.filter((b) => b !== brand)
        : [...prev.brands, brand],
    }));
  };

  const handleArrayFilterToggle = (
    filterType: keyof Pick<
      FilterState,
      | "types"
      | "wheelDiameter"
      | "rimType"
      | "years"
      | "equipment"
      | "gender"
      | "colors"
      | "fork"
      | "brakes"
      | "material"
    >,
    value: string
  ) => {
    setSelectedFilters((prev) => {
      const current = prev[filterType] as string[];
      return {
        ...prev,
        [filterType]: current.includes(value)
          ? current.filter((v) => v !== value)
          : [...current, value],
      };
    });
  };

  const resetFilters = () => {
    const resetValues: FilterState = {
      price: {
        min: filterOptions.priceRange.min,
        max: filterOptions.priceRange.max,
        current: [
          filterOptions.priceRange.min,
          filterOptions.priceRange.max,
        ] as [number, number],
      },
      brands: [],
      types: [],
      wheelDiameter: [],
      rimType: [],
      years: [],
      equipment: [],
      height: { from: "", to: "" },
      gender: [],
      colors: [],
      fork: [],
      brakes: [],
      material: [],
    };

    setSelectedFilters(resetValues);
    setAppliedFilters(resetValues);
    setSearchQuery("");
    setInStockOnly(false);
    setWithDiscount(false);
    setWithVideo(false);
    setSortBy("cheap");
    dispatch(setCurrentPage(1));
  };

  const toggleFilter = (filterName: string) => {
    setOpenFilter(openFilter === filterName ? null : filterName);
  };

  const handlePageChange = (page: number) => {
    dispatch(setCurrentPage(page));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const filteredBrands = useMemo(() => {
    return filterOptions.brands.filter((brand: string) =>
      brand.toLowerCase().includes(brandSearch.toLowerCase())
    );
  }, [filterOptions.brands, brandSearch]);

  const renderPagination = () => {
    if (filteredTotalPages <= 1) return null;

    const pages = [];
    const maxVisiblePages = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(filteredTotalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    if (currentPage > 1) {
      pages.push(
        <button
          key="prev"
          onClick={() => handlePageChange(currentPage - 1)}
          className={styles.pageButton}
        >
          ←
        </button>
      );
    }

    if (startPage > 1) {
      pages.push(
        <button
          key={1}
          onClick={() => handlePageChange(1)}
          className={styles.pageButton}
        >
          1
        </button>
      );
      if (startPage > 2) {
        pages.push(
          <span key="ellipsis1" className={styles.ellipsis}>
            ...
          </span>
        );
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={`${styles.pageButton} ${
            currentPage === i ? styles.active : ""
          }`}
        >
          {i}
        </button>
      );
    }

    if (endPage < filteredTotalPages) {
      if (endPage < filteredTotalPages - 1) {
        pages.push(
          <span key="ellipsis2" className={styles.ellipsis}>
            ...
          </span>
        );
      }
      pages.push(
        <button
          key={filteredTotalPages}
          onClick={() => handlePageChange(filteredTotalPages)}
          className={styles.pageButton}
        >
          {filteredTotalPages}
        </button>
      );
    }

    if (currentPage < filteredTotalPages) {
      pages.push(
        <button
          key="next"
          onClick={() => handlePageChange(currentPage + 1)}
          className={styles.pageButton}
        >
          →
        </button>
      );
    }

    return pages;
  };

  const isLoading = loading || isLoadingAll;
  const displayError = reduxError || fetchError;

  return (
    <div className={styles.catalog}>
      {isLoading && !allProductsLoaded && (
        <div className={styles.loading}>
          <div className={styles.spinner}></div>
          <p>Загрузка каталога...</p>
        </div>
      )}

      {displayError && (
        <div className={styles.error}>
          <h2>Ошибка при загрузке каталога</h2>
          <p>{displayError}</p>
          <button onClick={() => window.location.reload()}>
            Попробовать снова
          </button>
        </div>
      )}

      {!displayError && allProductsLoaded && (
        <>
          <button
            className={styles.mobileFilterToggle}
            onClick={() => setShowMobileFilters(!showMobileFilters)}
          >
            Фильтры
          </button>

          <div className={styles.container}>
            <aside
              className={`${styles.filters} ${
                showMobileFilters ? styles.filtersOpen : ""
              }`}
            >
              <div className={styles.filtersHeader}>
                <h3>Фильтры</h3>
                <button
                  className={styles.closeFilters}
                  onClick={() => setShowMobileFilters(false)}
                >
                  ×
                </button>
              </div>

              {/* Фильтр стоимости с двумя ползунками */}
              <div className={styles.filterGroup}>
                <button
                  className={styles.filterTitle}
                  onClick={() => toggleFilter("price")}
                >
                  Стоимость
                  <span
                    className={
                      openFilter === "price" ? styles.arrowUp : styles.arrowDown
                    }
                  >
                    ▼
                  </span>
                </button>
                {openFilter === "price" && (
                  <div className={styles.filterContent}>
                    <div className={styles.priceRange}>
                      <div className={styles.dualRange}>
                        <input
                          type="range"
                          min={selectedFilters.price.min}
                          max={selectedFilters.price.max}
                          value={selectedFilters.price.current[0]}
                          onChange={(e) =>
                            handlePriceChange(0, Number(e.target.value))
                          }
                          className={styles.rangeInput}
                        />
                        <input
                          type="range"
                          min={selectedFilters.price.min}
                          max={selectedFilters.price.max}
                          value={selectedFilters.price.current[1]}
                          onChange={(e) =>
                            handlePriceChange(1, Number(e.target.value))
                          }
                          className={styles.rangeInput}
                        />
                      </div>
                      <div className={styles.priceInputs}>
                        <span>от:</span>
                        <input
                          type="number"
                          value={selectedFilters.price.current[0]}
                          onChange={(e) =>
                            handlePriceChange(0, Number(e.target.value))
                          }
                          className={styles.priceInput}
                        />
                        <span>до:</span>
                        <input
                          type="number"
                          value={selectedFilters.price.current[1]}
                          onChange={(e) =>
                            handlePriceChange(1, Number(e.target.value))
                          }
                          className={styles.priceInput}
                        />
                        <span>₽</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Фильтр бренда с поиском */}
              <div className={styles.filterGroup}>
                <button
                  className={styles.filterTitle}
                  onClick={() => toggleFilter("brand")}
                >
                  Бренд
                  <span
                    className={
                      openFilter === "brand" ? styles.arrowUp : styles.arrowDown
                    }
                  >
                    ▼
                  </span>
                </button>
                {openFilter === "brand" && (
                  <div className={styles.filterContent}>
                    <input
                      type="text"
                      placeholder="Поиск бренда..."
                      value={brandSearch}
                      onChange={(e) => setBrandSearch(e.target.value)}
                      className={styles.searchInput}
                    />
                    <div className={styles.filterOptions}>
                      {filteredBrands.map((brand: string) => (
                        <label key={brand} className={styles.checkboxLabel}>
                          <input
                            type="checkbox"
                            checked={selectedFilters.brands.includes(brand)}
                            onChange={() => handleBrandToggle(brand)}
                          />
                          <span>{brand}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Тип велосипеда */}
              {filterOptions.types.length > 0 && (
                <div className={styles.filterGroup}>
                  <button
                    className={styles.filterTitle}
                    onClick={() => toggleFilter("type")}
                  >
                    Тип велосипеда
                    <span
                      className={
                        openFilter === "type"
                          ? styles.arrowUp
                          : styles.arrowDown
                      }
                    >
                      ▼
                    </span>
                  </button>
                  {openFilter === "type" && (
                    <div className={styles.filterContent}>
                      <div className={styles.filterOptions}>
                        {filterOptions.types.map((type: string) => (
                          <label key={type} className={styles.checkboxLabel}>
                            <input
                              type="checkbox"
                              checked={selectedFilters.types.includes(type)}
                              onChange={() =>
                                handleArrayFilterToggle("types", type)
                              }
                            />
                            <span>{type}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Диаметр колес */}
              {filterOptions.wheelDiameters.length > 0 && (
                <div className={styles.filterGroup}>
                  <button
                    className={styles.filterTitle}
                    onClick={() => toggleFilter("wheelDiameter")}
                  >
                    Диаметр колес
                    <span
                      className={
                        openFilter === "wheelDiameter"
                          ? styles.arrowUp
                          : styles.arrowDown
                      }
                    >
                      ▼
                    </span>
                  </button>
                  {openFilter === "wheelDiameter" && (
                    <div className={styles.filterContent}>
                      <div className={styles.filterOptions}>
                        {filterOptions.wheelDiameters.map(
                          (diameter: string) => (
                            <label
                              key={diameter}
                              className={styles.checkboxLabel}
                            >
                              <input
                                type="checkbox"
                                checked={selectedFilters.wheelDiameter.includes(
                                  diameter
                                )}
                                onChange={() =>
                                  handleArrayFilterToggle(
                                    "wheelDiameter",
                                    diameter
                                  )
                                }
                              />
                              <span>{diameter}</span>
                            </label>
                          )
                        )}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Тип обода */}
              {filterOptions.rimTypes.length > 0 && (
                <div className={styles.filterGroup}>
                  <button
                    className={styles.filterTitle}
                    onClick={() => toggleFilter("rimType")}
                  >
                    Тип обода
                    <span
                      className={
                        openFilter === "rimType"
                          ? styles.arrowUp
                          : styles.arrowDown
                      }
                    >
                      ▼
                    </span>
                  </button>
                  {openFilter === "rimType" && (
                    <div className={styles.filterContent}>
                      <div className={styles.filterOptions}>
                        {filterOptions.rimTypes.map((type: string) => (
                          <label key={type} className={styles.checkboxLabel}>
                            <input
                              type="checkbox"
                              checked={selectedFilters.rimType.includes(type)}
                              onChange={() =>
                                handleArrayFilterToggle("rimType", type)
                              }
                            />
                            <span>{type}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Модельный год */}
              {filterOptions.years.length > 0 && (
                <div className={styles.filterGroup}>
                  <button
                    className={styles.filterTitle}
                    onClick={() => toggleFilter("year")}
                  >
                    Модельный год
                    <span
                      className={
                        openFilter === "year"
                          ? styles.arrowUp
                          : styles.arrowDown
                      }
                    >
                      ▼
                    </span>
                  </button>
                  {openFilter === "year" && (
                    <div className={styles.filterContent}>
                      <div className={styles.filterOptions}>
                        {filterOptions.years.map((year: string) => (
                          <label key={year} className={styles.checkboxLabel}>
                            <input
                              type="checkbox"
                              checked={selectedFilters.years.includes(year)}
                              onChange={() =>
                                handleArrayFilterToggle("years", year)
                              }
                            />
                            <span>{year}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Рост */}
              <div className={styles.filterGroup}>
                <button
                  className={styles.filterTitle}
                  onClick={() => toggleFilter("height")}
                >
                  Рост
                  <span
                    className={
                      openFilter === "height"
                        ? styles.arrowUp
                        : styles.arrowDown
                    }
                  >
                    ▼
                  </span>
                </button>
                {openFilter === "height" && (
                  <div className={styles.filterContent}>
                    <div className={styles.heightInputs}>
                      <span>от:</span>
                      <input
                        type="number"
                        placeholder="150"
                        value={selectedFilters.height.from}
                        onChange={(e) =>
                          setSelectedFilters((prev) => ({
                            ...prev,
                            height: { ...prev.height, from: e.target.value },
                          }))
                        }
                        className={styles.heightInput}
                      />
                      <span>до:</span>
                      <input
                        type="number"
                        placeholder="200"
                        value={selectedFilters.height.to}
                        onChange={(e) =>
                          setSelectedFilters((prev) => ({
                            ...prev,
                            height: { ...prev.height, to: e.target.value },
                          }))
                        }
                        className={styles.heightInput}
                      />
                      <span>см</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Пол */}
              {filterOptions.genders.length > 0 && (
                <div className={styles.filterGroup}>
                  <button
                    className={styles.filterTitle}
                    onClick={() => toggleFilter("gender")}
                  >
                    Пол
                    <span
                      className={
                        openFilter === "gender"
                          ? styles.arrowUp
                          : styles.arrowDown
                      }
                    >
                      ▼
                    </span>
                  </button>
                  {openFilter === "gender" && (
                    <div className={styles.filterContent}>
                      <div className={styles.filterOptions}>
                        {filterOptions.genders.map((gender: string) => (
                          <label key={gender} className={styles.checkboxLabel}>
                            <input
                              type="checkbox"
                              checked={selectedFilters.gender.includes(gender)}
                              onChange={() =>
                                handleArrayFilterToggle("gender", gender)
                              }
                            />
                            <span>{gender}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Цвет */}
              {filterOptions.colors.length > 0 && (
                <div className={styles.filterGroup}>
                  <button
                    className={styles.filterTitle}
                    onClick={() => toggleFilter("color")}
                  >
                    Цвет
                    <span
                      className={
                        openFilter === "color"
                          ? styles.arrowUp
                          : styles.arrowDown
                      }
                    >
                      ▼
                    </span>
                  </button>
                  {openFilter === "color" && (
                    <div className={styles.filterContent}>
                      <div className={styles.filterOptions}>
                        {filterOptions.colors.map((color: string) => (
                          <label key={color} className={styles.checkboxLabel}>
                            <input
                              type="checkbox"
                              checked={selectedFilters.colors.includes(color)}
                              onChange={() =>
                                handleArrayFilterToggle("colors", color)
                              }
                            />
                            <span>{color}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Вилка */}
              {filterOptions.forks.length > 0 && (
                <div className={styles.filterGroup}>
                  <button
                    className={styles.filterTitle}
                    onClick={() => toggleFilter("fork")}
                  >
                    Вилка
                    <span
                      className={
                        openFilter === "fork"
                          ? styles.arrowUp
                          : styles.arrowDown
                      }
                    >
                      ▼
                    </span>
                  </button>
                  {openFilter === "fork" && (
                    <div className={styles.filterContent}>
                      <div className={styles.filterOptions}>
                        {filterOptions.forks.map((fork: string) => (
                          <label key={fork} className={styles.checkboxLabel}>
                            <input
                              type="checkbox"
                              checked={selectedFilters.fork.includes(fork)}
                              onChange={() =>
                                handleArrayFilterToggle("fork", fork)
                              }
                            />
                            <span>{fork}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Тормоза */}
              {filterOptions.brakes.length > 0 && (
                <div className={styles.filterGroup}>
                  <button
                    className={styles.filterTitle}
                    onClick={() => toggleFilter("brakes")}
                  >
                    Тормоза
                    <span
                      className={
                        openFilter === "brakes"
                          ? styles.arrowUp
                          : styles.arrowDown
                      }
                    >
                      ▼
                    </span>
                  </button>
                  {openFilter === "brakes" && (
                    <div className={styles.filterContent}>
                      <div className={styles.filterOptions}>
                        {filterOptions.brakes.map((brake: string) => (
                          <label key={brake} className={styles.checkboxLabel}>
                            <input
                              type="checkbox"
                              checked={selectedFilters.brakes.includes(brake)}
                              onChange={() =>
                                handleArrayFilterToggle("brakes", brake)
                              }
                            />
                            <span>{brake}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Материал рамы */}
              {filterOptions.materials.length > 0 && (
                <div className={styles.filterGroup}>
                  <button
                    className={styles.filterTitle}
                    onClick={() => toggleFilter("material")}
                  >
                    Материал рамы
                    <span
                      className={
                        openFilter === "material"
                          ? styles.arrowUp
                          : styles.arrowDown
                      }
                    >
                      ▼
                    </span>
                  </button>
                  {openFilter === "material" && (
                    <div className={styles.filterContent}>
                      <div className={styles.filterOptions}>
                        {filterOptions.materials.map((material: string) => (
                          <label
                            key={material}
                            className={styles.checkboxLabel}
                          >
                            <input
                              type="checkbox"
                              checked={selectedFilters.material.includes(
                                material
                              )}
                              onChange={() =>
                                handleArrayFilterToggle("material", material)
                              }
                            />
                            <span>{material}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Кнопки действий */}
              <div className={styles.filterActions}>
                <button className={styles.applyButton} onClick={applyFilters}>
                  Подобрать велосипед
                </button>
                <div className={styles.filterStats}>
                  Найдено: {filteredProducts.length} товаров
                </div>
                <button className={styles.resetButton} onClick={resetFilters}>
                  Сбросить фильтры
                </button>
              </div>
            </aside>

            <main className={styles.content}>
              <div className={styles.header}>
                <div className={styles.resultsInfo}>
                  <h1>
                    Найдено товаров: {filteredProducts.length}
                    {searchQuery && (
                      <span className={styles.searchQuery}>
                        {" "}
                        по запросу "{searchQuery}"
                      </span>
                    )}
                  </h1>
                  <div className={styles.checkboxes}>
                    <label className={styles.checkboxLabel}>
                      <input
                        type="checkbox"
                        checked={inStockOnly}
                        onChange={(e) => {
                          setInStockOnly(e.target.checked);
                        }}
                      />
                      <span>Только в наличии</span>
                    </label>
                    <label className={styles.checkboxLabel}>
                      <input
                        type="checkbox"
                        checked={withDiscount}
                        onChange={(e) => {
                          setWithDiscount(e.target.checked);
                        }}
                      />
                      <span>Со скидкой</span>
                    </label>
                    <label className={styles.checkboxLabel}>
                      <input
                        type="checkbox"
                        checked={withVideo}
                        onChange={(e) => {
                          setWithVideo(e.target.checked);
                        }}
                      />
                      <span>Видеообзор</span>
                    </label>
                    {searchQuery && (
                      <button
                        className={styles.clearSearch}
                        onClick={() => setSearchQuery("")}
                      >
                        × Очистить поиск
                      </button>
                    )}
                  </div>
                </div>

                <div className={styles.sort}>
                  <label>Сортировать по:</label>
                  <select
                    value={sortBy}
                    onChange={(e) => {
                      setSortBy(e.target.value);
                      dispatch(setCurrentPage(1));
                    }}
                    className={styles.sortSelect}
                  >
                    <option value="cheap">Дешевле</option>
                    <option value="expensive">Дороже</option>
                    <option value="popular">Популярные</option>
                    <option value="new">Новинки</option>
                    <option value="discount">По скидке</option>
                  </select>
                </div>
              </div>

              <div className={styles.productsGrid}>
                {paginatedProducts.map((product: Product, index: number) => {
                  const price =
                    product.offers?.data?.[0]?.prices?.data?.[0]?.price || 0;
                  const inStock = product.offers?.data?.some(
                    (offer: ProductOffer) =>
                      offer.stock?.data && offer.stock.data.length > 0
                  );

                  // Создаем уникальный ключ
                  const uniqueKey = `${product.product_id}_${index}`;

                  return (
                    <Card
                      key={uniqueKey}
                      image={
                        product.image ||
                        `https://via.placeholder.com/300x200/4A6FA5/FFFFFF?text=${encodeURIComponent(
                          product.name?.slice(0, 30) || "Товар"
                        )}`
                      }
                      hit={Math.random() > 0.8}
                      sale={false}
                      section="Каталог"
                      status={inStock ? "В наличии" : "Нет в наличии"}
                      title={product.name || ""}
                      price={price.toLocaleString("ru-RU")}
                      oldprice=""
                      pricePerMonth={`от ${Math.round(
                        price / 12
                      ).toLocaleString("ru-RU")} руб. в месяц`}
                      product_id={product.product_id}
                      offer_id={product.offers?.data?.[0]?.offer_id || ""}
                    />
                  );
                })}
              </div>

              {filteredTotalPages > 1 && (
                <div className={styles.pagination}>
                  <div className={styles.paginationStats}>
                    Страница {currentPage} из {filteredTotalPages}
                  </div>
                  <div className={styles.paginationButtons}>
                    {renderPagination()}
                  </div>
                </div>
              )}
            </main>
          </div>
        </>
      )}
    </div>
  );
};

const getFilterLabel = (filter: string) => {
  const labels: { [key: string]: string } = {
    brand: "Бренд",
    type: "Тип велосипеда",
    wheelDiameter: "Диаметр колес",
    rimType: "Тип обода",
    year: "Модельный год",
    equipment: "Уровень оборудования",
    height: "Рост",
    gender: "Пол",
    color: "Цвет",
    city: "Город",
    fork: "Вилка",
    brakes: "Тормоза",
    material: "Материал рамы",
    weight: "Вес",
  };
  return labels[filter] || filter;
};
