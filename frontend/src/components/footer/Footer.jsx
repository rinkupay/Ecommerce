import React from 'react'
import './Footer.css'
import appstore from "../../images/appstore.png"
import playstore from "../../images/playstore.png"

const Footer = () => {
  return (
    <div>
       <footer id="footer">
      <div className="leftfooter">
        <h4>DOWNLOAD OUR APP</h4>
        <p>Download App for Android And IOS mobile phone</p>
        <img src={playstore} alt="playstore" />
        <img src={appstore} alt="appstore" />
      </div>

      <div className="midfooter">
        <h1>ECOMMERCE</h1>
        <p>High Quality is our first priority</p>

        <p>Copyrights 2023 &copy;webtech</p>
      </div>

      <div className="rightfooter">
        <h4>Follow Us</h4>
        <a href="https://instagram.com/rinkumurmu" target="_Rinku">Instagram</a>
        <a href="https://youtube.com/rinkumurmu" target="_Rinku">Youtube</a>
        <a href="https://facebook.com/rinkumurmu" target="_Rinku">Facebook</a>
      </div>
    </footer>
    </div>
  )
}

export default Footer
