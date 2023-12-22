import { DataStore } from '@aws-amplify/datastore';
import { Cart, ApplicationStatus} from '../models';
import { Course } from '../models';
import React, { useState } from 'react';
import ModalPopUp from '../components/ModalPopUp';


export async function getCourseData() {
  
  return DataStore.query(Course);

}
  
export function filterCourses(allCourses, term) {
    if (term.trim() === '') {
      return allCourses;
    }

    const filteredCourses = allCourses.filter(course =>
      course.courseCode.toLowerCase().includes(term.toLowerCase()) ||
      course.coordinatorName.toLowerCase().includes(term.toLowerCase()) ||
      course.directorName.toLowerCase().includes(term.toLowerCase()) ||
      course.description.toLowerCase().includes(term.toLowerCase()) ||
      course.faculty.toLowerCase().includes(term.toLowerCase())
    );
  
    return filteredCourses;
}

export async function AddToCart(courseId, userId, callBack) {


  const checkAlreadyApplied = await DataStore.query(ApplicationStatus, (c) => c.userId.eq(userId));

  const containsCourse = checkAlreadyApplied.some(item => item.appliedCourses === courseId);
  
  if(containsCourse){
    return "You've already applied for this course!"
  }

  const message = ''
  if (userId === undefined) {
    callBack("/auth", { replace: true });
  } else {
    const models = await DataStore.query(Cart, (c) => c.userId.eq(userId));
    if (models.length === 0) {
      DataStore.save(new Cart({
        userId: userId,
        selectedCourses: courseId
      }))
      return "Added " + courseId + " to cart!";
    }else {
      let flag = false;
      const list = models[0].selectedCourses.split(",")

      for (const int in list) {
        if (list[parseInt(int)].trim() === courseId) {
          flag = true;
        }
      }
      if (!flag) {
        const updatedCourses = models[0].selectedCourses + ", " + courseId;
        const updatedPost = await DataStore.save(
          Cart.copyOf(models[0], updated => {
            updated.selectedCourses = updatedCourses
          })
        );
        return "Added " + courseId + " to cart!";
      } else {
        return courseId + " already in cart!";
      }
    }
  }
}
