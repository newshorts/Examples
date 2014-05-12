Plan:
=====

1. copy this directory to a new repo
2. add an RDS instance to store webpage data
3. crawl yelp and get the id of every restaurant in san francisco, response should
   look like this:
```
{
"is_claimed": true,
"rating": 4.5,
"mobile_url": "http://m.yelp.com/biz/chapeau-san-francisco",
"rating_img_url": "http://s3-media2.ak.yelpcdn.com/assets/2/www/img/99493c12711e/ico/stars/v1/stars_4_half.png",
"review_count": 1975,
"name": "Chapeau!",
"snippet_image_url": "http://s3-media4.ak.yelpcdn.com/photo/EOnVaBlYBBq67e46Gte-TA/ms.jpg",
"rating_img_url_small": "http://s3-media2.ak.yelpcdn.com/assets/2/www/img/a5221e66bc70/ico/stars/v1/stars_small_4_half.png",
"url": "http://www.yelp.com/biz/chapeau-san-francisco",
"menu_date_updated": 1387611432,
"phone": "4157509787",
"snippet_text": "Waited long to visit this fancy French restaurant. Finally came with hubby to celebrate my birthday. Had prior reservation, we reached at 8.45 and the place...",
"image_url": "http://s3-media2.ak.yelpcdn.com/bphoto/WGfIq-k1gRSiVP8bJ-CSaw/ms.jpg",
"categories": [
  [
    "French",
    "french"
  ]
],
"display_phone": "+1-415-750-9787",
"rating_img_url_large": "http://s3-media4.ak.yelpcdn.com/assets/2/www/img/9f83790ff7f6/ico/stars/v1/stars_large_4_half.png",
"menu_provider": "single_platform",
"id": "chapeau-san-francisco",
"is_closed": false,
"location": {
  "cross_streets": "3rd Ave & 2nd Ave",
  "city": "San Francisco",
  "display_address": [
    "126 Clement St",
    "(b/t 3rd Ave & 2nd Ave)",
    "Inner Richmond",
    "San Francisco, CA 94118"
  ],
  "neighborhoods": [
    "Inner Richmond"
  ],
  "postal_code": "94118",
  "country_code": "US",
  "address": [
    "126 Clement St"
  ],
  "state_code": "CA"
}
},
```
4. web scraper using [zombiejs](http://zombie.labnotes.org/) to pull the reviews
   from urls like this: [http://www.yelp.com/biz/{YELP_BUSINESS_ID}?q=gluten](http://www.yelp.com/biz/chapeau-san-francisco?q=gluten)
5. store returned comments in db for later processing
6. sentiment analysis on comments to conclude if the restaraunt is gluten free
7. design front end to display results on a map.
