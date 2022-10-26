import './styles.css';
import React from "react";
import Layout from "../../Layout";
// import { Grid, Card, Text } from "@nextui-org/react";


function HomeView() {
  return (
    <Layout title='Home'>
    <h1>About</h1>
    <div className="Home">    
      <div className='Container'>
        <h3 className='HeadingText'>{'Heading'}</h3>
        <p className='DescriptionText'>{'Description'}</p>
      </div>
    </div>
    </Layout>
  );
}

export default HomeView;
