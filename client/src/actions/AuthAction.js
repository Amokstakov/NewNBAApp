import {
  TOKEN_VALIDATION_SUCCESS,
  TOKEN_VALIDATION_ERROR,
  REGISTER_FAIL,
  REGISTER_SUCCESS,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  SET_ERROR,
  REMOVE_ERROR,
  LOGIN_ALERT,
  LOAD_PLAYERS,
} from "./types";
import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import { FetchLastTenGames } from "./SingleSearchActions";

const base_url = "/api/";

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
      .post(`/api/users`, body, config)
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
      .post(`/api/users/login`, body, config)
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

    dispatch(loadUser());

    setTimeout(() => dispatch({ type: REMOVE_ERROR }), 4000);
  } catch (errors) {
    dispatch({
      type: LOGIN_FAIL,
      payload: errors,
    });
  }
};

//Logout User
export const logout = () => {
  return {
    type: LOGOUT,
  };
};

export const loadUser = () => async (dispatch) => {
  //check if a user has a token in local memory
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
  try {
    //Store token in local storage
    dispatch({
      type: LOGIN_SUCCESS,
      payload: { token: localStorage.token },
    });

    const response = await axios.get(`/api/me`);

    //return user based on token
    dispatch({
      type: TOKEN_VALIDATION_SUCCESS,
      payload: response,
    });
  } catch (err) {
    dispatch({
      type: TOKEN_VALIDATION_ERROR,
    });
  }
};

export const loadTeam = () => async (dispatch) => {
  const response = await axios.get(`/api/players`);

  try {
    dispatch({
      type: LOAD_PLAYERS,
      payload: response.data,
    });

    response.data.forEach((player) => {
      dispatch(FetchLastTenGames(player.id, true));
    });
  } catch (err) {}
};
