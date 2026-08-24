// =====================================================
// POTION LAB
// =====================================================


// =====================================================
// DATA
// =====================================================

const ingredients = [

    {
        id: "herb",
        name: "Magic Herb",
        icon: "🌿",
        desc: "Tanaman ajaib"
    },

    {
        id: "berry",
        name: "Fire Berry",
        icon: "🔴",
        desc: "Berry panas"
    },

    {
        id: "water",
        name: "Moon Water",
        icon: "💧",
        desc: "Air dari bulan"
    },

    {
        id: "crystal",
        name: "Magic Crystal",
        icon: "🔮",
        desc: "Kristal energi"
    },

    {
        id: "slime",
        name: "Green Slime",
        icon: "🟢",
        desc: "Slime misterius"
    },

    {
        id: "mushroom",
        name: "Mystic Mushroom",
        icon: "🍄",
        desc: "Jamur langka"
    }

];


const recipes = [

    {
        id: "health",
        name: "Health Potion",
        icon: "❤️",
        ingredients: [
            "herb",
            "mushroom"
        ],
        reward: 25,
        score: 100
    },

    {
        id: "speed",
        name: "Speed Potion",
        icon: "⚡",
        ingredients: [
            "berry",
            "water"
        ],
        reward: 30,
        score: 120
    },

    {
        id: "shield",
        name: "Shield Potion",
        icon: "🛡️",
        ingredients: [
            "crystal",
            "herb"
        ],
        reward: 40,
        score: 150
    },

    {
        id: "fire",
        name: "Fire Potion",
        icon: "🔥",
        ingredients: [
            "berry",
            "slime"
        ],
        reward: 45,
        score: 170
    },

    {
        id: "mana",
        name: "Mana Potion",
        icon: "💙",
        ingredients: [
            "crystal",
            "water"
        ],
        reward: 50,
        score: 190
    },

    {
        id: "poison",
        name: "Poison Potion",
        icon: "☠️",
        ingredients: [
            "slime",
            "mushroom"
        ],
        reward: 55,
        score: 210
    },

    {
        id: "legendary",
        name: "Legendary Potion",
        icon: "🌟",
        ingredients: [
            "crystal",
            "berry",
            "mushroom"
        ],
        reward: 100,
        score: 400
    },

    {
        id: "ultimate",
        name: "Ultimate Potion",
        icon: "👑",
        ingredients: [
            "herb",
            "crystal",
            "water",
            "berry"
        ],
        reward: 180,
        score: 700
    }

];


// =====================================================
// CUSTOMER DATA
// =====================================================

const customers = [

    {
        name: "Wizard Merlin",
        avatar: "🧙"
    },

    {
        name: "Forest Witch",
        avatar: "🧝‍♀️"
    },

    {
        name: "Dark Knight",
        avatar: "🧝"
    },

    {
        name: "Village Doctor",
        avatar: "👨‍⚕️"
    },

    {
        name: "Royal Guard",
        avatar: "🛡️"
    },

    {
        name: "Little Alchemist",
        avatar: "🧑‍🔬"
    }

];


// =====================================================
// STATE
// =====================================================

let gold = 0;

let score = 0;

let highScore =
    Number(
        localStorage.getItem(
            "potionLabHighScore"
        )
    ) || 0;

let day = 1;

let combo = 0;

let selectedIngredients = [];

let currentRecipe = null;

let currentCustomer = null;

let timeLeft = 30;

let maxTime = 30;

let gameRunning = true;

let timerInterval = null;


// =====================================================
// UPGRADES
// =====================================================

let timeUpgradeLevel = 0;

let goldUpgradeLevel = 0;

let scoreUpgradeLevel = 0;


// =====================================================
// DOM
// =====================================================

const goldElement =
    document.getElementById("gold");

const scoreElement =
    document.getElementById("score");

const highScoreElement =
    document.getElementById("highScore");

const dayElement =
    document.getElementById("day");

const ingredientsElement =
    document.getElementById("ingredients");

const selectedElement =
    document.getElementById(
        "selectedIngredients"
    );

const recipeBookElement =
    document.getElementById("recipeBook");

const customerNameElement =
    document.getElementById(
        "customerName"
    );

const customerRequestElement =
    document.getElementById(
        "customerRequest"
    );

