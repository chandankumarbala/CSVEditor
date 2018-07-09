
jQuery.fn.dataTableExt.oSort["date-desc"] = function (x, y) {
    return getDate(x) < getDate(y);
};
 
 jQuery.fn.dataTableExt.oSort["date-asc"] = function (x, y) {
    return getDate(x) > getDate(y);
}
$(function(){

    $("#showTable").click(function(){
        var content= $("#content").val();
        var arrData = CSVToArray( content.trim(), "," );
        var columns=arrData[0];

        var header="<thead><tr>";
        columns.forEach(element => {
            header+="<td>"+element+"</td>";
        });
        header+="</tr></thead>";
       
        var onlyData=arrData.splice(0, 1);

        var tableBody="<tbody>";
        $.each(arrData, function(key, value) {
            tableBody+="<tr>";
            $.each(value, function(key1, value1) {
                tableBody+="<td>"+value1+"</td>";
                console.log(value1);
              });
              tableBody+="</tr>";
           
          });
          tableBody+="</tbody>";

     

        var htmlContent=header+tableBody;
        var events=$("#contentFiltered");
        var table=$("#excel").html(htmlContent).DataTable(
            {
                paging:   false,
                dom: 'Bfrtip',
                select: true,
                buttons: [
                    {
                        text: 'Get selected data',
                        action: function () {
                            var rows = table.rows( { selected: true } ).data();
                            //events.val( rows );
                            var exixtingCSV=events.html();
                            $.each(rows, function(key, value) {
                                $.each(value, function(key1, value1) {
                                    exixtingCSV+='"'+value1+'"';
                                    exixtingCSV+=key1<value.length-1?",":"&#13;&#10;";
                                 });
                            });
                            events.html(exixtingCSV);
                            //console.log(rows[0]+exixtingCSV);
                        }
                    }
                ]
            }
        );
        
        $('#excel tbody').on( 'click', 'tr', function () {
            $(this).toggleClass('selected');
        } ); 
        

       
    });

    $("#filteredContent").click(function(){

        var idx = table
    .columns( '.check' )
    .data()
    });
 
    
 });


 function reParseArrayToCSV(element,arr){
     var exixtingCSV=element.val();
    $.each(arr, function(key, value) {
        exixtingCSV+='"'+value+'",';
    });
    return exixtingCSV;
 }
 

 function getDate(x){
     console.log(new Date(x).getTime());
    return new Date(x).getTime();
 }
 


 function CSVToArray( strData, strDelimiter ){
    // Check to see if the delimiter is defined. If not,
    // then default to comma.
    strDelimiter = (strDelimiter || ",");
    // Create a regular expression to parse the CSV values.
    var objPattern = new RegExp(
        (
            // Delimiters.
            "(\\" + strDelimiter + "|\\r?\\n|\\r|^)" +

            // Quoted fields.
            "(?:\"([^\"]*(?:\"\"[^\"]*)*)\"|" +

            // Standard fields.
            "([^\"\\" + strDelimiter + "\\r\\n]*))"
        ),
        "gi"
        );


    // Create an array to hold our data. Give the array
    // a default empty first row.
    var arrData = [[]];

    // Create an array to hold our individual pattern
    // matching groups.
    var arrMatches = null;


    // Keep looping over the regular expression matches
    // until we can no longer find a match.
    while (arrMatches = objPattern.exec( strData )){

        // Get the delimiter that was found.
        var strMatchedDelimiter = arrMatches[ 1 ];
       
        // Check to see if the given delimiter has a length
        // (is not the start of string) and if it matches
        // field delimiter. If id does not, then we know
        // that this delimiter is a row delimiter.
        if (
            strMatchedDelimiter.length &&
            strMatchedDelimiter !== strDelimiter
            ){

            // Since we have reached a new row of data,
            // add an empty row to our data array.
            arrData.push( [] );

        }

        var strMatchedValue;

        // Now that we have our delimiter out of the way,
        // let's check to see which kind of value we
        // captured (quoted or unquoted).
        if (arrMatches[ 2 ]){

            // We found a quoted value. When we capture
            // this value, unescape any double quotes.
            strMatchedValue = arrMatches[ 2 ].replace(
                new RegExp( "\"\"", "g" ),
                "\""
                );
                
        } else {

            // We found a non-quoted value.
            strMatchedValue = arrMatches[ 3 ];

        }


        // Now that we have our value string, let's add
        // it to the data array.
        arrData[ arrData.length - 1 ].push( strMatchedValue );
    }

    // Return the parsed data.
    return( arrData );
}
