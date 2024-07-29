import './bars.css'

const Bars = ({ side, isHover }) => {

  const sideClass = side ?? ''

  return (
    <div className={`bars ${sideClass} ${isHover ? 'active' : ''}`}>
        <div className="j"></div>
        <div className="i"></div>
        <div className="h"></div>
        <div className="g"></div>
        <div className="f"></div>
        <div className="e"></div>
        <div className="d"></div>
        <div className="c"></div>
        <div className="a"></div>
        <div className="b"></div>
        <div className="d"></div>
        <div className="e"></div>
        <div className="f"></div>
        <div className="g"></div>
        <div className="h"></div>
        <div className="i"></div>
        <div className="j"></div>
    </div>
  )
}

export default Bars