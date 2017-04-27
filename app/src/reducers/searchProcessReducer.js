/**
 * Created by chrisng on 4/18/17.
 */
import { fromJS, Map, List } from 'immutable';
import * as actionTypes from '../constants/actionTypes';

const initialError = fromJS({
  status: false,
  message: '',
});

const restaurants = [
  {
    "categories": [
      {
        "alias": "sushi",
        "title": "Sushi Bars"
      },
      {
        "alias": "ramen",
        "title": "Ramen"
      },
      {
        "alias": "noodles",
        "title": "Noodles"
      }
    ],
    "coordinates": {
      "latitude": 37.78726,
      "longitude": -122.41037
    },
    "display_phone": "(415) 771-1281",
    "distance": 1921.528302702,
    "id": "katana-ya-san-francisco",
    "image_url": "https://s3-media1.fl.yelpcdn.com/bphoto/6LugFRX9HzA5-E0OO9I4yA/o.jpg",
    "is_closed": false,
    "location": {
      "address1": "422 Geary St",
      "address2": null,
      "address3": "",
      "city": "San Francisco",
      "country": "US",
      "display_address": [
        "422 Geary St",
        "San Francisco, CA 94102"
      ],
      "state": "CA",
      "zip_code": "94102"
    },
    "name": "Katana-Ya",
    "phone": "+14157711281",
    "price": "$$",
    "rating": 3.5,
    "rating_score": 17.186924559615846,
    "review_count": 3748,
    "review_count_score": 281.94936983422537,
    "total_score": 176.04439172438157,
    "transactions": [
      "pickup"
    ],
    "url": "https://www.yelp.com/biz/katana-ya-san-francisco?adjust_creative=q9muNPdaGwv_outr1dOxtg&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=q9muNPdaGwv_outr1dOxtg"
  },
  {
    "categories": [
      {
        "alias": "sushi",
        "title": "Sushi Bars"
      },
      {
        "alias": "japanese",
        "title": "Japanese"
      }
    ],
    "coordinates": {
      "latitude": 37.7881987776243,
      "longitude": -122.412059158087
    },
    "display_phone": "(415) 775-1028",
    "distance": 2104.133031406,
    "id": "ryokos-san-francisco",
    "image_url": "https://s3-media3.fl.yelpcdn.com/bphoto/qS3-AG16xjg0Nowms5Whxg/o.jpg",
    "is_closed": false,
    "location": {
      "address1": "619 Taylor St",
      "address2": "",
      "address3": "",
      "city": "San Francisco",
      "country": "US",
      "display_address": [
        "619 Taylor St",
        "San Francisco, CA 94102"
      ],
      "state": "CA",
      "zip_code": "94102"
    },
    "name": "Ryoko's",
    "phone": "+14157751028",
    "price": "$$",
    "rating": 4,
    "rating_score": 43.80503284503522,
    "review_count": 2300,
    "review_count_score": 174.92810738474404,
    "total_score": 122.47887756886051,
    "transactions": [],
    "url": "https://www.yelp.com/biz/ryokos-san-francisco?adjust_creative=q9muNPdaGwv_outr1dOxtg&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=q9muNPdaGwv_outr1dOxtg"
  },
  {
    "categories": [
      {
        "alias": "seafood",
        "title": "Seafood"
      },
      {
        "alias": "japanese",
        "title": "Japanese"
      },
      {
        "alias": "asianfusion",
        "title": "Asian Fusion"
      }
    ],
    "coordinates": {
      "latitude": 37.7771497,
      "longitude": -122.4121886
    },
    "display_phone": "",
    "distance": 1510.6765144879998,
    "id": "ichido-san-francisco-6",
    "image_url": "https://s3-media3.fl.yelpcdn.com/bphoto/E0iRmQXbk2mNfuYlJe0m_w/o.jpg",
    "is_closed": false,
    "location": {
      "address1": "687 Minna St",
      "address2": "",
      "address3": "",
      "city": "San Francisco",
      "country": "US",
      "display_address": [
        "687 Minna St",
        "San Francisco, CA 94107"
      ],
      "state": "CA",
      "zip_code": "94107"
    },
    "name": "Ichido",
    "phone": "",
    "price": "$$$",
    "rating": 5,
    "rating_score": 219.7056274847714,
    "review_count": 43,
    "review_count_score": 27.20759374414018,
    "total_score": 104.20680724039268,
    "transactions": [],
    "url": "https://www.yelp.com/biz/ichido-san-francisco-6?adjust_creative=q9muNPdaGwv_outr1dOxtg&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=q9muNPdaGwv_outr1dOxtg"
  },
  {
    "categories": [
      {
        "alias": "japanese",
        "title": "Japanese"
      },
      {
        "alias": "newamerican",
        "title": "American (New)"
      },
      {
        "alias": "tapasmallplates",
        "title": "Tapas/Small Plates"
      }
    ],
    "coordinates": {
      "latitude": 37.793087,
      "longitude": -122.392181
    },
    "display_phone": "(415) 777-8688",
    "distance": 2062.5629745359997,
    "id": "chaya-brasserie-san-francisco",
    "image_url": "https://s3-media2.fl.yelpcdn.com/bphoto/Y4YUgBXsnmIxlO4dRNfqHQ/o.jpg",
    "is_closed": false,
    "location": {
      "address1": "132 The Embarcadero",
      "address2": "",
      "address3": "",
      "city": "San Francisco",
      "country": "US",
      "display_address": [
        "132 The Embarcadero",
        "San Francisco, CA 94105"
      ],
      "state": "CA",
      "zip_code": "94105"
    },
    "name": "Chaya Brasserie",
    "phone": "+14157778688",
    "price": "$$$",
    "rating": 4,
    "rating_score": 43.80503284503522,
    "review_count": 1762,
    "review_count_score": 135.16468252437042,
    "total_score": 98.62082265263633,
    "transactions": [],
    "url": "https://www.yelp.com/biz/chaya-brasserie-san-francisco?adjust_creative=q9muNPdaGwv_outr1dOxtg&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=q9muNPdaGwv_outr1dOxtg"
  },
  {
    "categories": [
      {
        "alias": "sushi",
        "title": "Sushi Bars"
      },
      {
        "alias": "vegan",
        "title": "Vegan"
      },
      {
        "alias": "izakaya",
        "title": "Izakaya"
      }
    ],
    "coordinates": {
      "latitude": 37.7683096,
      "longitude": -122.4216669
    },
    "display_phone": "(415) 678-5767",
    "distance": 2432.6628943359997,
    "id": "shizen-vegan-sushi-bar-and-izakaya-san-francisco",
    "image_url": "https://s3-media3.fl.yelpcdn.com/bphoto/ose-rlo_a7c6pybjIxjHbA/o.jpg",
    "is_closed": false,
    "location": {
      "address1": "370 14th St",
      "address2": "",
      "address3": "",
      "city": "San Francisco",
      "country": "US",
      "display_address": [
        "370 14th St",
        "San Francisco, CA 94103"
      ],
      "state": "CA",
      "zip_code": "94103"
    },
    "name": "Shizen Vegan Sushi Bar & Izakaya",
    "phone": "+14156785767",
    "price": "$$",
    "rating": 4.5,
    "rating_score": 131.31727983645297,
    "review_count": 696,
    "review_count_score": 56.37692991998705,
    "total_score": 86.35306988657342,
    "transactions": [],
    "url": "https://www.yelp.com/biz/shizen-vegan-sushi-bar-and-izakaya-san-francisco?adjust_creative=q9muNPdaGwv_outr1dOxtg&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=q9muNPdaGwv_outr1dOxtg"
  },
  {
    "categories": [
      {
        "alias": "sushi",
        "title": "Sushi Bars"
      },
      {
        "alias": "japanese",
        "title": "Japanese"
      }
    ],
    "coordinates": {
      "latitude": 37.790656,
      "longitude": -122.404656
    },
    "display_phone": "(415) 397-3218",
    "distance": 1956.3323723439999,
    "id": "akikos-restaurant-san-francisco",
    "image_url": "https://s3-media2.fl.yelpcdn.com/bphoto/XJBfe68tQbZeueKmOgYJIw/o.jpg",
    "is_closed": false,
    "location": {
      "address1": "431 Bush St",
      "address2": "",
      "address3": "",
      "city": "San Francisco",
      "country": "US",
      "display_address": [
        "431 Bush St",
        "San Francisco, CA 94108"
      ],
      "state": "CA",
      "zip_code": "94108"
    },
    "name": "Akiko's Restaurant",
    "phone": "+14153973218",
    "price": "$$",
    "rating": 4,
    "rating_score": 43.80503284503522,
    "review_count": 1449,
    "review_count_score": 112.03094278218282,
    "total_score": 84.74057880732377,
    "transactions": [],
    "url": "https://www.yelp.com/biz/akikos-restaurant-san-francisco?adjust_creative=q9muNPdaGwv_outr1dOxtg&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=q9muNPdaGwv_outr1dOxtg"
  },
  {
    "categories": [
      {
        "alias": "japacurry",
        "title": "Japanese Curry"
      }
    ],
    "coordinates": {
      "latitude": 37.79089,
      "longitude": -122.40426
    },
    "display_phone": "(415) 773-1101",
    "distance": 1980.3086415320001,
    "id": "muraccis-japanese-curry-and-grill-san-francisco",
    "image_url": "https://s3-media1.fl.yelpcdn.com/bphoto/mktpaCbXsJh3--lpEgHc5g/o.jpg",
    "is_closed": false,
    "location": {
      "address1": "307 Kearny St",
      "address2": "Ste 204",
      "address3": "",
      "city": "San Francisco",
      "country": "US",
      "display_address": [
        "307 Kearny St",
        "Ste 204",
        "San Francisco, CA 94108"
      ],
      "state": "CA",
      "zip_code": "94108"
    },
    "name": "Muracci's Japanese Curry & Grill",
    "phone": "+14157731101",
    "price": "$",
    "rating": 4,
    "rating_score": 43.80503284503522,
    "review_count": 1444,
    "review_count_score": 111.66139422400092,
    "total_score": 84.51884967241463,
    "transactions": [
      "pickup"
    ],
    "url": "https://www.yelp.com/biz/muraccis-japanese-curry-and-grill-san-francisco?adjust_creative=q9muNPdaGwv_outr1dOxtg&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=q9muNPdaGwv_outr1dOxtg"
  },
  {
    "categories": [
      {
        "alias": "sushi",
        "title": "Sushi Bars"
      },
      {
        "alias": "japanese",
        "title": "Japanese"
      }
    ],
    "coordinates": {
      "latitude": 37.7957017702111,
      "longitude": -122.402884835582
    },
    "display_phone": "(415) 757-0155",
    "distance": 2428.8737033059997,
    "id": "kusakabe-san-francisco",
    "image_url": "https://s3-media3.fl.yelpcdn.com/bphoto/G2S8Lk72iXwnd35Yr86k_g/o.jpg",
    "is_closed": false,
    "location": {
      "address1": "584 Washington St",
      "address2": "",
      "address3": "",
      "city": "San Francisco",
      "country": "US",
      "display_address": [
        "584 Washington St",
        "San Francisco, CA 94111"
      ],
      "state": "CA",
      "zip_code": "94111"
    },
    "name": "KUSAKABE",
    "phone": "+14157570155",
    "price": "$$$$",
    "rating": 4.5,
    "rating_score": 131.31727983645297,
    "review_count": 564,
    "review_count_score": 46.83476423997749,
    "total_score": 80.62777047856768,
    "transactions": [],
    "url": "https://www.yelp.com/biz/kusakabe-san-francisco?adjust_creative=q9muNPdaGwv_outr1dOxtg&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=q9muNPdaGwv_outr1dOxtg"
  },
  {
    "categories": [
      {
        "alias": "seafood",
        "title": "Seafood"
      },
      {
        "alias": "japanese",
        "title": "Japanese"
      },
      {
        "alias": "asianfusion",
        "title": "Asian Fusion"
      }
    ],
    "coordinates": {
      "latitude": 37.7685096967036,
      "longitude": -122.402136325836
    },
    "display_phone": "(415) 255-8800",
    "distance": 915.083679187,
    "id": "skool-san-francisco",
    "image_url": "https://s3-media4.fl.yelpcdn.com/bphoto/47i057bRXAm_sIvA2obD5A/o.jpg",
    "is_closed": false,
    "location": {
      "address1": "1725 Alameda St",
      "address2": "",
      "address3": "",
      "city": "San Francisco",
      "country": "US",
      "display_address": [
        "1725 Alameda St",
        "San Francisco, CA 94103"
      ],
      "state": "CA",
      "zip_code": "94103"
    },
    "name": "Skool",
    "phone": "+14152558800",
    "price": "$$",
    "rating": 4,
    "rating_score": 43.80503284503522,
    "review_count": 1321,
    "review_count_score": 102.57049969272592,
    "total_score": 79.06431295364963,
    "transactions": [
      "pickup"
    ],
    "url": "https://www.yelp.com/biz/skool-san-francisco?adjust_creative=q9muNPdaGwv_outr1dOxtg&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=q9muNPdaGwv_outr1dOxtg"
  },
  {
    "categories": [
      {
        "alias": "japanese",
        "title": "Japanese"
      },
      {
        "alias": "sushi",
        "title": "Sushi Bars"
      }
    ],
    "coordinates": {
      "latitude": 37.7889513951509,
      "longitude": -122.41242887495
    },
    "display_phone": "(415) 771-0803",
    "distance": 2187.047354744,
    "id": "sanraku-san-francisco-2",
    "image_url": "https://s3-media2.fl.yelpcdn.com/bphoto/896N7UXBJk9rzG9BFZY1rw/o.jpg",
    "is_closed": false,
    "location": {
      "address1": "704 Sutter St",
      "address2": "",
      "address3": "",
      "city": "San Francisco",
      "country": "US",
      "display_address": [
        "704 Sutter St",
        "San Francisco, CA 94109"
      ],
      "state": "CA",
      "zip_code": "94109"
    },
    "name": "Sanraku",
    "phone": "+14157710803",
    "price": "$$",
    "rating": 4,
    "rating_score": 43.80503284503522,
    "review_count": 1231,
    "review_count_score": 95.9186256454515,
    "total_score": 75.07318852528499,
    "transactions": [],
    "url": "https://www.yelp.com/biz/sanraku-san-francisco-2?adjust_creative=q9muNPdaGwv_outr1dOxtg&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=q9muNPdaGwv_outr1dOxtg"
  },
  {
    "categories": [
      {
        "alias": "japanese",
        "title": "Japanese"
      },
      {
        "alias": "sushi",
        "title": "Sushi Bars"
      },
      {
        "alias": "asianfusion",
        "title": "Asian Fusion"
      }
    ],
    "coordinates": {
      "latitude": 37.7902241805415,
      "longitude": -122.403766215939
    },
    "display_phone": "(415) 544-9868",
    "distance": 1880.5089619799996,
    "id": "sushirrito-san-francisco-40",
    "image_url": "https://s3-media3.fl.yelpcdn.com/bphoto/tuvFKoAh07pc464MakugkA/o.jpg",
    "is_closed": false,
    "location": {
      "address1": "226 Kearny St",
      "address2": "",
      "address3": "",
      "city": "San Francisco",
      "country": "US",
      "display_address": [
        "226 Kearny St",
        "San Francisco, CA 94108"
      ],
      "state": "CA",
      "zip_code": "94108"
    },
    "name": "Sushirrito",
    "phone": "+14155449868",
    "price": "$$",
    "rating": 4,
    "rating_score": 43.80503284503522,
    "review_count": 1197,
    "review_count_score": 93.40569544981452,
    "total_score": 73.5654304079028,
    "transactions": [],
    "url": "https://www.yelp.com/biz/sushirrito-san-francisco-40?adjust_creative=q9muNPdaGwv_outr1dOxtg&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=q9muNPdaGwv_outr1dOxtg"
  },
  {
    "categories": [
      {
        "alias": "sushi",
        "title": "Sushi Bars"
      },
      {
        "alias": "japanese",
        "title": "Japanese"
      }
    ],
    "coordinates": {
      "latitude": 37.7706719094861,
      "longitude": -122.402888577285
    },
    "display_phone": "(415) 865-0633",
    "distance": 804.7463631829999,
    "id": "omakase-san-francisco",
    "image_url": "https://s3-media2.fl.yelpcdn.com/bphoto/Am_E8nodPvtQlrRV5ImvUg/o.jpg",
    "is_closed": false,
    "location": {
      "address1": "665 Townsend St",
      "address2": "",
      "address3": "",
      "city": "San Francisco",
      "country": "US",
      "display_address": [
        "665 Townsend St",
        "San Francisco, CA 94103"
      ],
      "state": "CA",
      "zip_code": "94103"
    },
    "name": "Omakase",
    "phone": "+14158650633",
    "price": "$$$$",
    "rating": 4.5,
    "rating_score": 131.31727983645297,
    "review_count": 213,
    "review_count_score": 31.517321728243424,
    "total_score": 71.43730497152725,
    "transactions": [],
    "url": "https://www.yelp.com/biz/omakase-san-francisco?adjust_creative=q9muNPdaGwv_outr1dOxtg&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=q9muNPdaGwv_outr1dOxtg"
  },
  {
    "categories": [
      {
        "alias": "japanese",
        "title": "Japanese"
      },
      {
        "alias": "sushi",
        "title": "Sushi Bars"
      }
    ],
    "coordinates": {
      "latitude": 37.78704,
      "longitude": -122.40044
    },
    "display_phone": "(415) 361-0448",
    "distance": 1429.092632528,
    "id": "takoba-sf-san-francisco",
    "image_url": "https://s3-media2.fl.yelpcdn.com/bphoto/GJBL9MxXsHWIXIlktWuT_w/o.jpg",
    "is_closed": false,
    "location": {
      "address1": "138 Minna St",
      "address2": "",
      "address3": "",
      "city": "San Francisco",
      "country": "US",
      "display_address": [
        "138 Minna St",
        "San Francisco, CA 94105"
      ],
      "state": "CA",
      "zip_code": "94105"
    },
    "name": "Takoba SF",
    "phone": "+14153610448",
    "price": "$$",
    "rating": 4.5,
    "rating_score": 131.31727983645297,
    "review_count": 193,
    "review_count_score": 30.940726157499736,
    "total_score": 71.09134762908104,
    "transactions": [
      "pickup"
    ],
    "url": "https://www.yelp.com/biz/takoba-sf-san-francisco?adjust_creative=q9muNPdaGwv_outr1dOxtg&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=q9muNPdaGwv_outr1dOxtg"
  },
  {
    "categories": [
      {
        "alias": "sushi",
        "title": "Sushi Bars"
      },
      {
        "alias": "japanese",
        "title": "Japanese"
      }
    ],
    "coordinates": {
      "latitude": 37.77722,
      "longitude": -122.4233
    },
    "display_phone": "(415) 551-9688",
    "distance": 2473.828845932,
    "id": "tsubasa-sushi-san-francisco",
    "image_url": "https://s3-media1.fl.yelpcdn.com/bphoto/qoSrZaA8xC0UPVSYpM0E0w/o.jpg",
    "is_closed": false,
    "location": {
      "address1": "429 Gough St",
      "address2": "",
      "address3": "",
      "city": "San Francisco",
      "country": "US",
      "display_address": [
        "429 Gough St",
        "San Francisco, CA 94102"
      ],
      "state": "CA",
      "zip_code": "94102"
    },
    "name": "Tsubasa Sushi",
    "phone": "+14155519688",
    "price": "$$$",
    "rating": 4.5,
    "rating_score": 131.31727983645297,
    "review_count": 155,
    "review_count_score": 29.901364700062953,
    "total_score": 70.46773075461897,
    "transactions": [],
    "url": "https://www.yelp.com/biz/tsubasa-sushi-san-francisco?adjust_creative=q9muNPdaGwv_outr1dOxtg&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=q9muNPdaGwv_outr1dOxtg"
  },
  {
    "categories": [
      {
        "alias": "sushi",
        "title": "Sushi Bars"
      },
      {
        "alias": "japanese",
        "title": "Japanese"
      }
    ],
    "coordinates": {
      "latitude": 37.7815064,
      "longitude": -122.4169539
    },
    "display_phone": "(415) 359-9001",
    "distance": 2049.7621232419997,
    "id": "elephant-sushi-golden-gate-san-francisco-6",
    "image_url": "https://s3-media4.fl.yelpcdn.com/bphoto/-Da8eTZnSgwRtEEVer-yhw/o.jpg",
    "is_closed": false,
    "location": {
      "address1": "380 Golden Gate Ave",
      "address2": null,
      "address3": "",
      "city": "San Francisco",
      "country": "US",
      "display_address": [
        "380 Golden Gate Ave",
        "San Francisco, CA 94102"
      ],
      "state": "CA",
      "zip_code": "94102"
    },
    "name": "Elephant Sushi Golden Gate",
    "phone": "+14153599001",
    "price": "$$",
    "rating": 4.5,
    "rating_score": 131.31727983645297,
    "review_count": 94,
    "review_count_score": 28.371461167896662,
    "total_score": 69.54978863531919,
    "transactions": [],
    "url": "https://www.yelp.com/biz/elephant-sushi-golden-gate-san-francisco-6?adjust_creative=q9muNPdaGwv_outr1dOxtg&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=q9muNPdaGwv_outr1dOxtg"
  },
  {
    "categories": [
      {
        "alias": "japanese",
        "title": "Japanese"
      },
      {
        "alias": "sushi",
        "title": "Sushi Bars"
      }
    ],
    "coordinates": {
      "latitude": 37.7831605821848,
      "longitude": -122.407445758581
    },
    "display_phone": "(415) 908-1919",
    "distance": 1425.8453706496,
    "id": "hashiri-san-francisco",
    "image_url": "https://s3-media2.fl.yelpcdn.com/bphoto/lJfejAMykIku5rH21c5bnw/o.jpg",
    "is_closed": false,
    "location": {
      "address1": "4 Mint Plz",
      "address2": "",
      "address3": "",
      "city": "San Francisco",
      "country": "US",
      "display_address": [
        "4 Mint Plz",
        "San Francisco, CA 94103"
      ],
      "state": "CA",
      "zip_code": "94103"
    },
    "name": "Hashiri",
    "phone": "+14159081919",
    "price": "$$$$",
    "rating": 4.5,
    "rating_score": 131.31727983645297,
    "review_count": 36,
    "review_count_score": 27.055258162274633,
    "total_score": 68.76006683194598,
    "transactions": [],
    "url": "https://www.yelp.com/biz/hashiri-san-francisco?adjust_creative=q9muNPdaGwv_outr1dOxtg&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=q9muNPdaGwv_outr1dOxtg"
  },
  {
    "categories": [
      {
        "alias": "sushi",
        "title": "Sushi Bars"
      },
      {
        "alias": "japanese",
        "title": "Japanese"
      }
    ],
    "coordinates": {
      "latitude": 37.764681,
      "longitude": -122.4036308
    },
    "display_phone": "(415) 861-8610",
    "distance": 1334.145434944,
    "id": "live-sushi-bar-san-francisco",
    "image_url": "https://s3-media3.fl.yelpcdn.com/bphoto/w9xK_39mtoeADeHLmEsNjw/o.jpg",
    "is_closed": false,
    "location": {
      "address1": "2001 17th St",
      "address2": "",
      "address3": "",
      "city": "San Francisco",
      "country": "US",
      "display_address": [
        "2001 17th St",
        "San Francisco, CA 94103"
      ],
      "state": "CA",
      "zip_code": "94103"
    },
    "name": "Live Sushi Bar",
    "phone": "+14158618610",
    "price": "$$",
    "rating": 4,
    "rating_score": 43.80503284503522,
    "review_count": 1058,
    "review_count_score": 83.13224553235739,
    "total_score": 67.40136045742852,
    "transactions": [],
    "url": "https://www.yelp.com/biz/live-sushi-bar-san-francisco?adjust_creative=q9muNPdaGwv_outr1dOxtg&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=q9muNPdaGwv_outr1dOxtg"
  },
  {
    "categories": [
      {
        "alias": "japanese",
        "title": "Japanese"
      },
      {
        "alias": "vegetarian",
        "title": "Vegetarian"
      },
      {
        "alias": "vegan",
        "title": "Vegan"
      }
    ],
    "coordinates": {
      "latitude": 37.760753,
      "longitude": -122.421787
    },
    "display_phone": "(415) 252-7825",
    "distance": 2798.6755733379996,
    "id": "cha-ya-san-francisco-5",
    "image_url": "https://s3-media2.fl.yelpcdn.com/bphoto/wITQpHPHJYOy1zInJaZahw/o.jpg",
    "is_closed": false,
    "location": {
      "address1": "762 Valencia St",
      "address2": "",
      "address3": "",
      "city": "San Francisco",
      "country": "US",
      "display_address": [
        "762 Valencia St",
        "San Francisco, CA 94110"
      ],
      "state": "CA",
      "zip_code": "94110"
    },
    "name": "Cha-Ya",
    "phone": "+14152527825",
    "price": "$$",
    "rating": 4,
    "rating_score": 43.80503284503522,
    "review_count": 1032,
    "review_count_score": 81.21059302981146,
    "total_score": 66.24836895590096,
    "transactions": [],
    "url": "https://www.yelp.com/biz/cha-ya-san-francisco-5?adjust_creative=q9muNPdaGwv_outr1dOxtg&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=q9muNPdaGwv_outr1dOxtg"
  },
  {
    "categories": [
      {
        "alias": "japanese",
        "title": "Japanese"
      },
      {
        "alias": "delis",
        "title": "Delis"
      },
      {
        "alias": "sushi",
        "title": "Sushi Bars"
      }
    ],
    "coordinates": {
      "latitude": 37.795407,
      "longitude": -122.393217
    },
    "display_phone": "(415) 834-0344",
    "distance": 2309.524566104,
    "id": "delica-san-francisco",
    "image_url": "https://s3-media3.fl.yelpcdn.com/bphoto/6U-euh6zY8WCdA77PxxGdw/o.jpg",
    "is_closed": false,
    "location": {
      "address1": "1 Ferry Bldg",
      "address2": "",
      "address3": "Shop 45",
      "city": "San Francisco",
      "country": "US",
      "display_address": [
        "1 Ferry Bldg",
        "Shop 45",
        "San Francisco, CA 94111"
      ],
      "state": "CA",
      "zip_code": "94111"
    },
    "name": "Delica",
    "phone": "+14158340344",
    "price": "$$",
    "rating": 4,
    "rating_score": 43.80503284503522,
    "review_count": 922,
    "review_count_score": 73.08052474980941,
    "total_score": 61.370327987899735,
    "transactions": [
      "pickup"
    ],
    "url": "https://www.yelp.com/biz/delica-san-francisco?adjust_creative=q9muNPdaGwv_outr1dOxtg&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=q9muNPdaGwv_outr1dOxtg"
  },
  {
    "categories": [
      {
        "alias": "steak",
        "title": "Steakhouses"
      },
      {
        "alias": "japanese",
        "title": "Japanese"
      },
      {
        "alias": "cocktailbars",
        "title": "Cocktail Bars"
      }
    ],
    "coordinates": {
      "latitude": 37.7965391394848,
      "longitude": -122.403850511802
    },
    "display_phone": "(415) 362-8887",
    "distance": 2542.443056832,
    "id": "roka-akor-san-francisco-4",
    "image_url": "https://s3-media3.fl.yelpcdn.com/bphoto/TG7q5xBYTlnxknKc4c-Yog/o.jpg",
    "is_closed": false,
    "location": {
      "address1": "801 Montgomery St",
      "address2": "",
      "address3": "",
      "city": "San Francisco",
      "country": "US",
      "display_address": [
        "801 Montgomery St",
        "San Francisco, CA 94133"
      ],
      "state": "CA",
      "zip_code": "94133"
    },
    "name": "Roka Akor",
    "phone": "+14153628887",
    "price": "$$$$",
    "rating": 4,
    "rating_score": 43.80503284503522,
    "review_count": 862,
    "review_count_score": 68.64594205162649,
    "total_score": 58.70957836898998,
    "transactions": [],
    "url": "https://www.yelp.com/biz/roka-akor-san-francisco-4?adjust_creative=q9muNPdaGwv_outr1dOxtg&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=q9muNPdaGwv_outr1dOxtg"
  }
];

