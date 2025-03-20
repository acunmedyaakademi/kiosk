import "../styles/Header.css"

export default function Header() {
  const currentDate = new Date();
  const formattedDate = `${currentDate.getDate()} ${currentDate.toLocaleString('default', { month: 'long' })} ${currentDate.getFullYear()}`;

  return (
    <header>
      <div className="flex">
        <h1>Tost/Cum</h1>
        <span>{formattedDate}</span>
      </div>

      <div>
        <i className="fa-solid fa-globe">TR</i>
        <select name="" id="" >
          <option value="">eng</option>
        </select>
      </div>

    </header>
  )
}