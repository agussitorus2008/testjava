$(document).ready(function() {
    loadData();  // Load data saat halaman dimuat

    $('#search').keyup(function() {
        let searchValue = $(this).val();
        loadData(searchValue);
    });
});

// Load data from API
let currentPage = 1; // Halaman saat ini
const itemsPerPage = 10; // Jumlah data per halaman

function loadData(searchValue = '', page = 1) {
    currentPage = page; // Update halaman saat ini
    $.get("/api/data-pribadi", function(data) {
        $('#dataBody').empty();

        // Filter data berdasarkan search value
        let filteredData = data.filter(item =>
            item.nik.includes(searchValue) || item.namaLengkap.toLowerCase().includes(searchValue.toLowerCase())
        );

        // Hitung total halaman
        const totalPages = Math.ceil(filteredData.length / itemsPerPage);

        // Tentukan data yang akan ditampilkan pada halaman ini
        const startIndex = (page - 1) * itemsPerPage;
        const paginatedData = filteredData.slice(startIndex, startIndex + itemsPerPage);

        // Render data ke tabel
        paginatedData.forEach(function(item, index) {
            let row = `
                <tr>
                    <td>${startIndex + index + 1}</td>
                    <td>${item.nik}</td>
                    <td>${item.namaLengkap}</td>
                    <td>${calculateAge(item.tanggalLahir)}</td>
                    <td>${item.tanggalLahir}</td>
                    <td>${item.jenisKelamin}</td>
                    <td>${item.alamat}</td>
                    <td>${item.negara}</td>
                    <td>
                        <div class="d-flex gap-2 justify-content-center">
                            <a href="detail.html?nik=${item.nik}" class="btn btn-info btn-sm">Detail</a>
                            <a href="edit.html?nik=${item.nik}" class="btn btn-warning btn-sm">Edit</a>
                            <button class="btn btn-danger btn-sm" onclick="deleteData('${item.nik}', '${item.namaLengkap}')">Hapus</button> 
                        </div>
                    </td>
                </tr>
            `;
            $('#dataBody').append(row);
        });

        // Render tombol pagination
        renderPagination(totalPages);
    });
}

function renderPagination(totalPages) {
    const paginationElement = $('#pagination');
    paginationElement.empty();

    // Tombol "Previous"
    const prevButton = $('<button>')
        .addClass('btn btn-primary btn-sm')  // Biru untuk tombol Previous
        .text('Previous')
        .attr('disabled', currentPage === 1) // Nonaktifkan jika di halaman pertama
        .css('background-color', currentPage === 1 ? '#6c757d' : '#007bff') // Warna abu-abu jika di halaman pertama
        .css('border', 'none')
        .click(function() {
            if (currentPage > 1) {
                loadData('', currentPage - 1); // Panggil loadData untuk halaman sebelumnya
            }
        });

    // Tombol nomor halaman (1, 2, 3, ...)
    const pageButtons = $('<div>').addClass('d-flex gap-2');
    for (let i = 1; i <= totalPages; i++) {
        const pageButton = $('<button>')
            .addClass('btn btn-sm')
            .text(i)
            .attr('disabled', i === currentPage) // Nonaktifkan tombol untuk halaman saat ini
            .css('background-color', i === currentPage ? '#007bff' : '#f8f9fa') // Biru untuk halaman aktif, abu-abu untuk yang tidak aktif
            .css('border', i === currentPage ? '1px solid #0056b3' : '1px solid #ccc')
            .click(function() {
                loadData('', i); // Panggil loadData untuk halaman yang dipilih
            });
        pageButtons.append(pageButton);
    }

    // Tombol "Next"
    const nextButton = $('<button>')
        .addClass('btn btn-primary btn-sm')  // Biru untuk tombol Next
        .text('Next')
        .attr('disabled', currentPage === totalPages) // Nonaktifkan jika di halaman terakhir
        .css('background-color', currentPage === totalPages ? '#6c757d' : '#007bff') // Warna abu-abu jika di halaman terakhir
        .css('border', 'none')
        .click(function() {
            if (currentPage < totalPages) {
                loadData('', currentPage + 1); // Panggil loadData untuk halaman selanjutnya
            }
        });

    // Gabungkan tombol Previous, page buttons, dan Next ke dalam elemen pagination
    paginationElement.append(prevButton, pageButtons, nextButton);
}







function deleteData(nik, namaLengkap) {
    // Set the modal content dynamically
    $('#deleteModal .modal-body').html(`Apakah Anda yakin ingin menghapus data <strong>${namaLengkap}</strong>?`);
    
    // Show the modal
    $('#deleteModal').modal('show');
    
    // Set up the delete confirmation logic
    $('#confirmDeleteBtn').off('click').on('click', function() {
        $.ajax({
            url: "/api/data-pribadi/" + nik,
            type: 'DELETE',
            success: function() {
                $('#deleteModal').modal('hide');
                loadData();  // Reload data after deletion
            },
            error: function() {
                $('#deleteModal').modal('hide');
                alert('Gagal menghapus data.');
            }
        });
    });
}




// Calculate age based on birthdate
function calculateAge(birthDate) {
    let today = new Date();
    let birthDateObj = new Date(birthDate);
    let age = today.getFullYear() - birthDateObj.getFullYear();
    let m = today.getMonth() - birthDateObj.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDateObj.getDate())) {
        age--;
    }
    return age;
}

