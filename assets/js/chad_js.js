$( document ).ready(function() {

 let meals = {
    meal1: {
      meal: [],
      calories: 0,
      protein: 0,
      carbs: 0,
      fat: 0
    },
    meal2: {
      meal: [],
      calories: 0,
      protein: 0,
      carbs: 0,
      fat: 0
    },
    meal3: {
      meal: [],
      calories: 0,
      protein: 0,
      carbs: 0,
      fat: 0
    }
  };

  function showAllMealsAndPictures(howManyMeals) {
    // if the #id that holds the meal1 calories exists, then display meal info and pictures
    if("#meal1Calories".length > 0){
        showAllMeals(howManyMeals);
        getMealPictures(howManyMeals);
    }
  }

  function showAllMeals(howManyMeals) {
    for (let i = 1; i <= howManyMeals; i++) {
      showOneMeal(i);
    }
  }

  function showOneMeal(mealNumber){

    $(`#meal${mealNumber}Contents`).html(localStorage.getItem(`meal${mealNumber}Contents`));

    let temp = $(`#meal${mealNumber}Calories`).html("Calories: ");
    temp = temp.append(localStorage.getItem(`meal${mealNumber}Calories`));
    temp = temp.append("<br>");
    temp = temp.append("Protein: ");
    temp = temp.append(localStorage.getItem(`meal${mealNumber}Protein`));
    temp = temp.append("<br>");
    temp = temp.append("Carbs: ");
    temp = temp.append(localStorage.getItem(`meal${mealNumber}Carbs`));
    temp = temp.append("<br>");
    temp = temp.append("Fat: ");
    temp = temp.append(localStorage.getItem(`meal${mealNumber}Fat`));

  }

  function getMealPictures(howManyMeals) {
    for (let i = 1; i <= howManyMeals; i++) {
      $(`#meal${i}Picture`).attr("src", localStorage.getItem(`meal${i}ImgSrc`));
    }
  }

  function locallyStoreAllMeals(howManyMeals) {
      for (let i = 1; i <= howManyMeals; i++) {
         locallyStoreMeals(i);
      }
    }

    function locallyStoreMeals(mealNumber) {
      let temp = "";
      meals[`meal${mealNumber}`].meal.map(mealItem => {
        temp = temp.concat(mealItem.item_name, "<br>");
      });
      localStorage.setItem(`meal${mealNumber}Contents`, temp);
      localStorage.setItem(`meal${mealNumber}Calories`, meals[`meal${mealNumber}`].calories);
      localStorage.setItem(`meal${mealNumber}Protein`, meals[`meal${mealNumber}`].protein);
      localStorage.setItem(`meal${mealNumber}Carbs`, meals[`meal${mealNumber}`].carbs);
      localStorage.setItem(`meal${mealNumber}Fat`, meals[`meal${mealNumber}`].fat);
    }

    // depending on the first member of each meal array, set the img src tag in local storage
    function setAllMealImages(howManyMeals) {
      for (let i = 1; i <= howManyMeals; i++) {
        setOneMealImage(i);
      }
    }

    function setOneMealImage(mealNumber){

      let getImage = meals[`meal${mealNumber}`].meal[0].item_name.toLowerCase();

      if (getImage.indexOf("burger") != -1){
        localStorage.setItem(`meal${mealNumber}ImgSrc`, "assets/images/burger.jpg");
      } else if (getImage.indexOf("mcchicken") != -1){
          localStorage.setItem(`meal${mealNumber}ImgSrc`, "assets/images/mcchicken.jpg");
      } else if (getImage.indexOf("fish") != -1){
          localStorage.setItem(`meal${mealNumber}ImgSrc`, "assets/images/fish.jpg");
      } else if (getImage.indexOf("salad") != -1){
          localStorage.setItem(`meal${mealNumber}ImgSrc`, "assets/images/salad.jpg");
      } else if (getImage.indexOf("fries") != -1){
          localStorage.setItem(`meal${mealNumber}ImgSrc`, "assets/images/fries.jpg");
      } else if (getImage.indexOf("parfait") != -1){
          localStorage.setItem(`meal${mealNumber}ImgSrc`, "assets/images/parfait.JPG");
      } else if (getImage.indexOf("wrap") != -1){
          localStorage.setItem(`meal${mealNumber}ImgSrc`, "assets/images/wrap.jpg");
      } else if (getImage.indexOf("mcrib") != -1){
          localStorage.setItem(`meal${mealNumber}ImgSrc`, "assets/images/mcrib.jpg");
      } else if (getImage.indexOf("big mac") != -1){
          localStorage.setItem(`meal${mealNumber}ImgSrc`, "assets/images/bigMac.jpg");
      } else if (getImage.indexOf("mcmuffin") != -1){
          localStorage.setItem(`meal${mealNumber}ImgSrc`, "assets/images/mcmuffin.jpg");
      } else if (getImage.indexOf("apple pie") != -1){
          localStorage.setItem(`meal${mealNumber}ImgSrc`, "assets/images/applePie.jpg");
      } else if (getImage.indexOf("cola") != -1){
          localStorage.setItem(`meal${mealNumber}ImgSrc`, "assets/images/cola.jpg");
      } else if (getImage.indexOf("crab") != -1){
          localStorage.setItem(`meal${mealNumber}ImgSrc`, "assets/images/crab.jpg");
      } else if (getImage.indexOf("vernor") != -1){
          localStorage.setItem(`meal${mealNumber}ImgSrc`, "assets/images/vernors.jpg");
      }else if (getImage.indexOf("lemonade") != -1){
          localStorage.setItem(`meal${mealNumber}ImgSrc`, "assets/images/lemonade.jpg");
      } else {
          localStorage.setItem(`meal${mealNumber}ImgSrc`, "assets/images/arches.jpg");
        }
    }



  showAllMealsAndPictures(3);

  // when user submits calories
  $("#submitBtn").click(function() {

    console.log("populating meals");

    function setFlagArray(howManyMeals) {
      for (let i = 1; i <= howManyMeals; i++){
        flagArray.push(false);
      }
    }

    // Nutrionix API information
    let nxAppId = "da62e249",
        nxAppKey = "7276dd89558157da5bd0ca1053e932cb",

        // Google API key
        gApiKey = "AIzaSyAjnWWbP30ssxxKP-jULse9lWmbR9AIaZ8",

        // array of booleans, the value of each member will tell us which meal array to push to, and when to start a new meal array
        flagArray = [],

        // the number of calories the user inputs
        userInput = parseInt($("#calorieInput").val().trim()),

        // keep track of how many calories we have left, it will be altered as we build our meals
        maxCalories = userInput,

        // these strings when randomly selected will be placed into our query in our ajax function
        randomMealArray = ["burger", "chicken", "fish", "salad", "fries", "parfait", "frozen", "wrap", "fries", "mccafe", "mcrib", "big mac", "mcmuffin", "apple pie"],

        // will be used to store what we selecct from randomMealArray
        randomMeal,

        // used to store items we remove from our potential search items
        splicedItem;

    // random index used to choose a meal item from randomMealArray which will be used for API search
    function chooseRandomMealArrayIndex() {
      return Math.floor(Math.random() * (randomMealArray.length));
    }

    // reset values when we start to populate a new meal array
    function resetValues() {
      randomMealArray = ["burger", "chicken", "fish", "salad", "fries", "parfait", "frozen", "wrap", "fries", "mccafe", "mcrib", "big mac", "mcmuffin", "apple pie"];
      maxCalories = userInput;
    }

    //function that selects what we will use in our API Query, while deleting potential search options depending on the amount of calories we have left
    function chooseQuery() {

      // if max calories is greater than 1500, we won't remove options, thus making them stay eligible to be re-chosen
      if (maxCalories >= 1500) {
        let randomizedIndex = chooseRandomMealArrayIndex();
        randomMeal = randomMealArray[randomizedIndex];
      }
      // use "soda" when calories are 250 or below
      else if (maxCalories <= 250) {
        randomMeal = "soda";
      }
      // if max calories is less than 1500, we will start to remove particular options once they are chosen
      else {
        let randomizedIndex = chooseRandomMealArrayIndex();
        randomMeal = randomMealArray[randomizedIndex];


        if ((randomMeal == "salad") || (randomMeal == "cafe") || (randomMeal == "frozen")) {
          splicedItem = randomMealArray.splice(randomizedIndex, 1);
        }
      }
    }

    // check flag if attempted food searched already
    let foodSearchTryAgain = false;

  // function that actually makes a request to the API, and interacts with the response
    function getFood() {
      // the item_name we search for is the string randomly chosen from our pre-defined options
      // the maximum calories allowed is whatever maxCalories is
      $.ajax({
        url: "https://api.nutritionix.com/v1_1/search",
        method: "POST",
        headers: {
          "Content-Type": 'application/json'
        },
        data: JSON.stringify({
          "appId": nxAppId,
          "appKey": nxAppKey,
          "queries": {
            "brand_name": "mcdonald",
            "brand_id": "513fbc1283aa2dc80c000053",
            "item_name": randomMeal
          },
          "filters": {
            "nf_calories": {
              "from": 149,
              "to": maxCalories
            }
          },
          "fields": [
            "item_name",
            "brand_id",
            "nf_calories",
            "nf_protein",
            "nf_total_carbohydrate",
            "nf_total_fat"
          ],
        })
      }).done(function(response) {
        // function that returns random index that will be used to choose from the array the API returns
        function chooseRandomAjaxMealIndex() {

          let length = response.hits.length;

          if (randomMeal == "fries") {
            if (length < 3) {
              length = 1;
            }
            else {
              length = 6;
            }
          }

          if (randomMeal == "fish") {
            length = 4;
          }

          if (randomMeal == "ice cream") {
            length = 1;
          }

          if (randomMeal == "apple pie"){
            length = 1;
          }

          return Math.floor(Math.random() * (length));
        }

        // store a random index number to choose from what API returns
        randomAjaxMealIndex = chooseRandomAjaxMealIndex();
        let mealItemName;

        // if API returns nothing for us to choose, choose a new search and choose an item from that
        if (response.hits.length === 0) {

          // check if food search was already attempted
          if (! foodSearchTryAgain){
            console.log("TRY FOOD SEARCH AGAIN");
            foodSearchTryAgain = true;
            chooseQuery();
            getFood();
          }
          return;
        }
        else {
          // if ajax does return someting, store what's randomly chosen
          mealItemName = response.hits[randomAjaxMealIndex].fields.item_name;
        }

        // reset food search try again flag here
        foodSearchTryAgain = false;

        // store the caloric and macro information
        let mealItemCalories = response.hits[randomAjaxMealIndex].fields.nf_calories,
            mealItemProtein = response.hits[randomAjaxMealIndex].fields.nf_protein,
            mealItemCarbs = response.hits[randomAjaxMealIndex].fields.nf_total_carbohydrate,
            mealItemFat = response.hits[randomAjaxMealIndex].fields.nf_total_fat;

        // calculate total nutriton for the respective meal
        function totalNutrition(mealNumber) {
          meals[`meal${mealNumber}`].calories += mealItemCalories;
          meals[`meal${mealNumber}`].protein += mealItemProtein;
          meals[`meal${mealNumber}`].carbs += mealItemCarbs;
          meals[`meal${mealNumber}`].fat += mealItemFat;
        }

        //subtract those calories, the new total will be used for the next search
        maxCalories -= mealItemCalories;

        // when a meal is completed, its respective position in the flagArray will be switched to true
        // thus, if it's flag is still false, we need to keep adding to it
        // if it's true, then we check the next flagArray member, until we find a false
        // then we start pushing meal items that new array
        if (flagArray[0] === false) {
          totalNutrition(1);
           meals.meal1.meal.push(response.hits[randomAjaxMealIndex].fields);
        } else if (flagArray[1] === false) {
          totalNutrition(2);
           meals.meal2.meal.push(response.hits[randomAjaxMealIndex].fields);
        } else if (flagArray[2] === false) {
          totalNutrition(3);
           meals.meal3.meal.push(response.hits[randomAjaxMealIndex].fields);
        }

        // decide what item to choose next
        decideNextItem();

      }).fail(function(error) {
        console.log(error);
      });
    }

  // function that chooses our next item if we have enough calories
  function decideNextItem() {

    if (maxCalories <= 149) {
      // if we don't have enough calories to add another item, we modify it's respective flag,
      // which will signal to stop modifying that meal
      // then we move onto populating the next meal
      if (flagArray[0] === false) {
        flagArray[0] = true;
        resetValues();
        chooseQuery();
        getFood();
      } else if (flagArray[1] === false) {
        flagArray[1] = true;
        resetValues();
        chooseQuery();
        getFood();
      }
      // if we are on the final meal, and we no long have enough calories to add another item,
      // then log each meal and its nutritional info
      else if (flagArray[2] === false) {
        flagArray[2] = true;
        locallyStoreAllMeals(3);
        setAllMealImages(3);
        window.location.replace("meal plan.html");
      }
      return;
    } else {
      // if we have enough calories to add more items, but less than 330, we remove "burger" as an option, to minimize API errors
      // due to searching for burgers while not having enough calories for a burger
        if (maxCalories < 330) {
          let burgerIndex = randomMealArray.indexOf("burger");
          if (burgerIndex != -1){
            randomMealArray.splice(burgerIndex, 1);
          }
        }
        if (maxCalories < 480) {
          let mcribIndex = randomMealArray.indexOf("mcrib");
          if (mcribIndex != -1){
            randomMealArray.splice(mcribIndex, 1);
          }
        }
        if (maxCalories < 570) {
          let bigMacIndex = randomMealArray.indexOf("big mac");
          if (bigMacIndex != -1){
            randomMealArray.splice(bigMacIndex, 1);
          }
        }

      // now that we have checked we have enough calories, choose another search and choose another item from what the search returns
      chooseQuery();
      getFood();
    }
  }
    // start our first cycle of choosing our search term and manipulating what the API returns
    setFlagArray(3);
    chooseQuery();
    getFood();
  });
});