const customerAvatarElement =
    document.getElementById(
        "customerAvatar"
    );

const orderPotionElement =
    document.getElementById(
        "orderPotion"
    );

const orderIngredientsElement =
    document.getElementById(
        "orderIngredients"
    );

const timerTextElement =
    document.getElementById(
        "timerText"
    );

const timerFillElement =
    document.getElementById(
        "timerFill"
    );

const brewStatusElement =
    document.getElementById(
        "brewStatus"
    );

const cauldronElement =
    document.getElementById(
        "cauldron"
    );

const brewButton =
    document.getElementById(
        "brewButton"
    );

const clearButton =
    document.getElementById(
        "clearButton"
    );

const notification =
    document.getElementById(
        "notification"
    );

const gameOverElement =
    document.getElementById(
        "gameOver"
    );


// =====================================================
// RENDER INGREDIENTS
// =====================================================

function renderIngredients() {

    ingredientsElement.innerHTML =
        "";

    ingredients.forEach(
        ingredient => {

            const button =
                document.createElement(
                    "button"
                );

            button.className =
                "ingredient";

            button.innerHTML = `

                <span class="ingredient-icon">
                    ${ingredient.icon}
                </span>

                <span class="ingredient-name">
                    ${ingredient.name}
                </span>

                <span class="ingredient-desc">
                    ${ingredient.desc}
                </span>

            `;

            button.addEventListener(
                "click",
                () => {

                    selectIngredient(
                        ingredient.id
                    );

                }
            );

            ingredientsElement.appendChild(
                button
            );

        }
    );

}


// =====================================================
// SELECT INGREDIENT
// =====================================================

function selectIngredient(
    ingredientId
) {

    if (!gameRunning) {
        return;
    }

    // Maximum ingredients

    if (
        selectedIngredients.length >= 4
    ) {

        showNotification(
            "Maksimal 4 bahan!",
            "error"
        );

        return;

    }

    selectedIngredients.push(
        ingredientId
    );

    renderSelected();

}


// =====================================================
// RENDER SELECTED
// =====================================================

function renderSelected() {

    selectedElement.innerHTML =
        "";

    if (
        selectedIngredients.length === 0
    ) {

        selectedElement.innerHTML = `
            <span class="empty">
                Belum ada bahan
            </span>
        `;

        return;

    }


    selectedIngredients.forEach(
        (id, index) => {

            const ingredient =
                ingredients.find(
                    item =>
                        item.id === id
                );

            const item =
                document.createElement(
                    "span"
                );

            item.className =
                "selected-item";

            item.textContent =
                ingredient.icon
                +
                " "
                +
                ingredient.name;


            item.title =
                "Klik untuk menghapus";


            item.addEventListener(
                "click",
                () => {

                    selectedIngredients.splice(
                        index,
                        1
                    );

                    renderSelected();

                }
            );


            selectedElement.appendChild(
                item
            );

        }
    );

}


// =====================================================
// CLEAR
// =====================================================

clearButton.addEventListener(
    "click",
    () => {

        selectedIngredients =
            [];

        renderSelected();

        brewStatusElement.textContent =
            "Pilih bahan untuk mulai meracik";

    }
);


// =====================================================
// NORMALIZE RECIPE
// =====================================================

function normalizeArray(
    array
) {

    return [
        ...array
    ].sort();

}


// =====================================================
// CHECK RECIPE
// =====================================================

function isCorrectRecipe() {

    const selected =
        normalizeArray(
            selectedIngredients
        );

    const required =
        normalizeArray(
            currentRecipe.ingredients
        );


    if (
        selected.length !==
        required.length
    ) {

        return false;

    }


    return selected.every(
        (
            value,
            index
        ) => {

            return value ===
                required[index];

        }
    );

}


// =====================================================
// BREW
// =====================================================

brewButton.addEventListener(
    "click",
    () => {

        if (!gameRunning) {
            return;
        }


        if (
            selectedIngredients.length === 0
        ) {

            showNotification(
                "Pilih bahan dulu!",
                "error"
            );

            return;

        }


        cauldronElement.classList.add(
            "brewing"
        );


        brewStatusElement.textContent =
            "🔥 Brewing...";


        brewButton.disabled =
            true;


        setTimeout(
            () => {

                cauldronElement.classList.remove(
                    "brewing"
                );

                brewButton.disabled =
                    false;

                finishBrewing();

            },

            700

        );

    }
);


