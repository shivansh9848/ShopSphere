import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SignoutAsync, selectLoggedInUser } from "../authSlice";
import { Navigate } from "react-router-dom";

const Logout = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectLoggedInUser);
  useEffect(() => {
    dispatch(SignoutAsync());
    // eslint-disable-next-line
  }, []);

  return <>{!user && <Navigate to="/login" replace={true}></Navigate>}</>;
};

export default Logout;
