import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import CourseData from '../hooks/CourseData';
import { useAuthenticator } from '@aws-amplify/ui-react';
import ReactCardFlip from "react-card-flip";
import { useEffect, useState } from 'react';

function HorizontalLayout() {
  const { courses, searchTerm, handleSearch, CourseCard } = CourseData();
  const { user } = useAuthenticator((context) => [context.user]);

  return (
    <>
      <div className="grid-container">
            <div className="search-bar">
              <input
                type="text"
                placeholder="Search"
                value={searchTerm}
                onChange={e => handleSearch(e.target.value)}
                className="search-bar"
              />          
        </div>
        <div className="courses">
          {courses.map(course => (
            <CourseCard key={course.id} course={course} user={user}/>
          ))}
        </div>
      </div>
    </>
  );
}

export default HorizontalLayout;


