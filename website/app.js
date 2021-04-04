/* Global Variables */
//OpenWeather API URL $ APIKey
let baseURL="https://api.openweathermap.org/data/2.5/weather?zip=";
let apiKey="&appid= ";
let zip=document.getElementById('zip').value;
// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

//Functions

//GET Data function  
const getData= async(baseURL,zip,apiKey)=>{
 const res=await fetch(baseURL+zip+apiKey);
    try {
        const data = await res.json();
        console.log(data);
        return data;
      } catch(error) {
        console.log("error", error);
        // appropriately handle the error
      }
    }
    
    
//POST Data function
const postData = async ( url = '', data = {})=>{
    console.log(data);
      const response = await fetch(url, {
      method: 'POST', //*GET,POST,PUT,DELETE, etc.
      credentials: 'same-origin',//include,*same-origin, omit
      headers: {
          'Content-Type': 'application/json',
      },
            
      body: JSON.stringify(data), // Body data type must match "Content-Type" header 
    });
      try {
        const newData = await response.json();
        console.log(newData);
        return newData;
      }catch(error) {
      console.log("error", error);
      //appropriately handle the error
      }
  }
 //Update UI function
    
const updateUI = async () => {
const request = await fetch('/weatherData');
        try{
          const allData = await request.json();
          document.getElementById('temp').innerHTML = "Temp: "+allData.temp;
          document.getElementById('date').innerHTML ="Today's date: " +allData.date;
          document.getElementById('content').innerHTML = "Feeling: "+allData.content;
      
        }catch(error){
          console.log("error", error);
        }
      }




//performe function listening to click on generate button
document.getElementById('generate').addEventListener('click', function performAction(e){
  let zip=document.getElementById('zip').value;
  
getData(baseURL,zip,apiKey)
.then(function (data){
  
  let content=document.getElementById('feelings').value;
 postData('/addData',{temp:data.main.temp, date:newDate, content:content})
})
.then(function(){
  updateUI();
});
});
