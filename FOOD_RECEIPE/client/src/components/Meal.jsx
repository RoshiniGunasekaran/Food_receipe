import { useState } from "react";
import Axios from "axios";
import './Meal.css';
import Navbar from '../components/Navbar';

const Meal = () => {
    const [timeout, updateTimeoutId] = useState();
    const [search, setSearch] = useState("");
    const [recipes, setRecipes] = useState([]);
    const [selectedRecipe, setSelectedRecipe] = useState(null);

    const YOUR_APP_ID = "82e453da";
    const YOUR_APP_KEY = "3bb5d1a3b992f408b9003effd74c9c22";

    const fetchRecipe = async (searchString) => {
        try {
            const url = `https://api.edamam.com/search?q=${searchString}&app_id=${YOUR_APP_ID}&app_key=${YOUR_APP_KEY}`;
            const response = await Axios.get(url);
            setRecipes(response.data.hits || []);
        } catch (error) {
            console.error("Error fetching recipes:", error);
        }
    };

    const onTextChange = (event) => {
        clearTimeout(timeout);
        const searchString = event.target.value;
        setSearch(searchString);
        const timeoutId = setTimeout(() => {
            if (searchString) {
                fetchRecipe(searchString);
            }
        }, 500);
        updateTimeoutId(timeoutId);
    };

    const showRecipeDetails = (recipe) => {
        setSelectedRecipe(recipe);
    };

    const closeModal = () => {
        setSelectedRecipe(null);
    };

    return (
        <div>
            <Navbar />
            <div className="main meal-page">
                <div className="heading">
                    <h1>Search Your Food Recipe</h1>
                    <h4>Find delicious recipes from around the world!</h4>
                </div>
                <div className="searchbox">
                    <input
                        type="search"
                        className="search-bar"
                        placeholder="Search a meal..."
                        onChange={onTextChange}
                        value={search}
                    />
                </div>
                <div className="container">
                    {recipes.length === 0 ? (
                        <p className="notSearch">No recipes found. Try a different search term.</p>
                    ) : (
                        recipes.map((recipeItem, index) => (
                            <div key={index} className="recipe-item">
                                <img src={recipeItem.recipe.image} alt={recipeItem.recipe.label} />
                                <button onClick={() => showRecipeDetails(recipeItem.recipe)} className="view-recipe-button">
                                    View Recipe
                                </button>
                            </div>
                        ))
                    )}
                </div>
                {selectedRecipe && (
                    <div className="modal">
                        <div className="modal-content">
                            <span className="close" onClick={closeModal}>&times;</span>
                            <h2>{selectedRecipe.label}</h2>
                            <img src={selectedRecipe.image} alt={selectedRecipe.label} />
                            <p>Calories: {Math.round(selectedRecipe.calories)}</p>
                            <h4>Ingredients:</h4>
                            <ul>
                                {selectedRecipe.ingredientLines.map((ingredient, index) => (
                                    <li key={index}>{ingredient}</li>
                                ))}
                            </ul>
                            <a href={selectedRecipe.url} target="_blank" rel="noopener noreferrer">
                                Full Recipe
                            </a>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Meal;
