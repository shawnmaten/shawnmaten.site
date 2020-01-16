import React from 'react'
import GatsbyLink from 'gatsby-link'

export default function Link({ children, to, isInternal }) {
  return (
    <span>
      { isInternal && <GatsbyLink to={to}>{ children }</GatsbyLink> }
      { !isInternal && <a target="_blank" href={to}>{ children }</a> }
      <style jsx>{`
        a {
          text-decoration: none;
          font-weight: 500;
        }

        a:link {
          color: blue;
        }

        a:visited {
          color: blue;
        }
      `}</style>
    </span>
  )
}
