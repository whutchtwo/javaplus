// array declaration:
var quotes = [
	[ 'Decide that you want it more than you are afraid of it.', 'Bill Cosby' ],
	[ 'All war is based on deception.', 'Sun Tzu' ],
	[ 'Every normal person, in fact, is only normal on the average. His ego approximates to that of the psychotic in some part or other and to a greater or lesser extent.', 'Sigmund Frued' ],
	[ 'Any fool can criticize, condemn and complain and most fools do.', 'Benjamin Franklin' ],
	[ 'If you think your teacher is tough, wait until you get a boss. He doesn\'t have tenure.', 'Bill Gates' ],
	[ 'A person who never made a mistake never tried anything new.', 'Albert Einstein' ]
]

// function usage:
$('#rotate').loadQuote( quotes, 10000 ); // ( array, interval )