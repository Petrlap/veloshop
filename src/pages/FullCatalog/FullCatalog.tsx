import { useState, useMemo, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllInStockProducts,
  fetchCatalog,
  toggleInStockFilter,
  setCurrentPage,
} from "../../store/catalogSlice";
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
    totalPages,
    currentPage,
    perPage,

    inStockProducts,
    inStockLoading,
    showOnlyInStock,
  } = useSelector((state: RootState) => state.catalog);

  const [openFilter, setOpenFilter] = useState("price");
  const [inStockOnly, setInStockOnly] = useState(false);
  const [withDiscount, setWithDiscount] = useState(false);
  const [withVideo, setWithVideo] = useState(false);
  const [sortBy, setSortBy] = useState("cheap");
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  // Эффект для загрузки каталога с пагинацией
  useEffect(() => {
    if (!showOnlyInStock) {
      dispatch(fetchCatalog({ page: currentPage, perPage: 20 }) as any);
    }
  }, [dispatch, currentPage, showOnlyInStock]);

  // Эффект для загрузки ВСЕХ товаров в наличии
  useEffect(() => {
    if (inStockOnly && !showOnlyInStock && inStockProducts.length === 0) {
      console.log("Загружаю все товары в наличии...");
      dispatch(fetchAllInStockProducts() as any);
      dispatch(toggleInStockFilter(true));
    } else if (!inStockOnly && showOnlyInStock) {
      dispatch(toggleInStockFilter(false));
      dispatch(setCurrentPage(1));
    }
  }, [inStockOnly, showOnlyInStock, inStockProducts.length, dispatch]);

  const productsToDisplay = showOnlyInStock ? inStockProducts : apiProducts;
  const isLoading = showOnlyInStock ? inStockLoading : loading;
  const displayTotalPages = showOnlyInStock ? 1 : totalPages;
  const displayCurrentPage = showOnlyInStock ? 1 : currentPage;

  const filteredAndSortedProducts = useMemo(() => {
    let filtered = [...productsToDisplay];

    if (withDiscount) {
      filtered = filtered.filter((product) => product.sale);
    }

    if (withVideo) {
      filtered = filtered.filter(() => Math.random() > 0.5);
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
  }, [productsToDisplay, withDiscount, withVideo, sortBy]);

  const toggleFilter = (filterName: string) => {
    setOpenFilter(openFilter === filterName ? "" : filterName);
  };

  const handlePageChange = (page: number) => {
    if (!showOnlyInStock) {
      dispatch(setCurrentPage(page));
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const renderPagination = () => {
    if (showOnlyInStock || displayTotalPages <= 1) return null;

    const pages = [];
    const maxVisiblePages = 5;
    let startPage = Math.max(
      1,
      displayCurrentPage - Math.floor(maxVisiblePages / 2)
    );
    let endPage = Math.min(displayTotalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    if (displayCurrentPage > 1) {
      pages.push(
        <button
          key="prev"
          onClick={() => handlePageChange(displayCurrentPage - 1)}
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
            displayCurrentPage === i ? styles.active : ""
          }`}
        >
          {i}
        </button>
      );
    }

    if (endPage < displayTotalPages) {
      if (endPage < displayTotalPages - 1) {
        pages.push(
          <span key="ellipsis2" className={styles.ellipsis}>
            ...
          </span>
        );
      }
      pages.push(
        <button
          key={displayTotalPages}
          onClick={() => handlePageChange(displayTotalPages)}
          className={styles.pageButton}
        >
          {displayTotalPages}
        </button>
      );
    }

    if (displayCurrentPage < displayTotalPages) {
      pages.push(
        <button
          key="next"
          onClick={() => handlePageChange(displayCurrentPage + 1)}
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
      {isLoading && (
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
              dispatch(fetchCatalog({ page: currentPage, perPage: 20 }) as any)
            }
          >
            Попробовать снова
          </button>
        </div>
      )}

      {!isLoading && !error && (
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
                          const checked = e.target.checked;
                          setInStockOnly(checked);
                          if (!checked) {
                            dispatch(setCurrentPage(1));
                          }
                        }}
                        disabled={inStockLoading}
                      />
                      <span>
                        Только в наличии
                        {showOnlyInStock && inStockProducts.length > 0 && (
                          <span className={styles.filterCount}>
                            ({inStockProducts.length})
                          </span>
                        )}
                      </span>
                    </label>
                    <label className={styles.checkboxLabel}>
                      <input
                        type="checkbox"
                        checked={withDiscount}
                        onChange={(e) => {
                          setWithDiscount(e.target.checked);
                          dispatch(setCurrentPage(1));
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
                          dispatch(setCurrentPage(1));
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
                    product_id={product.product_id}
                    offer_id={product.offer_id}
                  />
                ))}
              </div>

              {!showOnlyInStock && totalPages > 1 && (
                <div className={styles.pagination}>
                  <div className={styles.paginationStats}>
                    Страница {currentPage} из {totalPages}
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
