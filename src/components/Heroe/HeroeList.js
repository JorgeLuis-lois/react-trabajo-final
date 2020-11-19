import React from 'react';
import HeroeItem from './HeroeItem';

function HeroeList(props) {
  return (
    <div className="container">
      <div className="row mb-2">
        {props.heroes.map((item) => {
          return (
            <div key={item.id} className="col-md-6">
              <HeroeItem heroe={item} />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default HeroeList;
