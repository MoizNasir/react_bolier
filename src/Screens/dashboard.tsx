import React, { FC, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "~/store/hooks";
import { setCounter } from "~/store/reducers/loader";

export const Dashboard: FC = () => {
  const dispatch = useAppDispatch();
  const { counter } = useAppSelector((state) => state.loaderReducer);

  // useEffect(()=>{
  //   dispatch(setCounter(7))
  // },[])
  //  sadak
  const add = () => {
    dispatch(setCounter(counter + 1));
  };

  const adddummy = () => {
    dispatch(setCounter(counter + 1));
  };
  const remove = () => {
    dispatch(setCounter(counter - 1));
  };
  return (
    <React.Fragment>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          width: "100vw",
          height: "100vh",
        }}
      >
        Counter: {counter}
        <div style={{display:'flex',gap:"5px"}}>
          <button onClick={() => remove()}>+</button>
          <button onClick={() => add()}>-</button>
        </div>
      </div>
    </React.Fragment>
  );
};
