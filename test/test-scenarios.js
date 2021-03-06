var yadda = new Yadda(steps);

test('Developer runs a test step', function() {
	yadda.yadda([
	    "Given a new Yadda instance",
	    "when Dirk adds a test step, 'Blah blah blah'",
	    "and runs 'Blah blah blah'",
	    "then 'Blah blah blah' is executed 1 time"
    ])
});

test('Developer uses regex groups to define test step arguments', function() {
	yadda.yadda([
		"Given a new Yadda instance",
		"when Dirk adds a test step, 'count up to (\\d+) and down to (\\d+)'",
		"and runs 'count up to 10 and down to 5'",
		"then 'count up to (\\d+) and down to (\\d+)' is invoked with arguments 10 and 5"
	])
});

test('Developer uses placeholders to define test step arguments', function() {
	yadda.yadda([
		"Given a new Yadda instance with step options {'prefix': '$'}",
		"when Dirk adds a test step, 'count up to $upper and down to $lower'",
		"and runs 'count up to 10 and down to 5'",
		"then 'count up to $upper and down to $lower' is invoked with arguments 10 and 5",

		"when Dirk adds a test step, '\$number is the magic number'",
		"and runs '10 is the magic number'",
		"then '$number is the magic number' is invoked with argument 10"
	])
});

test('Developer escapes placeholder prefix', function() {
	yadda.yadda([
		"Given a new Yadda instance with step options {'prefix': '$'}",
		"when Dirk adds a test step, '\\$$amount1 plus \\$$amount2 is \\$$total'",
		"and runs '$10 plus $10 is $20'",
		"then '\\$$amount1 plus \\$$amount2 is \\$$total' is invoked with arguments 10, 10 and 20"
	])
});


test('Developer uses an alternative prefix to idenfify placeholders', function() {
	yadda.yadda([
		"Given a new Yadda instance with step options {'prefix': '&'}",
		"when Dirk adds a test step, 'count up to &upper and down to &lower'",
		"and runs 'count up to 10 and down to 5'",
		"then 'count up to &upper and down to &lower' is invoked with arguments 10 and 5"
	])
});

test('Developer adds a scenario scoped variable to the execution context', function() {
	yadda.yadda([
		"Expect the execution context to contain a variable 'name' with value 'Fred'",
		"and the execution context to still contain a variable 'name' with value 'Fred'"
	], {name: 'Fred'})
});

test('Developer adds a conflicting literal test step', function() {
	yadda.yadda([
		"Given a new Yadda instance",
		"when Dirk adds a test step, 'Blah blah blah'",
		"then he is prevented from adding a conflicting test step, 'Blah blah blah'"
	])
});

test('Developer adds a conflicting regex test step', function() {
	yadda.yadda([
		"Given a new Yadda instance",
		"when Dirk adds a test step, 'Blah (.+) blah'",
		"then he is prevented from adding a conflicting test step, 'Blah (.+) blah'"
	])
});

test('Developer attempts to run a test step with an ambiguous template, where a best match cannot be determined', function() {
	yadda.yadda([
		"Given a new Yadda instance",
		"when Dirk adds a test step, 'Blah (.+) blah'",
		"and adds another test step, 'Blah (.*) blah'",
		"then he is prevented from running an ambiguous test step, 'Blah blah blah'"
	])
});

test('Developer runs a test step with an ambiguous template, where a best match can be determined', function() {
	yadda.yadda([
		"Given a new Yadda instance",
		"when Dirk adds a test step, 'Given pirate (.+) parrot has green feathers'",
		"and adds another test step, 'Given pirate (.+) old parrot has green feathers'",
		"and runs 'Given pirate Rob\'s parrot has green feathers'",
		"then 'Given pirate (.+) parrot has green feathers' is executed 1 time",
		"but 'Given pirate (.+) old parrot has green feathers' is executed 0 times",

		"when Dirk runs 'Given pirate Rob\'s old parrot has green feathers' is run'",
		"then 'Given pirate (.+) parrot has green feathers' is executed 1 time",		
		"and 'Given pirate (.+) old parrot has green feathers' is executed 1 time"
	])
});