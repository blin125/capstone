// Helper function to show the available links and their routes based on authentication. 

export function getSideLinks(user){
  let isCourseCo = false;
  let isMarkerCo = false;
  if (user?.getSignInUserSession()?.getAccessToken()?.payload["cognito:groups"] != undefined) {
    isCourseCo = user?.getSignInUserSession()?.getAccessToken()?.payload["cognito:groups"][0] === "CourseCoordinators";
    isMarkerCo = user?.getSignInUserSession()?.getAccessToken()?.payload["cognito:groups"][0] === "MarkerCoordinator";
  }


  const pathRoutes = [
    {
      icon: "home",
      path: "/home",
      label: "Home",
    },
    {
      icon: "columns",
      path: "/application-status",
      label: "Application Status",
      show: !isMarkerCo && !isCourseCo

    },
    {
      icon: "plus",
      path: "/addcourses",
      label: "Add Courses",
      show: isMarkerCo,
    },
    {
      icon: "book",
      path: "/edit-courses",
      label: "Edit Courses",
      show: isMarkerCo || isCourseCo,
    },
    {
      icon: "table",
      path: "/all-applications",
      label: "All Applications",
      show: isMarkerCo
    },
    {
      icon: "edit",
      path: "/markersignup",
      label: "Manage Users",
      show: isMarkerCo,
    },
    {
      icon: "shopping-cart",
      path: "/cart",
      label: "Cart",
      show: !isMarkerCo && !isCourseCo

    },
  ];
  return pathRoutes;
}

