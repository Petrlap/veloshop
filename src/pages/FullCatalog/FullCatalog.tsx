import { useState, useMemo, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCatalog } from "../../store/catalogSlice";
import { RootState } from "../../store";
import { Card } from "../../components/Card/Card";
import img from "../../assets/bg.webp";
import styles from "./FullCatalog.module.css";

// Моковые данные товаров (20 товаров)
/*const products = [
  {
    image: img,
    hit: true,
    sale: false,
    section: "Велосипеды",
    status: "В наличии",
    title: "Stark Krafter 29.8 HD (2025) велосипед",
    price: "41 050",
    oldprice: "",
    pricePerMonth: "от 2 675 руб. в месяц",
  },
  {
    image: img,
    hit: true,
    sale: false,
    section: "Велосипеды",
    status: "В наличии",
    title: "Stark Mountain 27.5 Pro (2024) велосипед",
    price: "35 800",
    oldprice: "",
    pricePerMonth: "от 2 330 руб. в месяц",
  },
  {
    image: img,
    hit: false,
    sale: false,
    section: "Велосипеды",
    status: "В наличии",
    title: "Forward Prime 29.1 (2024) велосипед",
    price: "28 900",
    oldprice: "",
    pricePerMonth: "от 1 880 руб. в месяц",
  },
  {
    image: img,
    hit: false,
    sale: false,
    section: "Велосипеды",
    status: "В наличии",
    title: "Stels Navigator 500 MD 26 (2024)",
    price: "23 450",
    oldprice: "",
    pricePerMonth: "от 1 525 руб. в месяц",
  },
  {
    image: img,
    hit: false,
    sale: true,
    section: "Велосипеды",
    status: "В наличии",
    title: "Cube Analog 29 (2023) велосипед",
    price: "41 050",
    oldprice: "52 100",
    pricePerMonth: "от 2 675 руб. в месяц",
  },
  {
    image: img,
    hit: false,
    sale: true,
    section: "Велосипеды",
    status: "В наличии",
    title: "Ghost Kato 2.9 (2024) велосипед",
    price: "38 750",
    oldprice: "45 900",
    pricePerMonth: "от 2 520 руб. в месяц",
  },
  {
    image: img,
    hit: true,
    sale: false,
    section: "Велосипеды",
    status: "В наличии",
    title: "Trek Marlin 5 (2024) велосипед",
    price: "47 300",
    oldprice: "",
    pricePerMonth: "от 3 080 руб. в месяц",
  },
  {
    image: img,
    hit: false,
    sale: false,
    section: "Велосипеды",
    status: "В наличии",
    title: "Scott Aspect 960 (2024) велосипед",
    price: "39 200",
    oldprice: "",
    pricePerMonth: "от 2 550 руб. в месяц",
  },
  {
    image: img,
    hit: false,
    sale: true,
    section: "Велосипеды",
    status: "В наличии",
    title: "Giant Talon 3 (2023) велосипед",
    price: "34 500",
    oldprice: "41 200",
    pricePerMonth: "от 2 245 руб. в месяц",
  },
  {
    image: img,
    hit: true,
    sale: false,
    section: "Велосипеды",
    status: "В наличии",
    title: "Merida Big Nine 300 (2024) велосипед",
    price: "52 100",
    oldprice: "",
    pricePerMonth: "от 3 390 руб. в месяц",
  },
  {
    image: img,
    hit: false,
    sale: false,
    section: "Велосипеды",
    status: "В наличии",
    title: "Cannondale Trail 6 (2024) велосипед",
    price: "45 800",
    oldprice: "",
    pricePerMonth: "от 2 980 руб. в месяц",
  },
  {
    image: img,
    hit: false,
    sale: true,
    section: "Велосипеды",
    status: "В наличии",
    title: "Specialized Rockhopper 29 (2023)",
    price: "43 200",
    oldprice: "48 500",
    pricePerMonth: "от 2 810 руб. в месяц",
  },
  {
    image: img,
    hit: true,
    sale: false,
    section: "Велосипеды",
    status: "В наличии",
    title: "Norco Storm 1 (2024) велосипед",
    price: "38 900",
    oldprice: "",
    pricePerMonth: "от 2 530 руб. в месяц",
  },
  {
    image: img,
    hit: false,
    sale: false,
    section: "Велосипеды",
    status: "В наличии",
    title: "GT Aggressor Pro (2024) велосипед",
    price: "32 700",
    oldprice: "",
    pricePerMonth: "от 2 130 руб. в месяц",
  },
  {
    image: img,
    hit: false,
    sale: true,
    section: "Велосипеды",
    status: "В наличии",
    title: "Diamondback Overdrive 29 (2023)",
    price: "36 800",
    oldprice: "42 100",
    pricePerMonth: "от 2 395 руб. в месяц",
  },
  {
    image: img,
    hit: true,
    sale: false,
    section: "Велосипеды",
    status: "В наличии",
    title: "Raleigh Tokul 2 (2024) велосипед",
    price: "49 500",
    oldprice: "",
    pricePerMonth: "от 3 220 руб. в месяц",
  },
  {
    image: img,
    hit: false,
    sale: false,
    section: "Велосипеды",
    status: "В наличии",
    title: "Marin San Quentin 1 (2024) велосипед",
    price: "41 300",
    oldprice: "",
    pricePerMonth: "от 2 690 руб. в месяц",
  },
  {
    image: img,
    hit: false,
    sale: true,
    section: "Велосипеды",
    status: "В наличии",
    title: "Kona Fire Mountain (2023) велосипед",
    price: "37 600",
    oldprice: "44 800",
    pricePerMonth: "от 2 450 руб. в месяц",
  },
  {
    image: img,
    hit: true,
    sale: false,
    section: "Велосипеды",
    status: "В наличии",
    title: "Santa Cruz Chameleon (2024) велосипед",
    price: "67 800",
    oldprice: "",
    pricePerMonth: "от 4 410 руб. в месяц",
  },
  {
    image: img,
    hit: false,
    sale: false,
    section: "Велосипеды",
    status: "В наличии",
    title: "Polygon Premier 4 (2024) велосипед",
    price: "29 900",
    oldprice: "",
    pricePerMonth: "от 1 945 руб. в месяц",
  },
];*/

