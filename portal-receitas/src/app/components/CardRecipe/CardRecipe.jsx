
const CardRecipe = ({ name, imageLink, description, prepTimeMinutes, servings}) => {
  return (
    <section>
      <img src={imageLink} alt="Imagem da receita"/> 
      <div>
        <h1>{name}</h1>
        <p>{description}</p>
        <div>
          <p>{servings}</p>
          <p>{prepTimeMinutes}</p>
        </div>
      </div>
    </section>
  )
}
export default CardRecipe;