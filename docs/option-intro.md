---
id: option-intro
title: Option Introduction
sidebar_label: Introduction
---

If you have previously worked with monads, `Option` will feel a bit familiar but also a bit different. 
You can jump into the #Design decisions and #Differences with other monads sections.

If you haven't previously worked with any kind of monadic programming, this is where you can learn how they can help you.

## What problems option helps solving?

Imagine that you have an application running. It being connected to a different service and receives the data via good old REST.
Usually, the endpoint responds with a structure like this:

```json
{
  "user": {
    "email": "user@email.com",
    "personalData": {
      "firstName": "John",
      "lastName": "Doe"
    }
  }
}
```

But it's not rare, that sometimes you get a different response, for example:
```json
{
  "user": {
    "email": "user@email.com",
  }
}
```

It can happen due to many reasons. New deploy contains a bug, the database didn't had the entries, or in general something went wrong.

What happens in your JS/TS application? It might just break:
```
Uncaught TypeError: Cannot read property 'firstName' of undefined
```

There are multiple ways of approaching such scenario. Monads come from functional languages that don't have the `null` or `undefined` references. 
The undefined value needed to be represented in a different way. Hence the concept of monad was created to deal with them. 

A great advantage of `Option` is that it is really safe. Whenever you try to access value thats nullable, read property from undefined object,
or your `JSON.parse` throws an exception, `Option` will protect you from all of theose issues and provide you a functional API to handle failure.

Assuming, our example app had the following code that broke:

```ts
const firstName: string = data.user.personalData.firstName;
```

We can transform it into an `Option` that's fully safe:

```ts
const firstName: string = pipe(
  option.create(data),
  option.map(data => data.user.personalData.firstName),
  option.getOrElse(() => 'Unknown')
)
```

Totally safe! A bit more code? Sure, but please remember, that monads starts to shine in much bigger cases, where the difference between
classic code and monadic code is not so striking.


**Tip:** If you don't know what is `pipe()` function, it's basically a walkaround for piping functions, until the pipe operator is here to stay (see the proposal 
[here](https://github.com/tc39/proposal-pipeline-operator)).

The above example becames even more clearer with the pipe operator in place:

```ts
const firstName: string = 
  option.create(data) |>
  option.map(data => data.user.personalData.firstName) |>
  option.getOrElse(() => 'Unknown')
```

