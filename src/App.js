import React, { useState } from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import About from "./components/about/About";
import CourseHome from "./components/allcourses/CourseHome";
import Contact from "./components/contact/Contact";
import Home from "./components/home/Home";
import Sign from "./components/signin/signin";
import Instruments from "./components/Marketplace/instruments";
import Cart from "./components/Marketplace/Cart/Cart";
import Guitars from "./components/Marketplace/instru/guitar";
import Pianos from "./components/Marketplace/instru/pianos";
import Accords from "./components/Marketplace/instru/Accord";
import Violon from "./components/Marketplace/instru/violon";
import Violoncelle from "./components/Marketplace/instru/violoncelle";
import Tambours from "./components/Marketplace/instru/tambours";
import Oud from "./components/Marketplace/instru/oud";
import Saxo from "./components/Marketplace/instru/saxophone";
import Trompette from "./components/Marketplace/instru/trompette";
import Darbouka from "./components/Marketplace/instru/darbouka";
import InstrumentDetails from "./components/Marketplace/instrumentsdetails";
import GuitarDetails from "./components/Marketplace/instru/guitarDetails";
import PianoDetails from "./components/Marketplace/instru/pianoDetails";
import AccordDetails from "./components/Marketplace/instru/AccordDetails";
import Violondetails from "./components/Marketplace/instru/violondetails";
import VioloncelleDetails from "./components/Marketplace/instru/violoncelleDetails";
import TambourDetails from "./components/Marketplace/instru/tambourDetails";
import OudDetails from "./components/Marketplace/instru/oudDetails";
import SaxoDetails from "./components/Marketplace/instru/saxoDetails";
import TrompetteDetails from "./components/Marketplace/instru/trompetteDetails";
import DarboukaDetails from "./components/Marketplace/instru/darboukaDetails";
import AddInstrument from "./components/Marketplace/MainPage/Annonceform";
import Profile from "./components/Profiles/Profile";
import AddPlaylist from "./components/allcourses/AddPlaylist";
import AddMeeting from "./components/allcourses/AddLink";
import AllCorses from "./components/allcourses/Allcourses";
import AddCourse from "./components/allcourses/AddCourse";
import TeacherProfile from "./components/Profiles/teacherProfile";
import ReunionDetails from "./components/allcourses/OnlineCourseDetails";
import ConservatoireProfile from "./components/Profiles/conservatoireprofile";
import Page404 from "./Errpage";

import Single from "./Dashboard/src/pages/single/Single";
import New from "./Dashboard/src/pages/new/New";

import { useContext } from "react";
import UpdateUser from "./Dashboard/src/pages/Update/UpdateUser";
import ListProduct from "./Dashboard/src/pages/list/ListProduct";
import ProductDetails from "./Dashboard/src/pages/single/ProductDetails";
import UpdateProduct from "./Dashboard/src/pages/Update/UpdateProduct";
import NewProduct from "./Dashboard/src/pages/new/NewProduct";
import ListTeacher from "./Dashboard/src/pages/list/ListTeacher";
import TeacherDetails from "./Dashboard/src/pages/single/DetailsTeacher";
import UpdateTeacher from "./Dashboard/src/pages/Update/UpdateTeacher";
import NewTeacher from "./Dashboard/src/pages/new/NewTeacher";
import PlaylistList from "./Dashboard/src/pages/list/PlaylistList";
import PlaylistDetails from "./Dashboard/src/pages/single/PlaylistDetails";
import UpdatePlaylist from "./Dashboard/src/pages/Update/PlaylistUpdate";
import UpdateCourse from "./Dashboard/src/pages/Update/CourseUpdate";
import CourseDetails from "./Dashboard/src/pages/single/CourseDetails";
import NewPlaylist from "./Dashboard/src/pages/new/NewPlaylist";
import NewCourse from "./Dashboard/src/pages/new/NewCourse";
import NewConservatoire from "./Dashboard/src/pages/new/NewConservatoires";
import ListConservatoire from "./Dashboard/src/pages/list/ListConservatoire";
import ConservatoireDetails from "./Dashboard/src/pages/single/ConservatoireDetails";
import Updateconservatoire from "./Dashboard/src/pages/Update/ConservatoireUpdate";
import DashboardHome from "./Dashboard/src/pages/home/Home";
import ListUser from "./Dashboard/src/pages/list/List";
import { DarkModeContext } from "./components/context/darkModeContext";
import AdminProfile from "./Dashboard/src/pages/Profile/Profile";
import "./style/dark.scss";
import InstrumentUpdate from "./components/Marketplace/Updateinstrument";
import ListConsTeacher from "./Dashboard/src/pages/list/ListConsTeacher";
import ConsPlaylist from "./Dashboard/src/pages/list/ConsPlaylist";
import ConsProfile from "./Dashboard/src/pages/Profile/ConsProfile";
import UserPlaylist from "./components/allcourses/UserPLaylists";
import ListMeetings from "./Dashboard/src/pages/list/ListMeeting";
import UpdateMeetings from "./Dashboard/src/pages/Update/MeetingUpdate";

