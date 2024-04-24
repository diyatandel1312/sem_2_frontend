// Not USED ANYMORE

import { GiBookshelf } from 'react-icons/gi'
import { FaUserFriends } from 'react-icons/fa'
import { TiTickOutline } from 'react-icons/ti'
import { FiGitPullRequest } from 'react-icons/fi'
import { LuBackpack } from 'react-icons/lu'
import { AiOutlineLogout } from 'react-icons/ai'
import { AiOutlineHome } from 'react-icons/ai'

export const adminpanelData = [
  // {
  //   id: 1,
  //   title: `Home`,
  //   url: '/admin',
  //   panel_icon: <AiOutlineHome />,
  // },
  {
    id: 2,
    title: `Manage Books`,
    url: '/admin/managebooks',
    panel_icon: <GiBookshelf />,
  },
  {
    id: 3,
    title: `Books Request's`,
    url: '/admin/booksrequests',
    panel_icon: <FiGitPullRequest />,
  },
  {
    id: 4,
    title: `View Users`,
    url: '/admin/viewusers',
    panel_icon: <FaUserFriends />,
  },
  {
    id: 5,
    title: `Issued Books`,
    url: '/admin/issuedbooks',
    panel_icon: <TiTickOutline />,
  },

  {
    id: 6,
    title: `Return Due Books`,
    url: '/admin/returnedbooks',
    panel_icon: <LuBackpack />,
  },
  {
    id: 7,
    title: `Reports`,
    url: '/admin/reports',
    panel_icon: <LuBackpack />,
    subcategories: [
      
      {
        id: 1,
        title: ` View Issue Book With Status`,
        url: '/admin/reports/issuestatus',
      },
      {
        id: 2,
        title: `View Categories  Book`,
        url: '/admin/reports/categoriesbook',
      },
     
      {
        id: 3,
        title: `View All Book Request Status`,
        url: '/admin/reports/viewbookrequestedstatus',
      },
      {
        id: 4,
        title: `View All User Last Book Issue`,
        url: '/admin/reports/userlastbook',
      },
      // Add more subcategories as needed
    ],
  },
  {
    id: 8,
    title: `Goto Logout`,
    url: '/admin/logout',
    panel_icon: <AiOutlineLogout />,
  },
]
