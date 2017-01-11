function setWordCloud(start, end, terms){
    var cloud_url = "/wcloud?start=" + start + "&end=" + end + "&qterms=" + terms;
    
    var jqxhr = $.get(cloud_url , function(data,textStatus,jqXHR) {
        my_data = JSON.parse(data);

        $(function() {
            $("#cloud").jQCloud(my_data);
        });
        
    }).fail(function(data, error){
        alert(JSON.stringify(data));
    });
}

function updateWordCloud(start, end, terms){
    var cloud_url = "/wcloud?start=" + start + "&end=" + end + "&qterms=" + terms;
    
    var jqxhr = $.get(cloud_url , function(data,textStatus,jqXHR) {
        my_data = JSON.parse(data);
        
        $(function() {
            //$('#cloud').jQCloud('destroy');
            $("#cloud").jQCloud(my_data);
        });
        
    }).fail(function(data, error){
        alert(JSON.stringify(data));
    });
    
}

nv.addGraph(function() {
    var chart = nv.models.lineWithFocusChart();

    chart.brushExtent([1980,2000]);

    //chart.xAxis.tickFormat(d3.format(',f')).axisLabel("Stream - 3,128,.1");
    //chart.x2Axis.tickFormat(d3.format(',f'));

    chart.yTickFormat(d3.format(','));

    chart.useInteractiveGuideline(true);

    initial_data = [{'key': 'No Terms Entered', 'values': [{'x': 1965, 'y': 0}, {'x': 1966, 'y': 0}, {'x': 1967, 'y': 0}, {'x': 1968, 'y': 0}, {'x': 1969, 'y': 0}, {'x': 1970, 'y': 0}, {'x': 1971, 'y': 0}, {'x': 1972, 'y': 0}, {'x': 1973, 'y': 0}, {'x': 1974, 'y': 0}, {'x': 1975, 'y': 0}, {'x': 1976, 'y': 0}, {'x': 1977, 'y': 0}, {'x': 1978, 'y': 0}, {'x': 1979, 'y': 0}, {'x': 1980, 'y': 0}, {'x': 1981, 'y': 0}, {'x': 1982, 'y': 0}, {'x': 1983, 'y': 0}, {'x': 1984, 'y': 0}, {'x': 1985, 'y': 0}, {'x': 1986, 'y': 0}, {'x': 1987, 'y': 0}, {'x': 1988, 'y': 0}, {'x': 1989, 'y': 0}, {'x': 1990, 'y': 0}, {'x': 1991, 'y': 0}, {'x': 1992, 'y': 0}, {'x': 1993, 'y': 0}, {'x': 1994, 'y': 0}, {'x': 1995, 'y': 0}, {'x': 1996, 'y': 0}, {'x': 1997, 'y': 0}, {'x': 1998, 'y': 0}, {'x': 1999, 'y': 0}, {'x': 2000, 'y': 0}, {'x': 2001, 'y': 0}, {'x': 2002, 'y': 0}, {'x': 2003, 'y': 0}, {'x': 2004, 'y': 0}, {'x': 2005, 'y': 0}, {'x': 2006, 'y': 0}, {'x': 2007, 'y': 0}, {'x': 2008, 'y': 0}, {'x': 2009, 'y': 0}, {'x': 2010, 'y': 0}, {'x': 2011, 'y': 0}, {'x': 2012, 'y': 0}, {'x': 2013, 'y': 0}, {'x': 2014, 'y': 0}, {'x': 2015, 'y': 0}]}];
        
    d3.select('#chart svg')
            .datum(initial_data)
            .call(chart);

    nv.utils.windowResize(chart.update);
    
    return chart;
});

$('#viz-button').click(function(sender, e){
    
    var query = $('#mesh-terms').val();
    if(query === ""){
        alert("Please, enter MeSH terms separated by semicolons!");
        return;
    }
    
    $('#viz-button').text('loading ..');
    query = query.replace(",", "|");
    query = query.replace("_", ",");
    
    var freq_url = "/freqs?terms="+query;

    var jqxhr = $.get(freq_url , function(data,textStatus,jqXHR) {
        my_data = JSON.parse(data)["data"];
        nv.addGraph(function() {
            var chart = nv.models.lineWithFocusChart();
            chart.brushExtent([1980,2000]);
            chart.yTickFormat(d3.format(',')); 
            chart.useInteractiveGuideline(true);
            d3.select('#chart svg')
                .datum(my_data)
                .call(chart);

            nv.utils.windowResize(chart.update);
            
            // update word cloud when the brush is moved
            d3.select('#chart svg').on('click', function(){
                
                var range = JSON.stringify(chart.brushExtent());
                range = range.substr(1, range.length-2)
                var start = range.split(',')[0].split('.')[0];
                var end = range.split(',')[1].split('.')[0];
        
                var query = $('#mesh-terms').val();
                query = query.replace(",", "|");
                query = query.replace("_", ",");
        
                updateWordCloud(start, end, query);
            });
            return chart;
        });
        $('#viz-button').text('Visualize');
    }).fail(function(data, error){
        alert(JSON.stringify(data));
    });
    
    setWordCloud('1980', '2000', query);  
});