const choice = {
  "categories": [
    {
      "alias": "sushi",
      "title": "Sushi Bars"
    },
    {
      "alias": "ramen",
      "title": "Ramen"
    },
    {
      "alias": "noodles",
      "title": "Noodles"
    }
  ],
  "coordinates": {
    "latitude": 37.78726,
    "longitude": -122.41037
  },
  "display_phone": "(415) 771-1281",
  "distance": 1921.528302702,
  "id": "katana-ya-san-francisco",
  "image_url": "https://s3-media1.fl.yelpcdn.com/bphoto/6LugFRX9HzA5-E0OO9I4yA/o.jpg",
  "is_closed": false,
  "location": {
    "address1": "422 Geary St",
    "address2": null,
    "address3": "",
    "city": "San Francisco",
    "country": "US",
    "display_address": [
      "422 Geary St",
      "San Francisco, CA 94102"
    ],
    "state": "CA",
    "zip_code": "94102"
  },
  "name": "Katana-Ya",
  "phone": "+14157711281",
  "price": "$$",
  "rating": 3.5,
  "rating_score": 17.186924559615846,
  "review_count": 3748,
  "review_count_score": 281.94936983422537,
  "total_score": 176.04439172438157,
  "transactions": [
    "pickup"
  ],
  "url": "https://www.yelp.com/biz/katana-ya-san-francisco?adjust_creative=q9muNPdaGwv_outr1dOxtg&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=q9muNPdaGwv_outr1dOxtg"
}

