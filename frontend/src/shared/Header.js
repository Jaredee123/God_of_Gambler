import React from 'react';
import PropTypes from 'prop-types';
import './Header.css';

/**
 * Header component for the God of Gambling app.
 * Displays the app logo and title.
 */
const Header = ({ title, logoSrc, logoAlt, logoSize }) => {
  const { width, height } = logoSize;
  return (
    <header className="header">
      <div className="logo">
        <img src={logoSrc} width={width} height={height} alt={logoAlt} />
        <h1>{title}</h1>
      </div>
    </header>
  );
};

Header.propTypes = {
  /** The title to display in the header */
  title: PropTypes.string,
  /** Source path or URL for the logo image */
  logoSrc: PropTypes.string,
  /** Alt text for the logo image */
  logoAlt: PropTypes.string,
  /** Dimensions for the logo image */
  logoSize: PropTypes.shape({
    width: PropTypes.number,
    height: PropTypes.number,
  }),
};

Header.defaultProps = {
  title: 'God of Gambling',
  logoSrc: 'godofgambler_icon.png',
  logoAlt: 'God of Gambling logo',
  logoSize: { width: 68, height: 68 },
};

export default Header;
