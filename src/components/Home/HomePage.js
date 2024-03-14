import { useNavigate } from 'react-router-dom';
import videoHomePage from '../../assets/video-homepage.mp4'
import { store } from '../../redux/store';
import { useTranslation, Trans } from 'react-i18next';



const HomePage = (props) => {

    const isAuthenticated = store?.getState()?.user?.isAuthenticated;
    const navigate = useNavigate();

    const { t } = useTranslation();

    return (
        <div className="homepage-container">
            <video autoPlay muted loop>
                <source
                    src={videoHomePage}
                    type='video/mp4'
                />
            </video>
            <div className='home-container'>
                <div className='title-1'>
                    {t('homepage.title1')}

                </div>
                <div className='title-2'>
                    {t('homepage.title2')}
                </div>
                <div className='title-3'>
                    {isAuthenticated === true ?
                        <button onClick={() => navigate("/users")}>{t('homepage.btn1')}</button> :
                        <button>{t('homepage.btn2')}</button>}

                </div>
            </div>
        </div>
    )
}

export default HomePage;