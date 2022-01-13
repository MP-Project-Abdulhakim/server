# Description
Creating Community WebSite of chefs and users, 


---

# User-Stories

- Registration type [ admin - chef- user ]

- admin [ Delete post - delete video - delete user - delete comment ]

- Chef [add post - add video - add comment - delete post - delete video ]

- user
- [Watch posts - Watch videos]
- The user can Check the cooking posts and click on the post to start cooking.
- user (logIn):
- add to favorite
- add comment 
- Follow the chefs
---
#### server side url https://github.com/MP-Project-Abdulhakim/client
#### presentation slides http://www.abdulhakim.com
#### project deployed there https://wasfah-wasfah.vercel.app/
#### Trello link https://trello.com/b/qhLIrfnX/mp-project-abdulhakim

---
###
 HTTP Method  | authorization     |    Path                            |  Request  Body       | HTTP Code              
------------- | -----------   | ---------------------------            |----------------------  |---------
POST          | everyone      |`/user/create`        |{email,username, password, role} | ok 200 , error 400
POST          | user + admin  |`/user/login`                        |{email or username, password}| ok 200 , error 400
GET           | admin only    |`/user/`                           | | ok 200 , error 400
DELETE        | admin only    |`/user/deleteusrid/:_id`             |   |ok 200 , error 400
GET           | user          |`/user/confirmation/:confcode/`     |    |ok 200 , error 400
PUT           | user          |`/user/forgetPassword`          |{email}|ok 200 , error 400
PUT           | user          |`/user/resetPassword` |{resetCode, newPassword} | ok 200 , error 400
POST          | everyone      |`/user/googlelogin`  |{Token id} | ok 200 , error 400
post          | admin + user  |`/likes/`     |{userId, PostId} | ok 200 , error 400
delete        | admin + user  |`/likes/:id`                  |{like id}| ok 200 , error 400
GET           | admin + user  |`/likes/:PostId`                    |{postId}| ok 200 , error 400
POST          | admin + user  |`/comment/addComment`                  |{title, postId, userId}| ok 200 , error 400
PUT           | admin + user  |`/comment/update`                    |{commentId, description}| ok 200 , error 400
DELETE        | admin + user  |`/comment/delete/:id`                  | | ok 200 , error 400
GET           | admin + user  |`/posts/`                               | | ok 200 , error 400
GET           | admin + user  |`/posts/getPost/:postid`                || ok 200 , error 400
POST          | admin + user  |`/posts/addpost`                    |{img, description} | ok 200 , error 400
PUT           | admin + user  |`/posts/updatepost/:_id`               |{id}| ok 200 , error 400
DELETE        | admin + user  |`/posts/delete/:_id`                | | ok 200 , error 400

---
# ERD


![ER Diagram](https://github.com/AbdulhakimAloudah/User-Stories/blob/main/img/Untitled%20Diagram.drawio%20(3).png)


---
## Models

- user model

| key        | type            | options          | default value |
| ---------- | --------------- | ---------------- | ------------- |
| username   | String          | required, unique | n/a           |
| email      | String          | required, unique | n/a           |
| password   | String          | required         | n/a           |
| roles      | Schema <roles>  | required         | n/a           |
| favChef    | String          | required         | n/a           |
| favPost   | String          | required         | n/a           |
| isDeleted  | Boolean         | n/a              | false         |

- roles model

| key  | type   | options          | default value |
| ---- | ------ | ---------------- | ------------- |
| role | String | required, unique | n/a           |

- posts model

| key         | type              | options  | default value |
| ----------- | ----------------- | -------- | ------------- |
| createdBy | Schema <user>            | required | n/a           |
| video      | String     | required | n/a           |
  | images      | String     | required | n/a           |
 | resipe      | String     | required | n/a           |
| liked        | Schema <like>            | required | n/a           |
| comment        | Schema <comments>            | required | n/a           |

- comments model

| key         | type            | options  | default value |
| ----------- | --------------- | -------- | ------------- |
| createdBy | Schema <user>            | required | n/a           |
| description | String          | required | n/a           |
| pos    | Schema <posts>   | required | n/a           |
| isDeleted    | boolean   | required | n/a           |

- like model

| key         | type            | options  | default value |
| ----------- | --------------- | -------- | ------------- |
| createdBy      | Schema <user>   | required | n/a           |
| post    | Schema <posts> | required | n/a            |

---
# UML Diagram

![ER Diagram](https://github.com/AbdulhakimAloudah/User-Stories/blob/main/img/Untitled%20Diagram.drawio%20(4).png)


