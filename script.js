const defaultRecipes = [
    {
        id: 1,
        title: "Паста Карбонара",
        time: "20 хв",
        ingredients: ["Спагеті", "Бекон", "Вершки", "Яєчні жовтки", "Сир Пармезан"],
        description: "Відваріть спагеті. Обсмажте бекон, змішайте з жовтками та вершками, об'єднайте з пастою та посипте сиром."
    },
    {
        id: 2,
        title: "Запечений лосось з овочами",
        time: "30 хв",
        ingredients: ["Філе лосося", "Брокколі", "Болгарський перець", "Оливкова олія", "Спеції"],
        description: "Викладіть лосось та овочі на деко, збризніть олією, додайте спеції та запікайте при 180°C протягом 25 хвилин."
    },
    {
        id: 3,
        title: "Куряче філе з грибами у сметанному соусі",
        time: "25 хв",
        ingredients: ["Куряче філе", "Печериці", "Сметана", "Цибуля", "Часник"],
        description: "Наріжте та обсмажте курку з грибами та цибулею. Додайте сметану, часник і тушкуйте до готовності."
    },
    {
        id: 4,
        title: "Овочеве рагу з тофу",
        time: "30 хв",
        ingredients: ["Тофу", "Кабачки", "Баклажани", "Помідори", "Соєвий соус"],
        description: "Наріжте овочі та тофу кубиками. Обсмажте на сковороді, додайте соєвий соус і тушкуйте на повільному вогні."
    },
    {
        id: 5,
        title: "Салат Цезар з куркою",
        time: "15 хв",
        ingredients: ["Куряче філе", "Салат айсберг", "Сухарики", "Сир Пармезан", "Соус Цезар"],
        description: "Обсмажте курку. Змішайте порване листя салату, сухарики, слайси сиру, додайте шматочки курки та заправте соусом."
    }
];
function initLocalStorage() {
    if (!localStorage.getItem('dinner_recipes')) {
        localStorage.setItem('dinner_recipes', JSON.stringify(defaultRecipes));
    }
}
function getRecipes() {
    return JSON.parse(localStorage.getItem('dinner_recipes')) || defaultRecipes;
}

document.addEventListener('DOMContentLoaded', () => {
    initLocalStorage();

    const generateBtn = document.getElementById('generateBtn');
    const iconContainer = document.getElementById('iconContainer');
    const cookingIcon = iconContainer.querySelector('.cooking-icon');
    const recipeResult = document.getElementById('recipeResult');
    generateBtn.addEventListener('click', () => {
        generateBtn.disabled = true;
        recipeResult.classList.add('hidden');
        cookingIcon.classList.add('spinning');
        setTimeout(() => {
            const recipes = getRecipes();
            const randomIndex = Math.floor(Math.random() * recipes.length);
            const selectedRecipe = recipes[randomIndex];
            renderRecipe(selectedRecipe);
            cookingIcon.classList.remove('spinning');
            generateBtn.disabled = false;
        }, 1200);
    });
    function renderRecipe(recipe) {
        recipeResult.innerHTML = `
            <h3>${recipe.title}</h3>
            <p><strong>⏱ Час приготування:</strong> ${recipe.time}</p>
            <p><strong>🛒 Інгредієнти:</strong></p>
            <ul>
                ${recipe.ingredients.map(ing => `<li>${ing}</li>`).join('')}
            </ul>
            <p><strong>📝 Приготування:</strong> ${recipe.description}</p>
        `;
        
        recipeResult.style.display = 'block';
        setTimeout(() => {
            recipeResult.classList.remove('hidden');
        }, 10);
    }
});
