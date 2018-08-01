import React from 'react'
import Link from 'gatsby-link'

function HeaderLink(props) {
  const visibility = props.isCurrent ? 'visible' : 'hidden'
  return (
    <span>
      <span>
        [<Link to={props.to}>{props.title}</Link>]
      </span>
      <span style={{ visibility: visibility, marginRight: '.5rem' }}>🐝</span>
    </span>
  )
}

const pages = [
  { to: '/', title: 'shawnmaten.site' },
  { to: '/blog', title: 'blog' },
  { to: '/projects', title: 'projects' },
  { to: '/resume', title: 'resume' },
]

const Header = ({ pathname }) => (
  <div style={{ margin: '2rem' }}>
    {pages.map(page => (
      <HeaderLink {...page} isCurrent={page.to == pathname} />
    ))}
  </div>
)

export default Header

/*
<div
  style={{
    background: 'rebeccapurple',
    marginBottom: '1.45rem',
  }}
>
  <div
    style={{
      margin: '0 auto',
      maxWidth: 960,
      padding: '1.45rem 1.0875rem',
    }}
  >
    <h1 style={{ margin: 0 }}>
      <Link
        to="/"
        style={{
          color: 'white',
          textDecoration: 'none',
        }}
      >
        {siteTitle}
      </Link>
    </h1>
  </div>
</div>
*/