// =====================================================
// FINISH BREWING
// =====================================================

function finishBrewing() {

    if (
        isCorrectRecipe()
    ) {

        successfulPotion();

    }

    else {

        failedPotion();

    }

}


// =====================================================
// SUCCESS
// =====================================================

function successfulPotion() {

    combo++;


    let reward =
        currentRecipe.reward;


    let earnedScore =
        currentRecipe.score;


    // Combo bonus

    if (
        combo >= 2
    ) {

        reward +=
            combo * 5;

        earnedScore +=
            combo * 20;

    }


    // Golden Cauldron

    if (
        goldUpgradeLevel > 0
    ) {

        reward =
            Math.floor(
                reward *
                (
                    1 +
                    goldUpgradeLevel *
                    0.2
                )
            );

    }


    // Master Fire

    if (
        scoreUpgradeLevel > 0
        &&
        combo >= 2
    ) {

        earnedScore +=
            scoreUpgradeLevel *
            50;

    }


    gold +=
        reward;


    score +=
        earnedScore;


    updateHighScore();


    showNotification(

        "✅ Potion berhasil! +"
        +
        reward
        +
        " gold",

        "success"

    );


    brewStatusElement.textContent =
        "✨ Potion berhasil dibuat!";


    // New recipe discovery

    discoverRecipe(
        currentRecipe.id
    );


    selectedIngredients =
        [];


    renderSelected();


    // Next customer

    setTimeout(
        () => {

            nextCustomer();

        },

        800
    );


    updateUI();

}


// =====================================================
// FAILED
// =====================================================

function failedPotion() {

    combo = 0;


    score =
        Math.max(
            0,
            score - 30
        );


    showNotification(
        "❌ Racikan salah!",
        "error"
    );


    brewStatusElement.textContent =
        "💥 Potion gagal dibuat!";


    selectedIngredients =
        [];


    renderSelected();


    updateUI();

}


// =====================================================
// DISCOVERED RECIPES
// =====================================================

let discoveredRecipes = [

    "health",
    "speed"

];


function discoverRecipe(
    recipeId
) {

    if (
        discoveredRecipes.includes(
            recipeId
        )
    ) {

        return;

    }


    discoveredRecipes.push(
        recipeId
    );


    renderRecipeBook();


    showNotification(
        "📖 Resep baru ditemukan!",
        "info"
    );

}


// =====================================================
// RECIPE BOOK
// =====================================================

function renderRecipeBook() {

    recipeBookElement.innerHTML =
        "";


    recipes.forEach(
        recipe => {

            const div =
                document.createElement(
                    "div"
                );


            const unlocked =
                discoveredRecipes.includes(
                    recipe.id
                );


            div.className =
                "recipe "
                +
                (
                    unlocked
                    ? ""
                    : "locked"
                );


            if (
                unlocked
            ) {

                const ingredientHTML =
                    recipe.ingredients
                        .map(
                            id => {

                                const ingredient =
                                    ingredients.find(
                                        item =>
                                            item.id === id
                                    );

                                return `
                                    <span>
                                        ${ingredient.icon}
                                        ${ingredient.name}
                                    </span>
                                `;

                            }
                        )
                        .join("");


                div.innerHTML = `

                    <div class="recipe-name">

                        ${recipe.icon}
                        ${recipe.name}

                    </div>

                    <div class="recipe-list">

                        ${ingredientHTML}

                    </div>

                `;

            }

            else {

                div.innerHTML = `

                    <div class="recipe-name">

                        ❓ Unknown Potion

                    </div>

                    <div class="recipe-list">

                        <span>
                            Locked
                        </span>

                    </div>

                `;

            }


            recipeBookElement.appendChild(
                div
            );

        }
    );

}


// =====================================================
// NEW CUSTOMER
// =====================================================

