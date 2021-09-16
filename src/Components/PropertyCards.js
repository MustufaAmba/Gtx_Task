import React from 'react'
import { useState } from 'react';
import { Card, Nav, Carousel,Badge } from 'react-bootstrap'
import tenantData from "../Data/tenants.json"
import { Link } from 'react-router-dom'; 
import { FcCallback,FcGoogle,FcDepartment,FcCurrencyExchange,FcPlanner,FcPortraitMode,FcGrid,FcRight } from "react-icons/fc"
import { HiOutlineUserGroup } from "react-icons/hi";

// here alldata is a prop passed from home component which have property and owner details we will use allData in this whole file for retriving every details of owner and property 
const PropertyCards = ({ allData}) => {

// so in this project as you know we are not using any backend and database for storing and manupilating data so we are using local json files for data and we are using local storage for storing our data so that we can use syncronized data across pages (here syncronized means if you add/delete/edit data anywhere in this website updated data will be not lost and remain even if you reload page or travel across pages)

// here is a small logic fot storing data in localstorage if there is already data present in localstoarge than use that data else use local json file for the first time it will use local json file after than even if you visit this page again then data will be retrived from local storage

  const dataAlreadyExits=JSON.parse(localStorage.getItem("mainArray"))
  if(dataAlreadyExits)
  {
    localStorage.setItem("mainArray",JSON.stringify(dataAlreadyExits))
  }
  else
  {
    localStorage.clear();
    localStorage.setItem("mainArray",JSON.stringify(tenantData))
  }

// this state and method is for image carousel 
  const [index, setIndex] = useState(0);
  // const newData=[...tenantData];
  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  }
  return (
    <div className="m-5 w-75 ">
      <Card className="container " style={{ boxShadow : "0 4px 8px 0 rgba(0, 0, 0, 0.1), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"}}>
        <Card.Header>
          <Nav variant="pills">
            <Nav.Item>
            <h3><Badge bg="primary">{allData.propertyName}</Badge></h3>
            </Nav.Item>

          </Nav>
        </Card.Header>


        <div className="d-flex">
          <div className="d-block w-25">
            <Carousel activeIndex={index} onSelect={handleSelect}  >
              <Carousel.Item>
                <img
                  className="d-block w-100"
                  src={allData.image_1}
                  alt="First slide"
                  height="200" width="250"
                />

              </Carousel.Item>
              <Carousel.Item>
                <img
                  className="d-block w-100"
                  src={allData.image_2}
                  alt="Second slide"
                  height="200" width="250"
                />

              </Carousel.Item>
              <Carousel.Item>
                <img
                  className="d-block w-100"
                  src={allData.image_3}
                  alt="Third slide"
                  height="200" width="250"
                />
              </Carousel.Item>
            </Carousel>
          </div>


          <div>
            <Card.Body>
              <div className="d-flex">
                <div >
              <Card.Title className="mb-4">Owner : {allData.first_name} {allData.last_name}</Card.Title>
              <Card.Text><FcCallback fontSize="30"/> {allData.contactNumber} </Card.Text>
              <Card.Text><FcGoogle fontSize="30"/>  {allData.email} </Card.Text>
              <Card.Text><FcRight fontSize="30"/>  {allData.address} </Card.Text>
              <Card.Text>
                
              </Card.Text>
              </div>
              <div style={{marginLeft:"50px"}}>
              <Card.Title className="mb-4">Property Details</Card.Title>
              <Card.Text ><FcDepartment fontSize="30"/> <b>{allData.BHK} BHK</b> </Card.Text>
              <Card.Text><FcCurrencyExchange fontSize="30"/> <b>Rent : {allData.rent}/- </b> </Card.Text> 
              <Card.Text><FcPlanner fontSize="30"/> <b>Agreement : {allData.agreement} Months</b> </Card.Text> 
                </div>
                <div style={{marginLeft:"50px"}}>
              <Card.Text style={{marginTop:"45px"}}><FcPortraitMode fontSize="30"/> <b>Max : {allData.MaxPepoleAllowed} Person</b> </Card.Text>
              <Card.Text><FcGrid fontSize="30"/> <b>Plot Area : {allData.plotArea}sq.ft </b> </Card.Text> 
              <Card.Text><HiOutlineUserGroup fontSize="30"/> <b>Avialable For : {allData.availableFor} </b> </Card.Text> 
                </div>
                </div>
              <Link to="/Tenants" className="d-flex justify-content-end mt-3 "><center><button  type="button" className="btn btn-warning" id={allData.id} onClick={
                (e)=>localStorage.setItem("tenantId",e.target.id)
              }>Show Tenants</button></center></Link>
            </Card.Body>
          </div>
        </div>
      </Card>
    </div>
  )
}

export default PropertyCards
