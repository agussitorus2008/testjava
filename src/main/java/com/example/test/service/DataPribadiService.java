package com.example.test.service;

import com.example.test.model.DataPribadi;
import com.example.test.repository.DataPribadiRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DataPribadiService {

    @Autowired
    private DataPribadiRepository dataPribadiRepository;

    public List<DataPribadi> getAllData() {
        return dataPribadiRepository.findAll();
    }

    public DataPribadi getDataByNik(String nik) {
        return dataPribadiRepository.findByNik(nik);
    }

    public DataPribadi addData(DataPribadi dataPribadi) {
        return dataPribadiRepository.save(dataPribadi);
    }

    public DataPribadi updateData(String nik, DataPribadi dataPribadi) {
        DataPribadi existingData = dataPribadiRepository.findByNik(nik);
        if (existingData != null) {
            existingData.setNamaLengkap(dataPribadi.getNamaLengkap());
            existingData.setJenisKelamin(dataPribadi.getJenisKelamin());
            existingData.setTanggalLahir(dataPribadi.getTanggalLahir());
            existingData.setAlamat(dataPribadi.getAlamat());
            existingData.setNegara(dataPribadi.getNegara());
            return dataPribadiRepository.save(existingData);
        }
        return null;
    }

    public void deleteData(String nik) {
        DataPribadi existingData = dataPribadiRepository.findByNik(nik);
        if (existingData != null) {
            dataPribadiRepository.delete(existingData);
        }
    }
}