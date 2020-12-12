import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Container } from "react-bootstrap";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomeScreen from "./screens/HomeScreen";
import ContactScreen from "./screens/contactScreen";
import smsScreen from "./screens/smsScreen";
import sentScreen from "./screens/sentScreen";

const App = () => {
  return (
    <Router>
      <Header />
      <main className='py-3'>
        <Container>
          <Route path='/' component={HomeScreen} exact />
          <Route path='/contact/:id' component={ContactScreen} exact />
        </Container>
        <Route path='/otp/send' component={smsScreen} exact />
        <Route path='/sent' component={sentScreen} exact />
      </main>
      <Footer />
    </Router>
  );
};

export default App;
