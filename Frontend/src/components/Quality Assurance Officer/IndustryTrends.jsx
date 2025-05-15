import axios from 'axios';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function IndustryTrends() {
  const navigate = useNavigate();
  
  const [trends, setTrends] = useState([{name:"EHL Insights",link:"https://hospitalityinsights.ehl.edu/education-trends"},
  {name:"Forbes",link:"https://www.forbes.com/sites/bernardmarr/2023/02/17/the-top-5-education-trends-in-2023/?sh=11446fc94d39"},
  {name:"Atomi Systems",link:"https://atomisystems.com/elearning/10-popular-trends-in-education/"},
  {name:"State Education Trends for 2023",link:"https://www.nga.org/news/commentary/state-education-trends-for-2023/"}
]);
 
  return (
    <div>
     <br></br> <br></br>
      <div className="container">
      <center><h2>INDUSTRY TRENDS</h2></center> 
        <div className="courses-section">
        {trends.map((trend,index) => (
          <div className="course trends">
            <div id="courseInfo">
              <h2>{trend.name}</h2>
              <a href={trend.link} id="links" target='_blank'>{trend.link}</a>
            </div>
          </div>
        ))}
        </div>   
      </div>
    </div>
  );
}

export default IndustryTrends;
