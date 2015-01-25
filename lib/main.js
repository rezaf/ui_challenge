(function() {
  var ctx = $("#myChart").get(0).getContext("2d");
  var pressedButton = "fourteen";

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
        numTotalDataPoints.push(day.length);
        dataPoints.push(_.chain(day)
          .pluck("Activity")
          .reduce(function(sum, num){ return sum + num; }, 0)
          .value());
      });
      var dataPointsPercents = [];
      for (var i = 0; i < dataPoints.length; i++) {
        dataPointPercent = (dataPoints[i] / numTotalDataPoints[i] * 100)
                            .round(2);
        dataPointsPercents.push(dataPointPercent);
      };

      switch (pressedButton) {
        case "fourteen":
          var shownDates = dates.slice(0,14);
          var dataPointsShown = dataPointsPercents.slice(0,14);
          break;
        case "seven":
          var shownDates = dates.slice(7,14);
          var dataPointsShown = dataPointsPercents.slice(7,14);
          break;
        case "three":
          var shownDates = dates.slice(11,14);
          var dataPointsShown = dataPointsPercents.slice(11,14);
          break;
        case "today":
          var shownDates = dates[14];
          var dataPointsShown = dataPointsPercents[14];
          break;
      };

      var data = {
        labels: shownDates,
        datasets: [
          {
            label: "Activity Data",
            fillColor: "rgba(91,192,222,0.2)",
            strokeColor: "rgba(91,192,222,1)",
            pointColor: "rgba(91,192,222,1)",
            pointStrokeColor: "#fff",
            pointHighlightFill: "#fff",
            pointHighlightStroke: "rgba(91,192,222,1)",
            data: dataPointsShown
          }
        ]
      };

      var myLineChart = new Chart(ctx).Line(data, {
        tooltipTemplate: "<%= value %>%",
        scaleLabel: "<%= value %>%",
        bezierCurve: false
      });
    }
  });

  $('.btn').on('click', function(){
    $('.active').button('toggle');
    $(this).button('toggle');
    pressedButton = $('.active').prop('id');
    myLineChart.update();
  });
}());
