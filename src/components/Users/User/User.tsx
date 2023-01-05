import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

import userLogo from "../../../img/userlogo.png";
import {
  followTC,
  unfollowTC,
} from "../../../redux/reducers/thunkCreators/usersThunkCreator";
import { getFollowingInProcess } from "../../../redux/selectors/usersSelectors";
import { AppDispatch } from "../../../redux/store";
import { IUser, thunkCreatorType } from "../../../types/users.interface";
import classes from "./User.module.css";

const User: React.FC<IUser> = ({ followed, id, name, photos, status }) => {
  const dispatch = useDispatch<AppDispatch>();
  const followingInProcess = useSelector(getFollowingInProcess);

  const disabledButton = () => {
    return followingInProcess.some((userId: number) => userId === id);
  };
  const followUnfollowButton = (title: string, thunk: thunkCreatorType) => {
    return (
      <button disabled={disabledButton()} onClick={() => dispatch(thunk)}>
        {title}
      </button>
    );
  };

  return (
    <div className={classes.user}>
      <div className={classes.userPhoto}>
        <div>
          <NavLink to={"/profile/" + id}>
            <img
              src={!photos.small ? userLogo : photos.small}
              className={classes.img}
              alt={"photoUrl"}
            />
          </NavLink>
        </div>
        <div>{name}</div>
      </div>

      <div className={classes.userInfo}>
        <div>{status}</div>
      </div>

      <div className={classes.userBtn}>
        {followed
          ? followUnfollowButton("UNFOLLOWED", unfollowTC(id))
          : followUnfollowButton("FOLLOWED", followTC(id))}
      </div>
    </div>
  );
};

export default User;
