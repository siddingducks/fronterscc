let token;
let userID;
let customURL;

function formHandling(form) {
    userID = form.user_id.value;
    token = form.token.value;
    customURL = form.custom_url.value;
    validateUser(userID, token, customURL);
}

async function validateUser(userID, token, customURL) {
try {
        //check data against Simply Plural API to confirm user's existence
        let data = await fetch('https://api.apparyllis.com/v1/me', {headers: {'Authorization': token}});
        data = await data.json();

        if ((data.exists) & (data.id == userID)) {
            //make sure url doesn't have forbidden chars
            let safeURL = urlSanitizer(customURL);
            console.log(safeURL);

            if (safeURL) {
                //check data against preexisting users in the database
                let prexistingUser = await fetch('/validateuser', {
                    method: "POST",
                    body: JSON.stringify({
                        user_id: userID
                    }),
                    headers: {
                        "Content-type": "application/json"
                    }
                });
                prexistingUser = await prexistingUser.json();
                console.log(prexistingUser);

                if (prexistingUser) {
                    //PUT data in the databse -- UPDATE USER
                    submittedData = await fetch('/api/sp/update/' + userID, {
                        method: "PUT",
                        body: JSON.stringify({
                            token: token,
                            custom_url: customURL
                        }),
                        headers: {
                            "Content-type": "application/json"
                        }
                    });
                    alert("Your data was updated. Your fronters.cc page should be ready to go! :3");
                    window.location.pathname = "/sp/" + customURL;
                } else {
                    //POST data in the database -- CREATE NEW USER
                    //ensure customURL is not already taken
                    let uniqueUser = await fetch('/custom_url', {
                        method: "POST",
                        body: JSON.stringify({
                            user_id: userID,
                            custom_url: customURL
                        }),
                        headers: {
                            "Content-type": "application/json"
                        }
                    });
                    uniqueUser = await uniqueUser.json();
                    console.log(uniqueUser);

                    if (uniqueUser) {
                        submittedData = await fetch('/api/sp/users', {
                            method: "POST",
                            body: JSON.stringify({
                                user_id: userID,
                                token: token,
                                custom_url: customURL
                            }),
                            headers: {
                                "Content-type": "application/json"
                            }
                        });
                        alert("Your data was submitted. Your fronters.cc page should be ready to go! :3");
                        window.location.pathname = "/sp/" + customURL;
                    } else {
                        //customURL is taken by another user
                        alert("That custom url is already taken. Please choose another one.");
                    }
                }
            } else {
                //customURL contains forbidden chars
                alert(`Your custom URL must contain ONLY the following characters:
                        \n&bull; Latin Alphanumerics (A-Z, a-z, 0-9)
                        \n&bull; Unrestricted Characters: periods (.),dashes (_), hyphens (-), and tildes (~)`);
            }
        } else {
            //data was not found in the simply plural api
            throw error;
        }
    } catch(error) {
        alert("According to Simply Plural records, your data is invalid. Please ensure your token and user ID are correct.")
    }
};

function urlSanitizer(customURL) {
    const forbiddenChars = /(?:(?![0-9]|[a-z]|[A-Z]|\%|\.|\_|\-|\~).)+/g
    let invalidURL = customURL.match(forbiddenChars);
    if (invalidURL) {
        return false;
    }
    return true;
}