$(document).ready(function() {
    // Загрузка данных из JSON файла
    $.getJSON("../data/data.json", function(data) {
      var tableBody = $("#tableBody");
      $.each(data, function(index, city) {
        tableBody.append(`<tr>
          <td>${city.name}</td>
          <td>${city.population}</td>
          <td>${city.cars}</td>
        </tr>`);
      });
  
      // Создание графика "Круговая диаграмма по городу и жителям"
      var ctx1 = document.getElementById('cityPopulationChart').getContext('2d');
      var cityPopulationChart = new Chart(ctx1, {
        type: 'pie',
        data: {
          labels: data.map(city => city.name),
          datasets: [{
            label: 'Количество жителей',
            data: data.map(city => city.population),
            backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#66FF99', '#9966FF'] // Цвета для городов
          }]
        }
      });
  
      // Создание графика "Столбчатая диаграмма для города и соотношения жители/авто"
      var ctx2 = document.getElementById('cityCarRatioChart').getContext('2d');
      var cityCarRatioChart = new Chart(ctx2, {
        type: 'bar',
        data: {
          labels: data.map(city => city.name),
          datasets: [{
            label: 'Соотношение жителей к авто',
            data: data.map(city => city.population / city.cars),
            backgroundColor: '#FF6384' // Цвет столбцов
          }]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
    });
  });
  