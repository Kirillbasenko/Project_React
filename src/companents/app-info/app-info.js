import "./app-info.css"

const AppInfo = ({premiumd, employers}) => {
   return (
      <div className="app-info">
         <h1>Учет сотрудников в компании "Свесса"</h1>
         <h2>Общее число сотрудников: {employers}</h2>
         <h2>Премию получат: {premiumd} </h2>
      </div>
   )
}

export default AppInfo