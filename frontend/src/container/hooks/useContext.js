import { createContext, useContext, useState, useEffect } from "react";

const PageContext = createContext({
    home: false,
    info: false,
    upload: false, 
    setHome: () => {},
    setInfo: () => {},
    setUpload: () => {}
});

const PageProvider = (props) => {
    const [home, setHome] = useState(false);
    const [info, setInfo] = useState(false);
    const [upload, setUpload] = useState(false);
    return (
        <PageContext.Provider
            value={{
                home,
                info,
                upload,
                setHome,
                setInfo,
                setUpload
            }}
            {...props}
        />
    );
}

const usePage = () => useContext(PageContext);
export {PageProvider, usePage};
