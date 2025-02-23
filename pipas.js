let carbonChart;

function hitungJejakKarbon() {
    // Faktor emisi karbon (dalam kg CO2 per kWh)
    const faktorEmisi = {
        komputer: 0.2,    // Rata-rata konsumsi daya komputer: 200 watt = 0.2 kWh
        kulkas: 0.1,      // Rata-rata konsumsi daya kulkas: 100 watt = 0.1 kWh
        mesin_cuci: 0.5,  // Rata-rata konsumsi daya mesin cuci: 500 watt = 0.5 kWh
        kipas_angin: 0.05, // Rata-rata konsumsi daya kipas angin: 50 watt = 0.05 kWh
        televisi: 0.1,     // Rata-rata konsumsi daya televisi: 100 watt = 0.1 kWh
        rice_cooker: 0.2   // Rata-rata konsumsi daya rice cooker: 200 watt = 0.2 kWh
    };

    // Ambil nilai dari input
    const item = document.getElementById('item').value;
    const quantity = parseFloat(document.getElementById('quantity').value);
    const hours = parseFloat(document.getElementById('hours').value);

    // Validasi input
    if (isNaN(hours) || hours < 0 || isNaN(quantity) || quantity < 1) {
        alert("Masukkan durasi penggunaan dan jumlah barang yang valid!");
        return;
    }

    // Hitung jejak karbon (dalam kg CO2)
    const konsumsiEnergi = faktorEmisi[item] * hours * quantity;
    const jejakKarbon = konsumsiEnergi * 0.5; // Asumsi 0.5 kg CO2 per kWh (rata-rata emisi listrik di dunia)

    // Hitung jumlah pohon yang harus ditanam (asumsi 1 pohon menyerap 25 kg CO2 per tahun)
    const pohonDitanam = Math.ceil(jejakKarbon / 25);

    // Tampilkan hasil
    document.getElementById('hasil').innerHTML = 
        `Jejak Karbon: ${jejakKarbon.toFixed(2)} kg CO2<br>
        Untuk menebus karbon ini, perlu menanam sekitar <strong>${pohonDitanam}</strong> pohon.`;

    // Update grafik
    updateChart(item, jejakKarbon);
}

function updateChart(item, jejakKarbon) {
    const ctx = document.getElementById('carbonChart').getContext('2d');

    // Hapus grafik sebelumnya jika ada
    if (carbonChart) {
        carbonChart.destroy();
    }

    // Buat grafik baru
    carbonChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: [item.toUpperCase()],
            datasets: [{
                label: 'Jejak Karbon (kg CO2)',
                data: [jejakKarbon],
                backgroundColor: '#27ae60',
                borderColor: '#219653',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'kg CO2'
                    }
                }
            },
            responsive: true,
            plugins: {
                legend: {
                    display: false
                }
            }
        }
    });
}