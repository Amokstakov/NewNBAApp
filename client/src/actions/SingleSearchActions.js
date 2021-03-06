import axios from "axios";
import {
  FETCH_STATS,
  FETCH_SEASONS,
  FETCH_LAST_TEN,
  SET_ERROR,
  REMOVE_STATES_SINGLE,
  REMOVE_ERROR,
  TEAM_FETCH_LAST_TEN,
} from "./types";

//Base url for api calls
const base_url = "https://www.balldontlie.io/api/v1/";

export const FetchPlayer = (Player, season = "2019") => async (dispatch) => {
  try {
    //Make first GET request for Player
    const reqPlayers = await axios.get(
      `${base_url}players?search=${Player}&per_page=75`
    );

    //Get ID from first response
    const { id } = reqPlayers.data.data[0];

    //Make second GET request for Player Stats in Season
    const reqStats = await axios.get(
      `${base_url}season_averages?season=${season}&player_ids[]=${id}`
    );

    dispatch({
      type: FETCH_STATS,
      payload: [reqStats.data.data[0], reqPlayers.data.data[0]],
    });
  } catch (error) {
    dispatch({
      type: SET_ERROR,
      payload: `${Player} is not a player - please check spelling`,
    });

    //Remove Error alert after 4 seconds
    setTimeout(() => dispatch({ type: REMOVE_ERROR }), 4000);
  }
};

export const FetchPlayerSeason = (id, season) => async (dispatch) => {
  try {
    const reqSeasons = await axios
      .get(`${base_url}season_averages?season=${season}&player_ids[]=${id}`)
      .catch((err) => {
        console.log(err);
      });

    dispatch({
      type: FETCH_SEASONS,
      payload: reqSeasons.data.data[0],
    });
  } catch (error) {
    console.log(error);
  }
};

export const FetchLastTenGames = (id, team = false, season = "2019") => async (
  dispatch
) => {
  //First response to get the last tem games of the player
  const response = await axios.get(
    `${base_url}stats?seasons[]=${season}&player_ids[]=${id}&per_page=50&page=0&`
  );

  const reqSortedGames = response.data.data.sort((a, b) => b.id - a.id);

  var randomColor = "#000000".replace(/0/g, function () {
    return (~~(Math.random() * 16)).toString(16);
  });

  if (!team) {
    dispatch({
      type: FETCH_LAST_TEN,
      payload: reqSortedGames,
    });
  } else {
    dispatch({
      type: TEAM_FETCH_LAST_TEN,
      payload: [reqSortedGames.slice(0, 10), randomColor],
    });
  }
};

export const removeStatesSingle = () => {
  return {
    type: REMOVE_STATES_SINGLE,
  };
};