function nextCustomer() {

    if (!gameRunning) {
        return;
    }


    // Day progression

    const completed =
        Math.floor(
            score / 500
        );


    day =
        Math.max(
            1,
            completed + 1
        );


    dayElement.textContent =
        day;


    // Choose recipe

    const availableRecipes =
        recipes.filter(
            recipe => {

                // Early game

                if (
                    day <= 2
                ) {

                    return (
                        recipe.id ===
                            "health"
                        ||
                        recipe.id ===
                            "speed"
                        ||
                        recipe.id ===
                            "shield"
                    );

                }


                // Medium

                if (
                    day <= 4
                ) {

                    return (
                        recipe.ingredients
                            .length <= 3
                    );

                }


                return true;

            }
        );


    currentRecipe =
        availableRecipes[
            Math.floor(
                Math.random()
                *
                availableRecipes.length
            )
        ];


    currentCustomer =
        customers[
            Math.floor(
                Math.random()
                *
                customers.length
            )
        ];


    customerNameElement.textContent =
        currentCustomer.name;


    customerAvatarElement.textContent =
        currentCustomer.avatar;


    customerRequestElement.textContent =
        getCustomerDialogue();


    orderPotionElement.textContent =

        currentRecipe.icon
        +
        " "
        +
        currentRecipe.name;


    orderIngredientsElement.innerHTML =
        "";


    currentRecipe.ingredients.forEach(
        id => {

            const ingredient =
                ingredients.find(
                    item =>
                        item.id === id
                );


            const span =
                document.createElement(
                    "span"
                );


            span.textContent =
                ingredient.icon
                +
                " "
                +
                ingredient.name;


            orderIngredientsElement.appendChild(
                span
            );

        }
    );


    selectedIngredients =
        [];


    renderSelected();


    brewStatusElement.textContent =
        "Penuhi pesanan customer!";


    // Timer gets harder each day

    maxTime =
        Math.max(
            12,
            30
            +
            (
                timeUpgradeLevel
                *
                5
            )
            -
            (
                day - 1
            )
            *
            1.2
        );


    timeLeft =
        maxTime;


    updateTimer();


    startTimer();

}


// =====================================================
// CUSTOMER DIALOGUE
// =====================================================

function getCustomerDialogue() {

    const dialogues = [

        "Tolong buatkan potion ini!",
        "Saya sedang terburu-buru!",
        "Saya membutuhkan ramuan ini.",
        "Bisa buatkan potion untuk saya?",
        "Jangan sampai salah racik ya!",
        "Saya bayar mahal kalau benar!"

    ];


    return dialogues[
        Math.floor(
            Math.random()
            *
            dialogues.length
        )
    ];

}


// =====================================================
// TIMER
// =====================================================

function startTimer() {

    clearInterval(
        timerInterval
    );


    timerInterval =
        setInterval(
            () => {

                if (!gameRunning) {
                    return;
                }


                timeLeft -=
                    0.1;


                updateTimer();


                if (
                    timeLeft <= 0
                ) {

                    clearInterval(
                        timerInterval
                    );


                    customerMissed();

                }

            },

            100

        );

}


// =====================================================
// TIMER UI
// =====================================================

function updateTimer() {

    timerTextElement.textContent =
        Math.ceil(
            timeLeft
        );


    const percentage =
        Math.max(
            0,
            (
                timeLeft /
                maxTime
            )
            *
            100
        );


    timerFillElement.style.width =
        percentage
        +
        "%";


    if (
        percentage < 25
    ) {

        timerFillElement.style.background =
            "#ef4444";

    }

    else if (
        percentage < 50
    ) {

        timerFillElement.style.background =
            "#f59e0b";

    }

    else {

        timerFillElement.style.background =
            "#a855f7";

    }

}


// =====================================================
// CUSTOMER MISSED
// =====================================================

function customerMissed() {

    combo = 0;


    score =
        Math.max(
            0,
            score - 50
        );


    showNotification(
        "😡 Customer pergi!",
        "error"
    );


    brewStatusElement.textContent =
        "Customer meninggalkan lab...";


    // Too many failures

    if (
        score < -100
    ) {

        endGame();

        return;

    }


    setTimeout(
        () => {

            nextCustomer();

        },

        900
    );


    updateUI();

}


// =====================================================
// HIGH SCORE
// =====================================================

function updateHighScore() {

    if (
        score >
        highScore
    ) {

        highScore =
            score;


        localStorage.setItem(
            "potionLabHighScore",
            highScore
        );

    }

}


// =====================================================
// SHOP
// =====================================================

