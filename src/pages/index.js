import React from 'react'
import NavItem from '../components/index/navItem'
import AboutMeButton from '../components/index/aboutMeButton'

export default class extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      aboutMeExpanded: false,
    }
    this.onClickAboutMe = this.onClickAboutMe.bind(this)
  }

  onClickAboutMe() {
    this.setState(state => { aboutMeExpanded: !state.aboutMeExpanded })
  }

  render() {
    const { personal, contact, nav } = this.props.data.resumeToml

    return (
      (
        <div className="root">
          <div className="section bio">
            <h1 className="name">{ personal.name }</h1>
            <p className="tagline">{ personal.tagline }</p>
            <AboutMeButton onClick={this.onClickAboutMe}/>
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
              margin-bottom: 16px;
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
    )
  }
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
