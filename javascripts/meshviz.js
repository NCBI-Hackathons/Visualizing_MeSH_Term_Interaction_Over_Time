nv.addGraph(function() {
    var chart = nv.models.lineWithFocusChart();

    chart.brushExtent([1985,1995]);

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
    
    var freq_url = "/freqs?terms="+query;

    var jqxhr = $.get(freq_url , function(data,textStatus,jqXHR) {
        my_data = JSON.parse(data)["data"];
        nv.addGraph(function() {
            var chart = nv.models.lineWithFocusChart();
            chart.brushExtent([1985,1995]);
            chart.yTickFormat(d3.format(',')); 
            chart.useInteractiveGuideline(true);
            d3.select('#chart svg')
                .datum(my_data)
                .call(chart);

            nv.utils.windowResize(chart.update);
            return chart;
        });
        $('#viz-button').text('Visualize');
    }).fail(function(data, error){
        alert(JSON.stringify(data));
    });
    
    var cloud_url = "/wcloud?start=1985&end=1995&qterms="+query;
    
    
    
    var jqxhr = $.get(cloud_url , function(data,textStatus,jqXHR) {
        my_data = JSON.parse(data);
        
        /*var words = [
            {text: "Abdo", weight: 13, link: "#"},
            {text: "Ipsum", weight: 10.5, link: "#"},
            {text: "Dolor", weight: 9.4, link: "#"},
            {text: "Sit", weight: 8, link: "#"},
            {text: "Amet", weight: 6.2, link: "#"},
            {text: "Consectetur", weight: 5, link: "#"},
            {text: "Adipiscing", weight: 5, link: "#"}
        ];*/

        $(function() {
            $("#cloud").jQCloud(my_data);
        });
        
    }).fail(function(data, error){
        alert(JSON.stringify(data));
    });
    
    /*nv.addGraph(function() {
    var chart = nv.models.lineWithFocusChart();

    chart.brushExtent([1985,1995]);

    chart.yTickFormat(d3.format(','));

    chart.useInteractiveGuideline(true);
    
    my_data = [{"key": "Diabetes Mellitus", "values": [{"x": 1965, "y": 1026}, {"x": 1966, "y": 839}, {"x": 1967, "y": 1025}, {"x": 1968, "y": 1225}, {"x": 1969, "y": 1178}, {"x": 1970, "y": 1243}, {"x": 1971, "y": 1379}, {"x": 1972, "y": 1287}, {"x": 1973, "y": 1182}, {"x": 1974, "y": 1262}, {"x": 1975, "y": 1193}, {"x": 1976, "y": 1272}, {"x": 1977, "y": 1309}, {"x": 1978, "y": 1328}, {"x": 1979, "y": 1558}, {"x": 1980, "y": 1531}, {"x": 1981, "y": 1575}, {"x": 1982, "y": 1682}, {"x": 1983, "y": 1522}, {"x": 1984, "y": 1031}, {"x": 1985, "y": 1088}, {"x": 1986, "y": 1076}, {"x": 1987, "y": 939}, {"x": 1988, "y": 983}, {"x": 1989, "y": 1096}, {"x": 1990, "y": 1221}, {"x": 1991, "y": 1073}, {"x": 1992, "y": 1035}, {"x": 1993, "y": 1109}, {"x": 1994, "y": 1080}, {"x": 1995, "y": 1146}, {"x": 1996, "y": 1167}, {"x": 1997, "y": 1407}, {"x": 1998, "y": 1458}, {"x": 1999, "y": 1515}, {"x": 2000, "y": 1709}, {"x": 2001, "y": 2036}, {"x": 2002, "y": 2540}, {"x": 2003, "y": 2575}, {"x": 2004, "y": 2559}, {"x": 2005, "y": 2417}, {"x": 2006, "y": 2635}, {"x": 2007, "y": 2671}, {"x": 2008, "y": 2689}, {"x": 2009, "y": 2927}, {"x": 2010, "y": 3032}, {"x": 2011, "y": 3315}, {"x": 2012, "y": 3471}, {"x": 2013, "y": 3463}, {"x": 2014, "y": 3651}, {"x": 2015, "y": 3402}]}, {"key": "Neoplasms", "values": [{"x": 1965, "y": 4373}, {"x": 1966, "y": 1261}, {"x": 1967, "y": 1441}, {"x": 1968, "y": 1511}, {"x": 1969, "y": 1603}, {"x": 1970, "y": 1662}, {"x": 1971, "y": 1793}, {"x": 1972, "y": 1929}, {"x": 1973, "y": 1840}, {"x": 1974, "y": 2163}, {"x": 1975, "y": 2201}, {"x": 1976, "y": 2259}, {"x": 1977, "y": 2353}, {"x": 1978, "y": 2589}, {"x": 1979, "y": 2755}, {"x": 1980, "y": 2834}, {"x": 1981, "y": 2916}, {"x": 1982, "y": 3067}, {"x": 1983, "y": 3307}, {"x": 1984, "y": 3468}, {"x": 1985, "y": 3545}, {"x": 1986, "y": 3622}, {"x": 1987, "y": 3363}, {"x": 1988, "y": 3579}, {"x": 1989, "y": 3828}, {"x": 1990, "y": 4067}, {"x": 1991, "y": 4055}, {"x": 1992, "y": 3958}, {"x": 1993, "y": 4215}, {"x": 1994, "y": 4449}, {"x": 1995, "y": 4246}, {"x": 1996, "y": 4823}, {"x": 1997, "y": 4615}, {"x": 1998, "y": 4710}, {"x": 1999, "y": 5017}, {"x": 2000, "y": 5318}, {"x": 2001, "y": 6101}, {"x": 2002, "y": 6669}, {"x": 2003, "y": 7493}, {"x": 2004, "y": 7998}, {"x": 2005, "y": 8426}, {"x": 2006, "y": 8914}, {"x": 2007, "y": 9659}, {"x": 2008, "y": 10453}, {"x": 2009, "y": 10587}, {"x": 2010, "y": 11848}, {"x": 2011, "y": 12448}, {"x": 2012, "y": 12964}, {"x": 2013, "y": 14005}, {"x": 2014, "y": 14592}, {"x": 2015, "y": 14392}]}, {"key": "co-occurrence", "values": [{"x": 1965, "y": 15}, {"x": 1966, "y": 9}, {"x": 1967, "y": 13}, {"x": 1968, "y": 26}, {"x": 1969, "y": 20}, {"x": 1970, "y": 19}, {"x": 1971, "y": 22}, {"x": 1972, "y": 17}, {"x": 1973, "y": 13}, {"x": 1974, "y": 20}, {"x": 1975, "y": 14}, {"x": 1976, "y": 8}, {"x": 1977, "y": 13}, {"x": 1978, "y": 12}, {"x": 1979, "y": 24}, {"x": 1980, "y": 18}, {"x": 1981, "y": 14}, {"x": 1982, "y": 26}, {"x": 1983, "y": 9}, {"x": 1984, "y": 14}, {"x": 1985, "y": 19}, {"x": 1986, "y": 14}, {"x": 1987, "y": 12}, {"x": 1988, "y": 12}, {"x": 1989, "y": 17}, {"x": 1990, "y": 12}, {"x": 1991, "y": 17}, {"x": 1992, "y": 19}, {"x": 1993, "y": 24}, {"x": 1994, "y": 22}, {"x": 1995, "y": 18}, {"x": 1996, "y": 17}, {"x": 1997, "y": 16}, {"x": 1998, "y": 28}, {"x": 1999, "y": 26}, {"x": 2000, "y": 46}, {"x": 2001, "y": 46}, {"x": 2002, "y": 48}, {"x": 2003, "y": 51}, {"x": 2004, "y": 64}, {"x": 2005, "y": 59}, {"x": 2006, "y": 59}, {"x": 2007, "y": 89}, {"x": 2008, "y": 83}, {"x": 2009, "y": 84}, {"x": 2010, "y": 106}, {"x": 2011, "y": 112}, {"x": 2012, "y": 111}, {"x": 2013, "y": 124}, {"x": 2014, "y": 143}, {"x": 2015, "y": 120}]}]
        
    d3.select('#chart svg')
            .datum(my_data)
            .call(chart);

        nv.utils.windowResize(chart.update);
        return chart;
    });*/
    
})