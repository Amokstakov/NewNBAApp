import axios from "axios";
import { loadTeam } from "./AuthAction";

//Base url for server
const base_url = "https://enigmatic-reef-35438.herokuapp.com/";

export const addPlayers = (player) => async (dispatch) => {
  const {
    first_name,
    height_feet,
    height_inches,
    id,
    last_name,
    position,
    team: { abbreviation, city, conference, division, full_name, name },
    weight_pounds,
  } = player;

  const config = {
    headers: {
      "content-type": "application/json",
    },
  };

  const body = JSON.stringify({
    first_name,
    height_feet,
    height_inches,
    id,
    last_name,
    position,
    team: { abbreviation, city, conference, division, full_name, name },
    weight_pounds,
  });

  try {
    await axios.post(`/api/players`, body, config);
    dispatch(loadTeam());
  } catch (err) {}
};

export const addPlayerToDB = (player) => async () => {
  const {
    FG_Miss,
    FT_Miss,
    ast,
    blk,
    dreb,
    fg3_pct,
    fg3a,
    fg3m,
    fg_pct,
    fga,
    fgm,
    ft_pct,
    fta,
    ftm,
    games_played,
    min,
    oreb,
    pf,
    player_id,
    pts,
    reb,
    season,
    stl,
    turnover,
  } = player[0][0];

  const randomColor = "#000000".replace(/0/g, function () {
    return (~~(Math.random() * 16)).toString(16);
  });

  const config = {
    headers: {
      "content-type": "application/json",
    },
  };
  const body = JSON.stringify({
    FG_Miss,
    FT_Miss,
    ast,
    blk,
    dreb,
    fg3_pct,
    fg3a,
    fg3m,
    fg_pct,
    fga,
    fgm,
    ft_pct,
    fta,
    ftm,
    games_played,
    min,
    oreb,
    pf,
    player_id,
    pts,
    reb,
    season,
    stl,
    turnover,
    color: randomColor,
  });

  try {
    await axios.post(`/api/playerStats`, body, config);
  } catch (err) {
    console.log(err);
  }
};

//Delete Player
export const deletePlayer = (id) => async (dispatch) => {
  try {
    await axios.delete(`/api/players/${id}`);
    dispatch(loadTeam());
  } catch (error) {
    console.log(error);
  }
};
