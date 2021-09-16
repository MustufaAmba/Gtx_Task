import React from 'react'
import data from "../Data/properties.json"
import Header from './Header';
import Footer from './Footer';
import PropertyCards from './PropertyCards';
import { Badge } from 'react-bootstrap';

//this is home page of our website where we will display header, property cards and footer
const Home = () => {
    // load data will have all the property data which we imported from local json file
    const loadData = [...data];

    return (
        <div>
            <Header/>
            <Badge pill bg="secondary" className="ms-5 mt-5">
                <h3>Properties</h3>
            </Badge>
          <div className="d-flex align-items-center flex-column mb-5">

              { /* here we are using map method on loadData array to display property card one by one*/ 
              loadData.map(data=><PropertyCards key={data.id} allData={data}/>)
                }
           </div>
        <Footer/>
        </div>
    )
}

export default Home
