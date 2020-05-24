const brain = require('brain.js');

//const trainingData = [
	//'alon rapeandolo, siempre on',
	//'alon es mi persona favorita en el mundo',
	//'alon whats going on',
	//'hoy es un dia de sol',
	//'la nasa descubre un universo paralelo',
//];

const lstm = new brain.recurrent.LSTM();

const result = lstm.train(trainingData, {
	iterations: 100,
	log: details => console.log(details),
	errorThresh: 0.01,
});

console.log(lstm);
console.log(lstm.run('noche'));
