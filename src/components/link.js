import React from 'react'

export default function Link({ children, url }) {
  return (
    <a className="link" target="_blank" href={url}>
      { children }
      <style jsx>{`
        .link {
          text-decoration: none;
          font-weight: 500;
        }

        .link:link {
          color: blue;
        }

        .link:visited {
          color: blue;
        }
      `}</style>
    </a>
  )
}
