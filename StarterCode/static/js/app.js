// A. DATA SETUP
// 1. Access data using d3.jason call to samples.jason (heather video)

function buildSample(value){
  d3.json('samples.json').then(data => {
    console.log("sample value: ",value);
    console.log(data);

  // 2. Create Variables/Arrays for traces
    // Test subject ID for drop down
    let subjects = data.names;
    console.log (subjects);
    
    // put top 10 samples values in aray for x-axis
    let sample = value;
    let samples = data.samples;
    var filteredSamples = samples.filter(sampleObject => sampleObject.id == sample);
    console.log(filteredSamples);
    var filtValuesSlice = filteredSamples[0].sample_values.slice(0,10);
    console.log(filtValuesSlice);

    // put top out_ids in aray for y-axis
    var filtOtuSlice = filteredSamples[0].otu_ids.slice(0,10);
    console.log(filtOtuSlice);

    // put top out_id labels into aray for text display in chart
    var filtOtuLablesSlice = filteredSamples[0].otu_labels.slice(0,10);
    console.log(filtOtuLablesSlice);

  // B. EVENTS SETUP
  // 1. Populate Dropdown with list of Subjects
  //var message = ("Choose a Subject");
  var seldataset = d3.select("#selDataset");

  function appendOption(item, index) {
    seldataset.append("option")
    .attr("value", item).html(item);
  }

  subjects.forEach(appendOption);

  // C. Plot horizontal bar chart
  var trace1 = {
    x: filtValuesSlice,
    y: filtOtuSlice,
    text: filtOtuLablesSlice,
    type: "bar",
    orientation: "h"
  };
  var bardata = [trace1];
  var barlayout = {
      title: "Top 10 OTUs in Sample",
      xaxis: {title: "Prevalence in Sample"},
      yaxis: {title: "OTU ID Number"}  
  };
  Plotly.newPlot("bar", bardata, barlayout);

  // 2. filter data when selected by dropdown

  // 3. put metadata info in demographic info area from filter above

  });
}

function getData(value) {
  buildSample(value);
}

buildSample(940);

// optionchange -- pass in filtered samples
 



// // Display default plot

// function init() {
//   var data = [{
//     values: us,
//     labels: labels,
//     type: "pie"
//   }];

//   var layout = {
//     height: 600,
//     width: 800
//   };

//   Plotly.newPlot("pie", data, layout);
// }

// // D. Plot Bubble Chart

//   // Call function to update the chart
//   updatePlotly(data);
// }

// // Update the restyled plot's values
// function updatePlotly(newdata) {
//   Plotly.restyle("pie", "values", [newdata]);
// }

// init();


// // call update plotly when a change takes place to the DOM


// // event handler select drop down
// let dropdown = d3.select('#selDatasets')
// console.log(dropdown)

// dropdown.on('change', function(){
//     console.log(d3.event.target.id ,d3.event.target.value)
// })