package com.example.test.model;

import jakarta.persistence.*;

@Entity
@Table(name = "data_pribadi")
public class DataPribadi {

    @Id
    
    @Column(name = "nik", nullable = false, unique = true, length = 16)
    private String nik;

    @Column(name = "nama_lengkap", nullable = false)
    private String namaLengkap;

    private String jenisKelamin;
    private String tanggalLahir;
    private String alamat;
    private String negara;

    // Getter and Setter Methods


    public String getNik() {
        return nik;
    }

    public void setNik(String nik) {
        this.nik = nik;
    }

    public String getNamaLengkap() {
        return namaLengkap;
    }

    public void setNamaLengkap(String namaLengkap) {
        this.namaLengkap = namaLengkap;
    }

    public String getJenisKelamin() {
        return jenisKelamin;
    }

    public void setJenisKelamin(String jenisKelamin) {
        this.jenisKelamin = jenisKelamin;
    }

    public String getTanggalLahir() {
        return tanggalLahir;
    }

    public void setTanggalLahir(String tanggalLahir) {
        this.tanggalLahir = tanggalLahir;
    }

    public String getAlamat() {
        return alamat;
    }

    public void setAlamat(String alamat) {
        this.alamat = alamat;
    }

    public String getNegara() {
        return negara;
    }

    public void setNegara(String negara) {
        this.negara = negara;
    }
}