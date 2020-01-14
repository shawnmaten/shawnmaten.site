import React from 'react'
import Moment from 'moment'
import styled from 'styled-components'

const StatelessLink = styled.a`
  &:link {
    color: blue;
  }
  &:visited {
    color: blue;
  }
`

const List = styled.ul`
  margin-left: 1em;
`

const Item = styled.li`
  list-style-type: none;
  margin-bottom: 0;
`

function ExternalLink({ res }) {
  const href = res.includes('@') ? 'mailto:' + res : 'https://' + res
  return (
    <StatelessLink target="_blank" href={href}>
      {res}
    </StatelessLink>
  )
}

function PersonalInfo({ name, city, degree }) {
  return (
    <p>
      {name}
      <br />
      {city}
      <br />
      {degree}
    </p>
  )
}

function ContactInfo({ email, git_hub, stack_overflow, upwork }) {
  return (
    <p>
      <ExternalLink res={email} />
      <br />
      <ExternalLink res={git_hub} />
      <br />
      <ExternalLink res={stack_overflow} />
      <br />
      <ExternalLink res={upwork} />
    </p>
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
    items.push(<ExternalLink res={props.link} />)
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
  const resume = data.resumeToml

  return (
    <div>
      <PersonalInfo {...resume.personal} />
      <ContactInfo {...resume.contact} />
      <Section title='Work Experience' items={resume.work} />
      <Section title='Projects' items={resume.projects} />
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
      }

      contact {
        email
        git_hub
        stack_overflow
        upwork
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
