import React from 'react'
import NavItem from '../components/index/navItem'
import AboutMeButton from '../components/index/aboutMeButton'
import Resume from '../components/resume'

export default class extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      resumeOpen: false,
    }
    this.onClickAboutMe = this.onClickAboutMe.bind(this)
  }

  onClickAboutMe() {
    this.setState(state => ({ resumeOpen: !state.resumeOpen }))
  }

  render() {
    const { personal, contact, nav } = this.props.data.resumeToml
    const { resumeOpen } = this.state

    return (
      (
        <div className="root">
          <div className="section bio">
            { !resumeOpen && <h1 className="name">{ personal.name }</h1> }
            { !resumeOpen && <p className="tagline"> { personal.tagline }</p> }
            <AboutMeButton
              isActive={resumeOpen}
              onClick={this.onClickAboutMe}
            />
            { resumeOpen && <div className='resume-holder'>
              <Resume data={ this.props.data.resumeToml }/>
            </div> }
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
              /*padding: 32px;*/
            }

            .section {
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: center;
              width: 50%;
            }

            .bio {
              max-width: 50%;
            }

            .resume-holder {
              overflow-y: scroll;
              overflow-x: crop;
              border-top: 2px solid blue;
              border-bottom: 2px solid blue;
              padding-top: 16px;
              margin-left: 32px;
              margin-right: 32px;
              margin-bottom: 32px;
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
        city
        degree
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
