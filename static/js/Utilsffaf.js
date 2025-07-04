var glitches = [{amount: 48, iterations: 1, quality: 86, seed: 26},
	{amount: 8, iterations: 4, quality: 58, seed: 30},
	{amount: 32, iterations: 2, quality: 100, seed: 4},
	{amount: 17, iterations: 8, quality: 41, seed: 2},
	{amount: 51, iterations: 10, quality: 60, seed: 15}];
	//{amount: 4, iterations: 9, quality: 48, seed: 5}];

function validateEmail(email) {
	var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return re.test(email);
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function accentsTidy(s) {
    var r = s.toLowerCase();
    non_asciis = {'a': '[àáâãäå]', 'ae': 'æ', 'c': 'ç', 'e': '[èéêë]', 'i': '[ìíîï]', 'n': 'ñ', 'o': '[òóôõö]', 'oe': 'œ', 'u': '[ùúûűü]', 'y': '[ýÿ]'};
    for (i in non_asciis) { r = r.replace(new RegExp(non_asciis[i], 'g'), i); }
    return r;
};

String.prototype.insertAt=function(index, string) { 
	return this.substr(0, index) + string + this.substr(index);
}

String.prototype.replaceAll = function(find, replace) {
    var str = this;
    return str.replace(new RegExp(find, 'g'), replace);
};