$(document).ready(function () {
    // Hanya jalankan kode jika elemen #dataForm ditemukan
    if ($('#dataForm').length) {
        const nikInputElement = document.getElementById('nik');
        const errorMessageElement = document.getElementById('nikError');

        if (nikInputElement) {
            nikInputElement.addEventListener('input', function () {
                const nikValue = this.value;

                if (nikValue.length > 16) {
                    this.value = nikValue.slice(0, 16);
                    errorMessageElement.textContent = "NIK tidak boleh lebih dari 16 karakter!";
                    errorMessageElement.style.color = "red";
                } else if (nikValue.length < 16 && nikValue.length > 0) {
                    errorMessageElement.textContent = "NIK harus terdiri dari 16 karakter!";
                    errorMessageElement.style.color = "red";
                } else {
                    errorMessageElement.textContent = ""; // Validasi sukses
                }
            });
        }

        // Ketika tombol Simpan diklik, tampilkan modal konfirmasi
        $('#confirmSaveBtn').click(function () {
            const namaLengkap = $('#namaLengkap').val();
            // Update teks konfirmasi dengan nama yang dimasukkan
            $('#namaConfirmation').text(namaLengkap);
            // Tampilkan modal konfirmasi
            $('#confirmModal').modal('show');
        });

        // Saat tombol "Ya, Simpan" diklik di modal
        $('#confirmSave').click(function () {
            // Ambil data dari form
            const nik = $("#nik").val();
            const namaLengkap = $("#namaLengkap").val();
            const jenisKelamin = $("input[name='jenisKelamin']:checked").val();
            const tanggalLahir = $("#tanggalLahir").val();
            const alamat = $("#alamat").val();
            const negara = $("#negara").val();

            // Validasi form
            let missingFields = [];
            if (!nik) missingFields.push('NIK');
            if (!namaLengkap) missingFields.push('Nama Lengkap');
            if (!jenisKelamin) missingFields.push('Jenis Kelamin');
            if (!tanggalLahir) missingFields.push('Tanggal Lahir');
            if (!alamat) missingFields.push('Alamat');
            if (!negara) missingFields.push('Negara');

            if (missingFields.length > 0) {
                // Tampilkan pesan kesalahan di modal
                const errorMessage = 'Field yang belum diisi: ' + missingFields.join(', ');
                $('#modalErrorMessage').text(errorMessage); // Tampilkan pesan di modal
                return;
            }

            const data = { nik, namaLengkap, jenisKelamin, tanggalLahir, alamat, negara };

            // Kirim data ke server menggunakan Ajax
            $.ajax({
                url: '/api/data-pribadi',
                method: 'POST',
                contentType: 'application/json',
                data: JSON.stringify(data),
                success: function () {
                    window.location.href = '/index.html'; // Arahkan ke halaman utama setelah berhasil
                },
                error: function () {
                    alert('Terjadi kesalahan saat menyimpan data.');
                }
            });

            // Tutup modal setelah berhasil
            $('#confirmModal').modal('hide');
        });
    }
});




$(document).ready(function() {
    // Ambil parameter NIK dari URL
    const urlParams = new URLSearchParams(window.location.search);
    const nik = urlParams.get('nik');

    if (nik) {
        // Jika NIK ada, maka ini adalah form untuk Edit
        $("#formTitle").text("Edit Data Pribadi");
        $("#nik").val(nik); // Set NIK
        $("#nik").prop("readonly", true); // NIK tidak bisa diubah

        // Melakukan request untuk mengambil data berdasarkan NIK dan mengisi form jika perlu
        $.get("/api/data-pribadi/" + nik, function(data) {
            if (data) {
                // Mengisi data ke dalam form jika ditemukan
                $("#namaLengkap").val(data.namaLengkap);
                $("input[name='jenisKelamin'][value='" + data.jenisKelamin + "']").prop('checked', true);
                $("#tanggalLahir").val(data.tanggalLahir);
                $("#alamat").val(data.alamat);
                $("#negara").val(data.negara);
            } else {
                alert('Data tidak ditemukan!');
            }
        });

        $("#submitButton").text("Perbarui");
    }

    // Fungsi untuk update data
    function updateData(nik, data) {
        $.ajax({
            url: '/api/data-pribadi/' + nik,
            method: 'PUT',
            contentType: 'application/json',
            data: JSON.stringify(data),
            success: function(response) {
                // Redirect setelah berhasil update tanpa menampilkan alert
                window.location.href = '/index.html';  // Ganti URL sesuai dengan kebutuhan Anda
            },
            error: function() {
                alert('Terjadi kesalahan saat memperbarui data');
            }
        });
    }

    // Ketika form disubmit
    $("#editForm").submit(function(event) {
        event.preventDefault();

        const data = {
            nik: $("#nik").val(),
            namaLengkap: $("#namaLengkap").val(),
            jenisKelamin: $("input[name='jenisKelamin']:checked").val(),
            tanggalLahir: $("#tanggalLahir").val(),
            alamat: $("#alamat").val(),
            negara: $("#negara").val()
        };

        // Set nama lengkap di modal
        $("#editName").text(data.namaLengkap);

        // Tampilkan modal untuk konfirmasi menggunakan Bootstrap 5 API
        const myModal = new bootstrap.Modal(document.getElementById('editModal'));
        myModal.show();  // Tampilkan modal

        // Konfirmasi edit
        $("#confirmEditBtn").off("click").on("click", function() {
            updateData(nik, data); // Lakukan update data
            myModal.hide(); // Sembunyikan modal setelah update
        });
    });
});

