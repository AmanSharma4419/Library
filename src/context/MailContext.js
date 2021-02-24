import React, { useState, createContext } from "react";
export const MaildataContext = createContext();

export const MailProviter = props => {

    // const {
    //     mail: initialMail,
    //     selectedMail: initialSelectedMail,
    //     children
    // } = props;

    // Use State to keep the values

    const [mail, setMails] = useState([]);
    // const [selectedMail, setSelectedMail] = useState(initialSelectedMail);

    // const addOutBox = data => {
    //     console.log('addoutbox', data);
    //     setMails(mail.concat([data]));
    // }

    // make the context object:
    // const mailesContext = {
    //     mail,
    //     setMails,
    //     selectedMail,
    //     setSelectedMail,
    //     addOutBox
    // }

    // pass the value in provider and return
    return (
    <MaildataContext.Provider value={[mail, setMails]}>{props.children}</MaildataContext.Provider>
    );
};

// export const { Consumer } = Context;

// Proviter.propTypes = {
//     mail: propTypes.array,
//     selectedMail: propTypes.object
// };

// Proviter.defaultProps = {
//     mail: [],
//     selectedMail: {}
// };
