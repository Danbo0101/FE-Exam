import './App.scss';
import Header from './components/Header/Header';
import { Link, Outlet } from 'react-router-dom';
import PerfectScrollbar from 'react-perfect-scrollbar'

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
  return (

    <div className="app-container">
      <div className='header-container'>
        <Header />
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
    </div>
  );
}

export default App;
