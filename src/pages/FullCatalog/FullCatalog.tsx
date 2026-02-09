import { useState, useMemo, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCatalog } from "../../store/catalogSlice";
import { RootState } from "../../store";
import { Card } from "../../components/Card/Card";
import styles from "./FullCatalog.module.css";

export const FullCatalog = () => {
  const dispatch = useDispatch();
  const {
    products: apiProducts,
    loading,
    error,
    totalProducts,
    totalPages: totalPagesFromStore,
    currentPage: currentPageFromStore,
  } = useSelector((state: RootState) => state.catalog);

  const [openFilter, setOpenFilter] = useState("price");
  const [inStockOnly, setInStockOnly] = useState(false);
  const [withDiscount, setWithDiscount] = useState(false);
  const [withVideo, setWithVideo] = useState(false);
  const [sortBy, setSortBy] = useState("cheap");
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    dispatch(fetchCatalog({ page: currentPage, perPage: 100 }) as any);
  }, [dispatch, currentPage]);

  const filteredAndSortedProducts = useMemo(() => {
    let filtered = [...apiProducts];

    if (inStockOnly) {
      filtered = filtered.filter((product) => product.status === "В наличии");
    }
    if (withDiscount) {
      filtered = filtered.filter((product) => product.sale);
    }

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
        filtered.sort((a, b) => (b.hit ? 1 : 0) - (a.hit ? 1 : 0));
        break;
      case "new":
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
    let endPage = Math.min(
      totalPagesFromStore,
      startPage + maxVisiblePages - 1
    );

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

    if (endPage < totalPagesFromStore) {
      if (endPage < totalPagesFromStore - 1) {
        pages.push(
          <span key="ellipsis2" className={styles.ellipsis}>
            ...
          </span>
        );
      }
      pages.push(
        <button
          key={totalPagesFromStore}
          onClick={() => handlePageChange(totalPagesFromStore)}
          className={styles.pageButton}
        >
          {totalPagesFromStore}
        </button>
      );
    }

    if (currentPage < totalPagesFromStore) {
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
          <p>Загрузка страницы...</p>
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
                  perPage: 100,
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

            <main className={styles.content}>
              <div className={styles.header}>
                <div className={styles.resultsInfo}>
                  <h1>Найдено товаров: {filteredAndSortedProducts.length}</h1>
                  <div className={styles.checkboxes}>
                    <label className={styles.checkboxLabel}>
                      <input
                        type="checkbox"
                        checked={inStockOnly}
                        onChange={(e) => {
                          setInStockOnly(e.target.checked);
                          setCurrentPage(1);
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
                  <div className={styles.totalInfo}>
                    Всего в каталоге: {totalProducts} товаров
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

              <div className={styles.productsGrid}>
                {filteredAndSortedProducts.map((product, index) => (
                  <Card
                    key={product.offer_id || product.product_id || index}
                    image={product.image}
                    hit={product.hit}
                    sale={product.sale}
                    section={product.section}
                    status={product.status}
                    title={product.title}
                    price={product.price}
                    oldprice={product.oldprice}
                    pricePerMonth={product.pricePerMonth}
                    product_id={product.product_id} // Добавляем
                    offer_id={product.offer_id} // Добавляем
                  />
                ))}
              </div>

              {totalPagesFromStore > 1 && (
                <div className={styles.pagination}>
                  <div className={styles.paginationStats}>
                    Страница {currentPage} из {totalPagesFromStore}
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
