const url = 'https://api.openweathermap.org/data/2.5/weather';
const apiKey = 'f00c38e0279b7bc85480c3fe775d518c';

$(document).ready(function () {
    $('#city-button').on('click', function() {
        const cityName = $('#city-input').val().trim();
        if (cityName) {
            weatherFn(cityName);
        } else {
            alert('Please enter a valid city name.');
        }
    });

    // Allow pressing Enter to get weather
    $('#city-input').on('keypress', function(e) {
        if (e.which === 13) {
            $('#city-button').click();
        }
    });
});

async function weatherFn(cName) {
    const temp = `${url}?q=${cName}&appid=${apiKey}&units=metric`;
    $('#weather-info').hide(); // Hide info before loading
    $('.loading').remove(); // Remove previous loading message
    $('#city-button').prop('disabled', true).text('Loading...'); // Disable button

    try {
        const res = await fetch(temp);
        const data = await res.json();
        if (res.ok) {
            weatherShowFn(data);
        } else {
            alert('City not found. Please try again.');
        }
    } catch (error) {
        console.error('Error fetching weather data:', error);
        alert('An error occurred. Please try again later.');
    } finally {
        $('#city-button').prop('disabled', false).text('Get Weather'); // Enable button
    }
}

function weatherShowFn(data) {
    $('#city-name').text(data.name);
    $('#date').text(moment().format('MMMM Do YYYY, h:mm:ss a'));
    $('#temperature').html(`${data.main.temp}°C`);
    $('#description').text(data.weather[0].description);
    $('#wind-speed').html(`Wind Speed: ${data.wind.speed} m/s`);
    $('#weather-icon').attr('src', `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`);
    $('#weather-info').fadeIn(); // Fade in effect
}




