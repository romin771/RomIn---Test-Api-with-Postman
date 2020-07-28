
# About this repository 

In this repository, I’m trying to show you how you can work with a Collection of API’s and how you can write test for them. So, at the end , you will learn what is API collection , different Http Methods and basic tests you can write to automate your API. Then you will learn how to run your whole tests through collection runner and integrate it to Jenkins to get the report. 

For start using this repository in your local machine, you need to clone/download it and then install necessary dependencies. Then you will be able to work on the prepared Collection and start testing the API’s. 
To do so go through the steps:  


## Initial setup 

* `clone` or `Download` Zip file of this repository.
* `cd` to the root of the project. 
  - Open Terminal and write `cd` and add the directory location of your folder. Hit enter 
* Run `npm install` to install the project dependencies and in order to be able to run Nodemon. 
* Then run `nodemon`.
  - Nodemon will monitor any changes in your source and automatically restart your server.if can find more about it <a href="https://nodemon.io/"> here.</a>  
  - The server will run on port 4000 


<img src="https://github.com/romin771/RomIn---Test-Api-with-Postman/blob/master/readme-assets/R1.png" />


## Stage 1

### Scope

At this stage, we want to import our collection of requests to Postman.

### To Do So: 

* Open Postman.
* Click on the `import` button which is in the top left corner of Postman.
  * Drag and Drop your collection file which called `our Api collection.json` and is isinside of the `Collection` folder.
* Confirm your import by clicking on orange Import button. 

<img src="" />


* Now, you have a collection called `Postman Test Tutorial`. 
* click on it to see the different list of HTTP requests.
  * Http Request is used to structure request and responses for effective communication between a client and a server. You can find more about HTTP Request <a href="https://learning.postman.com/docs/getting-started/sending-the-first-request/"> here.</a> 

<img src="" />


## Stage 2

### Scope

At this stage, we will create a Postman test to fetch all of friends.

### To Do So: 

* Click on the first request from the collection called `GET - All Friends`.
* Then click on `Send` button. 
  * Now you should see all the list of friends with their information under the Body section.

<img src="" />


* Click on the `Tests` tab.
* Create a test that cheks the status code is `OK`.
* Create a test that checks the status code is `200`.
* Create a test to checks that 15 friends are retrieved.
* After writing your tests, click on `Send` again to see if your tests pass or fail.

### Solution

<details>

<summary> <code> GET - All Friends </code> </summary>

```js
const response = pm.response.json();

//test that cheks the status code is `OK`.
pm.test("Status code is OK", function () {
    pm.response.to.have.status("OK");
});

//test that checks the status code is `200`.
pm.test("status code is 200", function(){
    pm.response.to.have.status(200);
})

//test to checks that 15 friends are returned
pm.test("There are 15 Friends retrieved", function(){
    pm.expect(response.length).to.eql(15);
});
```

</details>

<br />


## Stage 3

### Scope

In this Stage, we will create a Postman test to fetch Friends by their ID.

### Instructions

* Click on the second request from the collection `GET - Friends by Id`.
* Then click on the `Send` button.
  * Now you should see only the friend which its id is equal to `9`.

<img src="" />


* Create a test that checks that the status code is `200`.
* Create a test that checks that friend `9` has the following information:
  * `id` equal to `9`.
  * `friend` equal to `"Parham Ebrahimi"`.
  * `email_address` equal to `"parham.toupaebrahimi@gmail.com"`.
  * `phone` equal to `"(912) 7759546"`.
  * `current_location` equal to `IR`.

### Solution

<details>

<summary> <code> GET - Friend by Id </code> </summary>

```js
const response = pm.response.json();
const friend9 = {
  id: 9,
  friend: "Parham Ebrahimi",
  email_address: "parham.toupaebrahimi@gmail.com",
  phone: "(912) 7759546",
  current_location: "IR"
};

pm.test("Status code is 200", function() {
  pm.response.to.have.status(200);
});

pm.test("Correct object in response for ID 9", function() {
  pm.expect(response).to.eql(friend9);
});
```

</details>



## Stage 4

### Scope

At this stage, we will create a Postman test to fetch friends by their email address.

### To Do So: 

* Click on the third request from the collection `GET - Friends by Email`.
* Click on the `Send` button.
  * Not you should see the friend who's email is equal to `kiarashghorbani1992@gmail.com`.

<img src="" />

* Create a test that checks that the status code is `200`.
* Create a test to checks that the friend's email is equal to `kiarashghorbani1992@gmail.com`.

### Solution

<details>

<summary> <code> GET - Friend by Email </code> </summary>

```js
let response = pm.response.json();

pm.test("Status code is 200", function() {
  pm.response.to.have.status(200);
});

pm.test("response has a email equal to desire one", function() {
  pm.expect(response.email).to.eql("kiarashghorbani1992@gmail.com");
});
```

</details>



## Stage 5

### Scope

At this stage, we will create a Postman test to fetch friends by their name.

### To Do So:

* Click on the fourth request from the collection `GET - Friends by Name`
* Click on the `Send` button.
  * Now you should see only the friend which her name is `Nissa`.

<img src="" />


* Create a test that checks that the status code is `200`.
* Create a test that checks `Nissa Amini` appears in the results.

### Solution

<details>

<summary> <code> GET - Friends by Name </code> </summary>

```js
const res = pm.response.json();

pm.test("Status code is 200", function() {
  pm.response.to.have.status(200);
});

pm.test("my friend Nissa Amini is in the response", function() {
  const friendExists = response.some(
    student => student.student === "Nissa Amini"
  );
  pm.expect(friendExists).to.be.true;
});
```

