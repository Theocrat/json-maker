# json-maker
A drag-and-drop tool to graphically create a JSON data file, using client-side HTML 5.

## Introduction
As we enter an increasingly digital world, common people are introduced steadily into ever more technical terminology. One of the consequences of this transformation is that ordinary people with little to no training in computer programming are sometimes required to work with complex information systems. Unforeseen problems emerge continually as human beings are increasingly drawn into the world of coding, where tight syntax intimidate the inexperienced, and mild errors such as defaulting a single comma can lead to catastrophic outcomes.

When clashes occur between an inexperienced individual and an intolerant parser, it is always a nightmare for the individual in question. This project aims to circumvent that very problem while writing JSON files by offering a free, web-hosted tool to create JSON data with drag-and-drop components, which can be neatly arranged into a graph which accurately depicts the relationship between data items.

## Objectives
Using client-side HTML 5 (which includes JS 6 and CSS 3) a GUI tool with a drag-and-drop interface implementing the following features are to be constructed in this project:
```md
Legends:
-------
[ ] -> Not completed
[.] -> Partially Completed
[X] -> Completed
[!] -> Encountered obstacle while building this

Status:
------
  [x] Toolbox with interface buttons, which helpful images
  [X] Text area for displaying the output JSON
  [X] Large interactive region for placing and connecting components on
  [X] Functionality: Components created when interface buttons are pressed.
  [X] Components thus created can be placed in the interactive region
  [X] Components thus created are linked by visible lines to parent components.
  [X] Those components are interactive, response to clicks, allow changing their values and keys
  [X] Those components carry text detailing whats in them
  [X] Components are of different types, depending on datatype
  [X] Components, once placed, can be dragged and rearranged
  [ ] Components, once placed, can be deleted
  [X] Real-time appearance of JSON code in textarea as components are placed or deleted
  [ ] Graph so generated is remembered using `localStorage` or equivalent and is not lost upon refreshing
  [ ] Graph so generated can be exported, and then imported - by exporting or importing a field in `localStorage` etc.
```

## Deployment
It is intended that this tool shall be freely accessible - free as in freedom and free beer, both. Hence, now that the essential features have been created, the tool is deployed using GitHub Pages.

You can find the JSON Maker on this [Github Pages link](https://theocrat.github.io/json-maker)

## Acknowledgements

### Kaustubh Roy
Nothing is done unless someone thinks of doing it. The idea of building a drag-and-drop JSON builder using client-side HTML5 was born during a brainstorming session with my colleague and friend [Kaustubh Roy](https://github.com/kaustubhroyvlabs).

We have collaborated before - on my [Random Walk project](https://github.com/Theocrat/RandomWalk) - and Kaustubh has always been a tremendous support and a great source of ideas for me.
