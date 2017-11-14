$( document ).ready(function() {

  // empty arrays we will populate with our meal items
  // var finishedMealArray1 = [],
  //     finishedMealArray2 = [],
  //     finishedMealArray3 = [];



  var meals = {
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

  // store total nutrtional info for each meal



  // meal1Calories = 0,
  // meal1Protein = 0,
  // meal1Carbs = 0,
  // meal1Fat = 0,
  // meal2Calories = 0,
  // meal2Protein = 0,
  // meal2Carbs = 0,
  // meal2Fat = 0,
  // meal3Calories = 0,
  // meal3Protein = 0,
  // meal3Carbs = 0,
  // meal3Fat = 0;

  // displays meal items and nutrition for each finished meal
  function showFood(mealNumber){
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

  function showAllMeals(howManyMeals) {
    for (let i = 1; i <= howManyMeals; i++) {
      showFood(i);
    }

    // showFood(1);
    // showFood(2);
    // showFood(3);
  }

  function getMealPictures(howManyMeals) {
    for (let i = 1; i <= howManyMeals; i++) {
      $(`#meal${i}Picture`).attr("src", localStorage.getItem(`meal${i}ImgSrc`));
    }


    // $("#meal1Picture").attr("src", localStorage.getItem("meal1ImgSrc"));
    // $("#meal2Picture").attr("src", localStorage.getItem("meal2ImgSrc"));
    // $("#meal3Picture").attr("src", localStorage.getItem("meal3ImgSrc"));
  }

  function showMealsAndPictures() {
    // if the #id that holds the meal1 calories exists, then display meal info and pictures
    if("#meal1Calories".length > 0){
      showAllMeals(3);
      getMealPictures(3);
    }
  }

  showMealsAndPictures();

  // button click handler
  $("#submitBtn").click(function() {
    // finishedMealArray1 = [];
    // finishedMealArray2 = [];
    // finishedMealArray3 = [];

  //   var meals = {
  //   meal1: {
  //     calories: 0,
  //     protein: 0,
  //     carbs: 0,
  //     fat: 0
  //   },
  //   meal2: {
  //     calories: 0,
  //     protein: 0,
  //     carbs: 0,
  //     fat: 0
  //   },
  //   meal3: {
  //     calories: 0,
  //     protein: 0,
  //     carbs: 0,
  //     fat: 0
  //   }
  // };
    // Nutrionix API information
    let nxAppId = "da62e249",
        nxAppKey = "7276dd89558157da5bd0ca1053e932cb",

        // Google API key
        gApiKey = "AIzaSyAjnWWbP30ssxxKP-jULse9lWmbR9AIaZ8",

        // array of booleans, the value of each member will tell us which meal array to push to, and when to start a new meal array
        flagArray = [false, false, false],

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
      console.log("index for randomMealArray: " + randomMealArrayIndex);
    }

    // reset values when we start to populate a new meal array
    function resetValues() {
      randomMealArray = ["burger", "chicken", "fish", "salad", "fries", "parfait", "frozen", "wrap", "fries", "mccafe", "mcrib", "big mac", "mcmuffin", "apple pie"];
      maxCalories = userInput;
      console.log("randomMealArray has been repopulated, and maxCalories reset");
      console.log("----------");
    }

    //function that selects what we will use in our API Query, while deleting potential search options depending on the amount of calories we have left
    function chooseQuery() {

      // if max calories is greater than 1500, we won't remove options, thus making them stay eligible to be re-chosen
      if (maxCalories >= 1500) {
        let randomizedIndex = chooseRandomMealArrayIndex();
        console.log("randomizedIndex: " + randomizedIndex);
        randomMeal = randomMealArray[randomizedIndex];
        console.log("random meal from mealArray: " + randomMeal);
      }
      // use "soda" when calories are 250 or below
      else if (maxCalories <= 250) {
        randomMeal = "soda";
      }
      // if max calories is less than 1500, we will start to remove particular options once they are chosen
      else {
        let randomizedIndex = chooseRandomMealArrayIndex();
        console.log("randomizedIndex: " + randomizedIndex);
        randomMeal = randomMealArray[randomizedIndex];
        console.log("random meal from mealArray: " + randomMeal);


        if ((randomMeal == "salad") || (randomMeal == "cafe") || (randomMeal == "frozen")) {
          splicedItem = randomMealArray.splice(randomizedIndex, 1);
          console.log(splicedItem + " has been removed from the randomMealArray");
          console.log("randomMealArray: ");
          console.log(randomMealArray);
        } else {
          console.log(randomMeal + " was not removed from the randomMealArray");
          console.log("randomMealArray:");
          console.log(randomMealArray);
        }
      }
    }

    // check flag if attempted food search already
    let foodSearchTryAgain = false;

  // function that actually makes a request to the API, and interacts with the response
  function getFood() {

    console.log("getFood called, randomMeal is: " + randomMeal);
    console.log("maxCalories is: " + maxCalories);

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

      console.log("response is:");
      console.log(response);

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
      console.log("randomAjaxMealIndex: " + randomAjaxMealIndex);
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

        // console.log("that item doesn't seem to exist right now, try again");
        // chooseQuery();
        // getFood();
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
      function totalNutrition(x) {

        meals[`meal${x}`].calories += mealItemCalories;
        meals[`meal${x}`].protein += mealItemProtein;
        meals[`meal${x}`].carbs += mealItemCarbs;
        meals[`meal${x}`].fat += mealItemFat;


        // if(x === 1){
        //   meal1Calories += mealItemCalories;
        //   meal1Protein += mealItemProtein;
        //   meal1Carbs += mealItemCarbs;
        //   meal1Fat += mealItemFat;
        // }
        // if(x === 2){
        //   meal2Calories += mealItemCalories;
        //   meal2Protein += mealItemProtein;
        //   meal2Carbs += mealItemCarbs;
        //   meal2Fat += mealItemFat;
        // }
        // if(x === 3){
        //   meal3Calories += mealItemCalories;
        //   meal3Protein += mealItemProtein;
        //   meal3Carbs += mealItemCarbs;
        //   meal3Fat += mealItemFat;
        // }
      }

      // log the name and nutritional info
      console.log("item: " + mealItemName);
      console.log("calories/protein/carbs/fat of first item: " + mealItemCalories + ", " + mealItemProtein + "p/" +
        mealItemCarbs + "c/" + mealItemFat + "f");

      //subtract those calories, the new total will be used for the next search
      maxCalories -= mealItemCalories;
      console.log("Calories left now: " + maxCalories);
      console.log("--------");

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

  // log the respective finished meal array and its  nutritional info
  // function printTotalNutrition(y) {

  //   if (y === 1) {
  //     temp = finishedMealArray1;
  //     console.log("finishedMealArray1: ");
  //     console.log(temp);
  //     console.log("meal2 nutriton:");
  //     console.log("total calories: " + meal1Calories);
  //     console.log("total protein: " + meal1Protein);
  //     console.log("total carbs: " + meal1Carbs);
  //     console.log("total fat: " + meal1Fat);
  //     console.log("----------");
  //     // temp = window[`finishedMealArray${y}`];
  //     // console.log(`finishedMealArray${y}`);
  //     // console.log(temp);
  //     // console.log(`finishedMeal${y} nutriton:`);
  //     // console.log("total calories: " + meals[`finishedMeal${y}`].calories);
  //     // console.log("total protein: " + meals[`finishedMeal${y}`].protein);
  //     // console.log("total carbs: " + meals[`finishedMeal${y}`].carbs);
  //     // console.log("total fat: " + meals[`finishedMeal${y}`].fat);
  //     // console.log("----------");
  //   }
  //   if (y === 2) {
  //     temp = finishedMealArray2;
  //     console.log("finishedMealArray2: ");
  //     console.log(temp);
  //     console.log("meal2 nutriton:");
  //     console.log("total calories: " + meal2Calories);
  //     console.log("total protein: " + meal2Protein);
  //     console.log("total carbs: " + meal2Carbs);
  //     console.log("total fat: " + meal2Fat);
  //     console.log("----------");
  //   }
  //   if (y === 3) {
  //     temp = finishedMealArray3;
  //     console.log("finishedMealArray3: ");
  //     console.log(temp);
  //     console.log("meal3 nutriton:");
  //     console.log("total calories: " + meal3Calories);
  //     console.log("total protein: " + meal3Protein);
  //     console.log("total carbs: " + meal3Carbs);
  //     console.log("total fat: " + meal3Fat);
  //     console.log("----------");
  //   }

  // }

  // function that chooses our next item if we have enough calories
  function decideNextItem() {

    function locallyStoreAllMeals(howManyMeals) {

      for (let i = 1; i <= howManyMeals; i++) {
         locallyStoreMeals(i);
      }
    }

    function locallyStoreMeals(mealNumber) {
      // console.log("temp: " + temp);
      //   console.log('meals: ', meals);
      let temp = "";
      console.log('blah haha', meals[`meal${mealNumber}`].meal);
      meals[`meal${mealNumber}`].meal.map(mealItem => {
        temp = temp.concat(mealItem.item_name, "<br>");
        // localStorage.setItem(`meal${mealNumber}Contents`, temp);
      });
      localStorage.setItem(`meal${mealNumber}Contents`, temp);
      localStorage.setItem(`meal${mealNumber}Calories`, meals[`meal${mealNumber}`].calories);
      localStorage.setItem(`meal${mealNumber}Protein`, meals[`meal${mealNumber}`].protein);
      localStorage.setItem(`meal${mealNumber}Carbs`, meals[`meal${mealNumber}`].carbs);
      localStorage.setItem(`meal${mealNumber}Fat`, meals[`meal${mealNumber}`].fat);
    }

    //stores meal info in local storage
    function persist(){
        let temp = "",
        temp2 = "",
        temp3 = "";
        for(let i = 0; i<finishedMealArray1.length; i++){

          temp = temp.concat(finishedMealArray1[i].item_name, "<br>")

        }
        // console.log("temp: " + temp)
        // console.log('meals: ', meals);
        // localStorage.setItem("meal1Contents", temp);
        // localStorage.setItem("meal1Calories", meals.meal1.calories);
        // localStorage.setItem("meal1Protein", meals.meal1.protein);
        // localStorage.setItem("meal1Carbs", meals.meal1.carbs);
        // localStorage.setItem("meal1Fat", meals.meal1.fat);

        for(let i = 0; i<finishedMealArray2.length; i++){

          temp2 = temp2.concat(finishedMealArray2[i].item_name, "<br>")

        }
        // localStorage.setItem("meal2Contents", temp2);
        // localStorage.setItem("meal2Calories", meal2Calories);
        // localStorage.setItem("meal2Protein", meal2Protein);
        // localStorage.setItem("meal2Carbs", meal2Carbs);
        // localStorage.setItem("meal2Fat", meal2Fat);

        for(let i = 0; i<finishedMealArray3.length; i++){

          temp3 = temp3.concat(finishedMealArray3[i].item_name, "<br>")

        }
        // localStorage.setItem("meal3Contents", temp3);
        // localStorage.setItem("meal3Calories", meal3Calories);
        // localStorage.setItem("meal3Protein", meal3Protein);
        // localStorage.setItem("meal3Carbs", meal3Carbs);
        // localStorage.setItem("meal3Fat", meal3Fat);
    }

  // depending on the first member of each meal array, set the img src tag in local storage
  function setAllMealImages(howManyMeals) {
    for (let i = 1; i <= howManyMeals; i++) {
      setImage(i);
    }
  }

  function setImage(mealNumber){
    // let getImage;
   // if (x === 1){

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
       }    else {
          localStorage.setItem(`meal${mealNumber}ImgSrc`, "assets/images/arches.jpg");
       }
     }
   // else if (x === 2){

   //      getImage = meals.meal2.meal[0].item_name.toLowerCase();

   //     if (getImage.indexOf("burger") != -1){
   //        localStorage.setItem("meal2ImgSrc", "assets/images/burger.jpg");
   //     } else if (getImage.indexOf("mcchicken") != -1){
   //        localStorage.setItem("meal2ImgSrc", "assets/images/mcchicken.jpg");
   //     } else if (getImage.indexOf("fish") != -1){
   //        localStorage.setItem("meal2ImgSrc", "assets/images/fish.jpg");
   //     } else if (getImage.indexOf("salad") != -1){
   //        localStorage.setItem("meal2ImgSrc", "assets/images/salad.jpg");
   //     } else if (getImage.indexOf("fries") != -1){
   //        localStorage.setItem("meal2ImgSrc", "assets/images/fries.jpg");
   //     } else if (getImage.indexOf("parfait") != -1){
   //        localStorage.setItem("meal2ImgSrc", "assets/images/parfait.JPG");
   //     } else if (getImage.indexOf("wrap") != -1){
   //        localStorage.setItem("meal2ImgSrc", "assets/images/wrap.jpg");
   //     } else if (getImage.indexOf("mcrib") != -1){
   //        localStorage.setItem("meal2ImgSrc", "assets/images/mcrib.jpg");
   //     } else if (getImage.indexOf("big mac") != -1){
   //        localStorage.setItem("meal2ImgSrc", "assets/images/bigMac.jpg");
   //     } else if (getImage.indexOf("mcmuffin") != -1){
   //        localStorage.setItem("meal2ImgSrc", "assets/images/mcmuffin.jpg");
   //     } else if (getImage.indexOf("apple pie") != -1){
   //         localStorage.setItem("meal2ImgSrc", "assets/images/applePie.jpg");
   //     } else if (getImage.indexOf("cola") != -1){
   //        localStorage.setItem("meal2ImgSrc", "assets/images/cola.jpg");
   //     } else if (getImage.indexOf("crab") != -1){
   //        localStorage.setItem("meal2ImgSrc", "assets/images/crab.jpg");
   //     } else if (getImage.indexOf("vernor") != -1){
   //        localStorage.setItem("meal2ImgSrc", "assets/images/vernors.jpg");
   //     } else if (getImage.indexOf("lemonade") != -1){
   //        localStorage.setItem("meal2ImgSrc", "assets/images/lemonade.jpg");
   //     }      else {
   //        localStorage.setItem("meal2ImgSrc", "assets/images/arches.jpg");
   //     }}
   // else if (x === 3){

   //        getImage = meals.meal3.meal[0].item_name.toLowerCase();

   //     if (getImage.indexOf("burger") != -1){
   //        localStorage.setItem("meal3ImgSrc", "assets/images/burger.jpg");
   //     } else if (getImage.indexOf("mcchicken") != -1){
   //        localStorage.setItem("meal3ImgSrc", "assets/images/mcchicken.jpg");
   //     } else if (getImage.indexOf("fish") != -1){
   //        localStorage.setItem("meal3ImgSrc", "assets/images/fish.jpg");
   //     } else if (getImage.indexOf("salad") != -1){
   //        localStorage.setItem("meal3ImgSrc", "assets/images/salad.jpg");
   //     } else if (getImage.indexOf("fries") != -1){
   //        localStorage.setItem("meal3ImgSrc", "assets/images/fries.jpg");
   //     } else if (getImage.indexOf("parfait") != -1){
   //        localStorage.setItem("meal3ImgSrc", "assets/images/parfait.JPG");
   //     } else if (getImage.indexOf("wrap") != -1){
   //        localStorage.setItem("meal3ImgSrc", "assets/images/wrap.jpg");
   //     } else if (getImage.indexOf("mcrib") != -1){
   //        localStorage.setItem("meal3ImgSrc", "assets/images/mcrib.jpg");
   //     } else if (getImage.indexOf("big mac") != -1){
   //        localStorage.setItem("meal3ImgSrc", "assets/images/bigMac.jpg");
   //     } else if (getImage.indexOf("mcmuffin") != -1){
   //        localStorage.setItem("meal3ImgSrc", "assets/images/mcmuffin.jpg");
   //     } else if (getImage.indexOf("apple pie") != -1){
   //        localStorage.setItem("meal3ImgSrc", "assets/images/applePie.jpg");
   //     } else if (getImage.indexOf("cola") != -1){
   //        localStorage.setItem("meal3ImgSrc", "assets/images/cola.jpg");
   //     } else if (getImage.indexOf("crab") != -1){
   //        localStorage.setItem("meal3ImgSrc", "assets/images/crab.jpg");
   //     } else if (getImage.indexOf("vernor") != -1){
   //        localStorage.setItem("meal3ImgSrc", "assets/images/vernors.jpg");
   //     } else if (getImage.indexOf("lemonade") != -1){
   //        localStorage.setItem("meal3ImgSrc", "assets/images/lemonade.jpg");
   //     }     else {
   //        localStorage.setItem("meal3ImgSrc", "assets/images/arches.jpg");
   //     }}



    if (maxCalories <= 149) {
      console.log("not enough calories left");
      console.log("meals", meals);

      // if we don't have enough calories to add another item, we modify it's respective flag,
      // which will signal to stop modifying that meal
      // then we move onto populating the next meal
      if (flagArray[0] === false) {
        flagArray[0] = true;
        // printTotalNutrition(1);
        resetValues();
        chooseQuery();
        getFood();
      } else if (flagArray[1] === false) {
        flagArray[1] = true;
        // printTotalNutrition(2);
        resetValues();
        chooseQuery();
        getFood();
      }
      // if we are on the final meal, and we no long have enough calories to add another item,
      // then log each meal and its nutritional info
      else if (flagArray[2] === false) {
        flagArray[2] = true;
        // printTotalNutrition(1);
        // printTotalNutrition(2);
        // printTotalNutrition(3);
        // persist();
        locallyStoreAllMeals(3);
        setAllMealImages(3);
        // window.location.replace("meal plan.html");


      }
      return;
    } else {
      // if we have enough calories to add more items, but less than 330, we remove "burger" as an option, to minimize API errors
      // due to searching for burgers while not having enough calories for a burger
        if (maxCalories < 330) {
          let burgerIndex = randomMealArray.indexOf("burger");
          if (burgerIndex != -1){
            randomMealArray.splice(burgerIndex, 1);
            console.log("burger was removed due to insufficient calories");
            console.log("randomMealArray is now: " + randomMealArray);
          }
        }
        if (maxCalories < 480) {
          let mcribIndex = randomMealArray.indexOf("mcrib");
          if (mcribIndex != -1){
            randomMealArray.splice(mcribIndex, 1);
            console.log("mcrib was removed due to insufficient calories");
            console.log("randomMealArray is now: " + randomMealArray);
          }
        }
        if (maxCalories < 570) {
          let bigMacIndex = randomMealArray.indexOf("big mac");
          if (bigMacIndex != -1){
            randomMealArray.splice(bigMacIndex, 1);
            console.log("big mac was removed due to insufficient calories");
            console.log("randomMealArray is now: " + randomMealArray);
          }
        }

      // now that we have checked we have enough calories, choose another search and choose another item from what the search returns
      chooseQuery();
      getFood();
    }
  }


  // start our first cycle of choosing our search term and manipulating what the API returns
  chooseQuery();
  getFood();
  });

})
