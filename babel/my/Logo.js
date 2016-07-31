import React from 'react';

function Logo() {
  const styles = {
    header: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      paddingBottom: 20,
      backgroundColor: '#1812A8',
      background: 'linear-gradient(#01014B, #1812A8)',
      borderBottom: '1px solid #1B15C6',
    },
    anchor: {
      textDecoration: 'none',
    },
    logo: {
      width: 150,
      height: 150,
      margin: '25px auto 10px',
    },
    title: {
      margin: '0 0 8px',
      color: 'white',
      textAlign: 'center',
      fontWeight: 400,
      fontSize: '26px',
    },
    author: {
      margin: 0,
      color: '#aaa',
      textAlign: 'center',
      fontSize: '.8em',
      lineHeight: 1,
    },
  };
  return (
    <header style={styles.header}>
      <a href="/" style={styles.anchor}>
        <img src="/assets/logo.png" alt="音の園" style={styles.logo} />
        <h1 style={styles.title}>音の園</h1>
        <h3 style={styles.author}>music by ANDY</h3>
      </a>
    </header>
  );
}

export default Logo;
