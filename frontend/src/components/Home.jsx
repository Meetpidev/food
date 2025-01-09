import React from 'react';
import "../styles/Home.css" 

function Home() {
  return (
    <div className="home-container">
      <h1 className="title">Preventing Food Waste: A Delicious Way to Save the Planet</h1>
      <p className="description">
        Food waste is not just an environmental issue; it affects our economy and society as well. 
        Approximately <strong>1.3 billion tons</strong> of food are wasted globally each year, 
        leading to significant economic losses and environmental degradation. By addressing this issue, 
        we can make a positive impact on our planet.
      </p>

      <h2>Why Preventing Food Waste Matters</h2>
      <ul className="benefits-list">
        <li><strong>Environmental Benefits:</strong> Reducing food waste helps lower greenhouse gas emissions and conserves resources used in food production.</li>
        <li><strong>Economic Savings:</strong> Families and businesses can save money by purchasing only what they need and utilizing leftovers effectively.</li>
        <li><strong>Social Responsibility:</strong> Redirecting surplus food to those in need helps combat hunger and promotes community well-being.</li>
      </ul>

      <img 
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR89MFzD4224Fk9lko2hghg8xalmLbucHBhmg&s" 
        alt="Food Waste Awareness" 
        className="full-width-image" 
      />

      <h2>Tips to Reduce Food Waste</h2>
      <ul className="tips-list">
        <li><strong>Plan Your Meals:</strong> Create a weekly meal plan to avoid overbuying and ensure you use ingredients before they spoil.</li>
        <li><strong>Store Food Properly:</strong> Learn how to store different types of food to maximize their shelf life.</li>
        <li><strong>Use Leftovers Creatively:</strong> Incorporate leftovers into new meals or snacks instead of discarding them.</li>
        <li><strong>Compost Food Scraps:</strong> Composting is an effective way to reduce waste while enriching your garden soil.</li>
      </ul>

      <blockquote className="quote">
        “Cutting food waste is a delicious way of saving money, helping to feed the world, and protecting the planet.”
      </blockquote>
     
      <p className="conclusion">
        By making small changes in our daily habits, we can significantly reduce food waste and contribute to a more sustainable future. Let’s work together to create a world where every bite counts!
      </p>
    </div>
  );
}

export default Home;
