# Project Name : Donate-box-server #

## Live Site Link : https://donate-box-server.vercel.app ##

### Application Routes: ###

#### Super Admin ####
* * api/v1/admin/create-admin (POST)
* * api/v1/admin/ (GET) get all Admin 
* * api/v1/admin/:id (GET) get single Admin 
* * api/v1/admin/:id (FETCH) update admin
* * api/v1/admin/:id (Delete) 

#### Admin ####
* * api/v1/admin/create-admin (POST)
* * api/v1/admin/:id (FETCH) update admin
* * api/v1/admin/:id (GET) get single Admin 
* * api/v1/admin/:id (Delete) 

#### Auth(user/admin) role base login ####
* api/v1/auth/login (POST)
* api/v1/auth/refresh-token (POST)

#### Users ####
* /api/v1/users (GET) admin & super_admin can access
* /api/v1/users/user-exist/:phoneNumber (GET) all type user can access
* /api/v1/users/update-password/:id (PATCH) all type user can access
* /api/v1/users/:id (GET) all type user can access
* /api/v1/users/create-user (POST) all types of user can access
* /api/v1/users/:id (PATCH) all type user can access
* /api/v1/users/:id (DELETE) all type user can access

#### (Users/Admin) Banned ####
* /api/v1/users/user-banned/:id (PATCH) admin & super_admin can access
* /api/v1/admin/admin-banned/:id (PATCH) only super_admin can access


#### Banner ####
* /api/v1/bloodDonner (GET) all type user can access
* /api/v1/bloodDonner/create-donner (POST) all type user can access


#### Pagination and Filtering routes of users & admin ####

* /api/v1/cows?pag=1&limit=10 
* /api/v1/cows?sortBy=price&sortOrder=desc

*  FilterableFields = 'searchTerm'/ 'userId'/ 'phoneNumber'/ 'division'/ 'fullName'/ 'bloodGroup'/ 'gender'
*  SearchableFields = 'userId'/ 'phoneNumber'/ 'division'/ 'fullName'/ 'bloodGroup'/ 'gender'


#### Banner ####
* /api/v1/banner (GET) 
* /api/v1/banner/create-banner (POST) admin & super_admin can access
* /api/v1/banner/:id (PATCH) admin & super_admin can access
* /api/v1/banner/:id (DELETE) admin & super_admin can access





###                                                     Thank You                                                       ###
