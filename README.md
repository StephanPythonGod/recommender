# Repository for recommender-api

## Usage

Run in bash

```
source venv/bin/activate
python api.py
```

Now you can use the api under

```
http://localhost:5000/recommend
```

There are 38 different products:

```
[
    "vegetables",
    "juice",
    "beef",
    "individual meals",
    "flour",
    "shampoo",
    "cereals",
    "poultry",
    "pasta",
    "ketchup",
    "lunch meat",
    "eggs",
    "dinner rolls",
    "ice cream",
    "fruits",
    "cheeses",
    "soap",
    "butter",
    "sugar",
    "bagels",
    "aluminum foil",
    "coffee/tea",
    "dishwashing liquid/detergent",
    "yogurt",
    "laundry detergent",
    "hand soap",
    "waffles",
    "milk",
    "mixes",
    "paper towels",
    "pork",
    "sandwich bags",
    "sandwich loaves",
    "soda",
    "spaghetti sauce",
    "toilet paper",
    "tortillas",
    "all- purpose"
]
```

You can send an JSON object in your http body like this:

```
{"products":["yogurt", "pork"]}
```

It has to have the key:value pair "products":Array_of_Products

As a respose you will get an 38 products long array as seen above. This array is sorted after the most likely product recommendation.


## ToDo

In the api.py the ```#recommender.save_new_datapoint(param)``` is commented out. At my machine there came a permission denied error when trying to safe to csv.