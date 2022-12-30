import { createContext, useContext, useState, useEffect } from "react";

const PageContext = createContext({
    home: false,
    info: false,
    upload: false, 
    currentStep: 0,
    setHome: () => {},
    setInfo: () => {},
    setUpload: () => {},
    setStep: () => {}
});

const PageProvider = (props) => {
    const [home, setHome] = useState(false);
    const [info, setInfo] = useState(false);
    const [upload, setUpload] = useState(false);
    const [currentStep,setStep]= useState(0);
    return (
        <PageContext.Provider
            value={{
                home,
                info,
                upload,
                currentStep,
                setHome,
                setInfo,
                setUpload,
                setStep
            }}
            {...props}
        />
    );
}

const usePage = () => useContext(PageContext);
export {PageProvider, usePage};
