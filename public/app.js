// Grab the articles as a json
$(document).on("click", "#scraper", function() {
    var input = $("#scrape").val();
    $.ajax({
        method: "POST",
        url: "/scrape",
        data: {
          sub: input
        }
      }).done(function(data) {
        console.log(data)
        $("#articles").html('');
        // For each one
        for (var i = 0; i < data.length; i++) {
            // Display the apropos information on the page
            var card = $('<div>', { class: 'panel panel-success pnl'});
            var btn = $('<button>',  { class: 'btn btn-success savebtn', id: "savebtn", link: data[i].link, title: data[i].title});
            btn.append('Save');
            var title = $('<div>',  { class: 'panel-heading'});
            title.append('<h3><a href="' + data[i].link + '">' + data[i].title + '</a></h3>');
            var body = $('<div>',  { class: 'panel-body'});
            body.append(btn);
            card.append(title)
            card.append(body)
            $("#articles").append(card);
        }
    });
});
$(document).on("click", "#savebtn", function() {
    // Now, save that entry to the db
    console.log("cl")
    var titleI = $(this).attr("title");
    var linkI = $(this).attr("link");
    // Run a POST request to change the note, using what's entered in the inputs
    $.ajax({
      method: "POST",
      url: "/save",
      data: {
        // take values from button
        title: titleI,
        link: linkI
      }
    })
    // With that done
    .done(function(data) {
    // Log the response
    console.log(data);
    });
});

$("#SA").on("click", function() {
    $.getJSON("/articles", function(data) {
        console.log(data)
        $("#articles").html('');
        // For each one
        for (var i = 0; i < data.length; i++) {
        // Display the information on the page
        var card = $('<div>', { class: 'panel panel-info pnl', id: data[i]._id});
        var btn = $('<button type="button " data-id="' + data[i]._id +'" class="btn btn-info btn-lg MB" data-toggle="modal" data-target="#myModal">New Note</button>');
        var delbtn = $('<button type="button " data-id="' + data[i]._id +'" class="btn btn-warning btn-lg DB">Delete</button>');
        var title = $('<div>',  { class: 'panel-heading'});
        title.append('<h3><a href="' + data[i].link + '">' + data[i].title + '</a></h3>');
        var body = $('<div>',  { class: 'panel-body'});
        body.append(btn);
        body.append(delbtn);
        card.append(title)
        card.append(body)

        $("#articles").append(card);
        }
    });
});

$(document).on("click", ".MB", function() {
    // Empty the notes from the note section
    $("#notes").empty();
    // Save the id from the p tag
    var thisId = $(this).attr("data-id");
    $('#articleNote').attr('data-id', thisId);
    // Now make an ajax call for the Article
    $.ajax({
      method: "GET",
      url: "/articles/" + thisId
    })
      // With that done, add the note information to the page
    .done(function(data) {
        console.log(data.note)
            // The title of the article
        $("#notes").append("<div class='panel panel-info'>" + data.note.body + "</div>");
    })
});

$("#articleNote").on("click", function() {
    $("#notes").html('');
    var thisId = $(this).attr("data-id");
    $.ajax({
        method: "POST",
        url: "/articles/" + thisId,
        data: {
          // Value taken from note textarea
          body: $("#note").val()
        }
      })
        // With that done
        .done(function(data) {
          // Log the response
          console.log(data);
          // Empty the notes section
          $("#notes").empty();
        });
});

$(document).on("click", ".DB", function() {
    var thisId = $(this).attr("data-id");
    $.ajax({
        method: "DELETE",
        url: "/articles/" + thisId + "/remove",
    })
    .done(function(data) {
        $.getJSON("/articles", function(data) {
            console.log(data)
            $("#articles").html('');
            // For each one
            for (var i = 0; i < data.length; i++) {
            // Display the information on the page
            var card = $('<div>', { class: 'panel panel-info pnl', id: data[i]._id});
            var btn = $('<button type="button " data-id="' + data[i]._id +'" class="btn btn-info btn-lg MB" data-toggle="modal" data-target="#myModal">New Note</button>');
            var delbtn = $('<button type="button " data-id="' + data[i]._id +'" class="btn btn-warning btn-lg DB">Delete</button>');
            var title = $('<div>',  { class: 'panel-heading'});
            title.append('<h3><a href="' + data[i].link + '">' + data[i].title + '</a></h3>');
            var body = $('<div>',  { class: 'panel-body'});
            body.append(btn);
            body.append(delbtn);
            card.append(title)
            card.append(body)

            $("#articles").append(card);
            }
        });
    });
});




