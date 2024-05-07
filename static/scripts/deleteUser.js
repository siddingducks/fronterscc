function confirmDeletion(form) {
    let userID = form.userID.value;
    let token = form.token.value;
    confirm = confirm('Are you sure you want to delete your data from the fronters.cc databse? This decision CANNOT be reversed.');
    if (confirm){
        deleteUser(userID, token);
    }
}

async function deleteUser(userID, token) {
    //DELETE data in the databse -- DELETE USER
    try {
        submittedData = await fetch('/api/sp/delete/' + userID, {
            method: "DELETE",
            body: JSON.stringify({
                token: token
            }),
            headers: {
                "Content-type": "application/json"
            }
            });
        alert("Your data was deleted from the fronters.cc database.");
    }
    catch {
        //if there is nothing to delete
        alert("The entered data could not be found fronters.cc database.");
    }
}