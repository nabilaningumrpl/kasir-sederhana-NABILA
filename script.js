let data = [];

// Tambah barang
document.getElementById("tambah").onclick = () => {
    let nama = document.getElementById("nama").value;
    let harga = parseInt(document.getElementById("harga").value);
    let jumlah = parseInt(document.getElementById("jumlah").value);

    if (!nama || !harga || !jumlah) {
        alert("Isi semua input!");
        return;
    }

    data.push({
        nama,
        harga,
        jumlah,
        total: harga * jumlah
    });

    tampilkan();
    hitung();
};

// Tabel
function tampilkan() {
    let tb = document.getElementById("list");
    tb.innerHTML = "";

    data.forEach((d, i) => {
        tb.innerHTML += `
            <tr>
                <td>${d.nama}</td>
                <td>${d.harga}</td>
                <td>${d.jumlah}</td>
                <td>${d.total}</td>
                <td><button class="delete" onclick="hapus(${i})">X</button></td>
            </tr>
        `;
    });
}

// Hapus item
function hapus(i) {
    data.splice(i, 1);
    tampilkan();
    hitung();
}

// Hitung total
function hitung() {
    let subtotal = data.reduce((a, b) => a + b.total, 0);
    let disc = (subtotal * (parseInt(document.getElementById("diskon").value) || 0) / 100);
    let pajak = (subtotal - disc) * 0.11;
    let total = subtotal - disc + pajak;

    document.getElementById("subtotal").innerText = subtotal;
    document.getElementById("pajak").innerText = pajak.toFixed(2);
    document.getElementById("total").innerText = total.toFixed(2);
}

// Reset
document.getElementById("reset").onclick = () => {
    data = [];
    tampilkan();
    hitung();
};

// Cetak Struk
document.getElementById("print").onclick = () => {
    let sBody = document.getElementById("strukIsi");
    sBody.innerHTML = "";

    data.forEach(d => {
        sBody.innerHTML += `
        <tr>
            <td>${d.nama}</td>
            <td>${d.harga}</td>
            <td>${d.jumlah}</td>
            <td>${d.total}</td>
        </tr>`;
    });

    let subtotal = data.reduce((a, b) => a + b.total, 0);
    let disc = (subtotal * (parseInt(document.getElementById("diskon").value) || 0) / 100);
    let pajak = (subtotal - disc) * 0.11;
    let total = subtotal - disc + pajak;

    document.getElementById("wkt").innerText = new Date().toLocaleString();
    document.getElementById("sbt").innerText = subtotal;
    document.getElementById("dsc").innerText = disc.toFixed(2);
    document.getElementById("pjk").innerText = pajak.toFixed(2);
    document.getElementById("ttl").innerText = total.toFixed(2);

    window.print();
};
