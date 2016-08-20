import React from 'react';

function Logo() {
  const styles = {
    header: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      paddingBottom: 20,
      backgroundColor: '#fff',
    },
    pretitle: {
      color: '#888',
      textAlign: 'center',
    },
    afttitle: {
      margin: '0 0 8px',
      color: '#888',
      textAlign: 'center',
      fontSize: '12px',
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
      margin: '0',
      color: '#666',
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
        <img src="/assets/img/logo.png" alt="IMPROVIS" style={styles.logo} />
        <div style={styles.pretitle}>音の園</div>
        <h1 style={styles.title}>IMPROVIS</h1>
        <div style={styles.afttitle}>― インプロヴィス ―</div>
        <h3 style={styles.author}>music by ANDY</h3>
      </a>
    </header>
  );
}

export default Logo;
