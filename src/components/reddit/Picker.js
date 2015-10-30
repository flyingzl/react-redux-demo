import React, { Component, PropTypes } from 'react';


var Picker = ( props) =>{

   const { value, onChange, options } = props;
   var arrays = [];
   options.forEach( option =>{
      arrays.push(<option value={option} key={option}>{option}</option>);
   })
   return (
      <span>
        <h1>{value}</h1>
        <select onChange={e => onChange(e.target.value)} value={value}>
            {arrays}
        </select>
      </span>
    );
}

Picker.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.string.isRequired
  ).isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
};

export default Picker;