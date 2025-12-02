import { Routes, Route } from "react-router-dom";
import { HomePage } from "../pages/HomePage/HomePage";
import { Stock } from "../pages/Stock/Stock";
import { Sale } from "../pages/Sale/Sale";
import { ForBuyers } from "../pages/ForBuyers/ForBuyers";
import { Payment } from "../pages/Payment/Payment";
import { Delivery } from "../pages/Delivery/Delivery";
import { Stores } from "../pages/Stores/Stores";
import { Workshop } from "../pages/Workshop/Workshop";
import { News } from "../pages/News/News";
import { NotFound } from "../pages/NotFound/NotFound";
import { Layout } from "../components/Layout";
import { Catalog } from "../pages/Catalog/Catalog";
import { FullCatalog } from "../pages/FullCatalog/FullCatalog";
import { Agreement } from "../pages/Agreement/Agreement";
import { Offerta } from "../pages/Offerta/Offerta";
import { PrivacyPolicy } from "../pages/PrivacyPolicy/PrivacyPolicy";

const App: React.FC = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="stock" element={<Stock />} />
          <Route path="sale" element={<Sale />} />
          <Route path="forbuyers" element={<ForBuyers />} />
          <Route path="payment" element={<Payment />} />
          <Route path="delivery" element={<Delivery />} />
          <Route path="stores" element={<Stores />} />
          <Route path="workshop" element={<Workshop />} />
          <Route path="news" element={<News />} />
          <Route path="offerta" element={<Offerta />} />
          <Route path="agreement" element={<Agreement />} />
          <Route path="privacypolicy" element={<PrivacyPolicy />} />
          <Route path="catalog" element={<Catalog />} />
          <Route path="catalog/fullcatalog" element={<FullCatalog />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </>
  );
};

export { App };
