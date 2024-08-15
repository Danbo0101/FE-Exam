import './App.scss';
import Header from './components/Header/Header';
import { Link, Outlet } from 'react-router-dom';
import PerfectScrollbar from 'react-perfect-scrollbar'
import { useState } from 'react';
import Profile from './components/Profile/Profile';

// const App = () => {
//   return (
//     <div>
//       <MyComponent></MyComponent>
//     </div>

//   );
// }

// class App extends React.Component {
//   render() {
//     return (
//       <div className='app-container'>
//         Hello world
//         <MyComponent></MyComponent>
//       </div>
//     );
//   }
// }

const App = () => {

  const [showProfile, setShowProfile] = useState(false);

  return (

    <div className="app-container">
      <div className='header-container'>
        <Header
          setShow={setShowProfile}
        />
      </div>
      <div className='main-container'>
        <div className='slidenav-container'>

        </div>
        <div className='app-content'>
          <PerfectScrollbar>
            <Outlet />
          </PerfectScrollbar>
        </div>
      </div>
      <Profile
        show={showProfile}
        setShow={setShowProfile}

      />
    </div>
  );
}

export default App;
