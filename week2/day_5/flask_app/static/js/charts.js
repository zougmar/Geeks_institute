{% extends "base.html" %}
{% block content %}
<main class="max-w-7xl mx-auto my-10">
  <h1 class="text-4xl font-extrabold mb-6">Charts & Analytics</h1>

  <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
    <div class="bg-white p-6 rounded-xl shadow">
      <h2 class="text-xl font-bold mb-4">Albums per Genre</h2>
      <canvas id="genreChart"></canvas>
    </div>
    <div class="bg-white p-6 rounded-xl shadow">
      <h2 class="text-xl font-bold mb-4">Albums per Year</h2>
      <canvas id="yearChart"></canvas>
    </div>
  </div>

  <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
  <script>
    const genreLabels = {{ genre_data | map(attribute=0) | list | safe }};
    const genreCounts = {{ genre_data | map(attribute=1) | list | safe }};

    const yearLabels = {{ year_data | map(attribute=0) | list | safe }};
    const yearCounts = {{ year_data | map(attribute=1) | list | safe }};

    new Chart(document.getElementById('genreChart'), {
      type: 'bar',
      data: {
        labels: genreLabels,
        datasets: [{
          label: 'Albums',
          data: genreCounts,
          backgroundColor: 'rgba(59, 130, 246, 0.7)'
        }]
      }
    });

    new Chart(document.getElementById('yearChart'), {
      type: 'line',
      data: {
        labels: yearLabels,
        datasets: [{
          label: 'Albums',
          data: yearCounts,
          borderColor: 'rgba(234, 179, 8, 0.9)',
          backgroundColor: 'rgba(234, 179, 8, 0.4)',
          fill: true,
          tension: 0.3
        }]
      }
    });
  </script>
</main>
{% endblock %}
