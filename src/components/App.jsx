import React, {
  useState,
  useEffect
} from 'react'
import {
  Route,
  Routes,
  useNavigate
} from 'react-router-dom';
import ProtectedRoute from "./ProtectedRoute";

import {mainApi} from "../utils/MainAPI.jsx"
import {formApi} from "../utils/FormAPI.jsx"

import TeaFormStage1 from './TeaFormStage1.jsx'
import TeaFormStage2 from './TeaFormStage2.jsx'
import Login from './Login.jsx'
import Registration from './Registration.jsx'
import Profile from './Profile.jsx'
import MyForms from './MyForms.jsx'
import MyFormInteraction from './MyFormInteraction.jsx'
import Navigation from './Navigation.jsx'
import Blog from './Blog.jsx'



function App() {
  
  const loggedIn = localStorage.getItem("loggedIn");

  const navigate = useNavigate();
  // const [loggedIn, setLoggedIn] = useState(false)


  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      console.log('token')
      mainApi.handleTokenValidation(token).then(data => {
        localStorage.setItem('loggedIn', true)
      }).catch(err => {
        console.log(err)
        localStorage.removeItem('token')
        localStorage.removeItem('loggedIn')
      })
    } else {
      localStorage.removeItem('token')
      localStorage.removeItem('loggedIn')
    }
  }, []);


  function handleRegistration(data){

    mainApi.handleRegistration(data.name, data.password, data.email)
    .then(res => {
      console.log(res)
      handleAuthorization(res)
      navigate('/form_1')
    })
    .catch(err => {console.log(err)})
  }

  function handleAuthorization(data){
    console.log(data)
    mainApi.handleAuthorization(data.email, data.password)
    .then(res => {
      console.log(res)
      // setLoggedIn(true)
      localStorage.setItem('token', res.token);
      localStorage.setItem('loggedIn', true)
      navigate('/form_1')
    })
    .catch(err => console.log(err))
  }

  function postFormMainData(data, formId){
    console.log(data)
    formApi.postFormMainData(data, formId)
    .then(res=>{
      console.log(res)
      // FormNavigateNextSatge()
    })
    .catch(err => console.log(err))
  }


  // setLoggedIn(true)
  const FormNavigateNextSatge = () => {
    navigate('/form_2')
  }
  const FormNavigatePrevSatge = () => {
    navigate('/form_1')
  }
  const FormNavigateToInteracion = () => {
    navigate('/my_forms/formID')
  }
  return (
    <div className="root">
      <Routes>


        <Route path = "/"
        element = {
          < 
          ProtectedRoute 
          loggedIn = {loggedIn}
          />
          }
        />

        <Route path = "/form_1"
        element = {
          < 
          ProtectedRoute 
          loggedIn = {loggedIn}
          component = {TeaFormStage1} 
          nextStage = {FormNavigateNextSatge}
          navigation = {Navigation}
          postFormMainData = {postFormMainData}
          />
          }
        />

        <Route path = "/form_2"
        element = {
          < 
          ProtectedRoute
          loggedIn = {loggedIn}
          component = {TeaFormStage2}
          prevStage = {FormNavigatePrevSatge}
          navigation = {Navigation}
          />
          }
        />

        <Route path = "/profile"
        element = {
          < 
          ProtectedRoute
          loggedIn = {loggedIn}
          component = {Profile}
          />
          }
        />
        <Route path = "/my_forms"
        element = {
          < 
          ProtectedRoute
          loggedIn = {loggedIn}
          component = {MyForms}
          navigation = {FormNavigateToInteracion}
          />
          }
        />
        <Route path = "/my_forms/formID"
        element = {
          < 
          ProtectedRoute
          loggedIn = {loggedIn}
          component = {MyFormInteraction}
          />
          }
        />
        <Route path = "/blog"
        element = {
          < 
          ProtectedRoute
          loggedIn = {loggedIn}
          component = {Blog}
          />
          }
        />

        <Route path = "/sign-in"
        element = {
          <Login auth = {handleAuthorization}/>
        }
        />
        <Route path = "/sign-up"
        element = {
          <Registration auth = {handleRegistration}/>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
