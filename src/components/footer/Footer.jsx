import { Link } from "react-router-dom"
import './footer.css'

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__content">
        <div className="footer__author">
          <span>created by</span>
          <Link to='https://www.ashishfrank.com/' target="_blank">Frank</Link>
        </div>
      </div>
    </footer>
  )
}

export default Footer