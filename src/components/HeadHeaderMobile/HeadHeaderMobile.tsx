import { NavLink } from "react-router-dom";
import { IconWrapper } from "../IconWrapper/IconWrapper";
import { BiUser } from "react-icons/bi";
import { SlBasket } from "react-icons/sl";
import { FiSearch } from "react-icons/fi";
import { HiMenuAlt3 } from "react-icons/hi";
import logo from "../../assets/logo.webp";
import styles from "./HeadHeaderMobile.module.css";

export const HeadHeaderMobile: React.FC = () => {
  return (
    <div className={styles.headHeaderMob}>
      <nav>
        <NavLink to="/" className={styles.logoLink}>
          <img src={logo} alt="logo" />
        </NavLink>
      </nav>
      <div className={styles.buttonsBlock}>
        <button>
          <IconWrapper
            Icon={SlBasket}
            size={24}
            style={{
              color: "#fff",
            }}
          />
        </button>
        <button>
          <IconWrapper
            Icon={BiUser}
            size={24}
            style={{
              color: "#fff",
            }}
          />
        </button>
        <button>
          <IconWrapper
            Icon={FiSearch}
            size={24}
            style={{
              color: "#fff",
            }}
          />
        </button>
        <button>
          <IconWrapper
            Icon={HiMenuAlt3}
            size={24}
            style={{
              color: "#fff",
            }}
          />
        </button>
      </div>
    </div>
  );
};
