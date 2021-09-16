import React from "react";
import { ListGroup,Badge } from "react-bootstrap";
import { useState,useRef } from "react";
import Modal from "react-bootstrap/esm/Modal";
import Button from "react-bootstrap/Button";
import { useEffect } from "react";
import Header from './Header';
import Footer from './Footer';


const Tenants = () => {

  // recieving all the tenants data from local storage and storing it into jsonData and recieving tenant id to filter tenants 
  var jsonData = JSON.parse(localStorage.getItem("mainArray"));
  const tenant_id = localStorage.getItem("tenantId");


  const [newData, setNewData] = useState(jsonData);    //this is for main tenant list at front end we are showing all tenants data using this state at last all the updates will be done in this state 

  const [editData, setEditData] = useState();   //this is for edit model to show prefilled data in the input fields so that user can see data and change accordingly

  const [showNew, setNewShow] = useState(false);    //this is of showing and hidding add user model
  const [showEdit, setEditShow] = useState(false); //this is of showing and hidding edit user model

   //this is for handeling new tenant data and here we are initilizing all the fields which will be required 
  const [handleNewUser, setNewUser] = useState({  
    id: Math.floor(Math.random() * 1000) + 1 ,
    tenant: Number(tenant_id),
    gender: "",
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    rentPending:""
  });

    //here we using useref for creating refrence to input fields of edit model to fetch values which are edited here we are not using usetstate because of code complexity
    const firstNameRef=useRef();
    const lastNameRef=useRef();
    const genderRef=useRef();
    const emailRef=useRef();
    const phoneNumberRef=useRef();
    const rentRef=useRef();

// this useeffect will update localstorage everytime there is change in newdata state because as we discussed earlier this is main state for showing list of tenants in front end
  useEffect(() => {
    localStorage.setItem("mainArray", JSON.stringify(newData));
  }, [newData]);


  const handleClose = () => setNewShow(false);  //for closing add user model

  //this function is storing the new data entered by the user in handleNewUser state into main state newData also once
  //the user is added then we are removing all the data from input fields by reinitilizing handleNewUser state
const saveNewUser = () =>
{
    setNewData([...newData, handleNewUser])
    setNewUser({ ...handleNewUser,
      id: Math.floor(Math.random() * 1000) + 1,
      lastName: "",
      firstName: "",
      gender: "",
      email:"",
      phoneNumber: "" ,
      rentPending: ""
      })
    setNewShow(false)
}

// this function is finding the user which needs to be edited and with the help of the useref which we creted earlier for edit model are used to change the data in JsonData array and later we are storing the new jsonData array in our main state newData  
const saveEditUser = () =>
{
    var index=jsonData.findIndex((obj => obj.id === Number(editData[0].id)))

    jsonData[index].firstName=firstNameRef.current.value
    jsonData[index].lastName=lastNameRef.current.value
    jsonData[index].gender=genderRef.current.value
    jsonData[index].email=emailRef.current.value
    jsonData[index].phoneNumber=phoneNumberRef.current.value
    jsonData[index].rentPending=rentRef.current.value

    setNewData( jsonData)
    setNewShow(false)
}

// for closing edit user model
const handleEditClose = () => {
   setEditShow(false);
  };
  
// for opening add user model
const handleShow = () => setNewShow(true);

  
// this function is used to show user prefilled data which help user to edit data here we are getiing the data from localstorage because its stores our every lataste data and assiging that data to editdata state 
  const handleEditShow = (e) => {
    let id=e.target.id;
    let data=JSON.parse(localStorage.getItem("mainArray"));
    setEditData(data.filter(item=>item.id===Number(id)))
    setEditShow(true);
  }

// this function will delete the user we are basically filtering the data and updating it in localstorage and updating our main state newData which will show updated list 
  const handleDelete=(e) => {
    let temp = e.target.id;
    jsonData = jsonData.filter(
      (item) => item.id !== Number(temp)
    );
    console.log(jsonData);
    localStorage.setItem("mainArray",JSON.stringify(jsonData));
    setNewData(jsonData);
    alert("Deleted successfully");
  }

  return (
    <div>
      <Header/>
      <div className="d-flex ms-5 mt-5">
      <Badge pill bg="secondary" className="me-5 ">
         <h4>Tenants List</h4>
      </Badge> 
      <button type="button" className="btn btn-primary" onClick={handleShow}>
              Add Tenant
      </button>
      </div>
             
      <div className="m-5">
        {/* here we are displaying our tenants list which are stored in newData state using map method  */}
      {newData.map((item,i) =>
        item.tenant === Number(tenant_id) ? (
          <div key={item.id}>


            <ListGroup horizontal variant="dark" className="m-4" style={{boxShadow : "0 4px 8px 0 rgba(0, 0, 0, 0.1), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"}}>
              <ListGroup.Item variant="dark"> {i} :</ListGroup.Item>
              <ListGroup.Item>Name : <b>{item.firstName}  {item.lastName}</b></ListGroup.Item>
              <ListGroup.Item>Gender : <b>{item.gender}</b></ListGroup.Item>
              <ListGroup.Item>Contact Number : <b>{item.phoneNumber}</b></ListGroup.Item>
              <ListGroup.Item>Email : <b>{item.email}</b></ListGroup.Item>
              <ListGroup.Item>Rent Pending : <b>{item.rentPending}</b></ListGroup.Item>
              <ListGroup.Item>
                <div>
                  <button type="button" className="btn btn-warning me-2" onClick={handleEditShow} id={item.id}>
                    Edit
                  </button>
                  <button
                    type="button"
                    className="btn btn-danger"
                    id={item.id}
                    onClick={handleDelete}
                  >Delete</button>
                </div>
              </ListGroup.Item>
            </ListGroup>

{/* this model is for add user  */}
            <Modal show={showNew} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>Add Tenant</Modal.Title>
              </Modal.Header>
              <form>
                <Modal.Body className="d-flex flex-column w-75">
                  <input
                    className="m-2"
                    type="text"
                    placeholder="FirstName"
                    value={handleNewUser.firstName||''}
                    onChange={(e) =>
                      setNewUser({
                        ...handleNewUser,
                        firstName: e.target.value,
                      })
                    }
                  />
                  <input
                    className="m-2"
                    type="text"
                    placeholder="LastName"
                    value={handleNewUser.lastName||''}
                    onChange={(e) =>
                      setNewUser({ ...handleNewUser, lastName: e.target.value })
                    }
                  />
                  <input
                    className="m-2"
                    type="text"
                    placeholder="Gender"
                    value={handleNewUser.gender||''}
                    onChange={(e) =>
                      setNewUser({ ...handleNewUser, gender: e.target.value })
                    }
                  />
                  <input
                    className="m-2"
                    type="text"
                    placeholder="Email"
                    value={handleNewUser.email||''}
                    onChange={(e) =>
                      setNewUser({ ...handleNewUser, email: e.target.value })
                    }
                  />
                  <input
                    className="m-2"
                    type="text"
                    placeholder="Phone Number"
                    value={handleNewUser.phoneNumber||''}
                    onChange={(e) =>
                      setNewUser({ ...handleNewUser, phoneNumber: e.target.value })
                    }
                  />
                   <input
                    className="m-2"
                    type="text"
                    placeholder="Rent Pending"
                    value={handleNewUser.rentPending||''}
                    onChange={(e) =>
                      setNewUser({ ...handleNewUser, rentPending: e.target.value })
                    }
                  />
                </Modal.Body>
                </form>
                <Modal.Footer>
                  <Button variant="secondary"  id="closeBtn" onClick={handleClose}>
                    Close
                  </Button>
                  <Button variant="primary" id="addUserBtn" onClick={saveNewUser}>
                    Add User
                  </Button>
                </Modal.Footer>
            </Modal>
{/* end of add User model */}

{/* this model is for showing edit user data */}
            <Modal show={showEdit} onHide={handleEditClose}>
              <Modal.Header closeButton>
                <Modal.Title>Add Tenant</Modal.Title>
              </Modal.Header>
                <Modal.Body >
                  {
                    editData!==undefined?(
                      <div className="d-flex flex-column w-75" >
                         <input
                    className="m-2"
                    type="text"
                    ref={firstNameRef}
                    placeholder="FirstName"
                    defaultValue={editData[0].firstName}
                  
                  />
                  <input
                    className="m-2"
                    type="text"
                    ref={lastNameRef}
                    placeholder="LastName"
                    defaultValue={editData[0].lastName}
               
                  />
                  <input
                    className="m-2"
                    type="text"
                    ref={genderRef}
                    placeholder="Gender"
                    defaultValue={editData[0].gender}
              
                  />
                  <input
                    className="m-2"
                    type="text"
                    ref={emailRef}
                    placeholder="Email"
                    defaultValue={editData[0].email}
          
                  />
                  <input
                    className="m-2"
                    type="text"
                    ref={phoneNumberRef}
                    placeholder="Phone Number"
                    defaultValue={editData[0].phoneNumber}
           
                  />
                   <input
                    className="m-2"
                    type="text"
                    ref={rentRef}
                    placeholder="Rent Pending"
                    defaultValue={editData[0].rentPending}
            
                  />
                        </div>
                    ):("fetching....")}
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary"  onClick={handleEditClose}>
                    Close
                  </Button>
                  <Button variant="primary" onClick={saveEditUser}>
                    Update User
                  </Button>
                </Modal.Footer>
            </Modal>

{/* end of edit user model */}
          </div>
        ) : (""))}
       </div>
      <Footer/>
    </div>
  );
};

export default Tenants;
