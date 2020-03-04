console.log('Starting the app');


setTimeout(() => {
    console.log('Second callback');
}, 0);

setTimeout(() => {
    console.log('Inside of callback');
}, 2000);


console.log('Finishing the app');
