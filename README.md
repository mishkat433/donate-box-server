# Project Name : Cow-Bazar-Server #

## Live Site Link : coming soon ##

### Application Routes: ###

#### Admin ####
* * api/v1/admins/create-admin (POST)
* * api/v1/admins/my-profile (GET)
* * api/v1/admins/my-profile (FETCH) update admin

#### Auth(Admin) ####
* api/v1/admins/login (POST)
* api/v1/admins//refresh-token (POST)

#### User ####

* api/v1/users/signUp (POST)
* /api/v1/users (GET)
* /api/v1/users/my-profile (GET)
* /api/v1/users/:id (GET) "include userId for getting single user"
* /api/v1/users/updateUser/:id (PATCH) "include userId for update single user (ex: C1234W01)"
* /api/v1/users/deleteUser/:id (DELETE) "include userId for delete single user (ex: C1234W01)"

#### Auth(User) ####
* api/v1/auth/login (POST)
* api/v1/auth/refresh-token (POST)


#### Cows ####
* /api/v1/cows/create-cow (POST)
* /api/v1/cows (GET)
* /api/v1/cows/:id (GET) "include userId for getting single cow (ex: 66238d647bab01577e8b30cd)"
* /api/v1/cows/updateCow/:id (PATCH) "include _id for update single cow (ex: 66238d647bab01577e8b30cd)"
* /api/v1/cows/deleteCow/:id (DELETE) "include _id for delete single cow (ex: 66238d647bab01577e8b30cd)"

#### Pagination and Filtering routes of Cows ####

* /api/v1/cows?pag=1&limit=10 
* /api/v1/cows?sortBy=price&sortOrder=desc
* /api/v1/cows?minPrice=20000&maxPrice=70000
* /api/v1/cows?location=Chattogram
* /api/v1/cows?searchTerm=Kala Chan
* and other filtering option  is label/breed/category/weight/price.


#### Orders ####

* /api/v1/order/create-order (POST)
* /api/v1/order/my-order/:id (GET)
* /api/v1/order/ (GET)



###                                                     Thank You                                                       ###
