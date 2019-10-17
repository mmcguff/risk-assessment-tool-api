# getting started

Ensure you mongodb running.  The app defualts to a local database when env `MONGODB_URI` is not set.  

1.  clone the repo
2.  install packages with `npm install` or `yarn`
3.  run the start script. 

## current routes

There basically two collections of routes today.  
- `users`: used to collect user data from the risk assessment tool and display FEMA risk data to the user.
- `incidents`: used to access raw data collected by the data science team from various different sources that now live on the mysql database where the wordpress site is hosted. 

### user routes

- **create user**: This route is the API that gets called at the end of the stepper in the risk assessment tool to create a user.
```
curl -X POST \
  {base_url}/api/v1/users \
  -d '{
	  "email": "test5@gmail.com",
      "firstName": "John",
      "lastName": "Doe",
      "streetAddress": "123 Main Street",
      "state": "CA",
      "zip": "90224"
}'
```
---
- **return user data**: This routes returns the risk from the generated user.  The previous create user route generates an id that is tied to that user that is not displayed to system but used by frontend to call the get route.  

```
curl -X GET {base_url}api/v1/users/5da838a98e25730004bb0fbc \
```
---

### incident routes

The incident routes are used to access data collected by the data science team.  They come from a variety sources.  It was determined that instead of trying to get at this data in real time from government resources that we would collect the best snapshot possible of the data and pull it from our own database source hosted by safeable (today being hosted on bluehost).  This was becuase of performance issues with aggerating all the sources together and lack of availablity of API endpoints from government sources.  The need for the data to be as current as possible was determined to secondary to ensuring that endpoints would always be available.  In other words it was better to return stale data than to return 500 or 404.  

_Note: whether running locally or deployed to heroku, the config point to the same mysql database hosted with the wordpress site._

* **disaster declarations**: route returns the FEMA disaster declrations by state and zip.  For example is you wanted to look up Texas use `tx` and a corresponding 5 digit zip code exaple `77503`.  This is raw data from which the percentage numbers of the get user routes are determined.  There is much much more meta data available in these routes that could be used.  
* 
```
curl -X GET {base_url}/api/v1/incidents/disasters/:state/:zip \
 
```
---

* **gender demographics by age**: this route returns some age and gender data based on a zip code.  I'm not totally sure where this data came from but could be used to provide some interesting info about the population in an area in terms of men and woman and their ages in a zip code.  

```
curl -X GET {base_url}/api/v1/incidents/demographics/:zip 

```
---

* **ratio of residences to businesses** : this route is suppose to provide some data about the ratio of residences to business in a county inside a zip code but the data doesn't make a lot of sense to me.  

```
curl -X GET {base_url}/api/v1/incidents/zip-data/:zip

```

---

More routes can and could be develop to collect data from the current data set but this is all I have at this point. 


