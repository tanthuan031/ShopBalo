import React from 'react';
import PropTypes from 'prop-types';
import { Button, Dropdown, Form, InputGroup } from 'react-bootstrap';
import { FaSearch } from 'react-icons/fa';
import { HiFilter } from 'react-icons/hi';

const Filter = props => {
  const {setSearch,setFilter,currentFilter,currentSearch} = props;
 const [label,setLabel] = React.useState('Search')

  return (
   <>
     <Dropdown className="ml-4">
       <Dropdown.Toggle
         id="user-type-filter-btn"
         className="btn-danger filter-button d-flex align-items-center justity-content-center mr-2"
       >
         <p className="flex-grow-1 font-weight-bold">{label}</p>
         <div className="fb-icon">
           <HiFilter />
         </div>
       </Dropdown.Toggle>
       <Dropdown.Menu id="user-type-filter-menu">
         <Form>
           <Dropdown.Item onClick={() => setFilter('phone')}>
             <Form.Check
               type="checkbox"
               id="checkbox-all"
               className="mx-4 my-2 font-weight-bold"
               label="Phone"
               checked={currentFilter === 'phone'}
               onChange={() => {
                 setFilter('phone')
                 setLabel('Phone')
               }}
             />
           </Dropdown.Item>
           <Dropdown.Item onClick={() => setFilter('email')}>
             <Form.Check
               type="checkbox"
               id="checkbox-admin"
               className="mx-4 my-2 font-weight-bold"
               label="Email"
               checked={currentFilter === 'email'}
               onChange={() => {
                 setFilter('email')
                 setLabel('Email')
               }}
             />
           </Dropdown.Item>
           <Dropdown.Item onClick={() => setFilter('fullname')}>
             <Form.Check
               type="checkbox"
               id="checkbox-admin"
               className="mx-4 my-2 font-weight-bold"
               label="Fullname"
               checked={currentFilter === 'fullname'}
               onChange={() => {
                 setFilter('fullname')
                 setLabel('Fullname')
               }}
             />
           </Dropdown.Item>

         </Form>
       </Dropdown.Menu>
     </Dropdown>
     {/* onSubmit={e => handleSearch(e)} */}
     <Form className="ms-3" >
       <InputGroup>
         <Form.Control
           id="search-user"
           placeholder="Type to search"
           value={currentSearch}
           onChange={e => setSearch(e.target.value)}
         />
         <Button id="search-user" variant="danger" type="submit"
           //  onClick={()=>setSearch(searchValue)}
         >
           <FaSearch />
         </Button>
       </InputGroup>
     </Form>
   </>
  );
};

Filter.propTypes = {
  
};

export default Filter;