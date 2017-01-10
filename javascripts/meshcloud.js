var words = [
  {text: "Lorem", weight: 13, link: "#"},
  {text: "Ipsum", weight: 10.5, link: "#"},
  {text: "Dolor", weight: 9.4, link: "#"},
  {text: "Sit", weight: 8, link: "#"},
  {text: "Amet", weight: 6.2, link: "#"},
  {text: "Consectetur", weight: 5, link: "#"},
  {text: "Adipiscing", weight: 5, link: "#"}
];

$(function() {
    $("#cloud").jQCloud(words);
});