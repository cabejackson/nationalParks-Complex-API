// $.param creates a url search query   




const apiKey = 'IC5Wf0YjG1mCU4gSwI1t2DFteZv60TezqoydhIbN';
const nationalParksAPI = 'https://developer.nps.gov/api/v1/parks';

function handleSubmit() {
  $('form').on('submit', function(e){
    e.preventDefault();
    const val = $('#userInput').val();
    const max = $('.max-Results').val();

    let arr = [];
    
    const params = {
      q: val,
      api_key: apiKey, //the name api_key matters
      limit: max,

    };

    //takes an object and turns it into query for us
    const queryString = $.param(params);

    fetch(`${nationalParksAPI}?${queryString}`)
      .then(function(response){
        if (response.ok) return response.json();
        throw new Error('Something went wrong');
      }).then(function(jsonData){
        console.log(jsonData);
        for (let i = 0; i < jsonData.data.length; i++){
          let curr = jsonData.data[i];
          //find the physical address
          let addy1 = curr.addresses.find(el => el.type === 'Physical');
          let actualAddy = `${addy1.line1}, ${addy1.city}, ${addy1.stateCode}`;
          arr.push(`<h3>${curr.fullName}</h3><h5>${curr.description}</h5><h6><a href=${curr.url}>Link to the Park website</a> Address:${actualAddy}</h6>`);
        }
        $('.results').html(arr);
      });
  });
}

function main() {
  handleSubmit();
}

main();

