import { createBrowserRouter } from 'react-router-dom'
import App from './src/App.jsx'
import HomePage from './src/components/HomePage.jsx'
import ItineraryPage from './src/components/ItineraryPage.jsx'
// import Trips from './src/components/Trips.jsx'
import LoginSignUp from './src/components/LoginSignUp.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'itinerary',
        element: <ItineraryPage />,
      },
    //   {
    //     path: 'trips',
    //     element: <Trips />,
    //   },
      {
        path: 'loginsignup',
        element: <LoginSignUp />,
      },
    ],
  },
])

export default router