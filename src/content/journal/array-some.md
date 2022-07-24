---
title: Checking conditions using Array.some()
description: Today I leant how to use the some() method on an array to check if user input contained a list of keywords.
tags: ['JavaScript', 'TIL', article]
date: 2021-04-22
---

Today I learnt how to use `Array.some()`.

The problem I was facing involved a function that took a user input of type string and the purpose of the function was to loop through an array containing strings, returning true if the user input contained a string from the array or false if there were no matches. The user input string would represent a hierarchical structure similar to `"continent/country/city"` while the items in the array could be a continent, country or city.

In pseudo code the problem looks like the snippet below:

```shell
function doSomething(userinput) {
	for each string in the array {
		does userInput contain the string?
		if yes {
			return true;
		}
		else {
			check next string
		}
	}
	if userInput did not match any string in the array {
		return false
	}
}
```

While the pseudo code could have been translated into JavaScript, writing the logic and then verifying it works correctly would have been worthy of its own unit test - something I don't mind doing but would rather not if there is an existing API that can be used. I then started looking through the [MDN Web Docs](https://developer.mozilla.org/en-US/). Ideally I wanted an API similar to `string.includes()` that would allow me to pass an array of strings as a parameter.

## Array.some()

The [Mozilla documentation for Array.some](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/some) states that:

> "The `some()` method tests whether at least one element in the array passes the test implemented by the provided function. It returns true if, in the array, it finds an element for which the provided function returns true; otherwise it returns false. It doesn't modify the array."

This was ideal an idea solution to my problem. By using `some()` I could then pass a function that would check if the user input string contained any of the strings from the array.

I was then able to apply the `some()` method, resulting in JavaScript code that looks like the snippet below:

```js
const filters = ['England', 'France', 'Spain'];
const test1 = 'Europe/England/Brighton';
const test2 = 'Europe/Italy/Rome';

function doSomething(userInput) {
  return filters.some((filter) => userInput.includes(filter));
}

doSomething(test1); // returns true
doSomething(test2); // returns false
```
