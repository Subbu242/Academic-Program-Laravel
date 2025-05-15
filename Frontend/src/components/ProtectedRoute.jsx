import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import {Outlet} from "react-router";


const ProtectedRoute = ({children}) => {
  console.log("Inside ProtectedRoute:",children.type.name) 
    if(children.type.name=="AdministratorDashboard")
    {
      // console.log("MAIN:",localStorage.getItem("adminToken"))
      if(localStorage.getItem("adminToken")=="true")
      {
        console.log("ENTERING IF STATEMENT")
        return children;
      }
      else{
        console.log("ENTERING ELSE STATEMENT");
        return <Navigate to="/login" />;
      }
      // return localStorage.getItem("adminToken")=="true" ? children : <Navigate to="/login"/>;
    }
    else if(children.type.name=="StudentDashboard")
    {
      return localStorage.getItem("studentToken")=="true" ? children : <Navigate to="/login"/>;
    }
    else if(children.type.name=="InstructorDashboard")
    {
      return localStorage.getItem("instructorToken")=="true" ? children : <Navigate to="/login"/>;
    }
    else if(children.type.name=="ProgramCoordinatorDashboard")
    {
      return localStorage.getItem("pcToken")=="true" ? children : <Navigate to="/login"/>;
    }
    else
    {
      return localStorage.getItem("qaoToken")=="true" ? children : <Navigate to="/login"/>;
    }
};

export default ProtectedRoute;