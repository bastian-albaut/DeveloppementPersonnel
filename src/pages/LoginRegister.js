import React, { useState } from "react";
import Login from "../components/loginRegister/sectionLogin";
import Register from "../components/loginRegister/sectionRegister";
import Appbar from "../components/general/Appbar";

export default function LoginRegister() {

    const [haveAccount, setHaveAccount] = useState(false);

    return(
        <>
            <Appbar />
            {haveAccount ? (
                <Login setHaveAccount={setHaveAccount}/>
            ) : (
                <Register setHaveAccount={setHaveAccount}/>
            )}
        </>
    );
}