import React from 'react';
import Header from "./../components/Header";
import HandleCard from "./../container/HandleCard";
import dotenv from "dotenv";
dotenv.config();

function App() {
  return (
    <>
      <Header/>
      <HandleCard/>
    </>
  );
}

export default App;
