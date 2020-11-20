//Access data using d3.jason call to samples.jason (heather video)
d3.json('samples.json').then(data => {
    console.log(data);
})

// event handler select drop down
let dropdown = d3.select('#selDatasets')
console.log(dropdown)

dropdown.on('change', function(){
    console.log(d3.event.target.value)
})