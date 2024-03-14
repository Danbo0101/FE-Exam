import NavDropdown from 'react-bootstrap/NavDropdown';
import { useTranslation, Trans } from 'react-i18next';


const Language = () => {

    const { t, i18n } = useTranslation();

    const handleChangeLanguage = (language) => {
        i18n.changeLanguage(language);
        console.log(i18n.language);
    }

    return (
        <>

            {i18n.language === "en" ?
                <NavDropdown title="English" className='language' id="basic-nav-dropdown2">
                    <NavDropdown.Item onClick={() => handleChangeLanguage("vi")} >Việt Nam</NavDropdown.Item>
                </NavDropdown>
                :
                <NavDropdown title="Việt Nam" className='language' id="basic-nav-dropdown2">
                    <NavDropdown.Item onClick={() => handleChangeLanguage("en")}  >English</NavDropdown.Item>
                </NavDropdown>

            }

        </>
    )
}

export default Language;