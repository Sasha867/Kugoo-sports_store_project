import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { authErrors } from "../../firebase/firebase";
import {
  clearError,
  registerUser,
  signInUser,
} from "../../redux/features/user";
import { closeModal } from "../../redux/features/visibleSlice";
import { getError, getUser } from "../../redux/selectors/selectors";
import { useAppDispatch } from "../../redux/store";
import styles from "./modal.module.scss";

export const Modal = () => {
  const [isRegisterState, setIsRegisterState] = useState(false);
  const [userMail, setUserMail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [confirmUserPassword, setConfirmUserPassword] = useState("");

  const dispatch = useAppDispatch();
  const userLoginError = useSelector(getError);
  const user = useSelector(getUser);

  useEffect(() => {
    if (user) {
      dispatch(closeModal());
    }
  }, [user]);

  function changeToRegisterState() {
    setIsRegisterState((prev) => !prev);
    dispatch(clearError());
  }

  const loginChangeHandler = ({ target: { value } }: any) => {
    setUserMail(value);
  };

  const passwordChangeHandler = ({ target: { value } }: any) => {
    setUserPassword(value);
  };

  const confirmPasswordChangeHandler = ({ target: { value } }: any) => {
    setConfirmUserPassword(value);
  };

  // function checkRegisterPasswords() {
  //   if (userPassword === confirmUserPassword) {
  //     dispatch(registerUser({ email: userMail, password: userPassword }));
  //   }else if(){

  //   }
  // }

  const clickSubmitHandler = () => {
    if (isRegisterState) {
      // checkRegisterPasswords();
      dispatch(registerUser({ email: userMail, password: userPassword }));
    } else {
      dispatch(signInUser({ email: userMail, password: userPassword }));
    }
  };

  const onOverlayClick = ({ target: { id } }: any) => {
    if (id === "modal") {
      dispatch(closeModal());
      dispatch(clearError());
    }
  };

  return (
    <div id="modal" className={styles.wrapper_modal} onClick={onOverlayClick}>
      <div className={styles.modal}>
        <h2 className={styles.title_modal}>
          {isRegisterState ? "????????c????????????" : "????????"}
        </h2>
        <span
          style={{ color: "red", fontStyle: "italic", fontFamily: "revert" }}
        >
          {userLoginError?.code
            ? authErrors[userLoginError.code as keyof typeof authErrors]
            : ""}
        </span>
        <div>
          <span>?????????????????????? ??????????</span>
          <input
            className={styles.input_mail}
            value={userMail}
            onChange={loginChangeHandler}
            type="email"
            autoFocus
          />
          <span>????????????</span>
          <input
            className={styles.input_password}
            value={userPassword}
            onChange={passwordChangeHandler}
            type="password"
          />
          {isRegisterState && (
            <div>
              <span>?????????????????????? ????????????</span>
              <input
                className={styles.input_password}
                value={confirmUserPassword}
                onChange={confirmPasswordChangeHandler}
                type="password"
              />
            </div>
          )}
        </div>
        <span>
          ?????????????? {isRegisterState ? "??????????????????????????" : "??????????????"}, ????
          ???????????????????????? ?? ?????????????????? ?????????????????? ???????????????????????? ????????????
        </span>
        <button onClick={clickSubmitHandler} className={styles.modal_btn}>
          {isRegisterState ? "??????????????????????" : "??????????"}
        </button>
        <button
          onClick={changeToRegisterState}
          id="create_ac"
          className={styles.modal_registration_str}
        >
          {isRegisterState ? "??????????" : "??????????????????????"}
        </button>
      </div>
    </div>
  );
};
