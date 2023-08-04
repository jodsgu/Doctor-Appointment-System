 const UserMenu = [
    {
      name:'Home',
      path:'/',
      icon:"fa-sharp fa-solid fa-house"
    },
    {
      name:'Appointments',
      path:'/appointments',
      icon:"fa-solid fa-list"
    },
    {
      name:'Apply Doctor',
      path:'/apply-doctor',
      icon:"fa-solid fa-user-doctor"
    },
    {
      name:'Profile',
      path:'/profile',
      icon:"fa-solid fa-user"
    }


]


//admin menu

const AdminMenu = [
  {
    name:'Home',
    path:'/',
    icon:"fa-sharp fa-solid fa-house"
  },
  
  {
    name:'Doctors',
    path:'/admin/doctors',
    icon:"fa-solid fa-user-doctor"
  },
  {
    name:'Users',
    path:'/admin/users',
    icon:"fa-solid fa-user"
  },
  {
    name:'Profile',
    path:'/profile',
    icon:"fa-solid fa-user"
  }


]

export { UserMenu, AdminMenu };