document.getElementById(
    "timeUpgrade"
).addEventListener(
    "click",
    () => {

        const price =
            50
            +
            (
                timeUpgradeLevel
                *
                50
            );


        if (
            gold < price
        ) {

            showNotification(
                "Gold tidak cukup!",
                "error"
            );

            return;

        }


        gold -=
            price;


        timeUpgradeLevel++;


        showNotification(
            "⏱️ Clock upgraded!",
            "success"
        );


        updateShop();

        updateUI();

    }
);


document.getElementById(
    "goldUpgrade"
).addEventListener(
    "click",
    () => {

        const price =
            100
            +
            (
                goldUpgradeLevel
                *
                100
            );


        if (
            gold < price
        ) {

            showNotification(
                "Gold tidak cukup!",
                "error"
            );

            return;

        }


        gold -=
            price;


        goldUpgradeLevel++;


        showNotification(
            "💰 Golden Cauldron upgraded!",
            "success"
        );


        updateShop();

        updateUI();

    }
);


document.getElementById(
    "scoreUpgrade"
).addEventListener(
    "click",
    () => {

        const price =
            150
            +
            (
                scoreUpgradeLevel
                *
                150
            );


        if (
            gold < price
        ) {

            showNotification(
                "Gold tidak cukup!",
                "error"
            );

            return;

        }


        gold -=
            price;


        scoreUpgradeLevel++;


        showNotification(
            "🔥 Master Fire upgraded!",
            "success"
        );


        updateShop();

        updateUI();

    }
);


// =====================================================
// UPDATE SHOP
// =====================================================

function updateShop() {

    const timeButton =
        document.getElementById(
            "timeUpgrade"
        );


    const goldButton =
        document.getElementById(
            "goldUpgrade"
        );


    const scoreButton =
        document.getElementById(
            "scoreUpgrade"
        );


    timeButton.textContent =
        "💰 "
        +
        (
            50
            +
            timeUpgradeLevel
            *
            50
        );


    goldButton.textContent =
        "💰 "
        +
        (
            100
            +
            goldUpgradeLevel
            *
            100
        );


    scoreButton.textContent =
        "💰 "
        +
        (
            150
            +
            scoreUpgradeLevel
            *
            150
        );

}


// =====================================================
// NOTIFICATION
// =====================================================

let notificationTimeout;


function showNotification(
    message,
    type
) {

    notification.textContent =
        message;


    notification.className =
        "notification show "
        +
        type;


    clearTimeout(
        notificationTimeout
    );


    notificationTimeout =
        setTimeout(
            () => {

                notification.classList.remove(
                    "show"
                );

            },

            1800
        );

}


// =====================================================
// UPDATE UI
// =====================================================

function updateUI() {

    goldElement.textContent =
        gold;


    scoreElement.textContent =
        score;


    highScoreElement.textContent =
        highScore;


    dayElement.textContent =
        day;


    updateShop();

}


// =====================================================
// GAME OVER
// =====================================================

function endGame() {

    gameRunning = false;


    clearInterval(
        timerInterval
    );


    document.getElementById(
        "finalScore"
    ).textContent =
        score;


    document.getElementById(
        "finalGold"
    ).textContent =
        gold;


    document.getElementById(
        "finalDay"
    ).textContent =
        day;


    document.getElementById(
        "finalHighScore"
    ).textContent =
        highScore;


    gameOverElement.classList.remove(
        "hidden"
    );

}


// =====================================================
// RESTART
// =====================================================

document.getElementById(
    "restartButton"
).addEventListener(
    "click",
    () => {

        resetGame();

    }
);


// =====================================================
// RESET
// =====================================================

function resetGame() {

    gold = 0;

    score = 0;

    day = 1;

    combo = 0;

    selectedIngredients =
        [];

    currentRecipe =
        null;

    currentCustomer =
        null;

    timeLeft = 30;

    maxTime = 30;

    gameRunning = true;


    timeUpgradeLevel = 0;

    goldUpgradeLevel = 0;

    scoreUpgradeLevel = 0;


    discoveredRecipes = [

        "health",
        "speed"

    ];


    gameOverElement.classList.add(
        "hidden"
    );


    renderIngredients();

    renderSelected();

    renderRecipeBook();

    updateUI();

    nextCustomer();

}


// =====================================================
// INITIALIZE
// =====================================================

renderIngredients();

renderSelected();

renderRecipeBook();

updateUI();

nextCustomer();