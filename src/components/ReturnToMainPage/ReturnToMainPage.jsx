import React from "react";
import iconTool from "../IconsAsComponents/IconsAsComponents";
import { Link } from "react-router-dom";

const ReturnToMainPage = () => {
    return (

        <Link to="/transactions/expenses">
            {iconTool.arrowLeft}
            <p>Main Page</p>
        </Link>
    )
}

export default ReturnToMainPage;