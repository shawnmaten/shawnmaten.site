import React from 'react'

export default ({ isActive, onClick }) => (
  <button className={`about-me ${isActive && 'active'}`} onClick={ onClick }>
    { isActive ? '>> Less About Me <<' : '<< More About Me >>' }
    <style jsx>{`
      .about-me {
        background: none;
        border: none;
        font-size: 16pt;
        color: blue;
        font-weight: 500;
        outline: none;
        cursor: pointer;
      }

      .active {
        margin-top: 32px;
        margin-bottom: 16px;
      }
    `}</style>
  </button>
)
