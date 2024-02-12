const inp = document.querySelector(".search input");
const searchbtn = document.querySelector(".search img");

const url = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
const apikey = "0e121ebd1187b1f799d42783cdd18905";

const whether = async (city) => {
    let result = await fetch(url + city + `&appid=` + apikey);
    result = await result.json();
    console.log(result);

    if (result.cod == 400 || result.cod == 404) {
        document.querySelector(".whether").style.display = "none";
        document.querySelector(".details").style.display = "none";
        document.querySelector(".error").style.display = "block";
    } else {
        document.querySelector(".temp").innerText =  Math.round(result.main.temp) + "°c";           
        document.querySelector(".city").innerText = result.name;
        document.querySelector(".humidity").innerText = result.main.humidity + "%";
        document.querySelector(".wind").innerText = Math.round(result.wind.speed * 3.6) + " km/h";        
        document.querySelector(".whether").style.display = "flex";
        document.querySelector(".details").style.display = "flex";
        document.querySelector(".error").style.display = "none";
        console.log(result.weather[0].main);
        switch (result.weather[0].main) {
            case "Clear":
                document .querySelector(".whether-icon").setAttribute("src", "./images/clear.png");                 
                break;

            case "Rain":
                document.querySelector(".whether-icon").setAttribute("src", "./images/rain.png");        
                break;

            case "Drizzle":
                document.querySelector(".whether-icon").setAttribute("src", "./images/drizzle.png");                
                break;

            case "Snow":
                document.querySelector(".whether-icon").setAttribute("src", "./images/snow.png");
                break;

            case "Clouds":
                document.querySelector(".whether-icon").setAttribute("src", "./images/clouds.png");                  
                break;

            default:document.querySelector(".whether-icon").setAttribute("src", "./images/mist.png");                  
        }
    }
};

searchbtn.addEventListener("click" , ()=>{
    whether(inp.value);
});

document.addEventListener("keydown" , (e)=>{
      inp && e.key=='Enter' ? whether(inp.value) : null
});