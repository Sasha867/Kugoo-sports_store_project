import { AcountButton } from "../acount-button/acountButton";
import { Link } from "react-router-dom";
import { FcClock } from "react-icons/fc";
import { RiMenuAddLine } from "react-icons/ri";
import { FaViber, FaTelegram, FaWhatsapp } from "react-icons/fa";
import { IoIosCart } from "react-icons/io";
import { RequestACall } from "../../pages/request-a-call/requestACall";
import { useDispatch, useSelector } from "react-redux";
import { openRequestCall } from "../../redux/features/visibleSlice";
import {
  getCardsCollection,
  getProduct,
  isOpenRequestCall,
} from "../../redux/selectors/selectors";
import styles from "./header.module.scss";
import { useState } from "react";

export const Header = () => {
  const [searchProduct, setSearchProduct] = useState("");
  const visibleState = useSelector(isOpenRequestCall);
  const dispatch = useDispatch();

  const cartProductArr = useSelector(getProduct);
  const cardsCollection = useSelector(getCardsCollection);

  function findProductChangeHandler({ target: { value } }: any) {
    setSearchProduct(value);
  }

  const showResultSearch = () => {
    if (cardsCollection && searchProduct) {
      const listProducts = cardsCollection.filter((el) =>
        el.title.toUpperCase().includes(searchProduct.toUpperCase())
      );
      if (listProducts) {
        return listProducts;
      }
      return [];
    }
    return [];
  };

  const closeResultsSearch = () => {
    setSearchProduct("");
  };

  const toggleRequestCall = () => {
    dispatch(openRequestCall());
  };

  return (
    <header>
      <div className={styles.nav}>
        <div className={`${styles.nav_right} margin_left`}>
          <ul>
            <li className={styles.item}>
              <Link to={"/service"}>Сервис</Link>
            </li>
            <li>
              <Link to={"/cooperation"}>Сотрудничество</Link>
            </li>
            <li>
              <div className={"cursor_pointer"} onClick={toggleRequestCall}>
                Заказать звонок
              </div>
            </li>
            <li>
              <a
                href="https://www.whatsapp.com/"
                target="_blank"
                rel="noreferrer"
              >
                <FaWhatsapp className={styles.whatsappIcon} />
              </a>
              <a href="https://www.viber.com" target="_blank" rel="noreferrer">
                <FaViber className={styles.viberIcon} />
              </a>
              <a
                href="https://web.telegram.org/"
                target="_blank"
                rel="noreferrer"
              >
                <FaTelegram className={styles.telegramIcon} />
              </a>
            </li>
          </ul>
        </div>
        <div className={`${styles.nav_left} margin_right`}>
          <a className={styles.number} href="tel:+375(29)">
            +375(29)777-77-77
          </a>
          <FcClock className={styles.icon_arrow} />
          <span>с 10.00 до 22.00</span>
        </div>
      </div>
      <div className={styles.nav_center}>
        <div className={`${styles.nav_search} margin_left`}>
          <ul>
            <li>
              <Link to={"/"} className={styles.logo}>
                KUGOO
              </Link>
            </li>
            <li>
              <Link to={"/catalog"} className={styles.catalog}>
                <RiMenuAddLine className={styles.catalog_icon} /> Каталог{" "}
              </Link>
            </li>
          </ul>
        </div>
        <div className={styles.input_wrap}>
          <input
            className={styles.main_search}
            type="text"
            value={searchProduct}
            onChange={findProductChangeHandler}
            placeholder="Искать в Каталоге. Например, KugooKirin M4"
          />
          {!!showResultSearch().length && (
            <div className={styles.wrapper}>
              <div className={styles.results}>
                {showResultSearch().map((el) => (
                  <Link
                    key={el.id}
                    className={styles.searchLink}
                    onClick={closeResultsSearch}
                    to={"/product/" + el.id}
                  >
                    {" "}
                    {el.title}
                  </Link>
                ))}
              </div>
            </div>
          )}
          <button className={styles.input_right_search}></button>
        </div>
        <div className={styles.container_ac}>
          <div className={styles.wrapper_acaunt}>
            <AcountButton />
          </div>
          <div className={`${styles.wrapper_cart} margin_right`}>
            <Link to={"/cart"} className={styles.cart_button}>
              <IoIosCart className={styles.cart_icon} />
              Корзина{" "}
              <span className={styles.number_items_in_cart}>
                {cartProductArr.length}
              </span>
            </Link>
          </div>
        </div>
      </div>
      <div className={`${styles.nav_info} margin_left margin_right`}>
        <ul>
          <li>
            <Link to={"/about_shop"} className={styles.nav_info_about_shop}>
              О магазине
            </Link>
          </li>
          <li>
            <Link to={"/delivery"} className={styles.nav_info_dilivery}>
              Доставка и оплата
              <img src=" ./images/payment_by_instalments.svg" alt="" />
            </Link>
          </li>
          <li>
            <Link to={"/test_drive"} className={styles.item_6}>
              Тест-драйв
            </Link>
          </li>
          <li>
            <Link to={"/blog"} className={styles.item_6}>
              Блог
            </Link>
          </li>
          <li>
            <Link to={"/contacts"} className={styles.item_6}>
              Контакты
            </Link>
          </li>
          <li>
            <Link to={"/stock"} className={styles.item_6}>
              Акции
              <img src="./images/stock.svg" alt="" />
            </Link>
          </li>
        </ul>
      </div>
      {visibleState && <RequestACall />}
    </header>
  );
};
