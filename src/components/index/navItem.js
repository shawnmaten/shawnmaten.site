import React from 'react'
import Link from '../link'

export default ({ name, url }) => {
  const prefix = name === 'Email' ? 'mailto:' : 'https://'

  return (
    <li className='nav-item'>
      <Link to={ prefix + url } isInternal={ false }>
        { '-> ' + name }
      </Link>
    <style jsx>{`
      .nav-item {
        margin-bottom: 8px;
        font-size: 24pt;
        color: blue;
        font-weight: 500;
      }

      /* Shrink font size of links to fit small phones. */
      @media(max-width: 400px) {
        .nav-item {
          font-size: 20pt;
        }
      }
    `}</style>
    </li>
  )
}
