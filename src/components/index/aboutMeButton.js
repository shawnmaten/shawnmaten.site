import React from 'react'

export default ({ onClick }) => (
  <button className='about-me' onClick={ onClick }>
    [ More About Me ]
    <style jsx>{`
      .about-me {
        background: none;
        border: none;
        font-size: 16pt;
        color: blue;
        font-weight: 500;
        outline: none;
      }
    `}</style>
  </button>
)
