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

function PersonalInfo({ data }) {
  return (
    <div>
      <p className='basic-info'>
        <strong>{data.name}</strong>; {data.city}; {data.degree}
      </p>

      <p className='objective'>{data.objective}</p>

      <p className="summary">{ data.summary.map(item => (
        <span>{item}<strong>; </strong></span>
      ))}
      </p>

      <style jsx>{`
        p {
          text-align: justify;
        }

        /*
        .summary {
          margin: 0px;
          list-style: none;
          margin-left: 16px;
        }

        .summary-item {
          margin-bottom: 0;
          display: flex;
        }

        .bullet {
          margin-right: 8px;
        }
        */
      `}</style>
    </div>
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
    <div>
      <h3>Previous</h3>
      <Bullets items={items.map(item => item.summary)} />
    </div>
  )
}

function Section(props) {
  const detailCount = 3
  const items = [...props.items].reverse()
  const recent = items.slice(0, detailCount)
  const condensed = items.slice(detailCount, items.length)

  return (
    <div>
      <h2>{props.title}</h2>
      {recent.map(place => <DetailedItem {...place} />)}
      {condensed.length != 0 ? <CondensedItems items={condensed} /> : ''}
    </div>
  )
}

export default ({ data }) => {
  const { personal, work, projects } = data.resumeToml

  return (
    <div className='resume'>
      <PersonalInfo data={personal} />
      <Section title='Developer Experience' items={work} />
      <Section title='Projects' items={projects} />
      <style jsx>{`
        .resume {
          width: 100%;
          height: 100%;
        }
      `}</style>
    </div>
  )
}

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

      work {
        start(formatString: "MMM YYYY")
        end(formatString: "MMM YYYY")
        summary
        role
        employer
        bullets
      }

      projects {
        name
        link
        start(formatString: "MMM YYYY")
        end(formatString: "MMM YYYY")
        bullets
      }
    }
  }
`
