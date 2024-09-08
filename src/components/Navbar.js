import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHandHoldingDollar } from '@fortawesome/free-solid-svg-icons';
import { faX } from '@fortawesome/free-solid-svg-icons';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import './Navbar.css';
import { Button } from './Button';
import { Link as ScrollLink, animateScroll as scroll} from 'react-scroll';






function Navbar() {
    const [click, setClick] = useState(false);
    const [button, setButton] = useState(true);

    const handleClick = () => setClick(!click);
    const closeMobileMenu = () => setClick(false);

    const showButton = () => {
        if(window.innerWidth <= 960) {
            setButton(false);
        } else {
            setButton(true);
        }
    };
    // useEffect(() => {
    //     showButton();
    // }, []);

    const handleScrollToTools = () => {
        window.scrollTo(document.getElementById('cards-section').offsetTop - 70);
      };

    useEffect(() => {
        showButton();
    }, []);
    
    const scrollToTop = (event) => {
      if (window.location.pathname === '/') {
          event.preventDefault();
          closeMobileMenu();
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
        else {
            closeMobileMenu();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
  };

  const scrollToTopGuide = (event) => {
    if (window.location.pathname === '/Guide') {
        event.preventDefault();
        closeMobileMenu();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    else {
        closeMobileMenu();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
};

    window.addEventListener('resize', showButton);

    const handleNavigationClick = () => {
        scrollToTop(); // Scroll to the top of the page
        closeMobileMenu(); // Close the mobile menu
      };
      
    return (
    <>
      <nav className="navbar">
        <div className="navbar-container">
            <Link to="/" className="navbar-logo" onClick={closeMobileMenu}>
              StockSensei&nbsp;<FontAwesomeIcon icon={faHandHoldingDollar} />
            </Link>
            <div className='menu-icon' onClick={handleClick}>
                <FontAwesomeIcon icon={ click ? faX : faBars } />
            </div>
            <ul className={click ? 'nav-menu active' : 'nav-menu'}>
                
            <li className='nav-item'>
                            <Link to='/' className='nav-links' onClick={scrollToTop}>
                                Home
                            </Link>
                        </li>

                <li className='nav-item'>
                    <Link to='/Guide' className='nav-links' onClick={scrollToTopGuide}>
                      Guide
                    </Link>
                </li>

                <li>
                    {window.location.pathname === '/' ? (      
                            <ScrollLink   
                            to='cards-section' 
                                smooth={true} 
                                duration={800} 
                                offset={-70} // Optional: Adjust if you have a fixed header
                                className='nav-links-mobile' 
                                onClick={closeMobileMenu}
                            >
                                TOOLS
                            </ScrollLink>
                    ) : (
                        <Link
      to="/" 
      className='nav-links-mobile'
      onClick={() => {
        closeMobileMenu();
        setTimeout(() => { 
          document.getElementById('cards-section').scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
        }, 50); // Adjust delay as needed for smooth transition after navigation
      }}
    >
      TOOLS
    </Link>
                    )}
                        </li>
            </ul>
            {button && ( 
                        <ScrollLink 
                            to='cards-section' 
                            smooth={true} 
                            duration={800} 
                            offset={-70} // Optional: Adjust if you have a fixed header
                            className='btn-mobile'
                        >
                            <Button buttonStyle='btn--outline'>
                                TOOLS
                            </Button>
                        </ScrollLink>
                    )}
        </div>
      </nav>
    </>
  )
}

export default Navbar;
