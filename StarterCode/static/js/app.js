// A. DATA SETUP
// 1. Access data using d3.jason call to samples.jason (heather video)
// build function to be called when page load or item selected

function buildSample(value){
  d3.json('samples.json').then(data => {
    console.log("sample value: ",value);
    console.log(data);

  // 2. Create Variables/Arrays for traces
    // Test subject ID for drop down
    let subjects = data.names;
   
    var newSub = subjects.map(val => "OTU"+String(val));
    console.log (newSub);
    newSubSlice = newSub.slice(0,10);
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
    y: newSubSlice,
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


 
// // D. Plot Bubble Chart
    var trace2 = {
      x: subjects,
      y: filteredSamples[0].sample_values,
      text: filteredSamples[0].otu_labels,
      mode: 'markers',
      marker: {
        
        size: filteredSamples[0].sample_values,
        sizeref: .1,
        sizemode: 'area',
        color: filteredSamples[0].otu_ids,
    }}
    var bubbledata = [trace2]
    var bubblelayout = {
      title: "OTU Prevalence in Sample",
      xaxis: {title: 'OTU ID Number'},
      yaxis: {title: 'Prevalence in Sample'},
    }

    Plotly.newPlot("bubble", bubbledata, bubblelayout);


  });
}

function getData(value) {
  buildSample(value);
}

// default chart upon page load
buildSample(940);
