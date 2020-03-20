/*let somePromise = new Promise((resolve, reject) => {
    setTimeout(() => {
   //     resolve('It is working');
        reject('Unable to fullfil promise');
    }, 2500);
});

somePromise.then((message) => {
    console.log('Success:', message);
}, errorMessage => {
    console.log('Error:', errorMessage);
});
*/
const asyncAdd = (a, b) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if(typeof a === 'number' && typeof b === 'number') {
                return resolve(a + b);
            } else {
                return reject('Not compatable types');
            }
        }, 1500);
    });
};

asyncAdd(3, 4).then((result) => {
    console.log('Result:', result);
    return asyncAdd(result, '13');
}).then(result => {
    console.log('Should be 20', result)
}).catch(errorMessage => {
    console.log(errorMessage);
});