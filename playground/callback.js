const getUser = (id, callback) => {
    let user = {        //dummy example; in reality, it would be data from database or query
        id: id,
        name: 'Edmon'
    };
    setTimeout(() => {
        callback(user);
    }, 3000);
};

getUser(34, userObject => {
    console.log(userObject);
});