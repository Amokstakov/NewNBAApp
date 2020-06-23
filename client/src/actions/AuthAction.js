import {
  REGISTER_FAIL,
  REGISTER_SUCCESS,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  SET_ERROR,
  REMOVE_ERROR,
  LOGIN_ALERT,
} from "./types";
import axios from "axios";

const base_url = "http://localhost:5001/";

//Register User
export const register = ({ first_name, last_name, email, password }) => async (
  dispatch
) => {
  const config = {
    headers: {
      "content-type": "application/json",
    },
  };

  const body = JSON.stringify({ first_name, last_name, email, password });

  try {
    const response = await axios
      .post(`${base_url}api/users`, body, config)
      .catch((err) => {
        err.response.data.errors.map((error) =>
          dispatch({
            type: SET_ERROR,
            payload: error.msg,
          })
        );

        setTimeout(() => dispatch({ type: REMOVE_ERROR }), 4000);
      });
    dispatch({
      type: REGISTER_SUCCESS,
      payload: response.data,
    });

    dispatch({
      type: LOGIN_ALERT,
      payload: "Successfull Register",
    });

    setTimeout(() => dispatch({ type: REMOVE_ERROR }), 4000);
  } catch (error) {
    const errors = error;
    dispatch({
      type: REGISTER_FAIL,
      payload: errors,
    });
  }
};

//Login User
export const login = ({ email, password }) => async (dispatch) => {
  const config = {
    headers: {
      "content-type": "application/json",
    },
  };

  const body = JSON.stringify({ email, password });

  try {
    const response = await axios
      .post(`${base_url}api/users/login`, body, config)
      .catch((err) => {
        dispatch({
          type: SET_ERROR,
          payload: err.response.data.errors[0].msg,
        });
        setTimeout(() => dispatch({ type: REMOVE_ERROR }), 4000);
      });

    dispatch({
      type: LOGIN_SUCCESS,
      payload: response.data,
    });

    dispatch({
      type: LOGIN_ALERT,
      payload: "Successfull Login!",
    });

    setTimeout(() => dispatch({ type: REMOVE_ERROR }), 4000);
  } catch (errors) {
    dispatch({
      type: LOGIN_FAIL,
      payload: errors,
    });
  }
};

//Logout User
export const logout = () => async (dispatch) => {
  dispatch({
    type: LOGOUT,
  });
};