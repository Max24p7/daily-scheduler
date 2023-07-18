const today = new Date();
const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };
const time = today.toLocaleDateString('en-US', options);
document.getElementById('currentDay').textContent = time;

// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.

$(function () {
  $(".saveBtn").on("click", function () {
    const timeID = $(this).parent().attr("id"); // get the id of the time-block element
    const value = $(this).siblings("textarea").val(); // get the value of the textarea element
    localStorage.setItem(timeID, value); // store the value using the id as a key
  });
    // TODO: Add a listener for click events on the save button. This code should
    // use the id in the containing time-block as a key to save the user input in
    // local storage. HINT: What does `this` reference in the click listener
    // function? How can DOM traversal be used to get the "hour-x" id of the
    // time-block containing the button that was clicked? How might the id be
    // useful when saving the description in local storage?
    //
    // TODO: Add code to apply the past, present, or future class to each time
    // block by comparing the id to the current hour. HINTS: How can the id
    // attribute of each time-block be used to conditionally add or remove the
    // past, present, and future classes? How can Day.js be used to get the
    // current hour in 24-hour time?
    
  $(".time-block").each(function () {
    const hour = parseInt($(this).attr("id").split("-")[1]); // get the hour from the id and parse it as a number
    const currentHour = dayjs().hour(); // get the current hour in 24-hour time using Day.js
    if (hour < currentHour) {
        $(this).addClass("past"); // add past class if hour is less than current hour
        $(this).removeClass("present"); // remove present class if present
        $(this).removeClass("future"); // remove future class if present
    } else if (hour === currentHour) {
        $(this).addClass("present"); // add present class if hour is equal to current hour
        $(this).removeClass("past"); // remove past class if present
        $(this).removeClass("future"); // remove future class if present
    } else {
        $(this).addClass("future"); // add future class if hour is greater than current hour
        $(this).removeClass("past"); // remove past class if present
        $(this).removeClass("present"); // remove present class if present
    }
  });

    //
    // TODO: Add code to get any user input that was saved in localStorage and set
    // the values of the corresponding textarea elements. HINT: How can the id
    // attribute of each time-block be used to do this?
    //
  $(".time-block").each(function () {
    const timeID = $(this).attr("id"); // get the id of each element
    const value = localStorage.getItem(timeID); // retrieve the value using the id as a key
    $(this).children("textarea").val(value); // set the value of the textarea element
  });
});