import MeetingDetails from "./Dashboard/src/pages/single/MeetingDetails";
import NewReunion from "./Dashboard/src/pages/new/NewMeeting";
import NewTeacherCons from "./Dashboard/src/pages/new/newteachercons";
function App() {
  const [CartItem, setCartItem] = useState([]);

  // const addToCart = (product) => {
  //   const productExit = CartItem.find((item) => item.title === product.title);
  //   if (productExit) {
  //     setCartItem(
  //       CartItem.map((item) =>
  //         item.title === product.title
  //           ? { ...productExit, qty: productExit.qty + 1 }
  //           : item
  //       )
  //     );
  //   } else {
  //     setCartItem([...CartItem, { ...product, qty: 1 }]);
  //   }
  // };
  const addToCart = (product) => {
    const productExit = CartItem.find((item) => item.title === product.title);
    if (productExit) {
      setCartItem(
        CartItem.map((item) =>
          item.title === product.title
            ? { ...productExit, qty: productExit.qty + 1 }
            : item
        )
      );
    } else {
      setCartItem([...CartItem, { ...product, qty: 1, phone: product.phone }]);
    }
  };

  const decreaseQty = (product) => {
    const productExit = CartItem.find((item) => item.title === product.title);
    if (productExit.qty === 1) {
      setCartItem(CartItem.filter((item) => item.title !== product.title));
    } else {
      setCartItem(
        CartItem.map((item) =>
          item.title === product.title
            ? { ...productExit, qty: productExit.qty - 1 }
            : item
        )
      );
    }
  };
  const removeCartItem = (product) => {
    const productExit = CartItem.find((item) => item.title === product.title);
    if (productExit.qty === 1) {
      setCartItem(CartItem.filter((item) => item.title !== product.title));
    }
  };
  const { darkMode } = useContext(DarkModeContext);

  return (
    <div className={darkMode ? "app dark" : "app"}>
      <Router>
        <Switch>
          <Route path="">
            <Route exact path="/" component={Home} />
            <Route exact path="/about" component={About} />
            <Route exact path="/courses" component={CourseHome} />
            <Route exact path="/profile" component={Profile} />
            <Route exact path="/form" component={AddInstrument} />
            <Route exact path="/ajouterPlaylist" component={AddPlaylist} />
            <Route exact path="/ajouterLien" component={AddMeeting} />
            <Route exact path="/Addcorses" component={AddCourse} />
            <Route exact path="/UserPlaylist" component={UserPlaylist} />
            <Route
              exact
              path="/teacherprofile/:teacherId"
              component={TeacherProfile}
            />
            <Route
              exact
              path="/conservatoire/:ConsId"
              component={ConservatoireProfile}
            />
            <Route exact path="/marketplace">
              <Instruments CartItem={CartItem} addToCart={addToCart} />
            </Route>

            <Route exact path="/contact" component={Contact} />
            <Route exact path="/signin" component={Sign} />
            <Route path="/cart" exact>
              <Cart
                CartItem={CartItem}
                addToCart={addToCart}
                decreaseQty={decreaseQty}
                removeCartItem={removeCartItem}
              />
            </Route>
            <Route exact path="/644c0611066ad4fe13963714">
              <Guitars CartItem={CartItem} addToCart={addToCart} />
            </Route>
            <Route exact path="/644c0ae86fd044576c704483">
              <Pianos CartItem={CartItem} addToCart={addToCart} />
            </Route>
            <Route exact path="/644daad111bd2335dccc3927">
              <Accords CartItem={CartItem} addToCart={addToCart} />
            </Route>
            <Route exact path="/644dadf41e37dbe85c5b5360">
              <Violon CartItem={CartItem} addToCart={addToCart} />
            </Route>
            <Route exact path="/6450f15d5e85f86c0f7cd964">
              <Violoncelle CartItem={CartItem} addToCart={addToCart} />
            </Route>
            <Route exact path="/6454e2ae2b3142cdafa936be">
              <Tambours CartItem={CartItem} addToCart={addToCart} />
            </Route>
            <Route exact path="/6454e1f22b3142cdafa936ab">
              <Oud CartItem={CartItem} addToCart={addToCart} />
            </Route>
            <Route exact path="/6454e25f2b3142cdafa936b1">
              <Saxo CartItem={CartItem} addToCart={addToCart} />
            </Route>
            <Route exact path="/6454e2702b3142cdafa936b4">
              <Trompette CartItem={CartItem} addToCart={addToCart} />
            </Route>
            <Route exact path="/6454e2852b3142cdafa936b7">
              <Darbouka CartItem={CartItem} addToCart={addToCart} />
            </Route>
            <Route path="/playlists/:_id" component={AllCorses} />
            <Route
              path="/playlist/:id/"
              render={() => <Redirect to="/playlist/:_id" />}
            />
            <Route path="/reunion/:_id" component={ReunionDetails} />
            <Route
              path="/instrument/:_id"
              render={(props) => <InstrumentDetails {...props} />}
            />
            <Route
              path="/644c0611066ad4fe13963714/:_id"
              component={GuitarDetails}
            />
            <Route
              path="/644c0ae86fd044576c704483/:_id"
              component={PianoDetails}
            />
            <Route
              path="/644daad111bd2335dccc3927/:_id"
              component={AccordDetails}
            />
            <Route
              path="/644dadf41e37dbe85c5b5360/:_id"
              component={Violondetails}
            />
            <Route
              path="/6450f15d5e85f86c0f7cd964/:_id"
              component={VioloncelleDetails}
            />
            <Route
              path="/6454e2ae2b3142cdafa936be/:_id"
              component={TambourDetails}
            />
            <Route
              path="/6454e1f22b3142cdafa936ab/:_id"
              component={OudDetails}
            />
            <Route
              path="/6454e25f2b3142cdafa936b1/:_id"
              component={SaxoDetails}
            />
            <Route
              path="/6454e2702b3142cdafa936b4/:_id"
              component={TrompetteDetails}
            />
            <Route
              path="/6454e2852b3142cdafa936b7/:_id"
              component={DarboukaDetails}
            />
            <Route path="/UpdateProduct/:_id" component={InstrumentUpdate} />

            <Route path="/AdminProfileConservatoire" component={ConsProfile} />

            <Route path="/conservatoireplaylists" component={ConsPlaylist} />
            <Route path="/newteachercons" component={NewTeacherCons} />
            <Route path="/conservatoireteachers" component={ListConsTeacher} />
            <Route
              path="/Dashmeetings/update/:_id"
              render={() => <UpdateMeetings title="Modifier Le Réunion" />}
            ></Route>
            <Route
              path="/newMeeting"
              render={() => <NewReunion title="Ajouter un nouveau Réunion" />}
            />
            <Route path="/Dashmeetings/:_id" component={MeetingDetails} />
            <Route path="/Dashmeetings" component={ListMeetings} />

            <Route path="/AdminProfile" component={AdminProfile} />
            <Route
              path="/Dashconservatoire/update/:_id"
              render={() => (
                <Updateconservatoire title="Modifier Le conservatoire" />
              )}
            ></Route>
            <Route
              path="/newConservatoire"
              render={() => <NewConservatoire title="Ajouter Conservatoire" />}
            />
            <Route
              path="/Dashconservatoires/:_id"
              component={ConservatoireDetails}
            />
            <Route path="/Dashconservatoires" component={ListConservatoire} />

            <Route path="/Dashcourses/:_id" render={() => <CourseDetails />} />
            <Route
              path="/newcourse/:_id"
              render={() => <NewCourse title="Ajouter Cours" />}
            />
            <Route
              path="/Dashcour/update/:id"
              render={() => <UpdateCourse title="Modifier Le cours" />}
            ></Route>
            <Route
              path="/Dashplaylistupdate/:id"
              render={() => <UpdatePlaylist title="Modifier La playlist" />}
            ></Route>
            <Route
              path="/newPlaylist"
              render={() => <NewPlaylist title="Ajouter Playlist" />}
            />
            <Route path="/Dashplaylists/:_id" component={PlaylistDetails} />
            <Route path="/Dashplaylists" component={PlaylistList} />

            <Route
              path="/Dashteacher/update/:id"
              render={() => <UpdateTeacher title="Modifier L'enseignant" />}
            ></Route>
            <Route
              path="/newTeacher"
              render={() => <NewTeacher title="Ajouter un Prof" />}
            />
            <Route path="/Dashteachers/:id" component={TeacherDetails} />
            <Route path="/Dashteachers" component={ListTeacher} />

            <Route
              path="/Dashproduct/update/:id"
              render={() => <UpdateProduct title="Modifier Le produit" />}
            ></Route>
            <Route
              path="/newProduct"
              render={() => <NewProduct title="Ajouter Produit" />}
            />
            <Route path="/Dashproducts/:id" component={ProductDetails} />
            <Route path="/Dashproducts" component={ListProduct} />

            <Route
              path="/updateUsers/:id"
              render={() => <UpdateUser title="Modifier l'utilisateur" />}
            ></Route>
            <Route
              path="/newUser"
              render={() => <New title="Ajouter un  Utilisateur" />}
            />
            <Route path="/Dashusers/:id" render={() => <Single />} />
            <Route path="/Dashusers" component={ListUser} />
            <Route path="/dashboard" component={DashboardHome} />
          </Route>
          <Route path="/*" element={<Page404 />} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
