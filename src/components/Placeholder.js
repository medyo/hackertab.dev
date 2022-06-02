import React from 'react'

function Placeholder() {
  return (
    <div
      style={{
        padding: '16px 16px 24px 16px',
        animation: 'react-placeholder-pulse 1.5s infinite',
      }}>
      <span
        style={{
          background: 'var(--placeholder-background-color)',
          display: 'block',
          height: '17px',
        }}></span>
      <span
        style={{
          marginTop: '8px',
          background: 'var(--placeholder-background-color)',
          display: 'block',
          height: '14px',
          width: '90%',
        }}
      />
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          marginTop: '10px',
        }}>
        <span
          style={{
            background: 'var(--placeholder-background-color)',
            height: '10px',
            width: '73px',
            marginRight: '16px',
          }}
        />
        <span
          style={{
            background: 'var(--placeholder-background-color)',
            height: '10px',
            width: '78px',
            marginRight: '16px',
          }}
        />
        <span
          style={{
            background: 'var(--placeholder-background-color)',
            height: '10px',
            width: '78px',
          }}
        />
      </div>
    </div>
  )
}

export default Placeholder
