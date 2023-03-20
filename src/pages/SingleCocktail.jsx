import axios from 'axios'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Loading from '../components/Loading'

const url = 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i='
const SingleCocktail = () => {
  const { id } = useParams()
  const [loading, setLoading] = useState(true)
  const [cocktail, setCocktail] = useState(null)

  const fetchDrinkDetails = async () => {
    try {
      const response = await axios.get(`${url}${id}`)
      const drinkDetails = response.data

      if (drinkDetails.drinks) {
        const {
          strDrink: name,
          strDrinkThumb: image,
          strAlcoholic: info,
          strGlass: glass,
          strCategory: category,
          strInstructions: instructions,
          strIngredient1,
          strIngredient2,
          strIngredient3,
          strIngredient4,
          strIngredient5,
        } = drinkDetails.drinks[0]

        const ingredients = [
          strIngredient1,
          strIngredient2,
          strIngredient3,
          strIngredient4,
          strIngredient5,
        ]

        const newCocktail = {
          name,
          image,
          info,
          glass,
          category,
          instructions,
          ingredients,
        }
        setCocktail(newCocktail)
      } else {
        setCocktail(null)
      }
      setLoading(false)
    } catch (error) {
      console.log(error.response)
      setLoading(false)
    }
  }

  useEffect(() => {
    setLoading(true)
    fetchDrinkDetails()
    setLoading(false)
  }, [id])

  if (loading) {
    return <Loading />
  }

  if (!cocktail) {
    return <h2 className="section-title">no cocktail to show</h2>
  }

  const { name, image, info, glass, category, instructions, ingredients } =
    cocktail
  return (
    <section className="section cocktail-section">
      <Link to="/" className="btn btn-primary">
        Back Home
      </Link>
      <h2 className="section-title">{name}</h2>
      <div className="drink">
        <img src={image} alt={name} />
        <div className="drink-info">
          <p>
            <span className="drink-data">name :</span> {name}
          </p>
          <p>
            <span className="drink-data">category :</span> {category}
          </p>
          <p>
            <span className="drink-data">info :</span> {info}
          </p>
          <p>
            <span className="drink-data">glass :</span> {glass}
          </p>
          <p>
            <span className="drink-data">instructions :</span> {instructions}
          </p>

          <p>
            <span className="drink-data">ingredients :</span>{' '}
            {ingredients.map((item, index) => {
              return item ? <span key={index}>{item}</span> : null
            })}
          </p>
        </div>
      </div>
    </section>
  )
}

export default SingleCocktail
