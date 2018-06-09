// retrieve user input and convert to variables
//use those variables to run an ajax call to the NY times
//break down the NYT object into usable fields
//dynamically generate html content

//dealing with "edge cases" -- bugs

var key =  "08788d2b9d8147b5899f2628e9016807"
var queryTerm = ""
var numResults = 0;
var startYear = 0;
var endYear = 0;
var articleCounter = 0;
//url base
 var queryURLBase = "https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=" + key;
 


 function runQuery(numArticles, queryURL){
     $.ajax({url: queryURL, method: "GET"})
     .then(function(NYTData){

        //clear wells from the previous run
        $("#wellSection").empty();
         for (i = 0; i < numArticles; i++){
             console.log(NYTData.response.docs[i].headline.main)
             console.log(NYTData.response.docs[i].section_name)
             console.log(NYTData.response.docs[i].pub_date)
             console.log(NYTData.response.docs[i].byline.original)
             console.log(NYTData.response.docs[i].web_url)
             
             //start dumping HTML
             var wellSection = $("<div>");
             wellSection.addClass("well")
             wellSection.attr("id", "articlewell-" + i)
             $("#wellSection").append(wellSection);

             //check if things exist
            if (NYTData.response.docs[i] != "undefined"){
                $("#articlewell-" + i).append("<h3>" +  NYTData.response.docs[i].headline.main + "</h3>");
            }
            if (NYTData.response.docs[i] != "undefined"){
                $("#articlewell-" + i).append("<h5>" + NYTData.response.docs[i].section_name + "</h3>")
            }

            if (NYTData.response.docs[i] != "undefined"){
                $("#articlewell-" + i).append("<h5>" + NYTData.response.docs[i].pub_date + "</h3>")
            }
            if (NYTData.response.docs[i] != "undefined"){
                $("#articlewell-" + i).append("<h5>" + NYTData.response.docs[i].byline.original + "</h3>")
            }
            if (NYTData.response.docs[i] != "undefined"){
                $("#articlewell-" + i).append("<a href=" + NYTData.response.docs[i].web_url +">" + NYTData.response.docs[i].web_url + "</a>")
            }

             //Attach the content to the appropriate well
            
             
             
             
             
         }
         
     })
     
 }

 $("#searchButton").on("click", function(){
     var queryTerm = $("#search").val().trim();
     var newURL = queryURLBase + "&q=" + queryTerm;

     numResults = $("#numRecords").val();

     var startYear = $("#startYear").val().trim();
     var endYear = $("#endYear").val().trim();

     if (parseInt(startYear)){
        startYear = startYear + "0101";
       newURL = newURL + "&begin_date=" + startYear;
    }
    if (parseInt(endYear)){
        endYear = endYear + "0101";
       newURL = newURL + "&end_date=" + endYear;
    }
     
     console.log(newURL);
     
    runQuery(numResults, newURL);
    return false;
 })
 