export const FullCatalog = () => {
  const dispatch = useDispatch();
  const {
    products: apiProducts,
    loading,
    error,
  } = useSelector((state: RootState) => state.catalog);

  const [openFilter, setOpenFilter] = useState("price");
  const [inStockOnly, setInStockOnly] = useState(false);
  const [withDiscount, setWithDiscount] = useState(false);
  const [withVideo, setWithVideo] = useState(false);
  const [sortBy, setSortBy] = useState("cheap");
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 16;

  useEffect(() => {
    dispatch(fetchCatalog({ page: currentPage, perPage: itemsPerPage }) as any);
  }, [dispatch, currentPage]);

  const filteredAndSortedProducts = useMemo(() => {
    let filtered = [...apiProducts]; // Используем данные из API вместо моковых

    // Применяем фильтры
    if (inStockOnly) {
      filtered = filtered.filter((product) => product.status === "В наличии");
    }
    if (withDiscount) {
      filtered = filtered.filter((product) => product.sale);
    }
    // Фильтр withVideo пока не применяем, так как в данных нет этого поля

    // Применяем сортировку
    switch (sortBy) {
      case "cheap":
        filtered.sort(
          (a, b) =>
            parseInt(a.price.replace(/\s/g, "")) -
            parseInt(b.price.replace(/\s/g, ""))
        );
        break;
      case "expensive":
        filtered.sort(
          (a, b) =>
            parseInt(b.price.replace(/\s/g, "")) -
            parseInt(a.price.replace(/\s/g, ""))
        );
        break;
      case "popular":
        // Сортируем по хитам
        filtered.sort((a, b) => (b.hit ? 1 : 0) - (a.hit ? 1 : 0));
        break;
      case "new":
        // Сортируем по дате создания (если есть поле created_at)
        filtered.sort((a: any, b: any) => {
          if (a.created_at && b.created_at) {
            return (
              new Date(b.created_at).getTime() -
              new Date(a.created_at).getTime()
            );
          }
          return 0;
        });
        break;
      case "discount":
        // Сортируем по размеру скидки
        filtered.sort((a, b) => {
          const discountA = a.oldprice
            ? parseInt(a.oldprice.replace(/\s/g, "")) -
              parseInt(a.price.replace(/\s/g, ""))
            : 0;
          const discountB = b.oldprice
            ? parseInt(b.oldprice.replace(/\s/g, "")) -
              parseInt(b.price.replace(/\s/g, ""))
            : 0;
          return discountB - discountA;
        });
        break;
      default:
        break;
    }

    return filtered;
  }, [apiProducts, inStockOnly, withDiscount, sortBy]);

  // Пагинация
  const totalPages = Math.ceil(filteredAndSortedProducts.length / itemsPerPage);
  const currentProducts = filteredAndSortedProducts.slice(0, itemsPerPage);

  const toggleFilter = (filterName: string) => {
    setOpenFilter(openFilter === filterName ? "" : filterName);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const renderPagination = () => {
    const pages = [];
    const maxVisiblePages = 5;

    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    // Кнопка "Назад"
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

    // Первая страница
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

    // Основные страницы
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

    // Последняя страница
    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pages.push(
          <span key="ellipsis2" className={styles.ellipsis}>
            ...
          </span>
        );
      }
      pages.push(
        <button
          key={totalPages}
          onClick={() => handlePageChange(totalPages)}
          className={styles.pageButton}
        >
          {totalPages}
        </button>
      );
    }

    // Кнопка "Вперед"
    if (currentPage < totalPages) {
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

  return (
    <div className={styles.catalog}>
      {loading && (
        <div className={styles.loading}>
          <div className={styles.spinner}></div>
          <p>Загрузка каталога...</p>
        </div>
      )}

      {error && (
        <div className={styles.error}>
          <h2>Ошибка при загрузке каталога</h2>
          <p>{error}</p>
          <button
            onClick={() =>
              dispatch(
                fetchCatalog({
                  page: currentPage,
                  perPage: itemsPerPage,
                }) as any
              )
            }
          >
            Попробовать снова
          </button>
        </div>
      )}

      {!loading && !error && (
        <>
          {/* Мобильная кнопка фильтров */}
          <button
            className={styles.mobileFilterToggle}
            onClick={() => setShowMobileFilters(!showMobileFilters)}
          >
            Фильтры
          </button>

          <div className={styles.container}>
            {/* Боковая панель с фильтрами */}
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

              {/* Фильтр стоимости */}
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
                      <div className={styles.priceInputs}>
                        <span>от:</span>
                        <input
                          type="text"
                          defaultValue="1 990"
                          className={styles.priceInput}
                        />
                        <span>до:</span>
                        <input
                          type="text"
                          defaultValue="1 755 000"
                          className={styles.priceInput}
                        />
                        <span>p</span>
                      </div>
                      <div className={styles.priceQuick}>
                        <button className={styles.priceBtn}>До 20 000 ₽</button>
                        <button className={styles.priceBtn}>До 30 000 ₽</button>
                        <button className={styles.priceBtn}>До 35 000 ₽</button>
                        <button className={styles.priceBtn}>До 40 000 ₽</button>
                        <button className={styles.priceBtn}>До 50 000 ₽</button>
                        <button className={styles.priceBtn}>
                          До 100 000 ₽
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Остальные фильтры (свернутые по умолчанию) */}
              {[
                "brand",
                "type",
                "wheelDiameter",
                "rimType",
                "year",
                "equipment",
                "height",
                "gender",
                "color",
                "city",
                "fork",
                "brakes",
                "material",
                "weight",
              ].map((filter) => (
                <div key={filter} className={styles.filterGroup}>
                  <button
                    className={styles.filterTitle}
                    onClick={() => toggleFilter(filter)}
                  >
                    {getFilterLabel(filter)}
                    <span
                      className={
                        openFilter === filter
                          ? styles.arrowUp
                          : styles.arrowDown
                      }
                    >
                      ▼
                    </span>
                  </button>
                  {openFilter === filter && (
                    <div className={styles.filterContent}>
                      <div className={styles.filterOptions}>
                        {Array(5)
                          .fill(null)
                          .map((_, i) => (
                            <label key={i} className={styles.checkboxLabel}>
                              <input type="checkbox" />
                              <span>Опция {i + 1}</span>
                            </label>
                          ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </aside>

            {/* Основной контент */}
            <main className={styles.content}>
              {/* Заголовок и управление */}
              <div className={styles.header}>
                <div className={styles.resultsInfo}>
                  <h1>В наличии: {filteredAndSortedProducts.length} товаров</h1>
                  <div className={styles.checkboxes}>
                    <label className={styles.checkboxLabel}>
                      <input
                        type="checkbox"
                        checked={inStockOnly}
                        onChange={(e) => {
                          setInStockOnly(e.target.checked);
                          setCurrentPage(1); // Сбрасываем на первую страницу при изменении фильтра
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
                          setCurrentPage(1);
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
                          setCurrentPage(1);
                        }}
                      />
                      <span>Видеообзор</span>
                    </label>
                  </div>
                </div>

                <div className={styles.sort}>
                  <label>Сортировать по:</label>
                  <select
                    value={sortBy}
                    onChange={(e) => {
                      setSortBy(e.target.value);
                      setCurrentPage(1);
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

              {/* Сетка товаров */}
              <div className={styles.productsGrid}>
                {currentProducts.map((product, index) => (
                  <Card
                    key={`${product.offer_id || product.product_id || index}`}
                    {...product}
                  />
                ))}
              </div>

              {/* Пагинация */}
              {totalPages > 1 && (
                <div className={styles.pagination}>{renderPagination()}</div>
              )}
            </main>
          </div>
        </>
      )}
    </div>
  );
};

// Вспомогательная функция для получения названий фильтров
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
