(function() {
  var ctx = $("#myChart").get(0).getContext("2d");

  Papa.parse("http://0.0.0.0:8080/data/sample_data.csv", {
    header: true,
    dynamicTyping: true,
  	download: true,

  	complete: function(results){
      var dates = _.pluck(results.data, 'Date');
      dates = _.uniq(dates);
      var activityByDate = _.groupBy(results.data, 'Date');
      var dataPoints = [];
      var numTotalDataPoints = [];
      _.each(activityByDate, function(day){
        // debugger
        numTotalDataPoints.push(day.length);
        dataPoints.push(_.chain(day)
          .pluck("Activity")
          .reduce(function(sum, num){ return sum + num; }, 0)
          .value());
      });
      // var dataPointsSum = _.reduce(dataPoints, function(sum, num){
      //   return sum + num
      // }, 0);
      // var dataPointsPercents = _.map(dataPoints, function(num){
      //   return (num / dataPointsSum * 100).round(2)
      // });
      var dataPointsPercents = [];
      for (var i = 0; i < dataPoints.length; i++) {
        dataPointsPercents.push((dataPoints[i] / numTotalDataPoints[i] * 100).round(2));
      }
      // var dataPointsPercents = _.map(dataPoints, function(num){
      //   return (num / dataPoints[i] * 100).round(2)
      // });
      var data = {
        labels: dates,
        datasets: [
          {
            label: "Activity Data",
            fillColor: "rgba(100,149,237,0.2)",
            strokeColor: "rgba(100,149,237,1)",
            pointColor: "rgba(100,149,237,1)",
            pointStrokeColor: "#fff",
            pointHighlightFill: "#fff",
            pointHighlightStroke: "rgba(100,149,237,1)",
            data: dataPointsPercents
          }
        ]
      };
      var myLineChart = new Chart(ctx).Line(data, {
        tooltipTemplate: "<%= value %>%",
        scaleLabel: "<%=value%>%",
        bezierCurve: false
      });
    }
  });
}());
