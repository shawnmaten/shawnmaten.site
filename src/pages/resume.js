import React from 'react'
import Moment from 'moment'
import Link from '../components/link'

import styled from 'styled-components'

const List = styled.ul`
  margin-left: 1em;
`

const Item = styled.li`
  list-style-type: none;
  margin-bottom: 0;
`

function Intro({ personal, stack }) {
  return (
    <section className="intro" >
      <div className='basic-info break'>
        <div>
          <div><strong>{personal.name}</strong>, {personal.city}</div>
          <div>{personal.degree}</div>
        </div>
        <div>
          <Link to="/resume.pdf">[ Download PDF ]</Link>
        </div>
      </div>

      <p className='objective break'>
        <strong>Objective: </strong>
        {personal.objective}
      </p>


      <p className="summary break">
        <strong>Summary: </strong>
        { personal.summary.map(item => <span>{item}<strong>; </strong></span>)}
      </p>

      <p className="stack break">
        { stack.map(group => <span>
          <strong>{`${group.name}: `}</strong>
          { group.items.map(item => `${item}, `) }
        </span>)}
      </p>

      <style jsx>{`
        .basic-info {
          display: flex;
          justify-content: space-between;
        }

        .objective, .summary, .stack {
          text-align: justify;
        }

        .break {
          margin-bottom: 32px;
        }

        @media(max-width: 750px) {
          .basic-info {
            flex-direction: column;
            justify-content: flex-start;
          }
        }
      `}</style>
    </section>
  )
}

function Star() {
  return <span>* </span>
}

function Bullets({ items }) {
  return (
    <List>
      {items.map(item => (
        <Item>
          <Star />
          {item}
        </Item>
      ))}
    </List>
  )
}

function DetailedItem(props) {
  let titleItems = []

  if (props.end) {
    titleItems.push(`${props.start} to ${props.end}`)
  } else {
    titleItems.push(props.start)
  }

  if (props.employer) {
    titleItems.push(props.role, props.employer)
  } else {
    titleItems.push(props.name)
  }
  const title = titleItems.join(' : ')

  let items = []
  if (props.link) {
    items.push(<Link to={props.link}>{props.link}</Link>)
  }
  items = items.concat(props.bullets)

  return (
    <div>
      <h3>{title}</h3>
      <Bullets items={items} />
    </div>
  )
}

function CondensedItems({ items }) {
  return (
    <p>
      <strong>Previous: </strong>
      { items.map(item => `${item.summary} in ${Moment(item.end).year()}. `) }
    </p>
  )
}

function Section(props) {
  const { items } = props
  const recent = items.filter(item => !item.condense).reverse()
  const condensed = items.filter(item => item.condense).reverse()

  return (
    <div>
      <h2>{props.title}</h2>
      {recent.map(place => <DetailedItem {...place} />)}
      {condensed.length != 0 ? <CondensedItems items={condensed} /> : ''}
      <style jsx>{`
        h2 {
          margin-bottom: 32px;
        }
      `}</style>
    </div>
  )
}

/*
export default ({ data }) => {
  const { personal, stack, work, projects } = data.resumeToml

  return (
    <div className='resume'>
      <Intro personal={personal} stack={stack} />
      <Section title='Developer Experience' items={work} />
      <Section title='Projects' items={projects} />
      <style jsx>{`
        .resume {
          padding: 32px;
          margin: auto;
          max-width: 44em;
          font-size: 12pt;
        }
      `}</style>
    </div>
  )
}
*/

export default () =>  (
  <div className="construction">
    <span className="emoji">🔨🤠</span>
    <style jsx>{`
      .construction {
        width: 100vw;
        height: 100vh;
        display: flex;
        justify-content: center;
        align-items: center;
      }

      .emoji {
        font-size: 64pt;
      }
    `}</style>
  </div>
)

export const query = graphql`
  query resumeQuery {
    resumeToml {
      personal {
        name
        city
        degree
        tagline
        objective
        summary
      }

      contact {
        git_hub
        git_lab
        stack_overflow
        upwork
        email
      }

      stack {
        name
        items
      }

      work {
        start
        end
        summary
        role
        employer
        bullets
        condense
      }

      projects {
        name
        link
        start
        end
        bullets
      }
    }
  }
`