const initialState = fromJS({
  currentStep: '',
  location: 'oracle arena',

  transitMethod: '',
  transitTime: 0,
  radius: 0,
  isSubmittingTransit: false,

  foodType: '',

  searchId: '',
  choices: List(),
  hoveredChoice: '',
  isSubmittingSearch: false,

  selectedChoice: Map(),
  isSelectingChoice: false,

  error: initialError,
});

export default function searchProcess(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case actionTypes.CHANGE_STEP:
      return state
        .set('currentStep', payload.currentStep);

    case actionTypes.SUBMIT_LOCATION:
      return state
        .set('location', payload.location);
    case actionTypes.CONFIRM_LOCATION:
      return state
        .set('currentStep', 'transit');

    case actionTypes.SUBMIT_TRANSIT_PENDING:
      return state
        .set('isSubmittingTransit', true);
    case actionTypes.SUBMIT_TRANSIT_SUCCESS:
      return state
        .set('isSubmittingTransit', false)
        .set('transitMethod', payload.transitMethod)
        .set('transitTime', payload.transitTime)
        .set('radius', parseFloat(payload.radius))
        .set('currentStep', 'foodType');
    case actionTypes.SUBMIT_TRANSIT_FAILURE:
      return state
        .set('isSubmittingTransit', false)
        .set('error', Map({ status: true, error: payload.error }));

    case actionTypes.SUBMIT_FOOD_TYPE:
      return state
        .set('foodType', payload.foodType);

    case actionTypes.SUBMIT_SEARCH_PENDING:
      return state
        .set('isSubmittingSearch', true);
    case actionTypes.SUBMIT_SEARCH_SUCCESS:
      return state
        .set('searchId', payload.id)
        .set('choices', fromJS(payload.restaurants))
        .set('isSubmittingSearch', false)
        .set('error', initialError);
    case actionTypes.SUBMIT_SEARCH_FAILURE:
      return state
        .set('choices', List())
        .set('isSubmittingSearch', false)
        .set('error', Map({ status: true, error: payload.error }));

    case actionTypes.MOUSE_ENTER_CHOICE:
      return state
        .set('hoveredChoice', payload);
    case actionTypes.MOUSE_LEAVE_CHOICE:
      return state
        .set('hoveredChoice', '');

    case actionTypes.SELECT_CHOICE_PENDING:
      return state
        .set('isSelectingChoice', true);
    case actionTypes.SELECT_CHOICE_SUCCESS:
      return state
        .set('selectedChoice', fromJS(payload.choice))
        .set('isSelectingChoice', false)
        .set('error', initialError);
    case actionTypes.SELECT_CHOICE_FAILURE:
      return state
        // .set('selectedChoice', Map())
        .set('isSelectingChoice', false)
        .set('error', Map({ status: true, error: payload.error }));

    default:
      return state;
  }
}
