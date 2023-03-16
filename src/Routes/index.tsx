import React from "react";
import { Routes, Route, Navigate, BrowserRouter as Router } from "react-router-dom";
import { Dashboard } from "~/Screens";

const MyRouter = () => {

  return (
    <Router>
      <Routes>
        <Route path='/*' element={<Navigate to={"dashboard"} />} />
        <Route path='/dashboard' element={<Dashboard />} />
        {/*
        <Route path="/patient" element={<App />} >
          <Route index element={<Navigate to={"edit"} />} />
          <Route path='/patient/edit' element={<PP />} />
        </Route>
        */}
      </Routes>
    </Router>
  )
}

export default MyRouter;
