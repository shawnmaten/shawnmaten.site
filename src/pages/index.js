import React from 'react'
import Link from '../components/link'

const NavItem = ({ name, url }) => {
  const prefix = name === 'Email' ? 'mailto:' : 'https://'

  return (
    <li className='nav-item'>
      <span>{'// '}</span>
      <Link url={ prefix + url }>{ name }</Link>
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

export default ({ data }) => {
  const { personal, contact, nav } = data.resumeToml

  return (
    <div className="root">
      <div className="section bio">
        <h1 className="name">{ personal.name }</h1>
        <p className="tagline">{ personal.tagline }</p>
      </div>
      <div className="section nav">
        <ul className="nav-list">
          { nav.map(el => <NavItem name={el.name} url={contact[el.key]} />) }
        </ul>
      </div>
      <style jsx>{`
        .root {
          display: flex;
          height: 100%;
          padding: 32px;
        }

        .section {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          flex-grow: 1;
        }

        .name {
          font-size: 24pt;
          margin-bottom: 16px;
        }

        .tagline {
          font-size: 16pt;
          text-align: center;
          max-width: 13em;
          margin-bottom: 0px;
        }

        .nav-list {
          list-style: none;
          margin: 0px;
        }

        /* Overall layout changes to top-bottom instead of left-right. */
        @media(max-width: 750px) {
          .root {
            flex-direction: column;
          }

          .nav {
            justify-content: flex-start;
            flex-grow: 2;
          }
        }
      `}</style>
    </div>
  )
}

export const query = graphql`
  query indexQuery {
    resumeToml {
      personal {
        name
        tagline
      }

      contact {
        git_hub
        git_lab
        stack_overflow
        upwork
        email
      }

      nav {
        name
        key
      }
    }
  }
`
