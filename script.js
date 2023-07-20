//CREATE TIMER AT TOP OF PAGE (DAY, MM DD YYYY, TIME)
const today = new Date();
const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };
const time = today.toLocaleDateString('en-US', options);
document.getElementById('currentDay').textContent = time;

$(function () {
  $(".saveBtn").on("click", function () {
    const timeID = $(this).parent().attr("id");
    const value = $(this).siblings("textarea").val(); //retrive the value of the textarea element
    localStorage.setItem(timeID, value); //store the value
  });
    
  $(".time-block").each(function () { //function for painting the hours by past/present/future.
    const hour = parseInt($(this).attr("id").split("-")[1]); // get the hour from the id and parse it as a number
    const currentHour = dayjs().hour(); //get the current time using day.js
    if (hour < currentHour) {            //if the hour is in the past, make the background color gray
        $(this).addClass("past");
        $(this).removeClass("present");
        $(this).removeClass("future"); 
    } else if (hour === currentHour) {  //if the hour is current, make the background color red
        $(this).addClass("present");
        $(this).removeClass("past");
        $(this).removeClass("future");
    } else {                            //if the hour is in the future, make the background color green
        $(this).addClass("future");
        $(this).removeClass("past");
        $(this).removeClass("present"); 
    }
  });

  $(".time-block").each(function () {
    const timeID = $(this).attr("id"); // get the id of each element
    const value = localStorage.getItem(timeID); //retrieves previous saved info from local storage
    $(this).children("textarea").val(value); //set the value from storage
  });
});