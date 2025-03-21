# Recipe API

1. Features

- Get all recipes
- Get a recipe by ID
- Get recipes by category
- Get vegetarian recipes
- Create a new recipe
- Update a recipe
- Delete a recipe by ID
- Delete all recipes

## Technologies Used

- Node.js
- Express.js
- MongoDB (Mongoose)

## Installation

1. Clone this repository
```javascript
git clone https://github.com/DimitarGeorgievski/domasni_sedc.git
cd domasni_sedc/domasno_MongoDB_Recepies
```
2. Install Dependencies
```javascript
npm install
```
3. Set up environment variables:
- Create a .env file and add the necessary configurations (such as database connection string).
4. Start the Server
```javascript
npm run start
```

## API Endpoints

1. Get All Recipes
```javascript
GET /recipes
```
2. Get a recipe by ID
```javascript
GET /recipes/:id  //also here in :id it requires which recipe you want to get
```
3. Get recipes by category
```javascript
GET /recipes/category/:category  // in :catetegory you type what type of category to choose for example: breakfast,lunch,dinner,dessert
```
4. Get vegetarian recipes
```javascript
GET /recipes/vegetarian
```
5. Create a new recipe
```javascript
POST /recipes
```
- Request Body Example:
```javascript
{
  "title": "Pancakes",
  "description": "Fluffy homemade pancakes",
  "ingredients": ["Flour", "Milk", "Eggs", "Sugar", "Butter"],
  "instructions": ["Mix ingredients", "Cook on medium heat", "Serve hot"],
  "cookingTime": 20,
  "difficulty": "easy",
  "isVegetarian": true,
  "category": "breakfast"
}
```
6. Update a recipe
```javascript
PUT /recipes/:id  //also here in :id it requires which recipe you want to update
```
7. Delete a recipe by ID
```javascript
DELETE /recipes/:id  //also here in :id it requires which recipe you want to delete
```
8. Delete all recipes
```javascript
DELETE /recipes
```

## Have fun using the API! 🚀🔥