</details>


## Stage 6

### Scope

At this stage, we will create a Postman test to fetch friends by their Location.

### To Do So:

* Click on the fifth request from the collection `GET - Students by Location`.
* Click the `Send` button.
  * Now you should see only the friends who lives in Iran and their Location is equal to  `IR`.

<img src="" />


* Create a test that checks that the status code is `200`.
* Create a test to checks that all returned friends have a location of `IR`.

### Solution

<details>

<summary> <code> GET - Friends by Grade </code> </summary>

```js
const res = pm.response.json();

pm.test("Status code is 200", function() {
  pm.response.to.have.status(200);
});

pm.test('Correct students returned for "C" grade', function() {
  const correctGrades = response.every(
    student => student.current_grade === "C"
  );
  pm.expect(correctGrades).to.be.true;
});
```

</details>



## Stage 7

### Scope

At this stage, we will create a Postman test to fetch friends by their phone.

### To Do So: 

* Click on the sixth request from the collection `GET - Friends by Phone`.
* Click the `Send` button.
  * Now you should see only the friend who's their phone prefix is `912`.
* Create a test that checks that the status code is `200`.
* Create a test to checks that all returned friends have a `phone` property that contains `912` prefix.

### Solution

<details>

<summary> <code> GET - Friends by Phone </code> </summary>

```js
const res = pm.response.json();

pm.test("Status code is 200", function() {
  pm.response.to.have.status(200);
});

pm.test("All objects contain '608'", function() {
  const checkPhoneNumbers = response.every(student =>
    student.phone.includes("608")
  );
  pm.expect(checkPhoneNumbers).to.be.true;
});
```

</details>


## Stage 8

### Scope

At this stage, we will create a Postman test to update a friend's location.

### To Do So: 

* Click on the seventh request from the collection `PUT - Update Location`.
* Click the `Send` button.
  * Now you should see the friend with `id` number `15` has a location of `IR`.
* Create a test to checks that the status code is `200`.
* Create a test to checks that the id is equal to `15`.
* Create a test to checks that returned data has a `location` of `IR`.

### Solution

<details>

<summary> <code> PUT - Update Location </code> </summary>

```js
const res = pm.response.json();

pm.test("Status code is 200", function() {
  pm.response.to.have.status(200);
});

pm.test("Returns student with correct Id", function() {
  pm.expect(response.id).to.eql(15);
});

pm.test("Correctly updates grade to A-", function() {
  pm.expect(response.current_grade).to.eql("A-");
});
```

</details>



## Stage 9

### Scope

At this stage, we will create a Postman test to add a new friend to our list.

### To Do So: 

* Click on the eighth request from the collection `POST - Add Friend`.
* Click the `Send` button.
  * Now you should see friend with an `id` created by the server and properties that match the data sent in the body.
* Create a test to checks that the status code is `200`.
* Create a test to checks the friend has an `id`.
* Create a test to checks if the friend matches the expected schema.
  * If you are interested to learn more about schema click <a href="https://learning.postman.com/docs/designing-and-developing-your-api/the-api-workflow/"> here.</a> 
* Create a test to checks that friend has the following information:
  * `friend` equal to `"Rahele Nazari"`.
  * `email_address` equal to `"rahiNZ@gmail.com"`.
  * `phone` equal to `"(937) 5675904"`.

### Solution

<details>

<summary> <code> POST - Add Friend </code> </summary>

```js
const res = pm.response.json();

const schema = {
  title: "Student",
  type: "object",
  properties: {
    id: {
      type: "integer"
    },
    student: {
      type: "string"
    },
    email_address: {
      type: "string"
    },
    phone: {
      type: "string"
    },
    current_grade: {
      type: "string"
    }
  },
  required: ["id", "student", "email_address", "phone", "current_grade"]
};

pm.test("Status code is 200", function() {
  pm.response.to.have.status(200);
});

pm.test("Student was created", function() {
  pm.expect(response.id).to.exist;
});

pm.test("Student should match schema", function() {
  pm.expect(tv4.validate(response, schema)).to.be.true;
});

pm.test("Student has correct information", function() {
  pm.expect(res.student).to.eql("Tim Allen");
  pm.expect(res.email_address).to.eql("tim@homeimprovement.com");
  pm.expect(res.phone).to.eql("(408) 8674530");
});
```

</details>



## Stage 10

### Scope

At this stage, we will create a Postman test to remove a friend.

### To Do So: 

* Click on the ninth request from the collection `DELETE - Remove Friend`.
* Click the `Send` button.
  * Now you should see the student the `id` of `16` which we just created in previous stage.
* Create a test to checks that the status code is `200`.
* Create a test to checks that the return student `id` is equal to `16`.

### Solution

<details>

<summary> <code> DELETE - Remove Friend </code> </summary>

```js
const res = pm.response.json();

pm.test("Status code is 200", function() {
  pm.response.to.have.status(200);
});

pm.test("Student w/ ID 18 removed", function() {
  pm.expect(res.id).to.eql(18);
});
```

</details>



## Stage 11

### Scope

At this stage we want to run the entire postman collection to see them all pass as a whole.

### To Do So: 

* Click on the right arrow next to the collection name.
* Click the blue `Run` button.
* Click on the blue `Run Postman Test...` button.

### Solution


## Contributions

hope this file could be already useful to you as i tried to gather and compact whatever essential you need to know how to test Api collections. 

## Peace 

