// import React from 'react'
// import { Link } from 'react-router-dom'
// import { sidebarData } from './sidebarData'
// import './sidebar.css'

// const Sidebar = () => {
//   return (
//     <nav className='sidebar'>
//       <ul className='nav flex-column'>
//         {sidebarData.map((panelItem) => (
//           <li className='nav-item sidebar-nav-item' key={panelItem.id}>
//             <Link to={panelItem.url} className='nav-link sidebar-nav-link'>
//               {panelItem.title}
//             </Link>
//           </li>
//         ))}
//       </ul>
//     </nav>
//   )
// }

// export default Sidebar
import React, { useState } from 'react';
import { sidebarData } from './sidebarData';
import './sidebar.css';

const Sidebar = () => {
  const [showReports, setShowReports] = useState(false);

  return (
    <nav className='sidebar'>
      <ul className='nav flex-column'>
        {sidebarData.map((panelItem) => (
          <li className='nav-item sidebar-nav-item' key={panelItem.id}>
            {panelItem.title === 'Reports' ? (
              <div onClick={() => setShowReports(!showReports)}>
                <span className='nav-link sidebar-nav-link'>{panelItem.title}</span>
              </div>
            ) : (
              !showReports && (
                <a href={panelItem.url} className='nav-link sidebar-nav-link'>{panelItem.title}</a>
              )
            )}
            {panelItem.title === 'Reports' && showReports && (
              <ul className='nav flex-column'>
                {panelItem.subcategories.map((subcategory) => (
                  <li className='nav-item sidebar-nav-item' key={subcategory.id}>
                    <a href={subcategory.url} className='nav-link sidebar-nav-link'>{subcategory.title}</a>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default Sidebar;
